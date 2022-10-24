import styled from 'styled-components';
import defaultTheme from '../../../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0px;
`;

export const ToggleContainer = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0.5px;
  gap: 5rem;
  margin-top: 3rem;
  margin-bottom: 5rem;
`;

export const NameTitle = styled.h2`
  font-weight: 400;
  font-size: 2rem;
  ${defaultTheme.font.sebangGothic};
  padding-left: 20px;
  padding-bottom: 0px;
  padding-top: 0px;
  margin-top: 0px;
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

export const BodySmallFont = styled.p`
  font-size: 1.8rem;
  font-family: NanumGothic;
  font-weight: 400;
`;

export const TimeTableContainer = styled.ul`
  display: grid;
  justify-content: right;
  grid-template-columns: 18% 8rem 8rem 5% 8rem 8rem 3%;
  grid-template-rows: 4rem;
  grid-gap: 4px;
  list-style-type: none;
  margin-right: 2rem;
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
