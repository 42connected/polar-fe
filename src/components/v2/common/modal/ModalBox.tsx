import styled from 'styled-components';
import defaultTheme from '@/styles/themeV2';

const ModalBox = styled.div`
  position: relative;
  flex-direction: column;
  display: flex;
  align-items: center;
  background-color: ${defaultTheme.colors.white};
  box-shadow: rgba(0, 0, 0, 0.3) 0rem 0.3rem 0.4rem 0.1rem;
  border-radius: 1rem;
  padding: 2rem;
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

export const MentoringListModalBox = styled(ModalBox)`
  padding: 1.5rem;
  padding-bottom: 1rem;
  margin: 1rem;
  width: 31.8rem;
  height: 16.5rem;
`;
