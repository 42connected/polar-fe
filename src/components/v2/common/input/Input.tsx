import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import defaultTheme from '@/styles/themeV2';

/**
 * 스타일링 된 `Input` 컴포넌트
 * @param {*} height InputHTMLAttributes인 height (기본: `15rem`)
 * @param {*} width InputHTMLAttributes인 width (기본: `2rem`)
 */
const Input = styled.input<InputHTMLAttributes<HTMLInputElement>>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-style: solid;

  width: ${props => props.height ?? '15rem'};
  height: ${props => props.width ?? '2rem'};

  font-family: ${defaultTheme.font.nanumGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeMedium};
  font-weight: ${defaultTheme.fontWeight.weightRegular};

  color: ${defaultTheme.colors.darkGray};
  border-color: ${defaultTheme.colors.inputBoxColor};
  border-width: 1px;
  border-radius: 8px;

  &:focus {
    outline: none;
    border-style: solid;
    border-width: 1px;
    border-color: ${defaultTheme.colors.middleGray};
  }
`;

export default Input;
