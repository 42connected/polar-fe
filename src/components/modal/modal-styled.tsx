import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import defaultTheme from '../../styles/theme';

const Fade = keyframes`
  0% {
   opacity: 0;
  }
  10% {
    opacity: 0.1;
  }
  20% {
    opacity: 0.2;
  }
  30% {
    opacity: 0.3;
  }
  40% {
    opacity: 0.4;
  }
  50% {
   opacity: 0.5;
  }
  60% {
    opacity: 0.6;
  }
  70% {
    opacity: 0.7;
  }
  80% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.9;
  }
  100% {
   opacity: 1;
  }
 `;

export const ModalBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(246, 246, 246, 0.7);

  z-index: 1004;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  animation: ${Fade} 0.3s;
`;

export const ModalBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  padding: 20px;
`;

export const ModalTitle = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  text-align: center;
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  /*color: ${defaultTheme.fontColor.whiteColor};*/
`;

export const XButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ModalBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeSmall};
  width: 30rem;
  height: 10rem;
  word-break: break-all;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  width: 70%;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
`;

export const ModalButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 10px;
  border-radius: 10px;
  &:hover {
    opacity: 0.8;
  }
  cursor: pointer;
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  color: ${defaultTheme.fontColor.whiteColor};
  background-color: ${defaultTheme.colors.polarSimpleMain};
`;
