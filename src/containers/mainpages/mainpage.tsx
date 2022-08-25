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

export const MainContainer = styled.div`
  background-color: ${theme.colors.polarBackground};
  left: 0;
  ${theme.fontSize.sizeExtraSmall};
  ${theme.font.sebangGothic};
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 200px 200px 200px;
  grid-template-columns: repeat(2, minmax(400px, auto));
  text-align: center;
  justify-content: center;
  grid-column-gap: 20rem;
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
  grid-column-start: 1;
  grid-row-start: 1;
  grid-row-end: 4;
`;

const TitleStyle = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid black;
  font-size: 3.5rem;
  margin-top: 14rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-column-start: 2;
  grid-row-start: 1;
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
    return;
  }, []);

  return (
    <div className="main">
      {isLoading ? (
        <div className="loader">
          <span className="loader__text">Loading...</span>
        </div>
      ) : (
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
              const image = [faCode, faSitemap, faLaptopCode, faGraduationCap];
              if (index >= 4)
                return (
                  <div>
                    <Link to={link}>
                      <IconImageStyle colStart={index - 4} rowStart={1}>
                        <IconButton>
                          <FontAwesomeIcon icon={image[index - 4]} size="3x" />
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
      )}
      ;
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </div>
  );
};

export default Mainpage;
