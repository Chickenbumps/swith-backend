import * as jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      throw new Error("token error.");
    }
    const { id }: any = await jwt.verify(token, process.env.PRIVATE_KEY);
    if (id) {
      const user = await client.user.findFirst({
        where: {
          id,
        },
      });
      if (user) {
        return user;
      }
    } else {
      throw new Error("유효하지 않는 토큰입니다.");
    }
  } catch (e) {
    console.log("유저 정보를 가져오는데 실패 했습니다.", e);
  }
};
