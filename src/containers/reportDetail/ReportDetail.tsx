import { MutableRefObject, useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import { axiosInstance } from '../../context/axios-interface';
import theme from '../../styles/theme';
import { reportsPro } from './Getreportdata';
import ino1 from '../../assets/logo/ino1.png';
import ino2 from '../../assets/logo/ino2.png';
import { url } from 'inspector';
import { autocompleteClasses } from '@mui/material';

const ReportpageContainers = styled.body`
  background-color: ${theme.colors.backgoundWhite};
`;

const ReportpageStyle = styled.body`
  margin-left: 30rem;
  width: 60vw;
  height: 130vw;
  background-color: ${theme.colors.backgoundWhite};
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
  padding-top: 13rem;
`;

const ButtonBody = styled.section`
  display: flex;
  justify-content: right;
  align-items: center;
`;

const PrintButton = styled.button`
  cursor: pointer;
  z-index: 1;
  margin-right: 3rem;
  font-size: 1.8rem;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.backgoundWhite};
  border-radius: 10px;
  width: 15rem;
  height: 4rem;
`;

/*grid*/
const ReportContainer = styled.span`
  position: absolute;
  left: 0;
  ${theme.fontSize.sizeExtraSmall};
  ${theme.font.nanumGothic};
  display: grid;
  height: 230%;
  width: 100%;
  grid-template-rows: 10.7rem 5.8rem 0.6rem 4rem 0.6rem 3.9rem 4.1rem 5.3rem 0.6rem 8rem 24rem 26rem 11rem 10.7rem 62.5rem 3rem 2.4rem 2.4rem 2.4rem 4.3rem 9.5rem;
  grid-template-columns: 7rem 8.5rem 5.5rem 17rem 5.7rem 7rem 18rem;
  grid-template-areas:
    'side img1 . . . img2 side'
    'side title title title title title side'
    '. . . . . . .'
    'side subtitle1 minititle1 isCommon minititle2 notCommon side'
    '. . . . . . .'
    'side subtitle2 . date . time side'
    'side subtitle3 . place . . side '
    'side subtitle4 . m_name . c_name side'
    '. . . . . . .'
    'side subtitle5 . . subject . side'
    'side subtitle5 . . content . side'
    'side subtitle5 . . comment . side'
    '. . . num . . .'
    'side img1 . . . img2 side'
    'side subtitle6 . img3 . . side'
    'side subtitle7 . . feedbacktitle . side'
    'side subtitle7 . . feedback1 . side'
    'side subtitle7 . . feedback2 . side'
    'side subtitle7 . . feedback3 . side'
    'side foot foot foot foot foot side'
    '. . . num . . .';
  text-align: center;
  justify-content: center;
  grid-gap: 0.4rem;
  transition: all 0.25s ease-in-out;
  border-radius: 10px;
  margin-left: -2rem;
`;

const ImgLogo1 = styled.section`
  ${theme.fontSize.sizeMedium};
  position: absolute;
  grid-area: img1;
  grid-column-start: 2;
  grid-column-end: 3;
  margin-left: -0.2rem;
  padding-top: 5rem;
`;

const ImgLogo2 = styled.section`
  ${theme.fontSize.sizeMedium};
  position: absolute;
  grid-area: img2;
  grid-column-start: 6;
  grid-column-end: 6;
  padding-left: 11rem;
  padding-top: 4.7rem;
`;

const ImgLogo3 = styled.section`
  ${theme.fontSize.sizeMedium};
  position: absolute;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 14;
  margin-left: -0.2rem;
  padding-top: 6.8rem;
`;

const ImgLogo4 = styled.section`
  ${theme.fontSize.sizeMedium};
  position: absolute;
  grid-column-start: 6;
  grid-column-end: 6;
  grid-row-start: 14;
  padding-left: 10.5rem;
  padding-top: 6.4rem;
`;

const Title = styled.section`
  ${theme.fontSize.sizeExtraMedium};
  background-color: ${theme.colors.backgoundWhite};
  align-content: center;
  justify-content: center;
  box-sizing: border-box;
  position: absolute;
  grid-area: img2;
  grid-column-start: 2;
  grid-column-end: 7;
  grid-row-start: 2;
  border: 1px solid black;
  border-bottom: 0px;
  height: 6.15rem;
  width: 56.8rem;
  text-align: center;
  padding-top: 2rem;
`;

const NoneValue1 = styled.section`
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  grid-column-start: 2;
  grid-column-end: 7;
  grid-row-start: 3;
  border: 1px solid black;
  height: 1rem;
  width: 56.8rem;
  text-align: center;
`;
const NoneValue2 = styled.section`
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  grid-column-start: 2;
  grid-column-end: 7;
  grid-row-start: 5;
  border: 1px solid black;
  height: 1rem;
  width: 56.8rem;
  text-align: center;
  border: 1px solid black;
`;

const NoneValue3 = styled.section`
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  grid-column-start: 2;
  grid-column-end: 7;
  grid-row-start: 9;
  border: 1px solid black;
  height: 1.5rem;
  width: 56.8rem;
  text-align: center;
`;

const SubTitle1 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  border-top: 0px;
  grid-column-start: 2;
  grid-row-start: 4;
  height: 4.5rem;
  width: 9rem;
  text-align: center;
  padding-top: 1.3rem;
`;

const SubTitle2 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  border-top: 0px;
  grid-column-start: 2;
  grid-row-start: 6;
  height: 4.4rem;
  width: 9.1rem;
  text-align: center;
  padding-top: 1.3rem;
`;

const SubTitle3 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border-left: 1px solid black;
  border-top: 1px solid black;
  grid-column-start: 2;
  grid-row-start: 7;
  height: 4.5rem;
  width: 9.1rem;
  text-align: center;
  padding-top: 1.3rem;
`;

const SubTitle4 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  border-bottom: 0px;
  grid-column-start: 2;
  grid-row-start: 8;
  height: 6rem;
  width: 9.1rem;
  text-align: center;
  padding-top: 2rem;
`;

const SubTitle5 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 2;
  grid-row-start: 10;
  height: 58.8rem;
  width: 9.1rem;
  text-align: center;
  padding-top: 30rem;
`;

const SubTitle6 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 2;
  grid-row-start: 15;
  height: 62.7rem;
  width: 9.1rem;
  text-align: center;
  padding-top: 30rem;
`;

const SubTitle7 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 2;
  grid-row-start: 16;
  height: 16.8rem;
  width: 9rem;
  text-align: center;
  padding-top: 6.5rem;
  margin-top: -0.3rem;
`;

const MiniTitle1 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.graySix};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  border-top: 0px;
  grid-column-start: 3;
  grid-row-start: 4;
  height: 4.5rem;
  width: 6rem;
  text-align: center;
  padding-top: 1.3rem;
`;

const MiniTitle2 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.graySix};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  border-top: 0px;
  grid-column-start: 5;
  grid-row-start: 4;
  height: 4.5rem;
  width: 6.2rem;
  text-align: center;
  padding-top: 1.3rem;
`;

const SubTitle8 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border-left: 1px solid black;
  border-right: 1px solid black;
  grid-column-start: 5;
  grid-row-start: 6;
  height: 4.4rem;
  width: 6.2rem;
  text-align: center;
  padding-top: 1.3rem;
`;

const SubTitle9 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 5;
  grid-row-start: 8;
  height: 6rem;
  width: 6.2rem;
  text-align: center;
  padding-top: 2rem;
`;

const IsCommonBox = styled.section`
  ${theme.fontSize.sizeMedium};
  position: absolute;
  align-items: stretch;
  grid-area: isCommon;
  height: 4.3rem;
  width: 17.3rem;
  grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 4;
`;

const DateBox = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  position: absolute;
  align-items: stretch;
  height: 4rem;
  width: 23rem;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 6;
  text-align: left;
  padding-top: 1.3rem;
  padding-left: 1rem;
`;

const MentoNameBox = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  position: absolute;
  align-items: stretch;
  height: 6rem;
  width: 23rem;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 8;
  border: 1px solid black;
  border-left: 0;
  text-align: left;
  padding-top: 2rem;
  padding-left: 1rem;
`;

const KadetNameBox = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  position: absolute;
  align-items: stretch;
  height: 6rem;
  width: 17.3rem;
  grid-column-start: 6;
  grid-row-start: 8;
  border: 1px solid black;
  text-align: left;
  padding-top: 2rem;
  padding-left: 1rem;
`;

const TimeBox = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  position: absolute;
  align-items: stretch;
  height: 4.3rem;
  width: 17.4rem;
  grid-column-start: 6;
  grid-row-start: 6;
  border-right: 1px solid black;
  text-align: left;
  padding-top: 1.3rem;
  padding-left: 1rem;
`;

const PlaceBox = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  position: absolute;
  height: 4.3rem;
  width: 46.6rem;
  grid-column-start: 3;
  grid-column-end: 7;
  grid-row-start: 7;
  margin-left: 0.1rem;
  border: 1px solid black;
  border-bottom: 0px;
  text-align: left;
  padding-top: 1.2rem;
  padding-left: 1rem;
`;

const NotCommonBox = styled.section`
  ${theme.fontSize.sizeMedium};
  position: absolute;
  align-items: stretch;
  text-align: center;
  grid-area: notCommon;
  height: 4.3rem;
  width: 8.4rem;
  grid-column-start: 6;
  grid-column-end: 6;
  grid-row-start: 4;
  grid-row-end: 4;
  justify-content: center;
  border-right: 1px solid black;
  padding-right: 10rem;
  padding-top: 1rem;
`;

const ContentTitle1 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 3;
  grid-row-start: 10;
  height: 8.3rem;
  width: 5.5rem;
  text-align: center;
  padding-top: 3rem;
`;

const ContentTitle2 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  border-left: 1px solid black;
  grid-column-start: 3;
  grid-row-start: 11;
  height: 24.5rem;
  width: 5.5rem;
  text-align: center;
  padding-top: 10rem;
`;

const ContentTitle3 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 3;
  grid-row-start: 12;
  height: 26rem;
  width: 5.5rem;
  text-align: center;
  padding-top: 10rem;
`;

const ContentBody1 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.graySix};
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 4;
  grid-row-start: 10;
  height: 8.3rem;
  width: 42.5rem;
  text-align: left;
  padding-top: 1.3rem;
  margin-left: -0.5rem;
  padding-left: 1rem;
`;

const ContentBody2 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.graySix};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  border-top: 0px;
  grid-column-start: 4;
  grid-row-start: 11;
  height: 24.5rem;
  width: 42.5rem;
  text-align: left;
  padding-top: 1.3rem;
  margin-left: -0.5rem;
  padding-left: 1rem;
`;

const ContentBody3 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.graySix};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 4;
  grid-row-start: 12;
  height: 26rem;
  width: 42.5rem;
  text-align: left;
  padding-top: 1.3rem;
  margin-left: -0.5rem;
  padding-left: 1rem;
`;

const ContentBody4 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 15;
  height: 62.7rem;
  width: 47.7rem;
  text-align: left;
  padding-top: 1.3rem;
  padding-left: 1rem;
`;

const ContentBody5 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 3;
  grid-column-end: 6;
  grid-row-start: 16;
  grid-row-end: 18;
  height: 16.8rem;
  width: 47.7rem;
  text-align: center;
  padding-top: 1.3rem;
  margin-top: -0.3rem;
  padding-left: 1rem;
  line-height: 3.5rem;
`;

const ContentBody6 = styled.section`
  ${theme.fontSize.sizeExtraMedium};
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 2;
  grid-column-end: 6;
  grid-row-start: 21;
  width: 56.6rem;
  height: 9.6rem;
  text-align: center;
  padding-top: 3rem;
  margin-top: -0.3rem;
  padding-left: 1rem;
`;

const Number1 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  grid-column-start: 2;
  grid-column-end: 6;
  grid-row-start: 13;
  width: 56.6rem;
  height: 9.6rem;
  text-align: center;
  padding-top: 7rem;
`;

const Number2 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  grid-column-start: 2;
  grid-column-end: 6;
  grid-row-start: 22;
  width: 56.6rem;
  height: 9.6rem;
  text-align: center;
  padding-top: 7rem;
`;

const Titleplus = styled.span`
  font-weight: bold;
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
          {(reportdata?.mentoringLogs.meetingAt[0] + '').substring(11, 16)} ~{' '}
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

const ReportDetail = () => {
  const componentRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [reportdata, setreportdata] = useState<reportsPro | null>(null);
  const getReports = async () => {
    try {
      setLoading(true);
      const save = await axiosInstance.get(
        'reports/3072b2af-4326-45fc-94f1-99636dab90ed',
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im0tZW5nZW5nIiwicm9sZSI6ImJvY2FsIiwiaWF0IjoxNjYxMjQ2ODIyLCJleHAiOjE2NjEzMzMyMjJ9.Y_g5CWyb6HF_JYfGt8UpRfv06aLam5jFkmuFQgXk5zs',
          },
        },
      );
      const tmp: reportsPro = save.data;
      console.log(tmp);
      setreportdata(tmp);
      if (reportdata) console.log('babo');
      else console.log('hioo');
      setLoading(false);
    } catch (e) {
      console.log(e);
      return e;
    }
  };
  useEffect(() => {
    getReports();

    return;
  }, []);

  return (
    <div className="reportpage">
      <ReportpageContainers>
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
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
        )}
      </ReportpageContainers>
    </div>
  );
};

export default ReportDetail;
