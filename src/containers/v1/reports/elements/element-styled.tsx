import styled from '@emotion/styled';
import defaultTheme from '@/styles/theme';

export const ReportElementRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  width: 100%;
`;

export const Topic = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 40px;
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeMedium};
`;

export const Content = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  text-align: left;
  width: 60%;
`;
