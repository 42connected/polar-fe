import { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import {
  axiosInstance,
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
  MentoNameBox,
  KadetNameBox,
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
} from './reportStyled';
import AuthStore from '../../states/auth/AuthStore';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert/Alert';
import { width } from '@mui/system';
import { debounce } from '@mui/material';

const ReportpageStyle = styled.div`
  background-color: ${theme.colors.backgoundWhite};
  margin-left: 40rem;
  width: 100%;
  height: 130vw;
  margin-left: 0;
`;

const ReportpageStyle2 = styled.div`
  background-color: ${theme.colors.backgoundWhite};
  margin-left: 40rem;
  width: 100%;
  height: 260vw;
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
  reportdata: reportsPro | null;
}) => {
  const { printRef, reportdata } = props;

  return (
    <div ref={printRef}>
      <ReportContainer>
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
          {(reportdata?.mentoringLogs.meetingAt[0] + '').substring(0, 10)}
        </DateBox>
        <SubTitle8>시간</SubTitle8>
        <TimeBox>
          {(reportdata?.mentoringLogs.meetingAt[0] + '').substring(11, 16)}
          {(reportdata?.mentoringLogs.meetingAt[1] + '').substring(11, 16)}
        </TimeBox>
        <SubTitle3>장소</SubTitle3>
        <PlaceBox>{reportdata?.place}</PlaceBox>
        <SubTitle4>멘토이름</SubTitle4>
        <MentoNameBox>{reportdata?.mentors.name}</MentoNameBox>
        <SubTitle9>멘티이름</SubTitle9>
        <KadetNameBox>{reportdata?.cadets.name}</KadetNameBox>
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
            <img
              src={reportdata?.imageUrl[0]}
              style={imagestyle1}
              className="report-image"
            />
          ) : (
            ''
          )}
          {reportdata?.imageUrl[1] ? (
            <img
              src={reportdata?.imageUrl[1]}
              style={imagestyle1}
              className="report-image"
            />
          ) : (
            ''
          )}
          {reportdata?.imageUrl[2] ? (
            <img
              src={reportdata?.imageUrl[2]}
              style={imagestyle1}
              className="report-image"
            />
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
          1. 교육생이 궁금한 것을 잘 정리해왔나요? ({reportdata?.feedback1})
          <br />
          2. 교육생과 함께 한 시간이 만족스러웠나요? ({reportdata?.feedback2})
          <br />
          3. 교육생이 전달한 내용을 잘 이해했나요? ({reportdata?.feedback3})
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
};

export const AlertDetail = (flag: boolean) => {
  return flag
    ? (alert('유효하지 않은 접근입니다.'), null)
    : (alert('로그인이 필요합니다.'), null);
};

const ReportDetail = () => {
  const componentRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [reportdata, setreportdata] = useState<reportsPro | null>(null);
  const { reportId } = useParams<string>();
  const [token, setToken] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    if (window.innerWidth < 1667) setIsMobile(true);
    else setIsMobile(false);
  }, 10);

  const getReports = async () => {
    try {
      setLoading(true);
      const save = await axiosWithNoData(
        AXIOS_METHOD_WITH_NO_DATA.GET,
        `/reports/${reportId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
      //const save = await axiosInstance.get(`/reports/${reportId}`, {
      //  headers: {
      //    Authorization: `bearer ${token}`,
      //  },
      //});
      const tmp: reportsPro = save.data;
      setreportdata(tmp);
      setLoading(false);
    } catch (e) {
      console.log(e);
      return e;
    }
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    setToken(AuthStore.getAccessToken());
    setRole(AuthStore.getUserRole());
    getReports();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="reportpage">
      {token ? (
        role == 'mentor' ? (
          isMobile ? (
            <ReportpageStyle2>
              <ImgBody>
                <SimpleComponent
                  printRef={componentRef}
                  reportdata={reportdata}
                />
              </ImgBody>
              <ReactToPrint
                content={() => componentRef.current}
                trigger={() => (
                  <ButtonBody>
                    <PrintButton>출력</PrintButton>
                  </ButtonBody>
                )}
              />
            </ReportpageStyle2>
          ) : (
            <ReportpageStyle>
              <ImgBody>
                <SimpleComponent
                  printRef={componentRef}
                  reportdata={reportdata}
                />
              </ImgBody>
              <ReactToPrint
                content={() => componentRef.current}
                trigger={() => (
                  <ButtonBody>
                    <PrintButton>출력</PrintButton>
                  </ButtonBody>
                )}
              />
            </ReportpageStyle>
          )
        ) : (
          <div>{AlertDetail(true)}</div>
        )
      ) : (
        <div>{AlertDetail(false)}</div>
      )}
    </div>
  );
};

export default ReportDetail;
