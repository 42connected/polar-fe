import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReportStore from '../../states/repoort/ReportStore';
import { observer } from 'mobx-react-lite';
import AuthStore from '../../states/auth/AuthStore';
import { MentorCard } from '../../components/mentoring-log-card';
import axios from 'axios';
import { axiosInstance } from '../../context/axios-interface';
import { Header } from './header';
import { Modal } from '../../components/modal';

export const REPORT_STATE = {
  EDIT_POSSIBLE: '작성중',
  EDIT_IMPOSSIBLE: '작성완료',
};

const NoneDrag = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  align-items: center;
  background-color: white;
`;

const MentorCards = styled.div`
  display: grid;
  width: 90%;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(350px, 380px));
  gap: 20px;
  margin: 20px 0;
`;

const CadetMentornig = observer(() => {
  const { reportId } = useParams<string>();
  //   let mentorCards;
  axiosInstance
    .get('/cadets/mentorings')
    .then(res => {
      console.log('asdf', res);
      // mentorCards = logs.map(log => (
      // 	<MentorCard
      // 	  mentorName={log.mentorName}
      // 	  createdAt={log.createdAt}
      // 	  meetingAt={log.meetingAt}
      // 	  topic={log.topic}
      // 	></MentorCard>
      //   ));
    })
    .catch(err => console.log(err));
  const logs = [
    {
      mentorName: '김나경',
      createdAt: new Date('2022-08-24T05:56:07.188Z'),
      meetingAt: [
        new Date('2022-08-18T10:00:00.000Z'),
        new Date('2022-08-18T11:30:00.000Z'),
      ],
      status: '취소',
      requestTime: [
        [
          new Date('2022-08-18T10:00:00.000Z'),
          new Date('2022-08-18T11:30:00.000Z'),
        ],
        null,
        null,
      ],
      content: '내용임',
      topic:
        '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
    },
    {
      mentorName: '김나경',
      createdAt: new Date('2022-08-24T05:56:07.188Z'),
      meetingAt: [
        new Date('2022-08-18T10:00:00.000Z'),
        new Date('2022-08-18T11:30:00.000Z'),
      ],
      status: '취소',
      requestTime: [
        [
          new Date('2022-08-18T10:00:00.000Z'),
          new Date('2022-08-18T11:30:00.000Z'),
        ],
        null,
        null,
      ],
      content: '내용임',
      topic:
        '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
    },
    {
      mentorName: '김나경',
      createdAt: new Date('2022-08-24T05:56:07.188Z'),
      meetingAt: [
        new Date('2022-08-18T10:00:00.000Z'),
        new Date('2022-08-18T11:30:00.000Z'),
      ],
      status: '취소',
      requestTime: [
        [
          new Date('2022-08-18T10:00:00.000Z'),
          new Date('2022-08-18T11:30:00.000Z'),
        ],
        null,
        null,
      ],
      content: '내용임',
      topic:
        '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
    },
  ];

  const mentorCards = logs.map(log => (
    <MentorCard
      mentorName={log.mentorName}
      createdAt={log.createdAt}
      meetingAt={log.meetingAt}
      topic={log.topic}
      status={log.status}
      requestTime={log.requestTime}
      content={log.content}
    />
  ));

  // if (mentorCards.length % 2 === 1) {
  //   mentorCards.push(<div style={{ width: 430, margin: 30, height: 0 }}></div>);
  // }

  //   let [logs] = useState(null);
  useEffect(() => {
    axios({
      url: 'https://polar42-be-dev.herokuapp.com/api/v1/cadets/mentorings',
      method: 'get',
    }).then(res => console.log(res));
  }, []);

  return (
    <>
      <NoneDrag>
        <Header url="https://asdfasdfasdfwqlefhkjashdf,mabskjhfgakljsfbgkjadhbfaehrfkhearblidgb;k"></Header>
        <MentorCards>{mentorCards}</MentorCards>
        <Modal visible={true} child={<div>hi</div>}></Modal>
      </NoneDrag>
    </>
  );
});

export default CadetMentornig;
