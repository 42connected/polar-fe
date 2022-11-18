import styled from 'styled-components';
import defaultTheme from '@/styles/themeV2';

const ModalInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 1.2rem;
`;

const ModalInfoTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 7.3rem;
  font-family: ${defaultTheme.font.sebangGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeSmall};
  letter-spacing: 0.03rem;
  line-height: 1.3rem;
`;

const ModalInfoContent = styled.div`
  display: flex;
  justify-content: flex-start;
  text-align: left;
  width: 15.7rem;
  font-family: ${defaultTheme.font.sebangGothic};
  font-size: ${defaultTheme.mobileFontSize.sizeSmall};
  letter-spacing: 0.03rem;
  line-height: 1.3rem;
`;

interface ModalInfoRowProps {
  title: string;
  content: any;
}

function ModalInfoRowResult(props: ModalInfoRowProps) {
  const { title, content } = props;
  return (
    <ModalInfoRow>
      <ModalInfoTitle>{title}</ModalInfoTitle>
      <ModalInfoContent>{content}</ModalInfoContent>
    </ModalInfoRow>
  );
}

export default ModalInfoRowResult;
