import styled from 'styled-components';
import theme from '../../styles/theme';
import img from '../../assets/image/logo/phone.png';
import icon1 from '../../assets/image/keywordIcon/employment.png';
import icon2 from '../../assets/image/keywordIcon/startups.png';
import icon3 from '../../assets/image/keywordIcon/cooperation.png';
import icon4 from '../../assets/image/keywordIcon/plan.png';
import icon5 from '../../assets/image/keywordIcon/develop.png';
import icon6 from '../../assets/image/keywordIcon/skill.png';
import icon7 from '../../assets/image/keywordIcon/cs.png';
import icon8 from '../../assets/image/keywordIcon/field.png';
import { keywordsPro } from './mainpage-getkeyword';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../context/axios-interface';

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
  margin-right: 40rem;
  margin-left: 7rem;
  mix-blend-mode: multiply;
  padding-top: 6.5rem;
  background-color: transparent;
`;
const KeywordStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
  const urlReturn = (props: { i: number }) => {
    const { i } = props;
    {
      keyWords?.map((words: { name: string }, index: number) => {
        if (index === i)
          document.location.replace(
            'http://localhost:3000/mentor-lists/' + words.name,
          );
      });
    }
  };
  let i: number;
  const icon1Click = () => {
    i = 0;
    urlReturn({ i });
  };
  const icon2Click = () => {
    i = 1;
    urlReturn({ i });
  };
  const icon3Click = () => {
    i = 2;
    urlReturn({ i });
  };
  const icon4Click = () => {
    i = 3;
    urlReturn({ i });
  };
  const icon5Click = () => {
    i = 4;
    urlReturn({ i });
  };
  const icon6Click = () => {
    i = 5;
    urlReturn({ i });
  };
  const icon7Click = () => {
    i = 6;
    urlReturn({ i });
  };
  const icon8Click = () => {
    i = 7;
    urlReturn({ i });
  };

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
            <IconImageStyle1>
              <IconButton onClick={icon1Click}>
                <img src={icon1} style={imagestyle2} />
              </IconButton>
              <IconButton onClick={icon2Click}>
                <img src={icon2} style={imagestyle2} />
              </IconButton>
              <IconButton onClick={icon3Click}>
                <img src={icon3} style={imagestyle2} />
              </IconButton>
              <IconButton onClick={icon4Click}>
                <img src={icon4} style={imagestyle2} />
              </IconButton>
            </IconImageStyle1>
            <KeywordStyle>
              {keyWords?.map((words: { name: string }, index: number) => {
                if (index < 4)
                  return (
                    <KeywordBody key={`1${index}`}>{words.name}</KeywordBody>
                  );
              })}
            </KeywordStyle>
            <IconImageStyle1>
              <IconButton onClick={icon5Click}>
                <img src={icon5} style={imagestyle2} />
              </IconButton>
              <IconButton onClick={icon6Click}>
                <img src={icon6} style={imagestyle2} />
              </IconButton>
              <IconButton onClick={icon7Click}>
                <img src={icon7} style={imagestyle2} />
              </IconButton>
              <IconButton onClick={icon8Click}>
                <img src={icon8} style={imagestyle2} />
              </IconButton>
            </IconImageStyle1>
            <KeywordStyle>
              {keyWords?.map((words: { name: string }, index: number) => {
                if (index >= 4) {
                  return (
                    <KeywordBody key={`1${index}`}>{words.name}</KeywordBody>
                  );
                }
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
