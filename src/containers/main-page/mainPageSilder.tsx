import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import img1 from '../../assets/image/mainpageImg/cadet.png';
import img2 from '../../assets/image/mainpageImg/mentor.png';
import img3 from '../../assets/image/mainpageImg/notice.png';
import { MainBlueBody, TextStyle, TextUnder } from './mainPageStyled';

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
`;

const CardBox = styled.div`
  cursor: pointer;
`;

const CardImg = styled.img<{
  w: number;
  h: number;
}>`
  width: ${props => props.w + 'rem'};
  height: ${props => props.h + 'rem'};
  box-sizing: border-box;
  border-radius: 10%;
`;

interface sliderStlye {
  w: number;
  h: number;
}

function ImageSlider(props: sliderStlye) {
  const sliders = [img1, img2, img3];
  return (
    <Container w={props.w} h={props.h}>
      <StyledSlider {...settings}>
        {sliders.map(img => {
          return (
            <div>
              <CardBox>
                <CardImg src={img} w={props.w} h={props.h} />
              </CardBox>
            </div>
          );
        })}
      </StyledSlider>
    </Container>
  );
}
export default ImageSlider;
