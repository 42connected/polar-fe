import styled from '@emotion/styled';
import defaultTheme from '@/styles/theme';
import spinner from '@/assets/image/loading-spinner.gif';
import { useEffect } from 'react';

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
  background-color: rgba(246, 246, 246, 0.3);

  z-index: 999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const LoadingText = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  text-align: center;
`;

const text: string[] = [
  '별을 수집중입니다',
  '별과 연락을 주고받고 있습니다',
  '별지기가 요청을 수행중입니다',
  '새로운 행성을 찾는중입니다',
  '우주선과 연락을 주고 받고 있습니다',
  '폴라 함선과 연결중입니다',
  '신입 항해사가 운전중입니다',
  '숙련된 항해사가 운전중입니다',
  '재미 있는 여행을 계획중입니다',
  '북극성의 좌표를 찾았습니다',
  '목표를 향해 전진하고 있습니다',
];

function getRandomNumber(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function Loading() {
  useEffect(() => {
    document.body.style.overflow = `hidden`;
    return () => {
      document.body.style.overflow = `auto`;
    };
  }, []);

  return (
    <Background>
      <img src={spinner} alt="로딩중" width="5%" />
      <LoadingText>{`${
        text[getRandomNumber(0, text.length)]
      }. 잠시만 기다려주세요.`}</LoadingText>
    </Background>
  );
}
