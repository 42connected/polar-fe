import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

interface MenuBoxProps {
    width?: string;
    height?: string;
}

const MenuBox = styled.div<MenuBoxProps>`
  border-top: 2px solid ${props => props.theme.colors.blackThree};
  border-bottom: 1px solid ${props => props.theme.colors.blackThree};
  width: ${props => props.width ?? '100%'};
  height: ${props => props.height ?? '3rem'};
  box-sizing: border-box;
  padding-left: 0.5rem;
  padding-bottom: 0.2rem;
  display: flex;
  align-items: flex-end;
`
export default MenuBox;
