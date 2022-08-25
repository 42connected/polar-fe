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

const MainpageStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.polarBackground};
`;
const MainImageStyle = styled.div`
  flex: 1;
  padding-left: 15rem;
  padding-top: 20rem;
`;
const TitleStyle = styled.div`
  text-decoration-line: underline;
`;
const IconImageStyle1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  mix-blend-mode: multiply;
  padding-top: 6.5rem;
  background-color: transparent;
`;
const KeywordStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: center;
  margin-right: 35rem;
  margin-left: 3.5rem;
  ${theme.font.sebangGothic};
  font-size: 2.3rem;
  background-color: transparent;
  color: ${theme.fontColor.titleColor};
`;
const imagestyle1 = {
  height: '60rem',
  width: '30rem',
};
const imagestyle2 = {
  height: '8rem',
  width: '8rem',
};
const MainBody = styled.div`
  padding-left: 15rem;
  ${theme.font.sebangGothic};
  flex: 2;
  padding-top: 30rem;
  font-size: 6rem;
`;
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
const KeywordBody = styled.span``;

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
        <MainpageStyle>
          <MainImageStyle>
            <img src={img} style={imagestyle1} className="App-logo" />
          </MainImageStyle>
          <MainBody>
            <TitleStyle>
              나에게 꼭 맞는 <MainBlueBody> 멘토 </MainBlueBody> 선택하기
            </TitleStyle>
            <KeywordStyle>
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
                        <IconImageStyle1>
                          <IconButton>
                            <FontAwesomeIcon icon={image[index]} size="5x" />
                          </IconButton>
                        </IconImageStyle1>
                      </Link>
                      <KeywordBody key={`2${index}`}>{words.name}</KeywordBody>
                    </div>
                  );
              })}
            </KeywordStyle>
            <KeywordStyle>
              {keyWords?.map((words: { name: string }, index: number) => {
                const link = '/mentor-lists/' + words.name;
                const image = [faLaptopCode, faSitemap, faBrain, faBezierCurve];
                if (index >= 4)
                  return (
                    <div>
                      <Link to={link}>
                        <IconImageStyle1>
                          <IconButton>
                            <FontAwesomeIcon
                              icon={image[index - 4]}
                              size="5x"
                            />
                          </IconButton>
                        </IconImageStyle1>
                      </Link>
                      <KeywordBody key={`2${index}`}>{words.name}</KeywordBody>
                    </div>
                  );
              })}
            </KeywordStyle>
          </MainBody>
        </MainpageStyle>
      )}
      ;
    </div>
  );
};

export default Mainpage;
