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


# 데이터 포맷에 대해..
> 이 항목은 아무말 대잔치를 포함하므로 읽는이의 주의를 요합니다.
## 1. parse
### addrlist.json
`[주소(http://...):[번호(id):셀렉터]]` 형식의 파일이다.
모든 parser객체에 대한 총괄 정보를 담고 있으므로 만약 서버를 닫았다가 다시 열 일이 생기면 여기서 파서 리스트를 불러온다.
### 번호(id) 폴더
이 폴더명은 각 주소(http://...)로 링크된 ID에 대응한다.
따라서 폴더 하나 당 파서 객체 하나가 가진 리소스들을 가지고 있다고 보면 된다.
만약 서버를 껐다 켜면 여기서 그대로 불러와서 running하던 상태로 복구된다.
#### data.json
table 태그 안의 모든 tr 태그들을 가지고 있다.
모든 tr태그는 고유의 id를 가지고 있으므로, 후술할 userinfo.json에서 어떤 알림을 송신하였고 어떤 알림을 송신하지 못했는지 체크할 수 있다.
원래는 dictionary 방식으로 구현할 예정이었으나, 인덱스 번호가 id 역할을 할 수 있다는 것을 깨닫고 리스트 형식을 생각하고 있다.
아니다! 고유한 게시글 ID는 꼭 필요하다.
형식은 `['tr태그내용', 'tr태그내용', ...]`이다.
여기서 중요한 점은 새로고침 시 모든 tr을 검사해서 push방식으로 리스트의 첫 원소로 새로운 원소들이 계속 들어온다는 점이다.
#### userinfo.json
이 파일에는 각 user마다 어떤 알림을 받았고 어떤 알림을 안받았는지에 대한 내용을 저장한다.
각 tr태그의 인덱스에 대해서 받은 알림은 리스트로 저장한다.
형식은 `{'user1':[1,2], user2:[1],...}`이다.

# iframe 태그에 관해
현재 iframe 안의 엘리먼트에 외부 코드로 직접 접근 불가능하다.  
따라서 다음과 같은 해결책을 생각해 보았다.  

1. iframe을 사용하지 않고, 서버 측에서 페이지 전체를 가지고 옴.->타겟 페이지의 스타일시트는 특정 태그 안에만 적용되도록 수정
2. iframe을 사용하며, iframe 내부에 간접 접근할 방법을 고안

