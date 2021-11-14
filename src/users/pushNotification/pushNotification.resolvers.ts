import { Expo, ExpoPushErrorReceipt } from "expo-server-sdk";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    pushNotification: async (_, { username }, { client, loggedInUser }) => {
      let expo = new Expo();
      let messages = [];
      const isObserver = await client.user.findFirst({
        where: {
          username,
        },
        select: {
          observers: true,
        },
      });
      if (!isObserver) {
        return {
          ok: false,
          error: "설정된 감시자가 없습니다.",
        };
      }
      const tokens = isObserver.observers.map((item) => item.pushToken);

      for (let pushToken of tokens) {
        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(
            `Push token ${pushToken} is not a valid Expo push token.`
          );
          continue;
        }
        messages.push({
          to: pushToken,
          sound: "default",
          body: `${username}이(가) 자리에 없어 집중시간이 종료되었습니다. 확인이 필요합니다.`,
          data: {
            withSOme: "data",
            experienceId: "@username/example",
            tag: `${loggedInUser.id}`,
          },
        });
      }
      // batch notification
      let chunks = expo.chunkPushNotifications(messages);
      let tickets = [];

      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error(`Push Notification Error:${error}`);
        }
      }
      let receiptIds = [];
      for (let ticket of tickets) {
        if (ticket.id) {
          receiptIds.push(ticket.id);
        }
      }

      let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
      for (let chunk of receiptIdChunks) {
        try {
          let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
          console.log("receipts:", receipts);
          for (let receiptId in receipts) {
            let { status, details }: any = receipts[receiptId];
            if (status === "ok") {
              continue;
            } else if (status === "error") {
              let { message }: any = receipts[receiptId];
              console.error(
                `There was an error sending a notification: ${message}`
              );
              if (details && details.error) {
                console.error(`The error code is ${details.error}`);
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      }

      if (tokens) {
        return {
          ok: true,
          message: messages,
        };
      }
      return {
        ok: false,
        error: "No Token.",
      };
    },
  },
};

export default resolvers;
