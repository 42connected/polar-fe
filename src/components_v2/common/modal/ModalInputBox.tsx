import styled from 'styled-components';
import defaultTheme from '@/styles/themeV2';

const ModalInputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 10.6rem;
  margin: 1rem 0;
`;

const ModalInputTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  font-family: ${defaultTheme.font.sebangGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeSmall};
  color: ${defaultTheme.colors.polarBlue};
`;

const ModalTextBox = styled.textarea`
  width: 100% - 0.4rem;
  height: 8.6rem;
  border: ${defaultTheme.colors.brightGray} 0.1rem solid;
  resize: none;
  background-color: ${defaultTheme.colors.inputBoxColor};
  font-family: ${defaultTheme.font.sebangGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeSmall};
  outline: none;
  padding: 0.4rem;
  letter-spacing: 0.03rem;
  line-height: 1.3rem;
`;

interface ModalInputBoxProps {
  title: string;
  content: string;
}

function ModalInputBoxResult(props: ModalInputBoxProps) {
  const { title, content } = props;
  return (
    <ModalInputBox>
      <ModalInputTitle>{title}</ModalInputTitle>
      <ModalTextBox value={content} readOnly />
    </ModalInputBox>
  );
}

export default ModalInputBoxResult;
