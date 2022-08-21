import styled from '@emotion/styled';
import defaultTheme from '../../styles/theme';

const Container = styled.button`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 30px;
  width: 100px;
  height: 40px;
  margin: 10px 0px;
  border-radius: 30px;
  border: none;
  text-align: center;
  text-decoration: none;
  background-color: gray;
  color: #ffffff;
  &:hover {
    opacity: 0.8;
  }
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

export interface KeywordProps {
  name: string;
  index: number;
}

export function MentorKeyword(props: KeywordProps) {
  return <Container>{props.name}</Container>;
}
