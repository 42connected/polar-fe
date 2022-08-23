import { MutableRefObject, useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import report from '../../assets/reports/report3.png';
import { axiosInstance } from '../../context/axios-interface';
import theme from '../../styles/theme';
import { reportsPro } from './Getreportdata';
import logo from '../../assets/logo/logo.png';

const ReportpageContainers = styled.body`
  background-color: ${theme.colors.graySix};
`;

const ReportpageStyle = styled.body`
  margin-left: 30rem;
  width: 60vw;
  height: 180vw;
  background-color: ${theme.colors.graySix};
`;

const imagestyle1 = {
  height: '222rem',
  width: '76rem',
};

const imagestyle2 = {
  height: '5rem',
  width: '5rem',
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
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const PrintButton = styled.button`
  cursor: pointer;
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
  z-index: 1;
  position: absolute;
  left: 0;
  ${theme.fontSize.sizeExtraSmall};
  ${theme.font.nanumGothic};
  display: grid;
  height: 230%;
  width: 100%;
  grid-template-rows: 4.4fr 2.3fr 0.3fr 1.7fr 0.3fr 1.5fr 1.5fr 2fr 0.3fr 3.3fr 10fr 10fr 4.4fr 5fr 25fr 1.8fr 1.4fr 1.2fr 1.8fr 3.2fr 4fr;
  grid-template-columns: 7.6fr 1.2fr 0.9fr 2.65fr 0.85fr 2.7fr 8.15fr;
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
  grid-gap: 0.4rem;
  transition: all 0.25s ease-in-out;
  border: 1px solid black;
  margin-top: -222rem;
  border-radius: 10px;
`;

const ImgLogo1 = styled.section`
  ${theme.fontSize.sizeMedium};
  z-index: 1;
  position: absolute;
  grid-area: img1;
  grid-column-start: 2;
  grid-column-end: 3;
  border: 1px solid black;
`;

const ImgLogo2 = styled.section`
  ${theme.fontSize.sizeMedium};
  z-index: 1;
  position: absolute;
  grid-area: img2;
  grid-column-start: 6;
  grid-column-end: 6;
  border: 1px solid black;
`;

const Title = styled.section`
  ${theme.fontSize.sizeExtraLarge};
  background-color: ${theme.colors.backgoundWhite};
  align-content: center;
  justify-content: center;
  box-sizing: border-box;
  z-index: 1;
  position: absolute;
  grid-area: img2;
  grid-column-start: 2;
  grid-column-end: 7;
  grid-row-start: 2;
  border: 1px solid black;
  height: 6.15rem;
  width: 56.5rem;
  margin-left: -0.7rem;
  margin-top: -0.06rem;
  text-align: center;
`;

const NoneValue = styled.section`
  background-color: ${theme.colors.backgoundWhite};
  z-index: 1;
  position: absolute;
  box-sizing: border-box;
  grid-column-start: 2;
  grid-column-end: 7;
  grid-row-start: 3;
  border: 1px solid black;
  height: 1rem;
  width: 56.5rem;
  margin-left: -0.7rem;
  text-align: center;
`;

const SubTitle1 = styled.section`
  ${theme.fontSize.sizeExtraMedium};
  background-color: ${theme.colors.backgoundWhite};
  z-index: 1;
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 2;
  grid-row-start: 4;
  height: 4.5rem;
  width: 8.3rem;
  margin-left: -0.7rem;
  margin-top: -0.2rem;
  text-align: center;
`;

const IsCommonBox = styled.section`
  ${theme.fontSize.sizeMedium};
  z-index: 1;
  position: absolute;
  align-items: stretch;
  grid-area: isCommon;
  grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 4;
  grid-row-end: 4;
  border: 1px solid black;
`;

const NotCommonBox = styled.section`
  ${theme.fontSize.sizeMedium};
  z-index: 1;
  position: absolute;
  align-items: stretch;
  text-align: center;
  grid-area: notCommon;
  grid-column-start: 6;
  grid-column-end: 6;
  grid-row-start: 4;
  grid-row-end: 4;
  justify-content: center;
  border: 1px solid black;
  padding-right: 10rem;
`;

const SimpleComponent = (props: {
  printRef: any;
  reportdata: reportsPro | null;
}) => {
  const { printRef, reportdata } = props;

  return (
    <div ref={printRef}>
      <img src={report} style={imagestyle1} className="report-image" />
      <ReportContainer>
        <Title>42 SEOUL 멘토링 보고서(멘토용)</Title>
        <NoneValue></NoneValue>
        <SubTitle1>구분</SubTitle1>
        <NoneValue></NoneValue>
        {!reportdata?.cadets.isCommon ? (
          <IsCommonBox> v </IsCommonBox>
        ) : (
          <NotCommonBox> v </NotCommonBox>
        )}
        <ImgLogo1>
          <img src={logo} style={imagestyle2} className="report-image" />
        </ImgLogo1>
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
