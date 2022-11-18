import React from 'react';
import styled, { css } from 'styled-components';
import defaultTheme from '@/styles/themeV2';

interface BtnProps {
  type: 'submit' | 'button';
  bgColor?: string;
  textColor?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  size: 'large' | 'medium' | 'small' | 'modalMedium' | 'modalSmall';
  border?: string;
  onClick?: any;
  shadow?: string;
  radius?: string;
}

const sizes = {
  large: {
    height: '4rem',
    fontSize: defaultTheme.mobileFontSize.sizeMedium,
  },
  medium: {
    height: '3rem',
    fontSize: defaultTheme.mobileFontSize.sizeMedium,
  },
  small: {
    height: '2rem',
    fontSize: defaultTheme.mobileFontSize.sizeSmall,
  },
  modalMedium: {
    height: '2.5rem',
    fontSize: defaultTheme.mobileFontSize.sizeMedium,
  },
  modalSmall: {
    height: '3rem',
    fontSize: defaultTheme.mobileFontSize.sizeMedium,
  },
};

const fullWidthStyle = css<BtnProps>`
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
      justify-content: center;
      & + & {
        margin-left: 0;
        margin-top: 1rem;
      }
    `}
`;

const sizeStyles = css<BtnProps>`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

const StyledBtn = styled.button<BtnProps>`
  display: inline-flex;
  outline: none;
  cursor: pointer;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: ${props => props.radius};
  box-shadow: ${props => props.shadow};
  color: ${props => props.textColor};
  border: ${props => props.border};
  background-color: ${props => props.bgColor};
  font-size: ${defaultTheme.mobileFontSize.sizeMedium};
  font-weight: ${defaultTheme.fontWeight.weightExtraBold};
  transition: background-color 0.2s, color 0.2s ease-in-out;
  & + & {
    margin-left: 1rem;
  }
  ${sizeStyles}
  ${fullWidthStyle}
`;

export default function Button({
  type,
  bgColor,
  textColor,
  children,
  fullWidth,
  size,
  border,
  onClick,
  shadow,
  radius,
}: BtnProps) {
  return (
    <StyledBtn
      type={type}
      bgColor={bgColor}
      textColor={textColor}
      fullWidth={fullWidth}
      size={size}
      border={border}
      shadow={shadow}
      radius={radius}
      onClick={(e: any) => {
        if (onClick) {
          onClick(e);
        }
        (e.target as HTMLButtonElement).blur();
      }}
    >
      {children}
    </StyledBtn>
  );
}

Button.defaultProps = {
  bgColor: `${defaultTheme.colors.polarBlue}`,
  textColor: `${defaultTheme.colors.white}`,
  fullWidth: false,
  border: 'none',
  onClick: undefined,
  shadow: `${defaultTheme.shadow.defaultShadow}`,
  radius: '1rem',
};
