import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { MentorCard } from '../../components/mentoring-log-card';
import { axiosInstance } from '../../context/axios-interface';
import { Header } from './header';
import LoadingStore from '../../states/loading/LoadingStore';
import { MentoringLog } from '../../interfaces/cadet-mentoring/mentoring-log.interface';

const NoneDrag = styled.div`
  display: flex;
  width: 100%;
  /* height: min-content; */
  flex-direction: column;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  align-items: center;
`;

const MentorCards = styled.div`
  display: grid;
  width: 90%;
  height: 100%;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(350px, 380px));
  gap: 20px;
  margin: 20px 0;
`;

const CadetMentornig = observer(() => {
  const [logs, setLogs] = useState<MentoringLog[]>([]);
  const [url, setUrl] = useState<string>('');

  const getKeywords = async () => {
    LoadingStore.on();
    try {
      const save = await axiosInstance.get('/cadets/mentorings', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NjU5NzNiMy1hMjBmLTQ4NDAtOGY2Yy02NTAxOTAwNTgyNTgiLCJ1c2VybmFtZSI6Im5ha2tpbSIsInJvbGUiOiJjYWRldCIsImlhdCI6MTY2MTM5OTU0OCwiZXhwIjoxNjYxNDg1OTQ4fQ.ZDyEoejOtcUFvTf6VY7F20FWOw-Ld5UQZq0lkXreJlE`,
        },
      });
      setLogs(save.data.mentorings);
      setUrl(save.data.resumeUrl);
      LoadingStore.off();
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  useEffect(() => {
    getKeywords();
  }, []);

  return (
    <>
      {/* <Modal isWait={true} /> */}
      <NoneDrag>
        <Header url={url} setUrl={setUrl}></Header>
        <MentorCards>
          {/* {logs.map(log => {
            return <MentorCard log={log}></MentorCard>;
          })} */}
        </MentorCards>
      </NoneDrag>
    </>
  );
});

export default CadetMentornig;
