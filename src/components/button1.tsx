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
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: ${props => props.borderRadius ?? '1rem'};
  border-width: ${props => props.borderWidth ?? '0rem'};
  width: ${props => props.width ?? '7.5rem'};
  height: ${props => props.height ?? '2.7rem'};
  box-shadow: ${props => props.boxShadow ?? ''};
  color: ${props => props.color ?? theme.colors.backgoundWhite};
  background-color: ${props =>
    props.backgroundColor ?? theme.colors.polarBrightMain};
  ${props => props.fontSize ?? theme.fontFrame.bodyMiddle};
  &:active {
    background-color: ${props =>
      props.backgroundColor
        ? darken(props.backgroundColor, 0.15)
        : darken(theme.colors.polarBrightMain, 0.15)};
  }
`;

export default Button1;
