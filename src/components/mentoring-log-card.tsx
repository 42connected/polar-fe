import styled from '@emotion/styled';
import { useState } from 'react';
import defaultTheme from '../styles/theme';

const Container = styled.div`
  display: flex;
  /* width: 370px; */
  /* width: 100%; */

  flex-direction: column;
  align-items: center;
  padding: 15px 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 10px 0px;
`;

const MentorName = styled.div`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontFrame.titleMedium};
  ${defaultTheme.fontSize.sizeExtraSmall};
  margin-bottom: 5px;
`;

const RequestTime = styled.div`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontFrame.titleLarge};
  ${defaultTheme.fontSize.sizeSmall};
  opacity: 0.5;
  margin-bottom: 5px;
`;

const MeetingAt = styled.div`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontFrame.titleLarge};
  ${defaultTheme.fontSize.sizeSmall};
  color: ${defaultTheme.fontColor.blueColor};
  margin-bottom: 5px;
`;

const Status = styled.span`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontFrame.titleLarge};
  ${defaultTheme.fontSize.sizeSmall};
  color: ${defaultTheme.fontColor.whiteColor};
  display: flex;
  justify-content: center;
`;

const LeftData = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightData = styled.div`
  width: 50px;
  padding: 5px;
  height: min-content;
  background-color: ${defaultTheme.colors.polarBrightMain};
  border-radius: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Topic = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeSmall};
  background-color: ${defaultTheme.colors.graySix};
  border-radius: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 55px;
`;

const getDayOfWeek = (day: number): string => {
  const date: string[] = ['월', '화', '수', '목', '금', '토', '일'];
  return date[day];
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day} (${getDayOfWeek(date.getDay())})`;
};

const getDurationTime = (meetingAt: Date[]): string => {
  return '1시간 00분';
};

const getMeetingAt = (meetingAt: Date[]): string => {
  if (!meetingAt) {
    return '';
  }
  const hour = meetingAt[0].getHours().toString().padStart(2, '0');
  const minute = meetingAt[0].getMinutes().toString().padStart(2, '0');
  return `${formatDate(meetingAt[0])} ${hour}:${minute}  (${getDurationTime(
    meetingAt,
  )})`;
};

const DetailsButton = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontFrame.titleLarge};
  ${defaultTheme.fontSize.sizeSmall};
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
`;

const getColor = (status: string): string => {
  if (status === '대기중') {
    return defaultTheme.colors.polarBrightMain;
  } else if (status === '확정') {
    return defaultTheme.colors.polarSimpleMain;
  } else if (status === '취소') {
    return defaultTheme.colors.Red;
  } else {
    return defaultTheme.colors.grayTwo;
  }
};

export interface CardProps {
  mentorName: string;
  createdAt: Date;
  meetingAt: Date[];
  topic: string;
  status: string;

  requestTime: (Date[] | null)[];
  content: string;
}

export function MentorCard(props: CardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <Container>
      <Header>
        <LeftData>
          <MentorName>{props.mentorName} 멘토님</MentorName>
          <RequestTime>요청 | {formatDate(props.createdAt)}</RequestTime>
          <MeetingAt>만남 | {getMeetingAt(props.meetingAt)}</MeetingAt>
        </LeftData>
        <RightData style={{ backgroundColor: getColor(props.status) }}>
          <Status>{props.status}</Status>
        </RightData>
      </Header>
      <Topic>{props.topic}</Topic>
      <Bottom>
        <div></div>
        <DetailsButton onClick={openModal}>전체보기 &gt;</DetailsButton>
      </Bottom>
    </Container>
  );
}
