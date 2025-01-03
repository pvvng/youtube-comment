# 유투브 댓글 분석 웹앱 - Youtuview(유튜뷰)

<div align="center">

<!-- logo -->

<img src="https://github.com/user-attachments/assets/02f355d3-7283-46c7-aee6-8aa2e87cb0bc" alt="리드미 상단 사진" width="50%" />


### 📝 0. 기본 정보 ✅

<br/> [<img src="https://img.shields.io/badge/프로젝트 기간-2024.09.10~진행중-blue?style=flat&logo=&logoColor=white" />]()
<br/> [<img src="https://img.shields.io/badge/팀원-김동우, 조정민-blue?style=flat&logo=&logoColor=white" />]()

</div> 


## 1. 설치 방법

### [유튜뷰](https://youtuview.site) 👈 클릭


## 2. 개요
- 프로젝트 이름: 유투브 댓글 분석 웹앱-유튜뷰
- 개발 기간: 2024.09.10 ~ 진행중
- 기여도 :
  - ##### FE : [김동우](https://youtuview.site), 70%, [조정민](https://github.com/JOJoungMin), 30%  
  - ##### BE : [김동우](https://youtuview.site), 100%

    
- Next.js, Typescript, mongoDB, Tanstack-Query(React-Query), Zustand, Flask
- 작업 관리: Git, Github
- 배포: FE(Next.js) => Netlify / BE(FLask) => AWS Elastic Beanstalk
- #### installed Library
       @fortawesome/react-fontawesome
       @tanstack/react-query
       axios
       bootstrap
       formidable
       moment-timezone
       mongodb
       next-auth
       next-pwa
       next-recaptcha-v3
       rate-limiter-flexible
       react-d3-cloud
       recharts
       zustand

## 3. 프로젝트 설명
- #### 유튜브 댓글 키워드/감정 분석 웹페이지.
  - 유튜브 영상 url을 통해 추출한 video/youtuber id와 youtube API v3를 이용하여 제작하였습니다.
 
- #### TypeScript로 타입 에러 제어
  - TypeScript를 사용하여 Type Error로 인한 사고 발생을 미연에 방지하고자 하였습니다.
  
- #### React-Query를 활용한 효율적인 비동기 통신 처리
   - useQuery, useMutation 등의 React-Query 훅을 활용하여 유려한 UX와 캐싱을 통한 효율적인 비동기 통신을 진행합니다.

- #### Zustand를 활용한 전역적 상태 관리
  - 문법이 쉽고 가벼운 Zustand를 사용했습니다.
 
- #### skeleton ui와 Loading Spinner 를 통한 LCP 개선
  - 유려한 사용자 경험을 위해 대기 시간이 필요한 특정 컴포넌트에 skeleton ui와 Loading Spinner를 부착했습니다.

- #### Google Recaptcha V3를 이용한 봇 침입 방지
  - 웹사이트에 가해지는 봇의 무작위성 공격을 제한하기 위해 Google Recaptch V3를 이용하여 사용자 UX를 해치지 않는 선에서 봇 검증을 진행합니다.
 
- #### Google 소셜 로그인
  - Google을 통한 로그인이 가능하며, 로그인 정보를 통해 사용자의 구독 정보를 마이 페이지에서 보여줍니다.
 
- #### PWA로 네이티브 앱 처럼 다운 가능
  - PWA를 사용하여 네이티브 앱 처럼 홈 화면에 추가 가능합니다.
 
- #### Flask 서버를 통한 키워드 및 감정 분석
  - AWS eb에 키워드 및 감정 분석 Flask 서버를 배포하여 open API 처럼 호출하여 사용합니다.
 
- #### rate-limiting과 NoSQL injection 방어
  - 백엔드 보안을 강화하기 위해 Next API Route에서 rate Limiting과 NoSQL injection 방어코드를 사용합니다.
 
## 4. 이용 방법과 주요 기능
### 4-0-1. 랜딩 페이지

<div style="display: flex; justify-content: center;">
    <img src="https://github.com/user-attachments/assets/5e6a7d0c-4769-404f-a6c6-d618ec7cb1b9" width="48%" />
</div>

- 사용자가 해당 사이트에 처음 들어오면 만나게 되는 화면입니다. 사용자가 어떤 웹인지 추측할 수 있게 간단한 설명을 기재했습니다.
- 하단에 footer를 구현하여 제작자 정보를 열람할 수 있도록 하였습니다.

  
### 4-0-2. 로그인 페이지

<div style="display: flex; justify-content: center;">
    <img src="https://github.com/user-attachments/assets/71563a75-3724-4f45-9d3d-267f17693ef1" alt="로그인 페이지"" width="48%" />
</div>


- 로그인 버튼을 눌러 로그인 페이지로 이동합니다.
- 한번 로그인을 할 시 한 달간 세션을 유지해 로그인을 간소화합니다.

- - - 

### 4-1. 메인페이지

|URL 검색|
|:---:|
|  <img src="https://github.com/user-attachments/assets/5fa793f8-58b6-4361-acf6-883869464cdc" alt="URL 검색 gIf" style="max-width: 100%; height: auto;" width="48%" />|
|URL을 이용, Youtube API로 받은 데이터를 가공하여 클라이언트에 제공합니다.|


- 검색창에 URL을 입력해여 해당 영상의 정보와 분석을 진행하는 페이지로 이동합니다.
- 올바르지 않은 URL이 입력되면 예외처리합니다.

|인기 유튜버, 영상 컴포넌트|
|:---:|
| <img src="https://github.com/user-attachments/assets/f0050209-8cf5-44fc-afab-8cee12bf4ecb" alt="인기 차트" style="max-width: 100%; height: auto;" width="48%" />|
|사이트 자체적인 인기 차트를 표시합니다.|

- 인기 차트는 분석량이 많은 순으로 좌측부터 정렬됩니다.
- 최대 10개까지의 인기 차트를 확인할 수 있습니다.
- 화살표 버튼과 드래그를 통해 캐러셀을 움직일 수 있습니다.
- 이미지를 클릭하면 해당 영상/유튜버 상세페이지로 이동합니다.

|찜 버튼 (하트버튼)|
|:---:|
| <img src="https://github.com/user-attachments/assets/c0bfa848-4c22-41c8-a95d-dc4ca95dc7c9" alt="찜기능 구현" style="max-width: 100%; height: auto;" width="48%" />|
|사이트 자체적으로 찜기능을 구현했습니다.|

- 찜을 해놓은 영상과 유투버를 확인할 수 있습니다.
- 랜덤하게 4개를 볼 수 있으며 마이페이지에서 전체 찜 목록을 확인할 수 있습니다.
- 로그인 하지 않은 경우에 찜 버튼을 클릭하면 기능이 제한되며, 동시에 confirm 박스를 통해 로그인 가능합니다.

|최근 검색한 영상|
|:---:|
|<img src="https://github.com/user-attachments/assets/c5093e66-2315-48a8-81ad-21ec0bd332e9" alt="로컬 저장소 2" style="max-width: 100%; height: auto;" width="48%"/> <img src="https://github.com/user-attachments/assets/cb91d690-7dbf-41ab-b44c-4ae272aafc15" alt="로컬 저장소 1" style="max-width: 100%; height: auto;" width="48%" />|
|localstorage를 사용합니다.|

- 이용자가 최근에 검색한 영상을 4개까지 보여줍니다.
- 영상을 새롭게 확인하면 배열을 업데이트 되어 최근 4개 항목이 갱신됩니다.

- - - 

### 4-2. 유튜버 페이지

|댓글 감정 평가 그래프|
|:---:|
|<img src="https://github.com/user-attachments/assets/452a8d96-fe63-4fc3-aa99-869425f52710" alt="댓글 감정 평가" width="48%" />|
|모든 사용자가 분석한 해당 유튜버의 감정 평가 결과를 종합하여 그래프로 보여줍니다.|

- 모든 사용자가 분석한 해당 유튜버의 감정 평가 결과를 종합하여 그래프로 보여줍니다.
- 긍정도와 부정도를 통해 유튜버의 영상이 어떤 평가를 받는지 살펴볼 수 있습니다.

|댓글 키워드 WordCloud|
|:---:|
|<img src="https://github.com/user-attachments/assets/8e5752a8-8808-4526-9c33-db50eebde3ed" alt="댓글 키워드 추출" width="48%" />|
|모든 사용자가 분석한 해당 유튜버의 키워드 분석 결과를 종합하여 그래프로 보여줍니다.|

- 모든 사용자가 분석한 해당 유튜버의 키워드 분석 결과를 종합하여 그래프로 보여줍니다.
- 순서대로 나열되는 키워드를 통해 유튜버의 영상들이 대체적으로 어떤 주제를 가지는지 알 수 있습니다.


- - - 


### 4-3. 비디오 페이지

|유투버 정보 표시|
|:---:|
|<img src="https://github.com/user-attachments/assets/cd0cec09-3d10-4c2c-a2b0-8a2674cb706e" alt="비디오 디테일 페이지" width="48%" />|
|Youtube API를 통해 유튜버 정보를 데려옵니다.|

- 해당 유투버의 구독자와 모든 영상의 조회수와 전체 영상 갯수를 보여줍니다.

|영상 댓글 및 화제성 분석 그래프|
|:---:|
|<img src="https://github.com/user-attachments/assets/8709eed9-62af-4abf-8e92-f2492a055469" alt="비디오 디테일 페이지2" width="48%" />|
|Youtube API를 통해 영상 댓글 정보를 데려옵니다.|

- 해당 영상에 대한 댓글 전체와 댓글이 달린 시기를 활용하여 화제성 분석 그래프를 제공합니다.

|댓글 분석|
|:---:|
|<img src="https://github.com/user-attachments/assets/bc503f30-ffdd-49b5-95cd-86299dde11b7" alt="분석하기1" width="48%" /> <img src="https://github.com/user-attachments/assets/3f4d3597-af28-4cb1-8af4-6ce650097da7" alt="분석하기2" width="48%" />|
|댓글을 분석합니다.|

- 기존 분석 데이터가 있는 경우 그 일시를 알려주며 분석을 직접 할 수 있는 기회를 사용자에게 제공합니다.
- 기존 분석 데이터는 7일 단위로 갱신 가능합니다.

- - - 

### 4-3. 마이 페이지

|구독 목록|
|:---:|
|<img src="https://github.com/user-attachments/assets/66fa5c24-e820-44d0-8d6f-a0b0bf937269" width="48%" />|
|사용자의 구글 로그인 데이터를 활용하여 구독 목록을 표시합니다.|

- 구독한 유튜버 목록을 YoutubeAPI로 이용 가능합니다. 찜한 유튜버/영상 목록을 확인 가능합니다.
- 로그인 하지 않은 경우에는 접근이 제한됩니다.
