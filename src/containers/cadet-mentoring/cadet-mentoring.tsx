import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { MentorCard } from '../../components/mentoring-log-card';
import {
  axiosWithNoData,
  AXIOS_METHOD_WITH_NO_DATA,
} from '../../context/axios-interface';
import { Header } from './header';
import LoadingStore from '../../states/loading/LoadingStore';
import { MentoringLog } from '../../interfaces/cadet-mentoring/mentoring-log.interface';
import AuthStore from '../../states/auth/AuthStore';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '../../states/error/ErrorStore';

const NoneDrag = styled.div`
  display: flex;
  width: 100%;
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
  gap: 30px;
  margin: 20px 0;
`;

const CadetMentornig = observer(() => {
  const [logs, setLogs] = useState<MentoringLog[]>([]);
  const [url, setUrl] = useState<string>('');

  const getKeywords = async () => {
    LoadingStore.on();
    try {
      const save = await axiosWithNoData(
        AXIOS_METHOD_WITH_NO_DATA.GET,
        '/cadets/mentorings',
        {
          headers: {
            Authorization: `Bearer ${AuthStore.getAccessToken()}`,
          },
        },
      );
      setLogs(save.data.mentorings);
      setUrl(save.data.resumeUrl);
      LoadingStore.off();
    } catch (err) {
      ErrorStore.on(err, ERROR_DEFAULT_VALUE.TITLE);
      return err;
    }
  };

  useEffect(() => {
    getKeywords();
  }, []);

  return (
    <>
      <NoneDrag>
        <Header url={url} setUrl={setUrl}></Header>
        <MentorCards>
          {logs.map(log => {
            return <MentorCard log={log}></MentorCard>;
          })}
        </MentorCards>
      </NoneDrag>
    </>
  );
});

export default CadetMentornig;
