import { useEffect, useState } from 'react';
import {
  ClickedSwapButton,
  ImageGrid2,
  ImageStyle,
  ImageStyle2,
  MainBlueBody,
  MoImageGrid1,
  MoImageStyle,
  MoImageStyle2,
  SwapButton,
  TextStyle,
  TextUnder,
} from './mainPageStyled';

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

interface MainImageProps {
  isMobile: boolean;
}

export function MainImage(props: MainImageProps) {
  const [isleft, setIsLeft] = useState(true);
  const [text, setText] = useState(CadetText);
  const [count, setCount] = useState(0);
  const TOTAL_SLIDES = 1;

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => (prev === TOTAL_SLIDES ? 0 : prev + 1));
      setIsLeft(!isleft);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  const textSwap1 = () => {
    return setText(CadetText), setIsLeft(true);
  };
  const textSwap2 = () => {
    return setText(MentorText), setIsLeft(false);
  };

  return (
    <div>
      <MoImageGrid1>{isleft ? CadetText : MentorText}</MoImageGrid1>
      <ImageGrid2>
        {isleft ? (
          !props.isMobile ? (
            <div>
              <ImageStyle>
                <ClickedSwapButton onClick={textSwap1}></ClickedSwapButton>
                <ImageStyle2></ImageStyle2>
                <SwapButton onClick={textSwap2}></SwapButton>
              </ImageStyle>
            </div>
          ) : (
            <div>
              <MoImageStyle>
                <ClickedSwapButton onClick={textSwap1}></ClickedSwapButton>
                <MoImageStyle2></MoImageStyle2>
                <SwapButton onClick={textSwap2}></SwapButton>
              </MoImageStyle>
            </div>
          )
        ) : !props.isMobile ? (
          <div>
            <ImageStyle>
              <SwapButton onClick={textSwap1}></SwapButton>
              <ImageStyle2></ImageStyle2>
              <ClickedSwapButton onClick={textSwap2}></ClickedSwapButton>
            </ImageStyle>
          </div>
        ) : (
          <div>
            <MoImageStyle>
              <SwapButton onClick={textSwap1}></SwapButton>
              <MoImageStyle2></MoImageStyle2>
              <ClickedSwapButton onClick={textSwap2}></ClickedSwapButton>
            </MoImageStyle>
          </div>
        )}
      </ImageGrid2>
    </div>
  );
}
