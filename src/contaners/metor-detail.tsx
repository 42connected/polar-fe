import { Icon } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import Button1 from "../components/button1";
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
    introduction: "introduction",
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
  

  const [mentor, setMentor] = useState<MentorDetailProps>(mockMentor);
  const [mentoringLog, setMentoringLog] = useState<MentoringLogProps[]>(mockMentoringLog);
  const [isActiveMentorDetail, setIsActiveMentorDetail] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentsProps[]>(mockComments);
  const AddHashtag = mentor.tags?.map((tag) => {
    return '#' + tag + ' ';
  });

  const mentoringLogList = mentoringLog.map((log) => {
    return (<>
      <div>{log.topic}</div>
      <div>{log.state}</div>
      <div>{log.meetingAt.getTime()}</div>
    </>)
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
    <div>
        <h1>Mentor Detail</h1>
      <MentorHeader>
         <MentorInfo>
          <MentorImage src={mentor.profileImage} />
          <MentorInfoContent>
            <MentorName>
              <div>{mentor.name} 멘토</div>
              <div>{mentor.intraId}</div>
            </MentorName>
            <Button1 backgroundColor={theme.colors.polarBackground} color={theme.colors.polarSimpleMain} width="12rem" height="2rem">멘토링 {mentor.isActive ? "가능" : "불가능"}</Button1>
          </MentorInfoContent>
        </MentorInfo>
        <Button1  width="21rem" height="6rem" background-color={theme.colors.polarSimpleMain} color={theme.colors.backgoundWhite}>멘토링 신청하기</Button1>
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
          <MentorBody1Right1>
            <MenuBox>멘토 소개</MenuBox>
            <MentorIntroduction>{mentor.introduction}</MentorIntroduction>
            <MentorTags>{AddHashtag}</MentorTags>
          </MentorBody1Right1>
          <MentorBody1Right2>
            <MenuBox1>
              {/* <MenuBoxHead> */}
                <div>주제</div>
                <div>상태</div>
              <div>일시</div>
              {/* </MenuBoxHead> */}
            </MenuBox1>
          </MentorBody1Right2>
        </MentorBody1>
        <MentorBody2>
          <MenuBox>가능시간</MenuBox>
        </MentorBody2>
        <MentorBody4>
          <MentorBody4Toggle onClick={()=>{setIsActiveMentorDetail((data) => !data)}}>
            <Icon></Icon>
            <div>멘토 상세 소개 보기</div>
          </MentorBody4Toggle>
          {isActiveMentorDetail ?
            <div>
              <MenuBox>멘토정보</MenuBox>
              <div>
                {mentor.introduction}
              </div>
            </div> : null}
        </MentorBody4>
        <MentorCommets>
          <MenuBox>댓글</MenuBox>
          <MentorCommetsContent>
            </MentorCommetsContent>
        </MentorCommets>
      </MentorBody>
    </div>
  );
}

const MentorCommetsContent = styled.div`
`

const MentorCommets = styled.div`
`

const MentorBody4Toggle = styled.div`
`

const MentorBody4 = styled.div`

`

const MenuBoxHead = styled.div`
`

const MentorBody2 = styled.div`
  margin-top: 10%;
`
const MentorBody1Right2 = styled.div`
  grid-area: right2;
  display: flex;
  `

const MentorTags = styled.div`
  display: flex;
  place-content: center;
  align-items: center;
`

const MentorIntroduction = styled.div`
  margin: 1.3rem;
  ${theme.fontSize.sizeMedium};
  color: ${theme.colors.blackThree};
`

const MentorBody1Right1 = styled.div`
  grid-area: right1;
  display: flex;
  flex-direction: column;
`

const MentorBody1 = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-template-areas:
    "left left left right1 right1"
    "left left left right1 right1"
    "left left left right1 right1"
    "left left left right2 right2"
    "left left left right2 right2";
  grid-gap: 1rem;
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
    font-size: 2.3rem;
  }
  div:last-child{
    margin-left: 0.5rem;
    font-size: 1.5rem;
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
  height: 3rem;
  box-sizing: border-box;
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
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

export default MentorDetail;