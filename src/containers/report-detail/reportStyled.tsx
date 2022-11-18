import styled from 'styled-components';
import theme from '../../styles/theme';

/*grid*/
export const ReportContainer = styled.div<{
  index: number;
}>`
  position: absolute;
  left: 0;
  ${theme.fontSize.sizeExtraSmall};
  ${theme.font.nanumGothic};
  display: grid;
  width: 100%;
  grid-template-rows:
    6rem 5.8rem 0.6rem 4rem 0.6rem 3.9rem 4.1rem 5.3rem 12.5rem
    8rem 27rem 27rem 0rem 10rem 75.5rem 3rem 2.4rem 2.4rem 2.4rem 4.3rem;
  grid-template-columns: 7rem 8.5rem 5.5rem 17rem 5.7rem 7rem 18rem;
  grid-template-areas:
    'side img1 . . . . side'
    'side title title title title title side'
    '. . . . . . .'
    'side subtitle1 minititle1 isCommon minititle2 notCommon side'
    '. . . . . . .'
    'side subtitle2 . date . time side'
    'side subtitle3 . place . . side '
    'side subtitle4 . m_name . . .'
    'c_name side . . . . .'
    'side subtitle5 . . subject . side'
    'side subtitle5 . . content . side'
    'side subtitle5 . . comment . side'
    '. . . num . . .'
    'side img1 . . . . side'
    'side subtitle6 . img3 . . side'
    'side subtitle7 . . feedbacktitle . side'
    'side subtitle7 . . feedback1 . side'
    'side subtitle7 . . feedback2 . side'
    'side subtitle7 . . feedback3 . side'
    'side foot foot foot foot foot side'
  text-align: center;
  justify-content: center;
  grid-gap: 0.4rem;
  transition: all 0.25s ease-in-out;
  border-radius: 10px;
  margin-left: -2rem;
  background-color: ${theme.colors.backgoundWhite};
`;

export const ImgLogo1 = styled.section`
  ${theme.fontSize.sizeMedium};
  position: absolute;
  grid-area: img1;
  grid-column-start: 2;
  grid-column-end: 3;
  margin-left: -0.2rem;
  padding-top: 2rem;
`;

export const ImgLogo2 = styled.section`
  ${theme.fontSize.sizeMedium};
  position: absolute;
  grid-area: img2;
  grid-column-start: 6;
  grid-column-end: 6;
  padding-left: 11rem;
  padding-top: 4.7rem;
`;

export const ImgLogo3 = styled.section`
  ${theme.fontSize.sizeMedium};
  position: absolute;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 14;
  margin-left: -0.2rem;
  padding-top: 6rem;
`;

export const ImgLogo4 = styled.section`
  ${theme.fontSize.sizeMedium};
  position: absolute;
  grid-column-start: 6;
  grid-column-end: 6;
  grid-row-start: 14;
  padding-left: 10.5rem;
  padding-top: 6.4rem;
`;

export const Title = styled.section`
  ${theme.fontSize.sizeExtraMedium};
  background-color: ${theme.colors.backgoundWhite};
  align-content: center;
  justify-content: center;
  box-sizing: border-box;
  position: absolute;
  grid-area: img2;
  grid-column-start: 2;
  grid-column-end: 7;
  grid-row-start: 2;
  border: 1px solid black;
  height: 6.15rem;
  width: 56.8rem;
  text-align: center;
  padding-top: 1.2rem;
`;

export const NoneValue1 = styled.section`
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  grid-column-start: 2;
  grid-column-end: 7;
  grid-row-start: 3;
  border: 1px solid black;
  border-top: 0px;
  height: 1rem;
  width: 56.8rem;
  text-align: center;
  align-content: center;
  justify-content: center;
`;
export const NoneValue2 = styled.section`
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  grid-column-start: 2;
  grid-column-end: 7;
  grid-row-start: 5;
  border: 1px solid black;
  height: 1rem;
  width: 56.8rem;
  text-align: center;
  border: 1px solid black;
`;

export const NoneValue3 = styled.section`
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  grid-column-start: 2;
  grid-column-end: 7;
  grid-row-start: 10;
  border: 1px solid black;
  height: 1.5rem;
  width: 56.8rem;
  text-align: center;
`;

export const SubTitle1 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  border-top: 0px;
  grid-column-start: 2;
  grid-row-start: 4;
  height: 4.5rem;
  width: 9rem;
  text-align: center;
  padding-top: 1.3rem;
`;

export const SubTitle2 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  border-top: 0px;
  grid-column-start: 2;
  grid-row-start: 6;
  height: 4.4rem;
  width: 9rem;
  text-align: center;
  padding-top: 1.3rem;
`;

export const SubTitle3 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  border-bottom: 0;
  grid-column-start: 2;
  grid-row-start: 7;
  height: 4.5rem;
  width: 9rem;
  text-align: center;
  padding-top: 1.3rem;
`;

export const SubTitle4 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  border-bottom: 0px;
  grid-column-start: 2;
  grid-row-start: 8;
  height: 6rem;
  width: 9rem;
  text-align: center;
  padding-top: 2rem;
`;

export const SubTitle5 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 2;
  grid-row-start: 10;
  height: 63.3rem;
  width: 9.1rem;
  text-align: center;
  padding-top: 30rem;
`;

export const SubTitle6 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 2;
  grid-row-start: 15;
  height: 75.7rem;
  width: 9.1rem;
  text-align: center;
  padding-top: 30rem;
`;

export const SubTitle7 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 2;
  grid-row-start: 16;
  height: 16.8rem;
  width: 9rem;
  text-align: center;
  padding-top: 6.5rem;
  margin-top: -0.3rem;
`;

export const MiniTitle1 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.graySix};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  border-top: 0px;
  grid-column-start: 3;
  grid-row-start: 4;
  height: 4.5rem;
  width: 6rem;
  text-align: center;
  padding-top: 1.3rem;
`;

export const MiniTitle2 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.graySix};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  border-top: 0px;
  grid-column-start: 5;
  grid-row-start: 4;
  height: 4.5rem;
  width: 6.2rem;
  text-align: center;
  padding-top: 1.3rem;
`;

export const SubTitle8 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border-left: 1px solid black;
  border-right: 1px solid black;
  grid-column-start: 5;
  grid-row-start: 6;
  height: 4.4rem;
  width: 6.2rem;
  text-align: center;
  padding-top: 1.3rem;
`;

export const SubTitle9 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  border-right: 0px;
  grid-column-start: 2;
  grid-row-start: 9;
  height: 6rem;
  width: 9.1rem;
  text-align: center;
  padding-top: 2rem;
`;

export const IsCommonBox = styled.section`
  ${theme.fontSize.sizeMedium};
  position: absolute;
  align-items: stretch;
  text-align: center;
  grid-area: isCommon;
  height: 4.3rem;
  width: 17.3rem;
  grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 4;
`;

export const DateBox = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  position: absolute;
  align-items: stretch;
  height: 4rem;
  width: 23rem;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 6;
  text-align: left;
  padding-top: 1.3rem;
  padding-left: 1rem;
`;

export const MentorNameBox = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  position: absolute;
  align-items: stretch;
  height: 5.6rem;
  width: 47.8rem;
  grid-column-start: 3;
  grid-column-end: 7;
  grid-row-start: 8;
  border: 1px solid black;
  border-left: 0;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

export const SignText = styled.div`
  position: relative;
  color: gray;
  margin-left: 3rem;
`;

export const MentoSign = styled.span`
  position: absolute;
  margin-left: 11vw;
  align-items: center;
  align-content: center;
  justify-content: center;
  color: black;
`;

export const CadetNameBox = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  position: absolute;
  display: flex;
  align-items: stretch;
  height: 6rem;
  //width: 50.3rem;
  grid-column-start: 3;
  grid-column-start: 7;
  grid-row-start: 9;
  border: 1px solid black;
  text-align: left;
  padding-top: 0.5rem;
  padding-left: 1rem;
`;

export const TimeBox = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  position: absolute;
  align-items: stretch;
  height: 4.3rem;
  width: 17.4rem;
  grid-column-start: 6;
  grid-row-start: 6;
  border-right: 1px solid black;
  text-align: left;
  padding-top: 1.3rem;
  padding-left: 1rem;
`;

export const PlaceBox = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  overflow: hidden;
  position: absolute;
  height: 4.3rem;
  width: 46.7rem;
  grid-column-start: 3;
  grid-column-end: 7;
  grid-row-start: 7;
  margin-left: 0.1rem;
  border: 1px solid black;
  border-bottom: 0px;
  border-left: 0px;
  text-align: left;
  padding-top: 1.2rem;
  padding-left: 1rem;
`;

export const NotCommonBox = styled.section`
  ${theme.fontSize.sizeMedium};
  position: absolute;
  align-items: stretch;
  text-align: center;
  grid-area: notCommon;
  height: 4.3rem;
  width: 8.4rem;
  grid-column-start: 6;
  grid-column-end: 6;
  grid-row-start: 4;
  grid-row-end: 4;
  justify-content: center;
  border-right: 1px solid black;
  padding-right: 10rem;
  padding-top: 1rem;
`;

export const ContentTitle1 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 3;
  grid-row-start: 10;
  height: 8.3rem;
  width: 5.5rem;
  text-align: center;
  padding-top: 3rem;
`;

export const ContentTitle2 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  border-left: 1px solid black;
  grid-column-start: 3;
  grid-row-start: 11;
  height: 27.5rem;
  margin-top: -0.15rem;
  width: 5.5rem;
  text-align: center;
  padding-top: 10rem;
`;

export const ContentTitle3 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 3;
  grid-row-start: 12;
  height: 27.5rem;
  width: 5.5rem;
  text-align: center;
  padding-top: 10rem;
`;

export const ContentBody1 = styled.textarea<{ len: number }>`
  ${props => (props.len > 100 ? 'font-size: 1rem' : 'font-size: 1.3rem')};
  background-color: ${theme.colors.graySix};
  ${theme.font.nanumGothic};
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  resize: none;
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 4;
  grid-row-start: 10;
  height: 8.3rem;
  width: 42.5rem;
  text-align: left;
  padding-top: 0.8rem;
  margin-left: -0.5rem;
  padding-left: 0.5rem;
`;

export const ContentBody2 = styled.textarea<{ len: number }>`
  ${props => (props.len > 400 ? 'font-size: 1rem' : 'font-size: 1.3rem')};
  background-color: ${theme.colors.graySix};
  ${theme.font.nanumGothic};
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  resize: none;
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  border-top: 0px;
  border-bottom: 0px;
  margin-top: -0.1rem;
  grid-column-start: 4;
  grid-row-start: 11;
  height: 27.5rem;
  width: 42.5rem;
  text-align: left;
  padding-top: 0.5rem;
  margin-left: -0.5rem;
  padding-left: 0.5rem;
`;

export const ContentBody3 = styled.textarea<{ len: number }>`
  ${props => (props.len > 400 ? 'font-size: 1rem' : 'font-size: 1.3rem')};
  background-color: ${theme.colors.graySix};
  ${theme.font.nanumGothic};
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  resize: none;
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 4;
  grid-row-start: 12;
  height: 27.5rem;
  width: 42.5rem;
  text-align: left;
  padding-top: 0.5rem;
  margin-left: -0.55rem;
  padding-left: 0.5rem;
  overflow: hidden;
`;

export const ContentBody4 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 15;
  height: 75.7rem;
  width: 47.7rem;
  text-align: left;
  padding-top: 1.3rem;
  padding-left: 1rem;
`;

export const ContentBody5 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 3;
  grid-column-end: 6;
  grid-row-start: 16;
  grid-row-end: 18;
  height: 16.8rem;
  width: 47.7rem;
  text-align: center;
  padding-top: 1.3rem;
  margin-top: -0.3rem;
  padding-left: 1rem;
  line-height: 3.5rem;
`;

export const ContentBody6 = styled.section`
  ${theme.fontSize.sizeExtraMedium};
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 2;
  grid-column-end: 6;
  grid-row-start: 21;
  width: 56.6rem;
  height: 9.6rem;
  text-align: center;
  padding-top: 3rem;
  margin-top: -0.3rem;
  padding-left: 1rem;
`;

export const Number1 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  grid-column-start: 2;
  grid-column-end: 6;
  grid-row-start: 13;
  width: 56.6rem;
  height: 9.6rem;
  text-align: center;
  padding-top: 7rem;
`;

export const Number2 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.backgoundWhite};
  position: absolute;
  box-sizing: border-box;
  grid-column-start: 2;
  grid-column-end: 6;
  grid-row-start: 22;
  width: 56.6rem;
  height: 9.6rem;
  text-align: center;
  padding-top: 7rem;
`;

export const Titleplus = styled.span`
  font-weight: bold;
`;

export const PlaceBox2 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 46.7rem;
  grid-column-start: 3;
  grid-column-end: 7;
  grid-row-start: 9;
  margin-left: 0.1rem;
  height: 13rem;
  border: 1px solid black;
  border-left: 0;
  border-bottom: 0;
  text-align: left;
  padding-left: 1rem;
`;

export const Cadet = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.grayFive};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 2;
  grid-row-start: 9;
  width: 9rem;
  height: 13rem;
  text-align: center;
  padding-top: 1.3rem;
  padding-bottom: 1.3rem;
`;
