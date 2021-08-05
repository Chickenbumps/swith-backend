import client from "../../client";
import { Resolvers } from "../../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        const user = await client.user.findFirst({ where: { username } });
        if (!user) {
          return {
            ok: false,
            error: "존재하지 않은 아이디 입니다.",
          };
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
          return {
            ok: false,
            error: "비밀번호가 일치하지 않습니다.",
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
