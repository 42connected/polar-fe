import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import { darken } from '@mui/material';

export interface Button1Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  borderRadius?: string;
  borderWidth?: string;
  width?: string;
  height?: string;
  color?: string;
  fontSize?: string;
  boxShadow?: string;
  backgroundColor?: string;
  activeBackgroundColor?: string;
  activeColor?: string;
}

const Button1 = styled.button<Button1Props>`
  color: ${p => p.color};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${p => p.borderRadius ?? '1rem'};
  border-width: ${p => p.borderWidth ?? '0rem'};
  width: ${p => p.width ?? '7.5rem'};
  height: ${p => p.height ?? '2.7rem'};
  box-shadow: ${p => p.boxShadow ?? ''};
  color: ${p => p.color ?? theme.colors.backgoundWhite};
  background-color: ${p => p.backgroundColor ?? theme.colors.polarBrightMain};
  ${p => p.fontSize ?? theme.font.bodyMiddle};
  &:active {
    background-color: ${p =>
      p.backgroundColor
        ? darken(p.backgroundColor, 0.15)
        : darken(theme.colors.polarBrightMain, 0.15)};
  }
`;

export default Button1;
