import {
  ClickContainer,
  ClickContainer2,
  IconImageStyle,
  IconImageStyle2,
  ImageGrid1,
  keywordsPro,
  KeywordStyle,
  KeywordStyle2,
  MainBlueBody,
  MainContainer,
  MainContainer2,
  MainImageStyle,
  MainImageStyle2,
  MoImageGrid1,
  TitleStyle,
  TitleStyle2,
} from './mainPageStyled';
import { useEffect, useRef, useState } from 'react';
import {
  axiosInstance,
  axiosWithNoData,
  AXIOS_METHOD_WITH_NO_DATA,
} from '../../context/axios-interface';
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
import { debounce, IconButton } from '@mui/material';
import ImageSlider from './mainPageSilder';

const MainPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [keyWords, setKeywords] = useState<keywordsPro[] | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const handleResize = debounce(() => {
    if (window.innerWidth < 1370) setIsMobile(true);
    else setIsMobile(false);
  }, 10);
  const getKeywords = async () => {
    try {
      setLoading(true);
      const save = await axiosWithNoData(
        AXIOS_METHOD_WITH_NO_DATA.GET,
        '/categories',
      );
      //const save = await axiosInstance.get('/categories');
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
    window.innerWidth <= 1370 ? setIsMobile(true) : setIsMobile(false);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const imagestyle = {
    width: '30rem',
    height: '30rem',
  };

  return (
    <>
      {!isMobile ? ( //pc
        <>
          <MainContainer>
            <MainImageStyle>
              <ImageGrid1>
                <ImageSlider w={58} h={38}></ImageSlider>
              </ImageGrid1>
            </MainImageStyle>
            <TitleStyle>
              나에게 꼭 맞는
              <MainBlueBody> 멘토</MainBlueBody> 선택하기
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
                            <FontAwesomeIcon
                              icon={image[index]}
                              size="3x"
                              color="black"
                            />
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
                              color="black"
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
        </>
      ) : (
        // mobile
        <>
          <MainContainer2>
            <MainImageStyle2>
              <MoImageGrid1>
                <ImageSlider w={40} h={32}></ImageSlider>
              </MoImageGrid1>
            </MainImageStyle2>
            <TitleStyle2>
              나에게 꼭 맞는 <MainBlueBody> 멘토 </MainBlueBody> 선택하기
            </TitleStyle2>
            <ClickContainer2>
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
                        <IconImageStyle2 colStart={index} rowStart={1}>
                          <IconButton>
                            <FontAwesomeIcon
                              icon={image[index]}
                              size="2x"
                              color="black"
                            />
                          </IconButton>
                        </IconImageStyle2>
                      </Link>
                      <KeywordStyle2 colStart={index} rowStart={2}>
                        {words.name}
                      </KeywordStyle2>
                    </div>
                  );
              })}
            </ClickContainer2>
            <ClickContainer2>
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
                        <IconImageStyle2 colStart={index - 4} rowStart={1}>
                          <IconButton>
                            <FontAwesomeIcon
                              icon={image[index - 4]}
                              size="2x"
                              color="black"
                            />
                          </IconButton>
                        </IconImageStyle2>
                      </Link>
                      <KeywordStyle2 colStart={index - 4} rowStart={2}>
                        {words.name}
                      </KeywordStyle2>
                    </div>
                  );
              })}
            </ClickContainer2>
          </MainContainer2>
        </>
      )}
    </>
  );
};

export default MainPage;
