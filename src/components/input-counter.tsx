import styled from '@emotion/styled';
import defaultTheme from '../styles/theme';

const Input = styled.textarea`
  width: 80%;
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

export const Count = styled.div`
  display: flex;
  width: 80%;
  justify-content: right;
  margin: 5px;
  align-items: center;
  ${defaultTheme.fontSize.sizeSmall};
  color: rgba(0, 0, 0, 0.5);
`;

interface InputCounterProps {
  setter?: (s: string) => void;
  value: string;
  maxLength?: number;
  disabled: boolean;
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
        value={props.value}
        maxLength={props.maxLength}
        disabled={props.disabled}
      />
      {props.disabled ? null : (
        <Count>
          {props.value.length} / {props.maxLength}
        </Count>
      )}
    </>
  );
}
