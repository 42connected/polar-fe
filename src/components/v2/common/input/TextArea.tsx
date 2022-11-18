import styled from 'styled-components';
import { InputHTMLAttributes, useState } from 'react';
import defaultTheme from '@/styles/themeV2';

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
}

const Textarea = styled.textarea<Props>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-style: solid;

  width: ${props => props.width || '33rem'};
  height: ${props => props.height || '20rem'};
  padding: 0.5rem;

  resize: none;

  font-family: ${defaultTheme.font.nanumGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeMedium};
  font-weight: ${defaultTheme.fontWeight.weightRegular};
  text-align: left;

  color: ${defaultTheme.colors.black};
  background-color: ${defaultTheme.colors.inputBoxColor};
  border-color: ${defaultTheme.colors.brightGray};
  border-width: 1px;
  border-radius: 8px;

  &:focus {
    outline: none;
    border-style: solid;
    border-width: 1px;
    border-color: ${defaultTheme.colors.simpleGray};
  }
`;

const CountText = styled.span`
  color: ${defaultTheme.colors.darkGray};

  font-family: ${defaultTheme.font.sebangGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeSmall};
  font-weight: ${defaultTheme.fontWeight.weightRegular};

  padding-top: 0.5rem;
  margin-right: 0.7rem;
`;

const Box = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: flex-end;
`;

/**
 * 오른쪽 하단에 글자수를 보여주는 `textarea` 컴포넌트
 * @param {*} height InputHTMLAttributes인 height (기본:  `33rem`)
 * @param {*} width InputHTMLAttributes인 width (기본: `20rem`)
 * @param {number} maxLength `number` 최대 글자수 (기본: `500자`)
 */
function TextArea({ maxLength, placeholder, onChange, ...others }: Props) {
  const [count, setCount] = useState<number>(0);

  return (
    <Box>
      <Textarea
        maxLength={maxLength}
        spellCheck="false"
        onChange={e => {
          if (onChange) onChange(e);
          setCount(e.target.value.length);
        }}
        {...others}
      />
      <CountText>
        {count}/{maxLength}
      </CountText>
    </Box>
  );
}

TextArea.defaultProps = {
  maxLength: 500,
};

export default TextArea;
