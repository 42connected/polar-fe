import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import { darken } from '@mui/material';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  width?: string;
  height?: string;
  color?: string;
  fontFrame?: string;
  font?: string;
  boxShadow?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

const ButtonStyle = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: ${props => props.borderRadius ?? '1rem'};
  border-width: ${props => props.borderWidth ?? '0rem'};
  border-style: solid;
  border-color: ${props => props.borderColor ?? theme.fontColor.titleColor};
  width: ${props => props.width ?? '7.5rem'};
  height: ${props => props.height ?? '2.7rem'};
  box-shadow: ${props => props.boxShadow ?? ''};
  color: ${props => props.color ?? theme.colors.backgoundWhite};
  background-color: ${props =>
    props.backgroundColor ?? theme.colors.polarBrightMain};
  ${props => props.fontFrame ?? theme.fontFrame.bodyMiddle};
  ${props => props.font ?? theme.font.sebangGothic};
  &:hover {
    background-color: ${props =>
      props.backgroundColor
        ? darken(props.backgroundColor, 0.05)
        : darken(theme.colors.polarBrightMain, 0.05)};
  }
  &:active {
    background-color: ${props =>
      props.backgroundColor
        ? darken(props.backgroundColor, 0.15)
        : darken(theme.colors.polarBrightMain, 0.15)};
  }
`;

function Button(props: ButtonProps) {
  return <ButtonStyle {...props}>{props.text}</ButtonStyle>;
}

export default Button;
