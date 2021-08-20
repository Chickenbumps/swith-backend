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
              timeNumber: 1,
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
              timeNumber: {
                increment: 1,
              },
            },
          });
        }
        // 날짜 달라진 경우. todayTime 초기화
        if (
          loggedInUser.updatedAt.toISOString().slice(8, 10) !==
          moment().date().toString()
        ) {
          client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              updatedAt: moment().format(),
              todayTime: 0,
            },
          });
        }

        // todayTime,totalTime  computed field 로 할지 말지 고민.
        const user = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            todayTime: {
              increment: time,
            },
            updatedAt: moment().format(),
            totalTime: {
              increment: time,
            },
            totalNumberOfTime: {
              increment: 1,
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
