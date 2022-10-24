import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import useImg from '../../assets/image/mainpageImg/img2.png';
import noticeImg from '../../assets/image/mainpageImg/img3.png';
import { MainBlueBody, NoticeTextStyle, TextStyle } from './mainPageStyled';
import theme from '../../styles/theme';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 6000,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '0px',
};

const Container = styled.span<{
  w: number;
  h: number;
}>`
  box-sizing: border-box;
  border-radius: 10%;
  height: ${props => props.h + 'rem'};
  width: ${props => props.w + 'rem'};
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    width: '60rem';
    margin: 0 auto;
  }
  .slick-prev:before {
    opacity: 0;
  }
  .slick-next:before {
    opacity: 0;
  }
`;

const CardBox = styled.div`
  cursor: pointer;
  position: relative;
`;

const CardImg = styled.img<{
  w: number;
  h: number;
}>`
  width: ${props => props.w + 'rem'};
  height: ${props => props.h + 'rem'};
  box-sizing: border-box;
  border-radius: 10%;
  z-index: 1;
`;

const IineHeight = styled.div`
  line-height: 3rem;
`;

interface sliderStlye {
  w: number;
  h: number;
  isMobile: boolean;
}

const TitleStyle = styled.span`
  ${theme.fontWeight.weightLarge};
  font-size: 2rem;
`;

export const CadetText = (
  <TextStyle>
    <TitleStyle>
      {'< '} Cadet {' >'}
    </TitleStyle>
    <br />
    1. 멘토의 <MainBlueBody>멘토링 상태 확인</MainBlueBody>하고 멘토링 신청 버튼
    클릭
    <br />
    2. 만남 <MainBlueBody>일정</MainBlueBody>과{' '}
    <MainBlueBody>정보</MainBlueBody>를 작성하고 제출
    <br />
    3. <MainBlueBody>마이페이지</MainBlueBody>에서 만남 상태 확인 가능
    <br />
    4. 멘토링이 확정, 취소되면 카뎃에게
    <MainBlueBody> 알림 메일 발송</MainBlueBody>
    <br />
    5. 슬랙을 통한 <MainBlueBody>장소협의 후</MainBlueBody> 만남 일정 시간에
    멘토링 진행
  </TextStyle>
);

export const MentorText = (
  <TextStyle>
    <TitleStyle>
      {'< '} Mentor {' >'}
    </TitleStyle>
    <br />
    1. 카뎃의 멘토링 신청 시 <MainBlueBody>알림 메일 발송</MainBlueBody>
    <br />
    2. <MainBlueBody>마이페이지</MainBlueBody>에서 만남 상태 결정 가능 <br />
    3. 멘토링이 확정, 취소되면 카뎃에게 알림 메일 발송 <br />
    4. 슬랙을 통한 <MainBlueBody>장소협의 후</MainBlueBody> 만남 일정 시간에
    멘토링 진행 <br />
    5.멘토링 진행 후 <MainBlueBody> 보고서 작성 </MainBlueBody>가능
  </TextStyle>
);

const MoTextStyle = styled.div`
  ${theme.font.sebangGothic};
  font-size: 1.3rem;
  line-height: 3.5rem;
  position: absolute;
  margin: 0 auto;
  margin-left: 2.5rem;
  width: 85%;
  top: 24%;
  z-index: 3;
`;

const MoTitleStyle = styled.span`
  ${theme.fontWeight.weightLarge};
  font-size: 1.4rem;
`;

export const MoCadetText = (
  <MoTextStyle>
    <MoTitleStyle>
      {'< '} Cadet {' >'}
    </MoTitleStyle>
    <br />
    1. 멘토의 <MainBlueBody>멘토링 상태 확인</MainBlueBody>하고 멘토링 신청 버튼
    클릭
    <br />
    2. 만남 <MainBlueBody>일정</MainBlueBody>과{' '}
    <MainBlueBody>정보</MainBlueBody>를 작성하고 제출
    <br />
    3. <MainBlueBody>마이페이지</MainBlueBody>에서 만남 상태 확인 가능
    <br />
    4. 멘토링이 확정, 취소되면 카뎃에게
    <MainBlueBody> 알림 메일 발송</MainBlueBody>
    <br />
    5. 슬랙을 통한 <MainBlueBody>장소협의 후</MainBlueBody> 만남 일정 시간에
    멘토링 진행
  </MoTextStyle>
);

export const MoMentorText = (
  <MoTextStyle>
    <MoTitleStyle>
      {'< '} Mentor {' >'}
    </MoTitleStyle>
    <br />
    1. 카뎃의 멘토링 신청 시 <MainBlueBody>알림 메일 발송</MainBlueBody>
    <br />
    2. <MainBlueBody>마이페이지</MainBlueBody>에서 만남 상태 결정 가능 <br />
    3. 멘토링이 확정, 취소되면 카뎃에게 알림 메일 발송 <br />
    4. 슬랙을 통한 <MainBlueBody>장소협의 후</MainBlueBody> 만남 일정 시간에
    멘토링 진행 <br />
    5.멘토링 진행 후 <MainBlueBody> 보고서 작성 </MainBlueBody>가능
  </MoTextStyle>
);

export const NoticeText = (
  <NoticeTextStyle>
    <br />
    <IineHeight>
      1. 멘토링을 신청한 후<MainBlueBody> 48시간 이내</MainBlueBody>에 멘토가
      <br />
      수락하지 않을 경우 자동 취소
    </IineHeight>
    <br />
    <IineHeight>
      2. 멘토링 수락은 카뎃이 선택한 가장 늦은  희망시간 <br />
      <MainBlueBody> 10분 전</MainBlueBody>까지 가능 그 이후는
      <MainBlueBody> 자동취소</MainBlueBody>
    </IineHeight>
    <br />
    <IineHeight>
      3. <MainBlueBody>멘토</MainBlueBody>의 경우 마이페이지에서
      <MainBlueBody>
        {' '}
        멘토 키워드 1개 이상 <br />{' '}
      </MainBlueBody>{' '}
      선택해주세요! 키워드가 없으면 노출되지 않습니다
    </IineHeight>
  </NoticeTextStyle>
);

const MoNoticeTextStyle = styled.div`
  ${theme.font.sebangGothic};
  font-size: 1.4rem;
  line-height: 1rem;
  position: absolute;
  margin: 0 auto;
  margin-left: 6%;
  width: 85%;
  top: 24%;
  z-index: 3;
`;

export const MoNoticeText = (
  <MoNoticeTextStyle>
    <br />
    <IineHeight>
      1. 멘토링을 신청한 후<MainBlueBody> 48시간 이내</MainBlueBody>에 멘토가
      <br />
      수락하지 않을 경우 자동 취소
    </IineHeight>
    <br />
    <IineHeight>
      2. 멘토링 수락은 카뎃이 선택한 가장 늦은  희망시간 <br />
      <MainBlueBody> 10분 전</MainBlueBody>까지 가능 그 이후는
      <MainBlueBody> 자동취소</MainBlueBody>
    </IineHeight>
    <br />
    <IineHeight>
      3. <MainBlueBody>멘토</MainBlueBody>의 경우 마이페이지에서
      <MainBlueBody>
        {' '}
        멘토 키워드 1개 이상 <br />{' '}
      </MainBlueBody>{' '}
      선택해주세요! 키워드가 없으면 노출되지 않습니다
    </IineHeight>
  </MoNoticeTextStyle>
);

function ImageSlider(props: sliderStlye) {
  const sliders = [NoticeText, CadetText, MentorText];
  const moSliders = [MoNoticeText, MoCadetText, MoMentorText];
  return (
    <Container w={props.w} h={props.h}>
      <StyledSlider {...settings}>
        {!props.isMobile
          ? sliders.map((text, index: number) => {
              return (
                <div key={index}>
                  <CardBox>
                    {index >= 1 ? (
                      <CardImg src={useImg} w={props.w} h={props.h}></CardImg>
                    ) : (
                      <CardImg
                        src={noticeImg}
                        w={props.w}
                        h={props.h}
                      ></CardImg>
                    )}
                    {text}
                  </CardBox>
                </div>
              );
            })
          : moSliders.map((text, index: number) => {
              return (
                <div key={index}>
                  <CardBox>
                    {index >= 1 ? (
                      <CardImg src={useImg} w={props.w} h={props.h}></CardImg>
                    ) : (
                      <CardImg
                        src={noticeImg}
                        w={props.w}
                        h={props.h}
                      ></CardImg>
                    )}
                    {text}
                  </CardBox>
                </div>
              );
            })}
      </StyledSlider>
    </Container>
  );
}
export default ImageSlider;
