import styled, { css } from 'styled-components';
import theme from '../../styles/theme';
//import img from '../../assets/image/logo/phone.png';
import { keywordsPro } from './mainPageGetkeyword';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../context/axios-interface';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesUp,
  faBuildingUser,
  faCode,
  faFlagCheckered,
  faGraduationCap,
  faLaptopCode,
  faLightbulb,
  faSitemap,
} from '@fortawesome/free-solid-svg-icons';
import { debounce } from '@mui/material';
import img from '../../assets/image/logo/desc.png';

const MainContainer = styled.div`
  background-color: ${theme.colors.polarBackground};
  left: 0;
  ${theme.fontSize.sizeExtraSmall};
  ${theme.font.sebangGothic};
  height: 74vh;
  width: 100%;
  display: grid;
  grid-template-rows: 200px 150px 200px;
  grid-template-columns: repeat(2, minmax(400px, auto));
  transition: all 0.25s ease-in-out;
  grid-template-areas:
    'img title'
    'img icon1'
    'img icon2';
  text-align: center;
  justify-content: center;
  grid-column-gap: 18rem;
  border-radius: 10px;
`;

const MainContainer2 = styled.div`
  background-color: ${theme.colors.polarBackground};
  left: 0;
  ${theme.fontSize.sizeSmall};
  ${theme.font.sebangGothic};
  height: 130vh;
  width: 100%;
  display: grid;
  grid-template-rows: 500px 200px 150px 150px;
  grid-template-areas:
    'img'
    'title'
    'icon1'
    'icon2';
  text-align: center;
  justify-content: center;
  transition: all 0.25s ease-in-out;
  border-radius: 10px;
`;

const MainImageStyle = styled.div`
  box-sizing: border-box;
  background-color: ${theme.colors.backgoundWhite};
  border-radius: 10%;
  height: 40rem;
  width: 60rem;
  grid-auto-flow: dense;
  margin-top: 15rem;
  align-items: center;
  justify-content: center;
  padding-top: 3rem;
  text-align: center;
  grid-area: img;
  display: grid;
  grid-template-rows: 300px 100px;
  transition: all 0.25s ease-in-out;
`;

const MainImageStyle2 = styled.div`
  box-sizing: border-box;
  background-color: ${theme.colors.backgoundWhite};
  border-radius: 10%;
  height: 40rem;
  width: 45rem;
  grid-auto-flow: dense;
  margin-top: 10rem;
  padding-top: 10rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-area: img;
  display: grid;
  grid-template-rows: 200px 100px;
  transition: all 0.25s ease-in-out;
`;

const ImageGrid1 = styled.div`
  line-height: 4rem;
  grid-row-start: 1;
`;

const MoImageGrid1 = styled.div`
  line-height: 4rem;
  grid-row-start: 1;
`;

const ImageGrid2 = styled.div`
  grid-row-start: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

const ImageStyle = styled.span`
  display: flex;
`;

const MoImageStyle = styled.span`
  display: flex;
  font-size: 1rem;
  margin-top: 2rem;
`;

const ImageStyle2 = styled.span`
  margin-left: 1rem;
`;

const MoImageStyle2 = styled.span`
  margin-left: 0.5rem;
`;

const ClickedSwapButton = styled.button`
  border-radius: 10rem;
  background-color: ${theme.colors.polarSimpleMain};
  color: ${theme.colors.polarSimpleMain};
  height: 0.8rem;
  width: 6rem;
  word-spacing: 1rem;
  border: none;
`;

const SwapButton = styled.button`
  box-sizing: border-box;
  border-radius: 100rem;
  height: 0.8rem;
  width: 0.8rem;
  word-spacing: 1rem;
  border: none;
  background-color: ${theme.colors.grayFour};
  color: ${theme.colors.graySix};
`;

const TextUnder = styled.div`
  box-sizing: border-box;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${theme.colors.polarSimpleMain};
  text-underline-offset: 1rem;
  ${theme.fontSize.sizeExtraMedium};
`;

const TextUnder2 = styled.div`
  box-sizing: border-box;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${theme.colors.polarSimpleMain};
  text-underline-offset: 1rem;
  ${theme.fontSize.sizeExtraSmall};
`;

const TitleStyle = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid black;
  font-size: 3.5rem;
  margin-top: 17rem;
  padding-bottom: 5.5rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-area: title;
`;

const TitleStyle2 = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid black;
  font-size: 3.5rem;
  padding-bottom: 5.5rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-area: title;
`;

const ClickContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  transition: all 0.25s ease-in-out;
  grid-template-rows: 100px;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  grid-row-gap: 0;
`;

const IconImageStyle = styled.div<{ colStart: number; rowStart: number }>`
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  grid-column-start: colStart;
  grid-row-start: rowStart;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 2.3rem;
  margin-top: 2rem;
`;
const KeywordStyle = styled.div<{ colStart: number; rowStart: number }>`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  grid-column-start: colStart;
  grid-row-start: rowStart;
  ${theme.font.sebangGothic};
  color: ${theme.fontColor.titleColor};
  font-size: 2.3rem;
`;
const imagestyle1 = {
  height: '40rem',
  width: '60rem',
};

const MainBlueBody = styled.span`
  color: ${theme.fontColor.blueColor};
  font-weight: 700;
`;
const IconButton = styled.button`
  cursor: pointer;
  float: left;
  padding-bottom: 2rem;
  background-color: transparent;
  border: none;
`;

const MainPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [keyWords, setKeywords] = useState<keywordsPro[] | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [text, setText] = useState(
    <div>
      {isMobile ? (
        <TextUnder2>이용안내 - 카뎃</TextUnder2>
      ) : (
        <TextUnder>이용안내 - 카뎃</TextUnder>
      )}
      <br />
      1.멘토의 멘토링 상태 확인하고 멘토링 신청 버튼 클릭
      <br />
      2.만남 일정과 정보를 작성하고 제출
      <br />
      3.마이페이지에서 만남 상태 확인 가능
      <br />
      4.멘토링이 확정, 취소되면 카뎃에게 알림 메일 발송
      <br />
      5.장소협의 후 만남 일정 시간에 멘토링 진행
    </div>,
  );
  const [isleft, setIsLeft] = useState(true);
  const textSwap1 = () => {
    return (
      setText(
        <div>
          <TextUnder>이용안내 - 카뎃</TextUnder>
          <br />
          1.멘토의 멘토링 상태 확인하고 멘토링 신청 버튼 클릭
          <br />
          2.만남 일정과 정보를 작성하고 제출
          <br />
          3.마이페이지에서 만남 상태 확인 가능
          <br />
          4.멘토링이 확정, 취소되면 카뎃에게 알림 메일 발송
          <br />
          5.장소협의 후 만남 일정 시간에 멘토링 진행
        </div>,
      ),
      setIsLeft(true)
    );
  };
  const textSwap2 = () => {
    return (
      setText(
        <div>
          <TextUnder>이용안내 - 멘토</TextUnder>
          <br />
          1. 카뎃의 멘토링 신청 시 알림 메일 발송 <br />
          2. 마이페이지에서 만남 상태 결정 가능 <br />
          3. 멘토링이 확정, 취소되면 카뎃에게 알림 메일 발송 <br />
          4. 장소협의 후 만남 일정 시간에 멘토링 진행 <br />
          5. 멘토링 진행 후 보고서 작성 가능
        </div>,
      ),
      setIsLeft(false)
    );
  };
  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    if (window.innerWidth < 1070) setIsMobile(true);
    else setIsMobile(false);
  }, 10);
  const getKeywords = async () => {
    try {
      setLoading(true);
      const save = await axiosInstance.get('categories');
      const tmp = save.data;
      setKeywords(tmp);
      setLoading(false);
    } catch (e) {
      console.log(e);
      return e;
    }
  };
  useEffect(() => {
    getKeywords();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="main">
      {!isMobile ? (
        <div>
          <MainContainer>
            <MainImageStyle>
              <MoImageGrid1>{text}</MoImageGrid1>
              <ImageGrid2>
                {isleft ? (
                  <div>
                    <ImageStyle>
                      <ClickedSwapButton
                        onClick={textSwap1}
                      ></ClickedSwapButton>
                      <ImageStyle2></ImageStyle2>
                      <SwapButton onClick={textSwap2}></SwapButton>
                    </ImageStyle>
                  </div>
                ) : (
                  <div>
                    <ImageStyle>
                      <SwapButton onClick={textSwap1}></SwapButton>
                      <ImageStyle2></ImageStyle2>
                      <ClickedSwapButton
                        onClick={textSwap2}
                      ></ClickedSwapButton>
                    </ImageStyle>
                  </div>
                )}
              </ImageGrid2>
            </MainImageStyle>
            <TitleStyle>
              나에게 꼭 맞는 <MainBlueBody> 멘토 </MainBlueBody> 선택하기
            </TitleStyle>
            <ClickContainer>
              {keyWords?.map((words: { name: string }, index: number) => {
                const link = '/mentor-lists/' + words.name;
                const image = [
                  faBuildingUser,
                  faFlagCheckered,
                  faAnglesUp,
                  faLightbulb,
                ];
                if (index < 4)
                  return (
                    <div key={index}>
                      <Link to={link}>
                        <IconImageStyle colStart={index} rowStart={1}>
                          <IconButton>
                            <FontAwesomeIcon icon={image[index]} size="3x" />
                          </IconButton>
                        </IconImageStyle>
                      </Link>
                      <KeywordStyle colStart={index} rowStart={2}>
                        {words.name}
                      </KeywordStyle>
                    </div>
                  );
              })}
            </ClickContainer>
            <ClickContainer>
              {keyWords?.map((words: { name: string }, index: number) => {
                const link = '/mentor-lists/' + words.name;
                const image = [
                  faCode,
                  faSitemap,
                  faLaptopCode,
                  faGraduationCap,
                ];
                if (index >= 4)
                  return (
                    <div key={index}>
                      <Link to={link}>
                        <IconImageStyle colStart={index - 4} rowStart={1}>
                          <IconButton>
                            <FontAwesomeIcon
                              icon={image[index - 4]}
                              size="3x"
                            />
                          </IconButton>
                        </IconImageStyle>
                      </Link>
                      <KeywordStyle colStart={index - 4} rowStart={2}>
                        {words.name}
                      </KeywordStyle>
                    </div>
                  );
              })}
            </ClickContainer>
          </MainContainer>
        </div>
      ) : (
        <div>
          <MainContainer2>
            <MainImageStyle2>
              <ImageGrid1>{text}</ImageGrid1>
              <ImageGrid2>
                {isleft ? (
                  <div>
                    <MoImageStyle>
                      <ClickedSwapButton
                        onClick={textSwap1}
                      ></ClickedSwapButton>
                      <MoImageStyle2></MoImageStyle2>
                      <SwapButton onClick={textSwap2}></SwapButton>
                    </MoImageStyle>
                  </div>
                ) : (
                  <div>
                    <MoImageStyle>
                      <SwapButton onClick={textSwap1}></SwapButton>
                      <MoImageStyle2></MoImageStyle2>
                      <ClickedSwapButton
                        onClick={textSwap2}
                      ></ClickedSwapButton>
                    </MoImageStyle>
                  </div>
                )}
              </ImageGrid2>
            </MainImageStyle2>
            <TitleStyle>
              나에게 꼭 맞는 <MainBlueBody> 멘토 </MainBlueBody> 선택하기
            </TitleStyle>
            <ClickContainer>
              {keyWords?.map((words: { name: string }, index: number) => {
                const link = '/mentor-lists/' + words.name;
                const image = [
                  faBuildingUser,
                  faFlagCheckered,
                  faAnglesUp,
                  faLightbulb,
                ];
                if (index < 4)
                  return (
                    <div key={index}>
                      <Link to={link}>
                        <IconImageStyle colStart={index} rowStart={1}>
                          <IconButton>
                            <FontAwesomeIcon icon={image[index]} size="3x" />
                          </IconButton>
                        </IconImageStyle>
                      </Link>
                      <KeywordStyle colStart={index} rowStart={2}>
                        {words.name}
                      </KeywordStyle>
                    </div>
                  );
              })}
            </ClickContainer>
            <ClickContainer>
              {keyWords?.map((words: { name: string }, index: number) => {
                const link = '/mentor-lists/' + words.name;
                const image = [
                  faCode,
                  faSitemap,
                  faLaptopCode,
                  faGraduationCap,
                ];
                if (index >= 4)
                  return (
                    <div key={index}>
                      <Link to={link}>
                        <IconImageStyle colStart={index - 4} rowStart={1}>
                          <IconButton>
                            <FontAwesomeIcon
                              icon={image[index - 4]}
                              size="3x"
                            />
                          </IconButton>
                        </IconImageStyle>
                      </Link>
                      <KeywordStyle colStart={index - 4} rowStart={2}>
                        {words.name}
                      </KeywordStyle>
                    </div>
                  );
              })}
            </ClickContainer>
          </MainContainer2>
        </div>
      )}
      ;
    </div>
  );
};

export default MainPage;
