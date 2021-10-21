import { Expo, ExpoPushErrorReceipt } from "expo-server-sdk";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    pushNotification: async (_, { username }, { client, loggedInUser }) => {
      let expo = new Expo();
      let messages = [];
      const token = await client.user.findFirst({
        where: {
          username,
        },
        select: {
          pushToken: true,
        },
      });
      console.log("token:", token);
      console.log(token);
      for (let pushToken of [token.pushToken]) {
        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(
            `Push token ${pushToken} is not a valid Expo push token.`
          );
          continue;
        }
        messages.push({
          to: token.pushToken,
          sound: "default",
          body: "Test notification!!!!!",
          data: { withSOme: "data" },
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
                // The error codes are listed in the Expo documentation:
                // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                // You must handle the errors appropriately.
                console.error(`The error code is ${details.error}`);
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      }

      if (token) {
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
