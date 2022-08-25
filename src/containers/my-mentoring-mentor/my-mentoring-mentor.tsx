import styled from '@emotion/styled';
import { Container } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import defaultTheme from '../../styles/theme';
import { TableTitle } from './table-title';
import { TableColumnLine, TableRow } from './table-row';
import { PageButton } from './page-button';
import MentorLogStore, {
  LOGS_PER_PAGE,
} from '../../states/my-mentoring-mentor/MentorLogStore';
import { useEffect, useState } from 'react';
import AuthStore from '../../states/auth/AuthStore';
import { Email } from './email';
import MentorStore from '../../states/my-mentoring-mentor/MentorStore';

const NoneDrag = styled.div`
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Top = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
`;

const InfoTitle = styled.div`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeMedium};
  font-weight: bold;
  margin: 10px 0px;
`;

const Bottom = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: left;
`;

const MyMentoringMentor = observer(() => {
  const { intraId } = useParams<string>();
  const [empty, setEmpty] = useState<string[]>([]);

  useEffect(() => {
    async function initialize() {
      if (!intraId) {
        return;
      }
      await AuthStore.Login();
      await MentorStore.getMentor(intraId, AuthStore.jwt);
      await MentorLogStore.Initializer(intraId, AuthStore.jwt);

      // FIXME: 수정
      for (let i = 0; i < LOGS_PER_PAGE - MentorLogStore.total; ++i) {
        setEmpty(o => [...o, 'a']);
      }
    }
    initialize();
  }, []);

  return (
    <NoneDrag>
      <Top>
        <Container component="main" maxWidth="lg">
          <InfoContainer>
            <InfoTitle>{MentorStore?.mentor?.intraId}의 멘토링</InfoTitle>
            <Email
              email={MentorStore?.mentor?.email}
              setEmail={MentorStore?.setEmail}
            />
          </InfoContainer>
        </Container>
      </Top>
      <Bottom>
        <Container component="main" maxWidth="lg">
          <TableTitle />
          {MentorLogStore.logs.map((e, i) => (
            <TableRow
              key={i}
              user={e.cadet.name}
              mentoringId={e.id}
              topic={e.topic}
              mentoringState={e.status}
              report={e.report}
              createdAt={e.createdAt}
              meetingAt={e.meetingAt}
            />
          ))}
          {empty.map((e, i) => (
            <TableColumnLine key={i} />
          ))}
        </Container>
      </Bottom>
      <PageButton />
    </NoneDrag>
  );
});

export default MyMentoringMentor;
