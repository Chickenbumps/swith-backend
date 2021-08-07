# Swith backend

- jwt 에러 예외 처리
  --1.유저 정보를 가져오는데 실패 했습니다. JsonWebTokenError: invalid signature

## User

[] model
[o] createAccount
[o] login
[o] seeProfile
[o] editProfile // avatar 바꿀때 s3내 파일지우기.
[o] isMe
[o] followToggle
[o] searchUser

## Group

[o] createGroup
[o] updateGroup
[o] sendMessage
[o] seeGroup
[o] seeGroups
