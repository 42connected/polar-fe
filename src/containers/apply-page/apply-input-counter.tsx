import styled from '@emotion/styled';
import theme from '../../styles/theme';

const Input = styled.textarea<InputCounterProps>`
  margin-top: 3rem;
  background-color: ${theme.colors.backgoundWhite};
  width: ${props => props.width ?? '80%'};
  height: ${props => props.height ?? '100px'};
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  vertical-align: top;
  resize: none;
  ${theme.font.nanumGothic};
  &:focus {
    outline: none;
  }
  color: ${theme.colors.blackThree};
`;

export const Count = styled.div<InputCounterProps>`
  display: flex;
  width: ${props => props.width ?? '80%'};
  justify-content: right;
  margin: 5px;
  align-items: center;
  ${props => props.fontSize ?? theme.fontSize.sizeSmall};
  color: rgba(0, 0, 0, 0.5);
`;

interface InputCounterProps {
  setter?: (s: any) => void;
  value: string;
  maxLength?: number;
  disabled: boolean;
  width?: string;
  fontSize?: string;
  height?: string;
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
