import client from "../../client";
import { Resolvers } from "../../types";
import bcrypt from "bcrypt";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const usernameCheck = await client.user.findFirst({
          where: {
            username,
          },
        });
        const emailCheck = await client.user.findFirst({
          where: {
            email,
          },
        });
        if (usernameCheck) {
          throw new Error("이미 존재하는 닉네임 입니다.");
        } else if (emailCheck) {
          throw new Error("이미 가입된 이메일 입니다.");
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        await client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: console.log("계정을 만들 수 없습니다.", e),
        };
      }
    },
  },
};

export default resolvers;
