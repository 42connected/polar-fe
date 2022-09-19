import defaultTheme from '../../styles/theme';
import styled from 'styled-components';
import theme from '../../styles/theme';

export const ContainersPc = styled.div`
  display: grid;
  background: white;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  grid-column-gap: 10rem;
  justify-items: center;
  height: calc(100vh - 220px);
`;

export const ContainersMobile = styled.div`
  display: grid;
  background: white;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  grid-column-gap: 10rem;
  justify-items: center;
  -webkit-transform: scale(0.7);
  transform: scale(0.7);
  transform-origin: left top;
  padding-left: 2rem;
  height: calc(100vh - 220px);
`;

export const RequiredWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
  padding-top: 4rem;
  width: 400px;
  padding-left: 2rem;
`;

export const OptionWrapper = styled.div`
  padding-top: 4rem;
  align-items: center;
  justify-content: left;
  padding-bottom: 100px;
  margin-top: 3rem;
  margin-right: 0rem;
`;

export const HeadLetters = styled.h1`
  ${defaultTheme.font.sebangGothic};
  font-size: 2.5rem;
  font-weight: 400;
  padding-left: 10rem;
  padding-bottom: 20px;
  border-bottom: 1px solid;
`;

export const SingupImage = styled.img`
  width: 35rem;
  height: 18.5rem;
`;

export const NameTitle = styled.h2`
  font-weight: 400;
  font-size: 2rem;
  ${defaultTheme.font.sebangGothic};
  padding-left: 20px;
  padding-bottom: 5px;
`;

export const InfoInput = styled.input`
  width: 27rem;
  height: 3rem;
  border-radius: 20px;
  margin-left: 20px;
  margin-bottom: 10px;
  padding-left: 3rem;
  background: ${theme.colors.polarBackground};
  border: none;
  border-right: 0px;
  border-top: 0px;
  font-size: 19;
  ${theme.font.sebangGothic};
  ${theme.fontWeight.weightSmall};
  ${theme.fontSize.sizeExtraSmall};
`;

export const EmailInput = styled.input`
  width: 27rem;
  height: 3rem;
  border-radius: 20px;
  margin-left: 20px;
  margin-bottom: 10px;
  border: none;
  border-right: 0px;
  border-top: 0px;
`;

export const CertificationSendingButton = styled.button`
  justify-content: center;
  margin-left: 240px;
  width: 80.19px;
  height: 35.11px;
  background: ${defaultTheme.colors.polarSimpleMain};
  color: WHITE;
  padding-top: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  word-break: keep-all;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const Button = styled.button`
  justify-content: center;
  margin-left: 70px;
  width: 138.19px;
  height: 39.11px;
  background: ${defaultTheme.fontColor.blueColor};
  color: WHITE;
  padding: 1rem;
  border: none;
  cursor: pointer;
  font-size: 27px;
  border-radius: 20px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const TimeTableContainer = styled.ul`
  display: grid;
  justify-content: right;
  grid-template-columns: 18% 8rem 8rem 5% 8rem 8rem 3%;
  grid-template-rows: 4rem;
  grid-gap: 4px;
  list-style-type: none;
  margin-right: 2rem;
  margin-bottom: 0rem;
  margin-top: 1rem;
`;

export const ColumnDays = styled.li`
  grid-column-start: 1;
  grid-column-end: 2;
  padding-left: 20px;
`;

export const ColumnName = styled.li`
  grid-column-start: 2;
  grid-column-end: 7;
  padding-left: 150px;
`;

export const ColumnLine = styled.li`
  grid-column-start: 1;
  grid-column-end: 8;
  padding: 0px, 0px, 0px, 0px;
  margin: 0px, 0ox, 0px, 0px;
  border-top: 0.5px solid;
`;

export const AddButtonImage = styled.img`
  width: 1.7rem;
  height: 1.5rem;
  cursor: pointer;
  margin-top: 1.5rem;
`;

export const DeleteButtonImage = styled.img`
  width: 1.3rem;
  height: 1.1rem;
  cursor: pointer;
  margin-top: 1.2rem;
  background-color: black;
`;

export const BodyBigFont = styled.p`
  ${defaultTheme.fontFrame.bodyMiddle};
  ${defaultTheme.font.sebangGothic};
`;

export const ToggleContainer = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1px;
  gap: 5rem;
  margin-top: 10rem;
  margin-bottom: 8rem;
`;

export const BodySmallFont = styled.p`
  font-size: 1.8rem;
  font-family: NanumGothic;
  font-weight: 400;
`;

export const ResultMessage = styled.p`
  font-family: NanumGothic;
  font-weight: 400;
  font-size: 1.4rem;
  padding-top: 0rem;
  margin-top: 0rem;
  padding-left: 1.6rem;
`;
