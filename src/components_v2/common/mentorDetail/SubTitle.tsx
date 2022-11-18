import React from 'react';
import styled from 'styled-components';
import defaultTheme from '../../../styles/theme';

interface titleProps {
  time?: string | null;
  children: React.ReactNode;
}
const Container = styled.div`
  width: 100%;
`;

const TitleStyles = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: auto;
  border-top: 2px solid black;
  border-bottom: 1px solid black;
  text-align: left;
  margin-top: 5%;
  padding-left: 2%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-family: ${defaultTheme.font.sebangGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeLarge};
`;

const DateStyles = styled.div`
  margin-top: 0.5rem;
  font-family: ${defaultTheme.font.nanumGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeSmall};
`;

export default function SubTitle({ children, time }: titleProps) {
  return (
    <Container>
      <TitleStyles>
        {children} {time && <DateStyles> {time} </DateStyles>}
      </TitleStyles>
    </Container>
  );
}

SubTitle.defaultProps = {
  time: null,
};
