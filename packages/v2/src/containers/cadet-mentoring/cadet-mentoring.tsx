import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { MentorCard } from '../../components/mentoring-log-card';
import {
  AXIOS_METHOD_WITH_NO_DATA,
  axiosWithNoData,
} from '../../context/axios-interface';
import { Header } from './header';
import LoadingStore from '../../states/loading/LoadingStore';
import { MentoringLog } from '../../interfaces/cadet-mentoring/mentoring-log.interface';
import AuthStore, { USER_ROLES } from '../../states/auth/AuthStore';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '../../states/error/ErrorStore';
import defaultTheme from '../../styles/theme';

const NoneDrag = styled.body`
  display: flex;
  width: 100%;
  flex-direction: column;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  align-items: center;
`;

const NoMentoringText = styled.div`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeMedium};
  margin-top: 2rem;
`;

const MentorCards = styled.div`
  display: grid;
  width: 90%;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(350px, 380px));
  gap: 30px;
  margin: 20px 0;
`;

const CadetMentornig = observer(() => {
  const [logs, setLogs] = useState<MentoringLog[]>([]);
  const [url, setUrl] = useState<string>('');

  const tryGetCadetMentorings = async () => {
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
      console.log(err);
      return err;
    }
  };

  useEffect(() => {
    if (!AuthStore.getAccessToken()) {
      ErrorStore.on('로그인이 필요한 서비스입니다.', ERROR_DEFAULT_VALUE.TITLE);
      return;
    } else if (AuthStore.getUserRole() !== USER_ROLES.CADET) {
      ErrorStore.on('접근 권한이 없습니다.', ERROR_DEFAULT_VALUE.TITLE);
      return;
    }
    tryGetCadetMentorings();
  }, []);

  return (
    <NoneDrag>
      <Header url={url} setUrl={setUrl}></Header>
      {logs?.length ? (
        <MentorCards>
          {logs.map((log, i) => {
            return <MentorCard log={log} key={i}></MentorCard>;
          })}
        </MentorCards>
      ) : (
        <NoMentoringText>현재 진행중인 멘토링이 없습니다.</NoMentoringText>
      )}
    </NoneDrag>
  );
});

export default CadetMentornig;
