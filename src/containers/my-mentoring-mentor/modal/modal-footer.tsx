import styled from '@emotion/styled';
import defaultTheme from '../../../styles/theme';

const ModalFooterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Button = styled.div`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  color: ${defaultTheme.fontColor.whiteColor};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  margin: 10px 20px;
  border-radius: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

interface ModalFooter {
  id: string;
  status: string;
  isReject: boolean;
  setIsReject: (b: boolean) => void;
  rejectReason: string;
}

export function ModalFooter(props: ModalFooter) {
  if (props.status === '대기중') {
    if (props.isReject) {
      return (
        <ModalFooterContainer>
          <Button style={{ backgroundColor: defaultTheme.colors.Red }}>
            거절
          </Button>
          <Button
            style={{ backgroundColor: 'gray' }}
            onClick={() => {
              props.setIsReject(false);
            }}
          >
            취소
          </Button>
        </ModalFooterContainer>
      );
    }
    return (
      <ModalFooterContainer>
        <Button
          style={{ backgroundColor: defaultTheme.colors.polarSimpleMain }}
        >
          수락
        </Button>
        <Button
          style={{ backgroundColor: 'gray' }}
          onClick={() => {
            props.setIsReject(true);
          }}
        >
          거절
        </Button>
      </ModalFooterContainer>
    );
  } else if (props.status === '확정') {
    if (props.isReject) {
      return (
        <ModalFooterContainer>
          <Button style={{ backgroundColor: defaultTheme.colors.Red }}>
            거절
          </Button>
          <Button
            style={{ backgroundColor: 'gray' }}
            onClick={() => {
              props.setIsReject(false);
            }}
          >
            취소
          </Button>
        </ModalFooterContainer>
      );
    }
    return (
      <ModalFooterContainer>
        <Button style={{ backgroundColor: 'gray' }}>거절</Button>
      </ModalFooterContainer>
    );
  }
  return <></>;
}
