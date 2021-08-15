import { currentTime } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { securedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    updateTime: securedResolver(
      async (_, { time }, { client, loggedInUser }) => {
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let date = new Date().getDate();
        let todayNum = new Date().getDay();
        let todayString = new Intl.DateTimeFormat("en-US", {
          weekday: "long",
        }).format(todayNum);
        const timeArr = await client.time.findMany({
          where: {
            userId: loggedInUser.id,
            dayName: todayString,
          },
        });
        const todayTime = timeArr.find(
          (time) => time.updatedAt === new Date().toLocaleDateString()
        );

        if (!todayTime) {
          await client.time.create({
            data: {
              dayName: todayString,
              createdAt: new Date().toLocaleDateString(),
              updatedAt: new Date().toLocaleDateString(),
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              timeValue: time,
            },
          });
        } else {
          await client.time.update({
            where: {
              id: todayTime.id,
            },
            data: {
              updatedAt: new Date().toLocaleDateString(),
              timeValue: {
                increment: time,
              },
            },
          });
        }
        // 날짜 달라진 경우. todayTime 초기화
        if (todayNum !== loggedInUser.updatedAt.getDay()) {
          client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              updatedAt: new Date().toLocaleDateString(),
              todayTime: 0,
            },
          });
        }

        const user = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            todayTime: {
              increment: time,
            },
            updatedAt: currentTime(),
            totalTime: {
              increment: time,
            },
          },
        });
        if (!user) {
          return {
            ok: false,
            error: "시간이 반영되지 않았습니다.",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
