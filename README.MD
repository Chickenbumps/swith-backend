# Swith backend

- jwt 에러 예외 처리
  --1.유저 정보를 가져오는데 실패 했습니다. JsonWebTokenError: invalid signature

## User

[] model
[o] createAccount // 비밀번호 최소 6자
[o] login
[o] seeProfile
[o] editProfile // avatar 바꿀때 s3내 파일지우기.
[o] isMe
[o] followToggle
[o] searchUser
[o] selectObserver //그룹내 멤버만 옵저버로 선택할 수 있도록 구현.(매개변수:그룹아이디,그룹내 멤버이름)

## Group

[o] createGroup
[o] updateGroup
[o] sendMessage
[o] seeGroup
[o] seeGroups
[o] searchGroups
[o] kickMember
[o] readMessage

## Comment

[o] createComment
[o] deleteComment
[o] editComment
