# Board_Picker
모든 종류의 공용 게시판에 대하여 알림을 설정할 수 있게 해주는 웹앱  
1. [사용 시나리오](https://github.com/CodeLibPlan/Board_Picker/wiki#시나리오)  
2. [코드 구성](https://github.com/CodeLibPlan/Board_Picker/wiki#코드-구성)  
3. [코드 수정 규칙(이슈 달기/진행하기)](https://github.com/CodeLibPlan/Board_Picker/wiki#코드-수정-규칙)  

# 현재 진행상황
## 1. 기능 구성
- 유저(foreground)가 (페이지 주소)/notification으로 알림을 요청
- 서버는 유저에게 최근 게시물 정보를 송신
- 유저는 서버에서 제공받은 게시물 정보가 로컬에서 가지고 있는 게시물 정보와 다른지 확인함
- 다르다면 알림을 표시
- 서버 측에서는 일정 주기로 홈페이지 게시판 파싱을 진행
## 2. 추가할 내용
- iframe 방식의 알림 추가 구현을 위해 웹 페이지 중계 기능을 구현해야 함.
- 공인 https를 사용해야 web worker 등록이 가능함. 따라서 https 사용이 요구됨.
- 디자인 좀 갈아엎자
