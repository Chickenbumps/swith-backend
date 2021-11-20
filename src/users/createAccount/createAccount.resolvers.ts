import client from "../../client";
import { Resolvers } from "../../types";
import bcrypt from "bcrypt";
import moment from "moment";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { name, username, email, password, passwordConfirm, token }
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
        if (password !== passwordConfirm) {
          return {
            ok: false,
            error: "비밀번호가 일치하지 않습니다.",
          };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            name,
            username,
            email,
            bio: `안녕하세요.${username} 입니다.`,
            password: hashedPassword,
            avatar:
              "https://swith-upload.s3.ap-northeast-2.amazonaws.com/avatar/default.png",
            createdAt: moment().format(),
            updatedAt: moment().format(),
            pushToken: token,
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
