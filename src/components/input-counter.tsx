import styled from '@emotion/styled';
import defaultTheme from '../styles/theme';

const Input = styled.textarea<InputCounterProps>`
  width: ${props => props.width ?? '80%'};
  height: 100px;
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  vertical-align: top;
  resize: none;
  &:focus {
    outline: none;
  }
  background-color: ${defaultTheme.colors.polarGray};
`;

export const Count = styled.div<InputCounterProps>`
  display: flex;
  width: ${props => props.width ?? '80%'};
  justify-content: right;
  margin: 5px;
  align-items: center;
  ${props => props.fontSize ?? defaultTheme.fontSize.sizeSmall};
  color: rgba(0, 0, 0, 0.5);
`;

interface InputCounterProps {
  setter?: (s: any) => void;
  value: string;
  maxLength?: number;
  disabled: boolean;
  width?: string;
  fontSize?: string;
}

export function InputCounter(props: InputCounterProps) {
  return (
    <>
      <Input
        onChange={e => {
          if (props.setter) {
            props.setter(e.target.value);
          }
        }}
        {...props}
        value={props.value}
        maxLength={props.maxLength}
        disabled={props.disabled}
      />
      {props.disabled ? null : (
        <Count {...props}>
          {props.value.length} / {props.maxLength}
        </Count>
      )}
    </>
  );
}
