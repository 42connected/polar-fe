import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@mui/material";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import styled from "styled-components";
import Button from "../../components/button";
import TimeTableMuiComponent from "../../components/mentor-detail/mui-table";
import { getMentorDetail } from "../../context/mentor-detail/mentor-detail-axios";
import MentorDetailProps from "../../interface/mentor-detail/mentor-detail.interface";
import theme from '../../styles/theme';
import { MentoringLogProps } from "../../interface/mentor-detail/mentoringLogProps";
import MarkdownRender from "./markdownRender";
import CommentComponent from "../../components/mentor-detail/comment";
import { CadetProps } from "../../interface/mentor-detail/cadet-props.interface";
import { CommentProps } from "../../interface/mentor-detail/comment-props.interface";

function MentorDetail() {

  const mockCadet: CadetProps[] = [
{
    name: "seoyepar",
    profileImage: "https://cdn.intra.42.fr/users/seoyepar.jpg"
  }
    ,
    {
      name: "hkong",
      profileImage: "https://cdn.intra.42.fr/users/hkong.jpg"
    },
    {
      name: "jokang",
      profileImage: "https://cdn.intra.42.fr/users/jokang.jpg"
    }
]
  const mockComments: CommentProps[] = [
    {
      cadet: mockCadet[0],
      comment: "This is a comment by seoyepar",
      createdAt: new Date()
    },
    {
      cadet: mockCadet[1],
      comment: "This is a comment by hkong",
      createdAt: new Date()
    },
    {
      cadet: mockCadet[2],
      comment: "This is a comment by jokang",
      createdAt: new Date()
    }
  ]

  const mockMentor : MentorDetailProps = {
    id: "1",
    intraId: "m-seoypar",
    name: "박서연",
    email: "good",
    company: "goood",
    duty: "gooood",
    profileImage: "https://cdn.intra.42.fr/users/seoyepar.jpg",
    availableTime: "available",
    introduction: "가장큰 크기의 text로 변환<br/>## 그다음 작은 크기위 text로 변환  ### 그다음 작은 크기의 text로 변환<br/>#### 그다음 작은 크기의 text로 변환<br/>##### 그다음 작은 크기의 text로 변환<br/>###### 그다음 작은 크기의 text로 변환",
    tags: ["tag1", "tag2", "tag3", "tag1", "tag2", "tag3", "tag1", "tag2", "tag3"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    markdownContent: `# 김루비 멘토(청년)
    e-mail: dev_rubykim@naver.com / dev.rubykim@gmail.com     slack: m-ruby
    전문분야: JavaScript, Python, React.js
### 👋 Hello, 42 Cadet!
    
안녕하세요~ 2기 1차에 cadet으로 활동하다 현재는 외국계 스타트업에서 근무 중인 m-ruby 입니다 :-)

혹시라도 덕몽어스(구스구스덕) 좋아하시는 분들 중 같이 하실 분 DM주세요! (두근두근)

### 👣 발자취

[ruby-kim - Overview](https://github.com/ruby-kim)

2022.01 - 현재 Sibel International(Sibel Health 한국 지부) 클라우드 엔지니어

2020.10 - 2022.01 42SEOUL 2기 1차 Cadet

### 👓 멘토링 주요분야
    
- 신입(주니어) 개발자 취준법
  - Github 관리하기
    - 인턴 및 정규직 지원할 때 Github 덕분에 면접까지 간 경우가 꽤 있습니다✨
    - Github를 내 마음대로 신명나게 꾸미는 법을 알려드립니다.
  - 포트폴리오 준비 / 인성 면접
    - 자신의 장점을 극대화할 수 있는 방안에 대해 상담 해드립니다.
    - 면접 팁은 특히 저같은 선천적 내성적인 분들께 많이 도움이 될 것이라 생각해요. (MBTI가 I로 시작합니다 😌)
    - [참고] 기술 면접은 시니어 멘토님들께 여쭤보시는 것을 추천드려요! 물론 경험담 공유를 원하시면 언제든지 가능합니다 😊
  - 외국계 기업 준비
    - 국내에서 영어 회화 공부하기
    - 외국계 기업 찾기 & 준비법
    - 참고로 토종 한국인입니다. **_아이 라잌 코리아_** 🇰🇷 *(펄럭)*
- 개발하면서 생기는 고민들
  - 42 프로젝트 말고 뭔가 더 해야할까요?
  - 어느 정도 언어 문법 알겠는데, 뭘 더 해야할까요?
  - 프로젝트 어떻게 시작하나요?
  - 어느 분야(프론트, 데이터사이언스, 인공지능 등)로 가야할지 잘 모르겠어요
  - 개발자를 준비하면서 한 번 쯤 해봤던 고민들 같이 얘기해봐요!
- 따끈한 취준 & 입사 썰 듣고 싶으신 분들도 환영합니다!
  - ex) 면접 중 인공 암벽장 간 썰
  - ex) MAGA, 네카라쿠배 중 일부 기업 면접 썰
  - ex) 내가 알던 사람이 회사 선배님의 친구?! 썰
  - ex) 연봉 협상 썰
  - ex) 대기업을 포기하고 스타트업으로 취직한 썰 등
  - 이 외에 다양한 썰이 있습니다 📦
- 가벼운 일상부터 고민 거리까지 상담 가능합니다.
  - 대인관계 등, 카뎃분들도 각자의 사정이 있으실거라 생각해요.
  - 또 가끔은 외롭다고 생각이 드실 때가 있지 않으신가요?
  - 사람 대 사람으로 같이 천천히 티타임 가지면서 힐링하는 시간을 가져봐요 😇

### ❌ 아래 분야에 대해서는 멘토링 불가능합니다. 다른 시니어 멘토님께 연락해보세요!

- 42서울 과제: 그 유명한, ‘왼쪽 보고 오른쪽 보자'로 동료 카뎃분들께 질문해보세요.
- 먼 미래 진로고민
  - 2022년 1월에 입사한 따끈따끈 신입입니다.
  - 개발 직군 관련해서 먼 미래까지는 아직 무리에요 🥲
- 기술 분야 상담 & 코드 리뷰: 개발자 짬이 차면 해드릴 수 있겠지만, 위에 적었듯이 따끈한 신입입니다 🐣
    `,
  }
  
  const mockMentoringLog: MentoringLogProps[] = [
    {
      topic: "nestjs 프로젝트",
      state: "확정",
      meetingAt: new Date(),
    },
    {
      topic: "nestjs",
      state: "완료",
      meetingAt: new Date(),
    },
    {
      topic: "백앤드 진로상담",
      state: "확정",
      meetingAt: new Date(),
    },
  ]

  interface mentorAvailableTimeInterface {
    startHour?: number;
    startMinute?: number;
    endHour?: number;
    endMinute?: number;
  }

  const mockMentorAvailableTime = '[[],[{"startHour":6,"startMinute":0,"endHour":10,"endMinute":0},{"startHour":10,"startMinute":0,"endHour":11,"endMinute":0}],[],[],[{"startHour":6,"startMinute":30,"endHour":9,"endMinute":0}],[],[{"startHour":6,"startMinute":30,"endHour":9,"endMinute":0}]]'
  const mockMentorAvailableTimeToArray = JSON.parse(mockMentorAvailableTime)

  interface appointmentsInterface{
    startDate: Date;
    endDate: Date;
  }
  
  const appointmentsTest = [
    {
      startDate: new Date(2018, 5, 25, 9, 30),
      endDate: new Date(2018, 5, 25, 11, 30),
    },
    {
      startDate: new Date(2018, 5, 25, 12, 0),
      endDate: new Date(2018, 5, 25, 13, 0),
    },
  ]

  
  const [mentor, setMentor] = useState<MentorDetailProps>(mockMentor);
  const [mentoringLog, setMentoringLog] = useState<MentoringLogProps[]>(mockMentoringLog);
  const [isActiveMentorDetail, setIsActiveMentorDetail] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentProps[]>(mockComments);
  const [appointments, setAppointments] = useState<appointmentsInterface[]>(appointmentsTest);
  
  //2018, 5, 25 화요일
//const date2 = new Date('1995-12-17T03:24:00');
// Sun Dec 17 1995 03:24:00 GMT...
//2018-06-28
  // console.log(mockMentorAvailableTimeToArray);
  const setMentorAvailableTimeData = () => {
    const appointmentsData: appointmentsInterface[] = [];
    mockMentorAvailableTimeToArray.forEach((data: mentorAvailableTimeInterface[], index: number) => {
      if (data.length !== 0) {
        data.forEach(data2 => {
          let day = (25 + index);
          if (index === 6)
          {
            day = 24;
          }
          const startDate = new Date(2018, 5, day, data2.startHour, data2.startMinute);
          const endDate = new Date(2018, 5, day, data2.endHour, data2.endMinute);
          appointmentsData.push({ startDate, endDate });
        })
      }
    })
    return appointmentsData;
  }

  useEffect(() => {
    const appointmentsData = setMentorAvailableTimeData();
    setAppointments(appointmentsData);
  }, [])
  const AddHashtag = mentor.tags?.map((tag) => {
    return '#' + tag + ' ';
  });


  const mentoringLogList = mentoringLog.map((log) => {
    return (<MenuBox2>
      <div>{log.topic}</div>
      <div>{log.state}</div>
      <div>{log.meetingAt.getTime()}</div>
    </MenuBox2>)
  }
  );

  // const commentsList = comments.map((comment) => {
  //   return (<>
  //     <div>{comment.cadet.name}</div>
  //     <div>{comment.comment}</div>
  //     <div>{comment.createdAt.getTime()}</div>
  //   </>)
  // }

// 테이블 테그로 변경하기
  
  const MakeCommentsTags = ({comments} : any) => {
    comments.map((comment:CommentProps) => {
      return( <Comment>
        <img src={comment?.cadet?.profileImage} />
        <div>
            <div>
                <div>{comment?.cadet?.name}</div>
                <div>{comment?.createdAt.getTime()}</div>
            </div>
            <div>{comment?.comment}</div>
        </div>
    </Comment>)
    }
    );
  }

  return (
    <MentorDetailTag>
        <h1>Mentor Detail</h1>
      <MentorHeader>
         <MentorInfo>
          <MentorImage src={mentor.profileImage} />
          <MentorInfoContent>
            <MentorName>
              <div>{mentor.name} 멘토</div>
              <div>{mentor.intraId}</div>
            </MentorName>
            <Button fontSize={theme.fontFrame.subTitleSmall} borderWidth="1px" text={`멘토링 ${mentor.isActive ? "가능" : "불가능"}`} backgroundColor={theme.colors.polarBackground} color={theme.colors.polarSimpleMain} width="12rem" height="2rem"></Button>
          </MentorInfoContent>
        </MentorInfo>
        <Button text="멘토링 신청하기"  width="21rem" height="6rem" background-color={theme.colors.polarSimpleMain} color={theme.colors.backgoundWhite}></Button>
      </MentorHeader>
      <MentorBody>
        <MentorBody1>
          <MentorBody1Left>
          <MenuBox>멘토링 이용 방법</MenuBox>
          <MentorHowToContent>
            <div>카뎃</div>
            <ol type="1">
              <li>멘토의 멘토링 상태 확인하고 멘토링 신청 버튼 클릭</li>
              <li>만남 일정과 정보를 작성하고 제출</li>
              <li>마이페이지에서 만남 상태 확인 가능</li>
              <li>멘토링이 확정, 취소되면 카뎃에게 알림 메일 발송</li>
              <li>장소협의 후 만남 일정 시간에 멘토링 진행</li>
            </ol>
            <div className="mentor">멘토</div>
            <ol>
              <li>카뎃의 멘토링 신청 시 알림 메일 발송</li>
              <li>마이페이지에서 만남 상태 결정 가능</li>
              <li>멘토링이 확정, 취소되면 카뎃에게 알림 메일 발송</li>
              <li>장소협의 후 만남 일정 시간에 멘토링 진행</li>
              <li>멘토링 진행 후 보고서 작성 가능</li>
            </ol>
            <footer>*  48시간 이내에 만남 상태 확정 또는 취소 되지 않으면 자동취소</footer>
          </MentorHowToContent>
          </MentorBody1Left>
          <MentorBody1Right>
          <MentorBody1Right1>
            <MenuBox>멘토 소개</MenuBox>
            <MentorIntroduction>{mentor.introduction}</MentorIntroduction>
            <MentorTags>{AddHashtag}</MentorTags>
          </MentorBody1Right1>
          <MentorBody1Right2>
            <MenuBox1>
              <div>주제</div>
              <div>상태</div>
              <div>일시</div>
            </MenuBox1>
              {mentoringLogList}
            </MentorBody1Right2>
          </MentorBody1Right>
        </MentorBody1>
        <MentorBody2>
          <MenuBox>
            <div>가능시간</div>
            <div>업데이트 : {mentor.updatedAt.getTime()}</div>
          </MenuBox>
          <TimTableScroll>
            <TimeTableMuiComponent appointments={appointments}></TimeTableMuiComponent>
          </TimTableScroll>
        </MentorBody2>
        <MentorBody3>
          <MentorBody3Toggle onClick={()=>{setIsActiveMentorDetail((data) => !data)}}>
            {isActiveMentorDetail ? <FontAwesomeIcon icon={faAngleDown} size={'2x'} /> :
              <FontAwesomeIcon icon={faAngleDown} size={'2x'} rotation={270} />}
            <div>멘토 상세 소개 보기</div>
          </MentorBody3Toggle>
          {isActiveMentorDetail ?
            <>
              <MenuBox>멘토정보</MenuBox>
              <MarkdownRender markdown={mentor.markdownContent} />
            </> : null}
        </MentorBody3>
        <MentorCommets>
          <MenuBox>댓글</MenuBox>
          <MentorCommetsContent>
            {comments.map((comment:CommentProps) => {
      return( <Comment>
        <img src={comment?.cadet?.profileImage} />
        <UserContent>
            <div>
                <div>{comment?.cadet?.name}</div>
                <div>{comment?.createdAt.getTime()}</div>
            </div>
            <div>{comment?.comment}</div>
        </UserContent>
    </Comment>)
    }
    )}
          </MentorCommetsContent>
        </MentorCommets>
      </MentorBody>
    </MentorDetailTag>
  );
}

const UserContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 1rem;
    div:first-child {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-weight: bold;
      div:last-child{
        font-size: 1rem;
        padding-left: 0.7rem;
        color: ${props => props.theme.colors.grayThree};
        font-weight: normal;
      }
    }
    div:last-child {
      ${props => props.theme.fontFrame.subTitleMiddle};
      font-weight: normal;
    }
`

const Comment = styled.div`
    display: flex;
    margin: 2rem;
    img {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
    }
`

const TimTableScroll = styled.div`
  overflow-y: scroll;
  height: 70rem;

`

const MenuBox2 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  border-bottom: 1px solid ${theme.colors.grayFive};
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div:nth-child(2) {
    color: ${theme.colors.polarSimpleMain};
  }
  `

const MentorCommetsContent = styled.div`
`

const MentorCommets = styled.div`
  margin-top: 5%;
`

const MentorBody3Toggle = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 1rem;
  div {
    ${theme.fontFrame.subTitleMiddle};
    margin-left: 1rem;
  }

`

const MentorBody3 = styled.div`
  margin-top: 10%;
`

const MenuBoxHead = styled.div`
`

const MentorBody2 = styled.div`
  margin-top: 10%;
`

const MenuBox1 = styled.div`
  border-top: 2px solid ${props => props.theme.colors.blackThree};
  border-bottom: 1px solid ${props => props.theme.colors.grayFive};
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const MentorBody1Right = styled.div`
display:flex;
flex-direction:column;
justify-content:flex-start;
grid-area: right;

`
const MentorBody1Right2 = styled.div`
  display: flex;
  flex-direction: column;
  `

const MentorTags = styled.div`
  display: flex;
  place-content: center;
  align-items: center;
  color: ${theme.colors.polarSimpleMain};
`

const MentorIntroduction = styled.div`
  margin: 1.3rem;
  ${theme.fontSize.sizeMedium};
  color: ${theme.colors.blackThree};
`

const MentorBody1Right1 = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10%;
`

const MentorBody1 = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-template-areas:
    "left left left right right"
    "left left left right right"
    "left left left right right"
    "left left left right right"
    "left left left right right";
  grid-gap: 1rem;
  ${theme.fontSize.sizeSmall};
`



const MentorHowToContent = styled.div`
display: flex;
flex-direction: column;
position: relative;
  div {
    margin: 1.5rem;
    margin-bottom: 0;
    color: ${theme.colors.grayTwo};
  }
  .mentor {
    margin-top: 0;
  }
  ol {
    margin-top: 0.5rem;
    padding-left: 3rem;
  }
  li {
    margin-bottom: 0.3rem;
    color: ${theme.colors.grayTwo};
  }
  footer {
    color: ${theme.colors.fontGray};
  }
`

const MentorBody1Left = styled.div`
  grid-area: left;
`

const MentorHeader = styled.div`
  display: flex;
  width: 100%;
  height: 27rem;
  background-color: ${props => props.theme.colors.polarBackground};
  justify-content: space-around;
  align-items: center;
`;

const MentorImage = styled.img`
width: 18rem;
height: 18rem;
border-radius: 50%;
`;

const MentorInfo = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const MentorInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.6rem;
`
const MentorName = styled.div`
  display: flex;
  align-items: flex-end;
  div:first-child{
    ${theme.fontFrame.titleMedium};
    font-family: ${theme.font.sebangGothic};
  }
  div:last-child{
    margin-left: 0.5rem;
    ${theme.fontFrame.bodySmall};
    font-weight: 900;
  }
  margin-bottom: 0.5rem;
`

const MentorBody = styled.div`
  margin-left:5%;
  margin-right:5%;
  margin-top:1rem;
`

const MenuBox = styled.div`
  border-top: 2px solid ${props => props.theme.colors.blackThree};
  border-bottom: 1px solid ${props => props.theme.colors.grayFive};
  width: 100%;
  /* height: 3rem; */
  box-sizing: border-box;
  padding-left: 1rem;
  padding-top: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  ${theme.fontFrame.subTitleMiddle};
  font-weight: 900;
  div:last-child {
    color: ${theme.colors.fontGray};
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    padding-left: 0.3rem;
    font-size: 1rem;
  }
  padding-bottom:0.5rem;
`
const MentorDetailTag = styled.div`
  font-family: ${theme.font.nanumGothic};
`


export default MentorDetail;