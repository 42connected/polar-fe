import styled, { css } from 'styled-components';
import theme from '../../styles/theme';
import img from '../../assets/image/logo/phone.png';
import { keywordsPro } from './mainpage-getkeyword';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../context/axios-interface';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesUp,
  faBezierCurve,
  faBrain,
  faBuildingUser,
  faCode,
  faFlagCheckered,
  faGraduationCap,
  faLaptopCode,
  faLightbulb,
  faMemory,
  faSitemap,
} from '@fortawesome/free-solid-svg-icons';
import { debounce } from '@mui/material';

const MainContainer = styled.div`
  background-color: ${theme.colors.polarBackground};
  left: 0;
  ${theme.fontSize.sizeExtraSmall};
  ${theme.font.sebangGothic};
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 200px 150px 200px;
  grid-template-columns: repeat(2, minmax(400px, auto));
  grid-template-areas:
    'img title'
    'img icon1'
    'img icon2';
  text-align: center;
  justify-content: center;
  grid-column-gap: 20rem;
  transition: all 0.25s ease-in-out;
  border-radius: 10px;
`;
const MainContainer2 = styled.div`
  background-color: ${theme.colors.polarBackground};
  left: 0;
  ${theme.fontSize.sizeExtraSmall};
  ${theme.font.sebangGothic};
  height: 120vh;
  width: 100%;
  display: grid;
  grid-template-rows: 200px 150px 150px 300px;
  grid-template-areas:
    'title'
    'icon1'
    'icon2'
    'img';
  text-align: center;
  justify-content: center;
  transition: all 0.25s ease-in-out;
  border-radius: 10px;
`;

const MainImageStyle = styled.div`
  border-radius: 20%;
  grid-auto-flow: dense;
  margin-top: 15rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-area: img;
`;

const TitleStyle = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid black;
  font-size: 3.5rem;
  margin-top: 15rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-area: title;
`;

const ClickContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-template-rows: 100px;
  text-align: center;
  justify-content: center;
  align-items: center;
  transition: all 0.25s ease-in-out;
  margin-top: 5rem;
  grid-row-gap: 0;
`;

const IconImageStyle = styled.div<{ colStart: number; rowStart: number }>`
  display: flex;
  grid-column-start: colStart;
  grid-row-start: rowStart;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 2.3rem;
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

const Mainpage = () => {
  const [isLoading, setLoading] = useState(false);
  const [keyWords, setKeywords] = useState<keywordsPro[] | null>(null);
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
              <img src={img} style={imagestyle1} className="App-logo" />
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
                    <div>
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
                    <div>
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
            <MainImageStyle>
              <img src={img} style={imagestyle1} className="App-logo" />
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
                    <div>
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
                    <div>
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
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </div>
  );
};

export default Mainpage;
