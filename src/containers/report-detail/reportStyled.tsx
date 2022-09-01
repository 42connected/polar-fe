import styled from 'styled-components';
import theme from '../../styles/theme';

/*grid*/
export const ReportContainer = styled.span<{
  index: number;
}>`
  position: absolute;
  left: 0;
  ${theme.fontSize.sizeExtraSmall};
  ${theme.font.nanumGothic};
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 10.7rem 5.8rem 0.6rem 4rem 0.6rem 3.9rem 4.1rem 5.3rem 0.6rem 8rem 24rem 26rem 11rem 10.7rem 62.5rem 3rem 2.4rem 2.4rem 2.4rem 4.3rem 9.5rem;
  grid-template-columns: 7rem 8.5rem 5.5rem 17rem 5.7rem 7rem 18rem;
  grid-template-areas:
    'side img1 . . . img2 side'
    'side title title title title title side'
    '. . . . . . .'
    'side subtitle1 minititle1 isCommon minititle2 notCommon side'
    '. . . . . . .'
    'side subtitle2 . date . time side'
    'side subtitle3 . place . . side '
    'side subtitle4 . m_name . c_name side'
    '. . . . . . .'
    'side subtitle5 . . subject . side'
    'side subtitle5 . . content . side'
    'side subtitle5 . . comment . side'
    '. . . num . . .'
    'side img1 . . . img2 side'
    'side subtitle6 . img3 . . side'
    'side subtitle7 . . feedbacktitle . side'
    'side subtitle7 . . feedback1 . side'
    'side subtitle7 . . feedback2 . side'
    'side subtitle7 . . feedback3 . side'
    'side foot foot foot foot foot side'
    '. . . num . . .';
  text-align: center;
  justify-content: center;
  grid-gap: 0.4rem;
  transition: all 0.25s ease-in-out;
  border-radius: 10px;
  margin-left: -2rem;
  margin-top: ${props => props.index * 220 + 'rem'};
  background-color: ${theme.colors.backgoundWhite};
`;

export const ImgLogo1 = styled.section`
  ${theme.fontSize.sizeMedium};
  position: absolute;
  grid-area: img1;
  grid-column-start: 2;
  grid-column-end: 3;
  margin-left: -0.2rem;
  padding-top: 5rem;
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
  padding-top: 6.8rem;
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
  padding-top: 2rem;
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
  grid-row-start: 9;
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
  width: 9.1rem;
  text-align: center;
  padding-top: 1.3rem;
`;

export const SubTitle3 = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  background-color: ${theme.colors.grayFive};
  position: absolute;
  box-sizing: border-box;
  border-left: 1px solid black;
  border-top: 1px solid black;
  grid-column-start: 2;
  grid-row-start: 7;
  height: 4.5rem;
  width: 9.1rem;
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
  width: 9.1rem;
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
  height: 58.8rem;
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
  height: 62.7rem;
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
  grid-column-start: 5;
  grid-row-start: 8;
  height: 6rem;
  width: 6.2rem;
  text-align: center;
  padding-top: 2rem;
`;

export const IsCommonBox = styled.section`
  ${theme.fontSize.sizeMedium};
  position: absolute;
  align-items: stretch;
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

export const MentoNameBox = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  position: absolute;
  align-items: stretch;
  height: 6rem;
  width: 23rem;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 8;
  border: 1px solid black;
  border-left: 0;
  text-align: left;
  padding-top: 2rem;
  padding-left: 1rem;
`;

export const KadetNameBox = styled.section`
  ${theme.fontSize.sizeExtraSmall};
  position: absolute;
  align-items: stretch;
  height: 6rem;
  width: 17.3rem;
  grid-column-start: 6;
  grid-row-start: 8;
  border: 1px solid black;
  text-align: left;
  padding-top: 2rem;
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
  position: absolute;
  height: 4.3rem;
  width: 46.6rem;
  grid-column-start: 3;
  grid-column-end: 7;
  grid-row-start: 7;
  margin-left: 0.1rem;
  border: 1px solid black;
  border-bottom: 0px;
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
  height: 24.6rem;
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
  height: 26rem;
  width: 5.5rem;
  text-align: center;
  padding-top: 10rem;
`;

export const ContentBody1 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.graySix};
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 4;
  grid-row-start: 10;
  height: 8.3rem;
  width: 42.5rem;
  text-align: left;
  padding-top: 1.3rem;
  margin-left: -0.5rem;
  padding-left: 1rem;
`;

export const ContentBody2 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.graySix};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  border-top: 0px;
  border-bottom: 0px;
  margin-top: -0.1rem;
  grid-column-start: 4;
  grid-row-start: 11;
  height: 24.5rem;
  width: 42.5rem;
  text-align: left;
  padding-top: 1.3rem;
  margin-left: -0.5rem;
  padding-left: 1rem;
`;

export const ContentBody3 = styled.section`
  ${theme.fontSize.sizeSmall};
  background-color: ${theme.colors.graySix};
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  grid-column-start: 4;
  grid-row-start: 12;
  height: 26rem;
  width: 42.5rem;
  text-align: left;
  padding-top: 1.3rem;
  margin-left: -0.55rem;
  padding-left: 1rem;
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
  height: 62.7rem;
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
