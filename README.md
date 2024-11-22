##### [👊 프로젝트 노션 바로가기](https://www.notion.so/teamsparta/1-B1-cf05aab3c68a4955a33a2c82d764ff06)
##### [👊 웹페이지 바로가기](https://final-project-b1.vercel.app/)

<br>


## 사용 기술


#### Zustand

> 보일러플레이트 없이, 직관적이고 쉬운 상태관리를 위해 사용했습니다.
> devtools를 통해 디버깅이 가능하다는 것도 장점이였습니다.


#### React Context API

> 상태 관리 복잡도를 낮추기 위하여, 유저 정보를 context api를 활용하여 관리하였습니다.


#### Tanstack Query

> 동일한 데이터를 반복 요청하지 않도록 자동으로 캐싱하고 컴포넌트가 다시 마운트될 때 필요한 데이터를 자동으로 갱신하여, <br>
> 서버 요청 횟수를 효과적으로 최소화할 수 있어 사용했습니다.


#### Next.js

> 서버사이드 렌더링과 정적 사이트 생성을 통해 SEO 성능과 첫 화면을 빠르게 로딩하여, 사용자 경험 측면에서 이점을 노렸습니다.
> 또한 파일 기반 라우팅과 API Routes를 통해 보다 쉬운 개발 환경을 구성할 수 있었습니다.


#### Supabase

> 실시간 데이터베이스, 인증, 파일 스토리지, 자동화된 API를 제공하여, Backend Engineer 없이 이를 쉽게 구현할 수 있어 선택했습니다.


#### class-variance-authority

> tailwind css와 함께 클래스 관리의 일관성을 유지하고, 복잡한 조건부 컴포넌트를 간결하게 관리하기 위해 사용했습니다.


#### Storybook

> 컴포넌트에 대한 이해 및 사용을 도와, 효율적인 협업을 위해 사용하였습니다.


<br><br>

## 프로젝트 기능

#### 🛡 OAuth2 소셜로그인 (kakao)

 - Kakao 계정을 통한 간편 로그인이 가능합니다.
 - 작성한 게시글 등은 회원 탈퇴 시에 같이 삭제 처리 됩니다.

 <br>

#### 📊 Google Maps API를 활용한 실시간 지도 제공 기능
  
 - 사용자의 여행 일정에 따라 지도에 해당 장소를 표시합니다.
 - 장소간의 경로를 선으로 이어 대략적인 경로를 표시하여 줍니다.

 <br>

#### 🗨 여행지 정보 제공

 - 나라, 도시별 여행지에 대한 정보를 제공합니다.
 - 1.리뷰 작성/수정/삭제 : 각 여행지 별 리뷰를 적어 만족도를 나타낼 수 있습니다.
 - 2.일정에 추가 : 해당 여행지를 본인의 일정으로 추가할 수 있습니다.
 - 3.북마크 : 가고 싶은 여행지에 대해 북마크를 하여 보관할 수 있습니다.

 <br>

#### 🔍 검색 기능

 - 여행지의 이름을 검색 시 관련된 여행지가 검색되고 이후 해당 여행지의 정보를 열람할 수 있습니다.
 - 사용자가 원하는 나라에 대해 필터링하여 원하는 나라의 여행지만 검색 할 수 있습니다.
 - 연관 검색어, 최근 검색어 등 사용자가 검색한 것들에 대해 정보를 제공해 줍니다.

 <br>

#### 👨‍💻 마이페이지 기능

 - 마이페이지에서 내가 작성한 리뷰, 나의 북마크, 최근 본 장소 등을 확인 할 수 있습니다.
 - 프로필 수정을 할 수 있습니다.

 <br>

#### 📢 일정 관리 기능

 - 사용자는 여행에 대한 일정을 생성하여 관리할 수 있습니다.
 - 북마크 한 장소, 내가 현재 보고 있는 장소 등을 일정에 스케쥴로 입력할 수 있으며, 교통 수단, 메모 등 여행에 필요한 정보들을 직접 메모하여 관리할 수 있습니다.
 - 내가 입력한 정보에 한하여 지도에서 해당 장소를 확인할 수 있습니다.

 <br>

## 🖥️ screen shot
|||||
|---|---|---|---|
| ![2024-10-04 11 52 28](https://github.com/user-attachments/assets/41c2c974-9c4b-4934-9634-e1801a3d060f) | ![2024-10-04 12 34 49](https://github.com/user-attachments/assets/9618401c-118f-40d2-981a-e22b174b9cb6) | ![2024-10-04 11 57 02](https://github.com/user-attachments/assets/7958f4de-1a95-4f3c-add5-c2d5643b4296) | ![2024-10-04 12 01 40](https://github.com/user-attachments/assets/7f1e7efc-b095-4c48-8bb5-d4de66f43b13) |
| ![2024-10-04 12 26 55](https://github.com/user-attachments/assets/37947aaf-478d-45e2-a4f3-2b7c386584ba) | ![2024-10-04 12 23 33](https://github.com/user-attachments/assets/d44dd497-5977-4c45-8d0a-8d212119b40c) | ![2024-10-04 12 31 30](https://github.com/user-attachments/assets/9c95d411-9192-4730-aa51-3db6525cf8b9) | ![2024-10-04 12 33 08](https://github.com/user-attachments/assets/69cbecb6-1de4-481c-860e-b0201dc05d68)  |

 
<br><br>

## ⚙ Development Environment

`react: ^18.2.0` `react-google-maps/api: ^2.19.3,` `supabase/supabase-js: ^2.44.4` `webstomp-client: ^1.2.6` `axios: ^1.1.3``tanstack/react-query: ^5.51.9` `axios: ^1.7.2` `cookies-next: ^4.2.1` `clsx: ^0.29.0` `tailwindcss: ^3.4.1``class-variance-authority: ^0.7.0` `immer: ^10.1.1` `lodash: ^4.17.21` `zustand: ^4.5.4` `storybook/nextjs: ^8.2.5`

<br><br>


## 📝 Technologies & Tools (FE) 📝

<div>
 
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> 
<img src="https://img.shields.io/badge/Supabase-09D3AC?style=for-the-badge&logo=Supabase&logoColor=white"/>
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"/> 
<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=Tailwind-CSS&logoColor=white"/> 
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/> 
<img src="https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=.ENV&logoColor=white"/> 
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white"/> 
<img src="https://img.shields.io/badge/VisualStudioCode-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white"/> 
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"/> 
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"/> 
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"/> 
<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/> 
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/>

</div>
<br><br>

## 👨‍👩‍👧‍👦 Our Team

|                  이효현                  |                 박요셉                 |                     임현석                     |                    박초원                    |                      이준혁                       | 김인우 |
| :--------------------------------------: | :------------------------------------: | :--------------------------------------------: | :------------------------------------------: | :-----------------------------------------------: | :----: |
| [@reeny404](https://github.com/reeny404) | [@0dytpq0](https://github.com/0dytpq0) | [@hyeonseok98](https://github.com/hyeonseok98) | [@parkchowon](https://github.com/parkchowon) | [@LeeJunhyeok369](https://github.com/LeeJunhyeok369) |        |
|                 TL / FE                  |                   FE                   |                       FE                       |                      FE                      |                        FE                         |   DS   |

