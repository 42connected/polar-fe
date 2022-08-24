import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@mui/material";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import styled from "styled-components";
import Button from "../components/button";
import TimeTableMuiComponent from "../components/mentor-detail/mui-table";
import { getMentorDetail } from "../context/mentor-detail/mentor-detail-axios";
import MentorDetailProps from "../interface/mentor-detail/mentor-detail.interface";
import theme from '../styles/theme';
import { MentoringLogProps } from "./mentoringLogProps";

function MentorDetail() {
  interface CadetProps{
    name: string;
    profileImage: string;
  }

  interface CommentsProps {
    cadet: CadetProps;
    comment: string;
    createdAt: Date;
  }
  const mockCadet: CadetProps = {
    name: "John Doe",
    profileImage: "http://placehold.it/50x50"
  }
  const mockComments: CommentsProps[] = [
    {
      cadet: mockCadet,
      comment: "This is a comment",
      createdAt: new Date()
    },
    {
      cadet: mockCadet,
      comment: "This is a comment",
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
    introduction: "# 가장큰 크기의 text로 변환<br/>##그다음 작은 크기위 text로 변환  ### 그다음 작은 크기의 text로 변환<br/>#### 그다음 작은 크기의 text로 변환<br/>##### 그다음 작은 크기의 text로 변환<br/>###### 그다음 작은 크기의 text로 변환",
    tags: ["tag1", "tag2", "tag3", "tag1", "tag2", "tag3", "tag1", "tag2", "tag3"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    markdownContent: "markdownContent",
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

  
  const [mentor, setMentor] = useState<MentorDetailProps>(mockMentor);
  const [mentoringLog, setMentoringLog] = useState<MentoringLogProps[]>(mockMentoringLog);
  const [isActiveMentorDetail, setIsActiveMentorDetail] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentsProps[]>(mockComments);
  const [appointments, setAppointments] = useState<appointmentsInterface[]>()
  
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
          const day = (18 + index);
          const startDate = new Date(2018, 6, day, data2.startHour, data2.startMinute);
          const endDate = new Date(2018, 6, day, data2.endHour, data2.endMinute);
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
  console.log(appointments);
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
            <FontAwesomeIcon icon={faAngleDown} size={'2x'} />
            <div>멘토 상세 소개 보기</div>
          </MentorBody3Toggle>
          {isActiveMentorDetail ?
            <>
              <MenuBox>멘토정보</MenuBox>
              <div>
                {mentor.introduction}
              </div>
            </> : null}
        </MentorBody3>
        <MentorCommets>
          <MenuBox>댓글</MenuBox>
          <MentorCommetsContent>
          </MentorCommetsContent>
        </MentorCommets>
      </MentorBody>
    </MentorDetailTag>
  );
}

const TimTableScroll = styled.div`
  overflow-y: scroll;
  height: 70rem;

`

const MenuBox2 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  border-bottom: 1px solid ${theme.colors.blackThree};
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
  border-bottom: 1px solid ${props => props.theme.colors.blackThree};
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
  border-bottom: 1px solid ${props => props.theme.colors.blackThree};
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