import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

export interface checkBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

const CheckBoxStyle = styled.input.attrs({ type: 'checkbox' })`
  width: 2rem;
  height: 2rem;
  accent-color: ${theme.colors.polarSimpleMain};
  margin: auto;
`;

function CheckBox(props: checkBoxProps) {
  return <CheckBoxStyle onChange={props.onChange} checked={props.checked} />;
}

export default CheckBox;
