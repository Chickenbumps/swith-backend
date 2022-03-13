import Expo from "expo-server-sdk";
import moment from "moment";
import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    kickMember: securedResolver(
      async (_, { groupId, memberId }, { client, loggedInUser }) => {
        const isIviter = await client.inviter.findFirst({
          where: {
            userId: loggedInUser.id,
            Group: {
              some: {
                id: groupId,
              },
            },
          },
        });
        if (!isIviter) {
          return {
            ok: false,
            error: "추방 권한이 없습니다.",
          };
        }
        const isMember = await client.group.findFirst({
          where: {
            id: groupId,
            members: {
              some: {
                id: memberId,
              },
            },
          },
        });
        if (!isMember) {
          return {
            ok: false,
            error: "존재하지 않는 멤버입니다.",
          };
        }
        const isKicked = await client.group.update({
          where: {
            id: groupId,
          },
          data: {
            members: {
              disconnect: {
                id: memberId,
              },
            },
            updatedAt: moment().format(),
          },
        });

        let expo = new Expo();
        let messages = [];
        const token = await client.user.findFirst({
          where: {
            id: memberId,
          },
          select: {
            pushToken: true,
          },
        });

        if (isKicked) {
          if (!Expo.isExpoPushToken(token.pushToken)) {
            console.error(
              `Push token ${token} is not a valid Expo push token.`
            );
          }
          messages.push({
            to: token.pushToken,
            sound: "default",
            body: `그룹 ${isMember.title}에서 추방되었습니다.`,
            data: {
              withSOme: "data",
              experienceId: "@username/example",
              tag: `${loggedInUser.id}`,
            },
          });

          // batch notification
          let chunks = expo.chunkPushNotifications(messages);
          let tickets = [];

          for (let chunk of chunks) {
            try {
              let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
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

          let receiptIdChunks = expo.chunkPushNotificationReceiptIds(
            receiptIds
          );
          for (let chunk of receiptIdChunks) {
            try {
              let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
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
        }

        return {
          ok: true,
          kickedUserId: memberId,
          message: messages,
        };
      }
    ),
  },
};

export default resolvers;
