import styled from '@emotion/styled';
import { useState } from 'react';
import defaultTheme from '../../../styles/theme';
import { ModalBox } from './box';
import { Confirm } from './status/confirm';
import { Wait } from './status/wait';

export const Background = styled.div`
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

  z-index: 999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

interface ModalProps {
  isWait: boolean;
}

export function Modal(props: ModalProps) {
  const [input, setInput] = useState<string>('');

  return (
    <Background>
      {props.isWait ? (
        <ModalBox
          title={'멘토링 신청 세부사항'}
          status={'대기중'}
          button1={'수락'}
          button1bg={defaultTheme.colors.polarSimpleMain}
          button2={'거절'}
          button2bg={'gray'}
          button1fn={() => {
            console.log('1');
          }}
          button2fn={() => {
            console.log('2');
          }}
          innerbox={Wait}
          innerboxProps={{
            cadetName: '공현솔',
            cadetIntraId: 'hkong',
            cadetIsCommon: true,
            mentoringTopic: 'Nestjs 프로젝트 조언',
          }}
          setter={setInput}
        />
      ) : (
        <ModalBox
          title={'멘토링 신청 세부사항'}
          status={'확정'}
          button1={'거절'}
          button1bg={defaultTheme.colors.polarGray}
          button2={'나가기'}
          button2bg={'gray'}
          button1fn={() => {
            console.log('3');
          }}
          button2fn={() => {
            console.log('4');
          }}
          innerbox={Confirm}
          innerboxProps={{
            cadetName: '공현솔',
            cadetIntraId: 'hkong',
            cadetIsCommon: true,
            mentoringTopic: 'Nestjs 프로젝트 조언',
          }}
          setter={setInput}
        />
      )}
    </Background>
  );
}
