import { time } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    updateGroup: securedResolver(
      async (
        _,
        { groupId, title, description, inviteeName },
        { client, loggedInUser }
      ) => {
        // 초대받는 사람이 존재 하지 않는 경우.
        const invitee = await client.user.findUnique({
          where: {
            username: inviteeName,
          },
        });
        if (!invitee) {
          return {
            ok: false,
            error: "존재하지 않는 유저입니다.",
          };
        }

        // 그룹이 존재하지 않는 경우.
        const group = await client.group.findUnique({
          where: {
            id: groupId,
          },
          include: {
            inviter: true,
          },
        });
        if (!group) {
          return {
            ok: false,
            error: "존재하지 않는 그룹입니다.",
          };
        }

        // 그룹주인이 아닌 경우 (권한 없음)
        const isInviter = group.inviter.userId === loggedInUser.id;
        if (!isInviter) {
          return {
            ok: false,
            error: "권한이 없습니다.",
          };
        }

        if (inviteeName) {
          // 이미 그룹에 속해있는 경우
          const alreadyMember = await client.group.findFirst({
            where: {
              id: groupId,
              members: {
                some: {
                  id: invitee.id,
                },
              },
            },
          });

          if (alreadyMember) {
            return {
              ok: false,
              error: "해당 유저는 이미 그룹에 속해있습니다.",
            };
          }

          if (invitee) {
            await client.group.update({
              where: {
                id: groupId,
              },
              data: {
                title: title ?? group.title,
                description: description ?? group.description,
                members: {
                  connect: {
                    id: invitee.id,
                  },
                },
                updatedAt: time(),
              },
            });
            return {
              ok: true,
            };
          }
        }
        await client.group.update({
          where: {
            id: groupId,
          },
          data: {
            title: title ?? group.title,
            description: description ?? group.description,
            updatedAt: time(),
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
