import styled, { css } from 'styled-components';
import theme from '../../styles/theme';
import {
  ClickContainer,
  ClickContainer2,
  ClickedSwapButton,
  IconImageStyle,
  IconImageStyle2,
  ImageBox,
  ImageGrid1,
  ImageGrid2,
  ImageStyle,
  ImageStyle2,
  keywordsPro,
  KeywordStyle,
  KeywordStyle2,
  MainBlueBody,
  MainContainer,
  MainContainer2,
  MainImageStyle,
  MainImageStyle2,
  MoImageGrid1,
  MoImageStyle,
  MoImageStyle2,
  SwapButton,
  TextStyle,
  TextUnder,
  TitleStyle,
  TitleStyle2,
} from './mainPageStyled';
import { useEffect, useRef, useState } from 'react';
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
import { debounce, IconButton } from '@mui/material';

export const CadetText = (
  <div>
    <TextUnder>이용안내 - 카뎃</TextUnder>
    <TextStyle>
      <br />
      1. 멘토의 <MainBlueBody>멘토링 상태 확인</MainBlueBody>하고 멘토링 신청
      버튼 클릭
      <br />
      2. 만남 일정과 정보를 작성하고 제출
      <br />
      3. <MainBlueBody>마이페이지</MainBlueBody>에서 만남 상태 확인 가능
      <br />
      4. 멘토링이 확정, 취소되면 카뎃에게
      <MainBlueBody> 알림 메일 발송</MainBlueBody>
      <br />
      5. 장소협의 후 만남 일정 시간에 멘토링 진행
    </TextStyle>
  </div>
);

export const MentorText = (
  <div>
    <TextUnder>이용안내 - 멘토</TextUnder>
    <TextStyle>
      <br />
      1. 카뎃의 멘토링 신청 시 <MainBlueBody>알림 메일 발송</MainBlueBody>
      <br />
      2. <MainBlueBody>마이페이지</MainBlueBody>에서 만남 상태 결정 가능 <br />
      3. 멘토링이 확정, 취소되면 카뎃에게 알림 메일 발송 <br />
      4. 장소협의 후 만남 일정 시간에 멘토링 진행 <br />
      5. <MainBlueBody>멘토링 진행 후</MainBlueBody> 보고서 작성 가능
    </TextStyle>
  </div>
);

const MainPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [keyWords, setKeywords] = useState<keywordsPro[] | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [text, setText] = useState(CadetText);
  const [isleft, setIsLeft] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [count, setCount] = useState(0);
  const slideRef = useRef(null);
  const TOTAL_SLIDES = 1;

  const textSwap1 = () => {
    return setText(CadetText), setIsLeft(true);
  };
  const textSwap2 = () => {
    return setText(MentorText), setIsLeft(false);
  };
  const handleResize = debounce(() => {
    if (window.innerWidth < 1070) setIsMobile(true);
    else setIsMobile(false);
  }, 10);
  const getKeywords = async () => {
    try {
      setLoading(true);
      const save = await axiosInstance.get('/categories');
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
    const timer = setInterval(() => {
      setCount(prev => (prev === TOTAL_SLIDES ? 0 : prev + 1));
      setIsLeft(!isleft);
    }, 5000);

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [count]);

  const imagestyle = {
    width: '30rem',
    height: '30rem',
  };

  return (
    <div className="main">
      {!isMobile ? ( //pc
        <div>
          <MainContainer>
            <MainImageStyle>
              <MoImageGrid1>{isleft ? CadetText : MentorText}</MoImageGrid1>
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
        // mobile
        <div>
          <MainContainer2>
            <MainImageStyle2>
              <ImageGrid1>{isleft ? CadetText : MentorText}</ImageGrid1>
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
                            <FontAwesomeIcon icon={image[index]} size="3x" />
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
                              size="3x"
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
        </div>
      )}
      ;
    </div>
  );
};

export default MainPage;
