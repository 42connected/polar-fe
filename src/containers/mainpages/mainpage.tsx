import styled from 'styled-components';
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
  faFlagCheckered,
  faLaptopCode,
  faLightbulb,
  faSitemap,
} from '@fortawesome/free-solid-svg-icons';

export const MainContainer = styled.div`
  background-color: ${theme.colors.polarBackground};
  left: 0;
  ${theme.fontSize.sizeExtraSmall};
  ${theme.font.nanumGothic};
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 200px 200px 200px;
  grid-template-columns: repeat(2, minmax(200px, auto));
  grid-template-areas:
    'img title'
    'img icon1'
    'img icon2';
  text-align: center;
  justify-content: center;
  grid-column-gap: 25rem;
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
  grid-column-start: 1;
  grid-row-start: 1;
  grid-row-end: 4;
`;

const TitleStyle = styled.div`
  text-decoration-line: underline;
  font-size: 3.5rem;
  margin-top: 14rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-column-start: 2;
  grid-row-start: 1;
  grid-area: title;
`;

const IconImageStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  mix-blend-mode: multiply;
  padding-top: 6.5rem;
  background-color: transparent;
`;
const KeywordStyle1 = styled.div`
  grid-area: icon1;
  text-align: center;
  grid-column-start: 2;
  grid-row-start: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  ${theme.font.sebangGothic};
  font-size: 2.3rem;
  background-color: transparent;
  color: ${theme.fontColor.titleColor};
`;
const KeywordStyle2 = styled.div`
  grid-area: icon2;
  text-align: center;
  grid-column-start: 2;
  grid-row-start: 3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  ${theme.font.sebangGothic};
  font-size: 2.3rem;
  background-color: transparent;
  color: ${theme.fontColor.titleColor};
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
          <KeywordStyle1>
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
                      <IconImageStyle>
                        <IconButton>
                          <FontAwesomeIcon icon={image[index]} size="4x" />
                        </IconButton>
                      </IconImageStyle>
                    </Link>
                    {words.name}
                  </div>
                );
            })}
          </KeywordStyle1>
          <KeywordStyle2>
            {keyWords?.map((words: { name: string }, index: number) => {
              const link = '/mentor-lists/' + words.name;
              const image = [faLaptopCode, faSitemap, faBrain, faBezierCurve];
              if (index >= 4)
                return (
                  <div>
                    <Link to={link}>
                      <IconImageStyle>
                        <IconButton>
                          <FontAwesomeIcon icon={image[index - 4]} size="4x" />
                        </IconButton>
                      </IconImageStyle>
                    </Link>
                    {words.name}
                  </div>
                );
            })}
          </KeywordStyle2>
        </MainContainer>
      )}
      ;
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </div>
  );
};

export default Mainpage;
