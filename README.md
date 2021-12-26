# Genshin Music Player

Genshin Impact 컨셉의 뮤직 플레이어

## Skills

- [x] Firebase
- [x] React

## 설명

### Routes

routes/MusicList.js -> 앱을 켰을때 처음 나오는 화면 컴포넌트입니다.
<br>
routes/MusicPlay.js -> 선택한 음악을 재생 시켜주는 컴포넌트 입니다.

### Character

여기 있는 컴포넌트들은 List에 나타나는 캐릭터 박스 컴포넌트들입니다. <br>
리스트에서 봤을때, 캐릭터 초상화, 이름, 플레이 버튼을 가진 박스들이 이녀석들입니다. <br>
캐릭터 이미지나 배경 set 은 List(처음 화면)에서 합니다! <br>
<br>
플레이 버튼을 누르면, 이 컴포넌트에서 DB에 저장된 음악정보를 받아오고, 받아온 음악 정보들을 Localforage에 저장하는 작업을 하고, Play 화면으로 넘어갑니다.<br>
그 다음 넘어온 Play 화면에서, localforage에 저장된 데이터들을 get 합니다. <br>
문제점은 play 버튼을 눌렀을 때, 음악의 대한 정보를 받아오고, localforage에 넣는 작업을 합니다.<br>
이게 문제점인 이유는.. Link를 누르면 바로 Play 페이지로 넘어가게되는데, 정보들을 받아올 수 있는 충분한 시간이 주어지지 않습니다.<br>
<br>
그래서 임시방편으로 setTimeout 메서드로 임의로 값을 모두 가져올 시간을 벌어놓은 상태입니다. <br>
하지만 저는 setTimeout 대신, 정직하게(?) 음악에 대한 정보를 모두 받아오면 로딩이 끝나게 만들고 싶습니다!

## 핵심

하실 때, RaidenBox.js와 MusicPlay.js 파일을 보시면 될 것 같습니다. 모든 캐릭터박스들은 이름과 받아오는 데이터만 다를뿐, 코드는 모두 중복됩니다. <br>
아마 그래서 봐야할 부분은 MusicPlay.js 에서는 getLocalForage 함수, RaidenBox.js에서는 getMusicFile 함수를 중심으로 보시면 될 것 같습니다! <br>
getLocalForage 함수는 LocalForage에서 정보를 얻어와 해당 컴포넌트의 State에 저장하는 함수이고, getMusicFile 함수는 음악 정보를 받아오는 함수이기 때문입니다! <br>
