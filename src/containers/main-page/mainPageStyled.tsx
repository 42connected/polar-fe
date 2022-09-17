import styled from 'styled-components';
import theme from '../../styles/theme';

export interface keywordsPro {
  name: string;
}

export interface keywordsLists {
  name: string;
  index: number;
}

export const MainContainer = styled.div`
  background-color: ${theme.colors.polarBackground};
  left: 0;
  ${theme.fontSize.sizeMedium};
  ${theme.font.sebangGothic};
  height: calc(100vh - 210px);
  width: 100%;
  display: grid;
  grid-template-rows: 130px 130px 130px;
  grid-template-columns: 600px auto;
  transition: all 0.25s ease-in-out;
  grid-template-areas:
    'title img'
    'icon1 img'
    'icon2 img';
  text-align: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  grid-column-gap: 14rem;
  border-radius: 10px;
  color: ${theme.colors.blackOne};
`;

export const MainContainer2 = styled.div`
  background-color: ${theme.colors.polarBackground};
  left: 0;
  ${theme.fontSize.sizeSmall};
  ${theme.font.sebangGothic};
  height: calc(100% - 220px);
  width: 100%;
  display: grid;
  grid-template-rows: 500px 95px 100px 180px;
  grid-template-columns: auto;
  grid-template-areas:
    'img'
    'title'
    'icon1'
    'icon2';
  text-align: center;
  justify-content: center;
  transition: all 0.25s ease-in-out;
  border-radius: 10px;
`;

export const ImageBox = styled.div<{
  count: number;
}>`
  transition: ${props => (!props.count ? '' : 'all 0.5s ease-in-out')};
  transform: ${props => 'translateX(-' + props.count * 1000 + 'px)'};
  overflow: hidden;
  height: 40rem;
  width: 60rem;
`;

export const MainImageStyle = styled.div`
  padding-top: 1.5rem;
  box-sizing: border-box;
  background-color: transparent;
  border-radius: 10%;
  height: 40rem;
  width: 60rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-area: img;
`;

export const MainImageStyle2 = styled.div`
  box-sizing: border-box;
  background-color: transparent;
  border-radius: 10%;
  height: 31rem;
  width: 37rem;
  padding-top: 10rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-area: img;
`;

export const ImageGrid1 = styled.div`
  line-height: 4rem;
  grid-row-start: 1;
`;

export const MoImageGrid1 = styled.div`
  line-height: 4rem;
  grid-row-start: 1;
`;

export const ImageGrid2 = styled.div`
  grid-row-start: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

export const ImageStyle = styled.span`
  display: flex;
`;

export const MoImageStyle = styled.span`
  display: flex;
  font-size: 1rem;
  margin-top: 2rem;
`;

export const ImageStyle2 = styled.span`
  margin-left: 1rem;
`;

export const MoImageStyle2 = styled.span`
  margin-left: 0.5rem;
`;

export const ClickedSwapButton = styled.button`
  border-radius: 10rem;
  background-color: ${theme.colors.polarSimpleMain};
  color: ${theme.colors.polarSimpleMain};
  height: 0.8rem;
  width: 6rem;
  word-spacing: 1rem;
  border: none;
`;

export const SwapButton = styled.button`
  box-sizing: border-box;
  border-radius: 100rem;
  height: 0.8rem;
  width: 0.8rem;
  word-spacing: 1rem;
  border: none;
  background-color: ${theme.colors.grayFour};
  color: ${theme.colors.graySix};
`;

export const TextUnder = styled.span`
  box-sizing: border-box;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${theme.colors.polarSimpleMain};
  text-underline-offset: 1rem;
  ${theme.fontSize.sizeLarge};
  ${theme.font.sebangGothic};
  ${theme.fontWeight.weightLarge};
`;

export const TitleStyle = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid black;
  font-size: 4.5rem;
  margin-top: -2rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  grid-area: title;
`;

export const TitleStyle2 = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid black;
  padding-bottom: 3rem;
  font-size: 3rem;
  margin-top: 4.5rem;
  bottom: 0;
  grid-area: title;
`;

export const ClickContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  transition: all 0.25s ease-in-out;
  grid-template-rows: 100px;
  text-align: center;
  justify-content: center;
  align-items: center;
  grid-column-gap: 2rem;
`;

export const ClickContainer2 = styled.div`
  display: grid;
  grid-template-columns: 80px 80px 80px 80px;
  transition: all 0.25s ease-in-out;
  grid-template-rows: 100px;
  text-align: center;
  justify-content: center;
  align-items: center;
  grid-column-gap: 1rem;
`;

export const IconImageStyle = styled.div<{
  colStart: number;
  rowStart: number;
}>`
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  grid-column-start: colStart;
  grid-row-start: rowStart;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 2.3rem;
`;

export const IconImageStyle2 = styled.div<{
  colStart: number;
  rowStart: number;
}>`
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 3rem;
  grid-column-start: colStart;
  grid-row-start: rowStart;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 2.3rem;
`;

export const KeywordStyle = styled.div<{ colStart: number; rowStart: number }>`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  grid-column-start: colStart;
  grid-row-start: rowStart;
  ${theme.font.sebangGothic};
  color: ${theme.fontColor.titleColor};
  font-size: 2.3rem;
`;

export const KeywordStyle2 = styled.div<{ colStart: number; rowStart: number }>`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  grid-column-start: colStart;
  grid-row-start: rowStart;
  ${theme.font.sebangGothic};
  color: ${theme.fontColor.titleColor};
  font-size: 1.8rem;
`;

export const MainBlueBody = styled.span`
  color: #5d6dbe;
  font-weight: 400;
`;

export const IconButton = styled.button`
  cursor: pointer;
  float: left;
  padding-bottom: 2rem;
  background-color: transparent;
  border: none;
`;

export const TextStyle = styled.div`
  ${theme.font.sebangGothic};
  font-size: 1.8rem;
  line-height: 4.5rem;
  position: absolute;
  margin: 0 auto;
  width: 95%;
  top: 24%;
  z-index: 3;
`;

export const NoticeTextStyle = styled.div`
  ${theme.font.sebangGothic};
  font-size: 2rem;
  line-height: 2.7rem;
  position: absolute;
  margin: 0 auto;
  margin-left: 5%;
  width: 85%;
  top: 23%;
  z-index: 3;
`;
