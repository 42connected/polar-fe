import styled from 'styled-components';
import theme from '@/styles/theme';
import defaultTheme from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0px;
`;

export const NameTitle = styled.h2`
  font-weight: 400;
  font-size: 1.8rem;
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
  //${theme.fontSize.sizeExtraSmall};
`;

export const ResultMessage = styled.p`
  font-family: NanumGothic;
  font-weight: 400;
  font-size: 1.4rem;
  padding-top: 0rem;
  margin-top: 0rem;
  padding-left: 1.6rem;
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
