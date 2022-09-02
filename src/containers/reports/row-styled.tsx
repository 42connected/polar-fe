import styled from '@emotion/styled';
import defaultTheme from '../../styles/theme';

export const ReportRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const ReportRowTitle = styled.div`
  display: flex;
  width: 25%;
  justify-content: center;
  align-items: center;
  ${defaultTheme.fontSize.sizeMedium};
  ${defaultTheme.font.sebangGothic};
  @media screen and (max-width: 900px) {
    ${defaultTheme.fontSize.sizeExtraSmall};
  }
  @media screen and (max-width: 800px) {
    ${defaultTheme.fontSize.sizeSmall};
  }
`;

export const ReportRowContent = styled.div`
  ${defaultTheme.fontSize.sizeMedium};
  ${defaultTheme.font.nanumGothic};
  display: flex;
  flex-direction: column;
  width: 75%;
  justify-content: center;
  align-items: center;
`;
