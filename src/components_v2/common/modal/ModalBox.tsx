import styled from 'styled-components';
import defaultTheme from '../../../styles/theme';

const ModalBox = styled.div`
  position: relative;
  flex-direction: column;
  display: flex;
  align-items: center;
  background-color: ${defaultTheme.colors.white};
  box-shadow: rgba(0, 0, 0, 0.3) 0rem 0.3rem 0.4rem 0.1rem;
  border-radius: 1rem;
  padding-top: 2.5rem;
  overflow: auto;
`;

export const DetailModalBox = styled(ModalBox)`
  width: 31rem;
  height: 43.5rem;
`;

export const ConfirmModalBox = styled(ModalBox)`
  width: 21.3rem;
  height: 12rem;
`;

export const ErrorModalBox = styled(ModalBox)`
  width: 34rem;
  height: 20.5rem;
`;

export const GuideModalBox = styled(ModalBox)`
  width: 31rem;
  height: 43.5rem;
`;
