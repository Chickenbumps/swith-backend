import { currentTime } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { securedResolver } from "../../users/users.utils";
import moment from "moment";
const resolvers: Resolvers = {
  Mutation: {
    updateTime: securedResolver(
      async (_, { time }, { client, loggedInUser }) => {
        // 지난주 데이터 만들기
        let dayCount = 7;
        while (dayCount > 0) {
          const isExist = await client.time.findFirst({
            where: {
              userId: loggedInUser.id,
              updatedAt: moment().subtract(dayCount, "days").format("YYYYMMDD"),
            },
          });
          console.log("isExist:", isExist);
          if (!isExist) {
            await client.time.create({
              data: {
                dayName: moment().subtract(dayCount, "day").format("dddd"),
                createdAt: moment()
                  .subtract(dayCount, "days")
                  .format("YYYYMMDD"),
                updatedAt: moment()
                  .subtract(dayCount, "days")
                  .format("YYYYMMDD"),
                user: {
                  connect: {
                    id: loggedInUser.id,
                  },
                },
                timeValue: 0,
              },
            });
          }
          dayCount--;
        }

        const timeArr = await client.time.findMany({
          where: {
            userId: loggedInUser.id,
            dayName: moment().format("dddd"),
          },
        });
        const todayTime = timeArr.find(
          (time) => time.updatedAt === moment().format("YYYYMMDD")
        );

        if (!todayTime) {
          await client.time.create({
            data: {
              dayName: moment().format("dddd"),
              createdAt: moment().format("YYYYMMDD"),
              updatedAt: moment().format("YYYYMMDD"),
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
              updatedAt: moment().format("YYYYMMDD"),
              timeValue: {
                increment: time,
              },
            },
          });
        }
        // 날짜 달라진 경우. todayTime 초기화
        if (moment().day() !== loggedInUser.updatedAt.getDay()) {
          client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              updatedAt: currentTime(),
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
