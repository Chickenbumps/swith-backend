import client from "../../client";
import { Resolvers } from "../../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { email, password }) => {
      try {
        const user = await client.user.findFirst({ where: { email } });
        if (!user) {
          return {
            ok: false,
            error: "가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.",
          };
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
          return {
            ok: false,
            error: "가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.",
          };
        }
        const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY);
        return {
          ok: true,
          token,
        };
      } catch (e) {
        return {
          ok: false,
          error: console.log("로그인 할 수 없습니다.", e),
        };
      }
    },
  },
};

export default resolvers;
