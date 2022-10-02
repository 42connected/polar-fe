import { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import {
  axiosWithNoData,
  AXIOS_METHOD_WITH_NO_DATA,
} from '../../context/axios-interface';
import theme from '../../styles/theme';
import { reportsPro } from './getreportdata';
import ino1 from '../../assets/image/logo/ino1.png';
import ino2 from '../../assets/image/logo/ino2.png';
import {
  NoneValue3,
  SubTitle9,
  PlaceBox,
  SubTitle2,
  NoneValue2,
  Title,
  ReportContainer,
  SubTitle6,
  Titleplus,
  NoneValue1,
  SubTitle1,
  SubTitle3,
  SubTitle4,
  SubTitle5,
  SubTitle7,
  SubTitle8,
  MiniTitle1,
  MiniTitle2,
  DateBox,
  TimeBox,
  MentorNameBox,
  CadetNameBox,
  ContentTitle1,
  ContentTitle2,
  ContentTitle3,
  ContentBody1,
  ContentBody2,
  ContentBody3,
  ContentBody4,
  ContentBody5,
  ContentBody6,
  Number1,
  Number2,
  IsCommonBox,
  NotCommonBox,
  ImgLogo1,
  ImgLogo2,
  ImgLogo3,
  ImgLogo4,
  MentoSign,
  SignText,
} from './reportStyled';
import AuthStore, { USER_ROLES } from '../../states/auth/AuthStore';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { debounce } from '@mui/material';
import LoadingStore from '../../states/loading/LoadingStore';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '../../states/error/ErrorStore';
import { NewDateKr } from '../../states/date-kr';

const ReportpageStyle = styled.body<{
  height: number;
}>`
  background-color: ${theme.colors.backgoundWhite};
  margin-left: 40rem;
  width: 100%;
  height: ${props => props.height * 240 + 'vh'};
  margin-left: 0;
`;

const ReportpageStyle2 = styled.div<{
  height: number;
}>`
  background-color: ${theme.colors.backgoundWhite};
  margin-left: 40rem;
  width: 100%;
  height: ${props => props.height * 280 + 'vh'};
  margin-left: 0;
`;

const imagestyle1 = {
  width: '30rem',
  height: 'auto',
};
const imagestyle2 = {
  height: '3.6rem',
  width: '11rem',
};
const imagestyle3 = {
  height: '4.5rem',
  width: '8rem',
};
const signimagestyle = {
  width: '3.8rem',
  height: '3.8rem',
};

const ImgBody = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
`;
const ButtonBody = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PrintButton = styled.button`
  cursor: pointer;
  z-index: 1;
  font-size: 1.8rem;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.backgoundWhite};
  border-radius: 10px;
  width: 15rem;
  height: 4rem;
  box-shadow: ${theme.shadow.buttonShadow};
`;

const SimpleComponent = (props: {
  printRef: any;
  reportDatas: reportsPro[];
}) => {
  const { printRef, reportDatas } = props;
  return (
    <div ref={printRef}>
      {reportDatas?.map((reportdata: reportsPro, index: number, origin) => {
        const meetingAt = [
          NewDateKr(reportdata?.mentoringLogs.meetingAt[0]),
          NewDateKr(reportdata?.mentoringLogs.meetingAt[1]),
        ];
        return (
          <div key={index}>
            <ReportContainer index={index}>
              <Title>
                <Titleplus>42 SEOUL</Titleplus> 멘토링 보고서(멘토용)
              </Title>
              <NoneValue1></NoneValue1>
              <SubTitle1>구분</SubTitle1>
              <MiniTitle1>공통과정</MiniTitle1>
              <MiniTitle2>심화과정</MiniTitle2>
              <NoneValue2></NoneValue2>
              <SubTitle2>날짜</SubTitle2>
              <DateBox>
                {reportdata?.mentoringLogs
                  ? meetingAt[0].toLocaleDateString('ko-KR')
                  : ''}
              </DateBox>
              <SubTitle8>시간</SubTitle8>
              <TimeBox>
                {reportdata?.mentoringLogs
                  ? meetingAt[0].getHours().toString().padStart(2, '0') +
                    ':' +
                    meetingAt[0].getMinutes().toString().padStart(2, '0') +
                    '~' +
                    meetingAt[1].getHours().toString().padStart(2, '0') +
                    ':' +
                    meetingAt[1].getMinutes().toString().padStart(2, '0')
                  : ''}
              </TimeBox>
              <SubTitle3>장소</SubTitle3>
              <PlaceBox>{reportdata?.place}</PlaceBox>
              <SubTitle4>멘토이름</SubTitle4>
              <MentorNameBox>
                {reportdata?.mentors.name}
                <SignText>(인)</SignText>
                <MentoSign>
                  <img src={reportdata?.signatureUrl} style={signimagestyle} />
                </MentoSign>
              </MentorNameBox>
              <SubTitle9>멘티이름</SubTitle9>
              <CadetNameBox>
                {reportdata?.cadets.name +
                  '(' +
                  reportdata?.cadets.intraId +
                  ')' +
                  ', ' +
                  reportdata?.extraCadets}
              </CadetNameBox>
              <NoneValue3></NoneValue3>
              <SubTitle5>멘토링개요</SubTitle5>
              <ContentTitle1>주제</ContentTitle1>
              <ContentBody1>{reportdata?.topic}</ContentBody1>
              <ContentTitle2>내용</ContentTitle2>
              <ContentBody2>{reportdata?.content}</ContentBody2>
              <ContentTitle3>
                교육생
                <br />
                에게
                <br /> 남기는 말
              </ContentTitle3>
              <ContentBody3>{reportdata?.feedbackMessage}</ContentBody3>
              <Number1> - 1 -</Number1>
              <SubTitle6>증빙사진</SubTitle6>
              <ContentBody4>
                {reportdata?.imageUrl[0] ? (
                  <img src={reportdata?.imageUrl[0]} style={imagestyle1} />
                ) : (
                  ''
                )}
                {reportdata?.imageUrl[1] ? (
                  <img src={reportdata?.imageUrl[1]} style={imagestyle1} />
                ) : (
                  ''
                )}
                {reportdata?.imageUrl[2] ? (
                  <img src={reportdata?.imageUrl[2]} style={imagestyle1} />
                ) : (
                  ''
                )}
              </ContentBody4>
              <SubTitle7>
                멘토링 <br /> 피드백
              </SubTitle7>
              <ContentBody5>
                멘토링에 대한 느낌을 점수로 적어주세요. (최고 5점, 최저 1점)
                <br />
                1. 교육생이 궁금한 것을 잘 정리해왔나요? (
                {reportdata?.feedback1})
                <br />
                2. 교육생과 함께 한 시간이 만족스러웠나요? (
                {reportdata?.feedback2})
                <br />
                3. 교육생이 전달한 내용을 잘 이해했나요? (
                {reportdata?.feedback3})
                <br />
              </ContentBody5>
              <ContentBody6>(재)이노베이션 아카데미 귀하</ContentBody6>
              <Number2> - 2 -</Number2>
              {reportdata?.cadets.isCommon ? (
                <IsCommonBox> o </IsCommonBox>
              ) : (
                <IsCommonBox> </IsCommonBox>
              )}
              {reportdata?.cadets.isCommon ? (
                <NotCommonBox> </NotCommonBox>
              ) : (
                <NotCommonBox> o </NotCommonBox>
              )}
              <ImgLogo1>
                <img src={ino1} style={imagestyle2} className="report-image" />
              </ImgLogo1>
              <ImgLogo2>
                <img src={ino2} style={imagestyle3} className="report-image" />
              </ImgLogo2>
              <ImgLogo3>
                <img src={ino1} style={imagestyle2} className="report-image" />
              </ImgLogo3>
              <ImgLogo4>
                <img src={ino2} style={imagestyle3} className="report-image" />
              </ImgLogo4>
            </ReportContainer>
          </div>
        );
      })}
    </div>
  );
};

const ReportDetail = () => {
  const [reportQuery] = useSearchParams();
  const navigate = useNavigate();
  const componentRef = useRef(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [reportDatas, setreportDatas] = useState<reportsPro[]>([]);
  const reportIds = reportQuery.getAll('reportId');
  const isAutoPrint = reportQuery.get('autoPrint') === 'true' ? true : false;
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = debounce(() => {
    if (window.innerWidth < 1667) setIsMobile(true);
    else setIsMobile(false);
  }, 10);

  const getReports = async (reportId: string) => {
    try {
      const datas = reportDatas;
      const response = await axiosWithNoData(
        AXIOS_METHOD_WITH_NO_DATA.GET,
        `/reports/${reportId}`,
        {
          headers: {
            Authorization: `bearer ${AuthStore.getAccessToken()}`,
          },
        },
      );
      datas.push(response.data);
      setreportDatas([...datas]);
    } catch (e) {
      console.log(e);
    }
  };

  async function getAllReportData() {
    LoadingStore.on();
    await Promise.all(reportIds.map(id => getReports(id)));
    if (isAutoPrint) {
      buttonRef?.current?.click();
    }
    LoadingStore.off();
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    getAllReportData();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!AuthStore.getAccessToken()) {
    ErrorStore.on('로그인이 필요한 서비스입니다.', ERROR_DEFAULT_VALUE.TITLE);
    AuthStore.Login();
    return <></>;
  } else if (AuthStore.getUserRole() !== USER_ROLES.BOCAL) {
    ErrorStore.on('접근 권한이 없습니다.', ERROR_DEFAULT_VALUE.TITLE);
    return <Navigate to="/" />;
  } else
    return (
      <div>
        {isMobile ? (
          <ReportpageStyle2 height={reportDatas.length}>
            <ImgBody>
              <SimpleComponent
                printRef={componentRef}
                reportDatas={reportDatas}
              />
            </ImgBody>
            <ReactToPrint
              content={() => componentRef.current}
              trigger={() => (
                <ButtonBody>
                  <PrintButton ref={buttonRef}>출력</PrintButton>
                </ButtonBody>
              )}
              onAfterPrint={() => {
                if (isAutoPrint) {
                  navigate('/data-room');
                }
              }}
            />
          </ReportpageStyle2>
        ) : (
          <ReportpageStyle height={reportDatas.length}>
            <ImgBody>
              <SimpleComponent
                printRef={componentRef}
                reportDatas={reportDatas}
              />
            </ImgBody>
            <ReactToPrint
              content={() => componentRef.current}
              trigger={() => (
                <ButtonBody>
                  <PrintButton ref={buttonRef}>출력</PrintButton>
                </ButtonBody>
              )}
              onAfterPrint={() => {
                if (isAutoPrint) {
                  navigate('/data-room');
                }
              }}
            />
          </ReportpageStyle>
        )}
      </div>
    );
};

export default ReportDetail;
