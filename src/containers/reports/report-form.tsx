import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import { Title } from './title';
import { ReportElement } from './elements/report-element';
import { ReportRowFeedback } from './report-row-feedback';
import { ReportRowWrite } from './report-row-write';
import ReportRowSignature from './report-row-signature';
import { ReportFixableElement } from './elements/report-fixable-element';
import { useEffect, useState } from 'react';
import defaultTheme from '../../styles/theme';
import { useParams } from 'react-router-dom';
import ReportStore from '../../states/repoort/ReportStore';
import { observer } from 'mobx-react-lite';

const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px;
  padding: 0px 10px 10px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const ReportInfoContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  padding: 10px 0px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
`;

const DefualtButton = styled.button`
  ${defaultTheme.fontSize.sizeExtraSmall};
  ${defaultTheme.font.nanumGothic};
  border-radius: 30px;
  border: none;
  text-align: center;
  text-decoration: none;
  background-color: #313c7a;
  color: #ffffff;
  padding: 10px 15px;
  margin: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

const ReportForm = observer(() => {
  const { reportId } = useParams<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function Initialize() {
      if (reportId) {
        await ReportStore.ReportInitializer(reportId);
        setIsLoading(false);
      } else {
        console.log('레포트ID가 존재하지 않습니다');
      }
    }
    Initialize();
  }, []);

  const START_TIME = 0;
  const END_TIME = 1;

  const makeTimePair = (time: number) => {
    if (time >= 0 && time < 10) {
      const ret = time.toString();
      return ret.padStart(2, '0');
    }
    return time.toString();
  };

  const getDayToString = (): string => {
    const date: string[] = ['월', '화', '수', '목', '금', '토', '일'];
    const startTime: Date = new Date(
      ReportStore.report.mentoringLogs.meetingAt[START_TIME],
    );
    console.log('sss', startTime);

    return `${startTime.getFullYear()}.${startTime.getMonth()}.${startTime.getDate()} (${
      date[startTime.getDay()]
    })`;
  };

  const getTimeToString = (): string => {
    const startTime: Date = new Date(
      ReportStore.report.mentoringLogs.meetingAt[START_TIME],
    );
    const endTime: Date = new Date(
      ReportStore.report.mentoringLogs.meetingAt[END_TIME],
    );

    return `${startTime.getHours()}:${makeTimePair(
      startTime.getMinutes(),
    )} ~ ${endTime.getHours()}:${makeTimePair(endTime.getMinutes())}`;
  };

  const saveTemporary = () => {
    if (reportId) {
      ReportStore.saveTemporary(reportId);
    } else {
      console.log('레포트ID가 존재하지 않습니다');
    }
  };

  const saveDone = () => {
    if (reportId) {
      ReportStore.saveDone(reportId);
    } else {
      console.log('레포트ID가 존재하지 않습니다');
    }
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <Container component="main" maxWidth="lg">
          <Title title={'보고서 작성'} />
          <ReportContainer>
            <ReportInfoContainer>
              <ReportElement
                topic={'구분'}
                content={
                  ReportStore.report.cadets.isCommon ? '공통과정' : '심화과정'
                }
              />
              <ReportElement topic={'날짜'} content={getDayToString()} />
              <ReportElement topic={'시간'} content={getTimeToString()} />
              <ReportFixableElement
                topic={'장소'}
                content={ReportStore.report.place}
              />
              <ReportElement
                topic={'멘토'}
                content={ReportStore.report.mentors.name}
              />
              <ReportElement
                topic={'카뎃'}
                content={ReportStore.report.cadets.name}
              />
            </ReportInfoContainer>
            <ReportRowSignature />
            <ReportRowWrite />
            <ReportRowFeedback />
          </ReportContainer>
          {ReportStore.report.status === '작성완료' ? (
            <></>
          ) : (
            <ButtonContainer>
              <DefualtButton
                onClick={() => {
                  saveTemporary();
                }}
              >
                임시 저장
              </DefualtButton>
              <DefualtButton
                onClick={() => {
                  saveDone();
                }}
              >
                제출
              </DefualtButton>
            </ButtonContainer>
          )}
        </Container>
      )}
    </>
  );
});

export default ReportForm;
