import styled from '@emotion/styled';
import {
  AXIOS_METHOD_WITH_DATA,
  axiosWithData,
} from '../../../context/axios-interface';
import AuthStore from '../../../states/auth/AuthStore';
import ErrorStore, {
  ERROR_DEFAULT_VALUE,
} from '../../../states/error/ErrorStore';
import LoadingStore from '../../../states/loading/LoadingStore';
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
  cursor: pointer;
`;

interface ModalFooterProps {
  id: string;
  status: string;
  isReject: boolean;
  setIsReject: (b: boolean) => void;
  rejectReason: string;
  selectedTime: Date[] | null;
  setModal: (b: boolean) => void;
  setModalText: (s: string) => void;
}

export function ModalFooter(props: ModalFooterProps) {
  const rejectMentoring = async (
    mentoringLogId: string,
    rejectMessage: string,
    token: string,
  ) => {
    LoadingStore.on();

    await axiosWithData(
      AXIOS_METHOD_WITH_DATA.PACTH,
      `/mentoring-logs/reject`,
      {
        mentoringLogId: mentoringLogId,
        rejectMessage: rejectMessage,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    )
      .then(() => {
        props.setModalText('해당 멘토링이 취소되었습니다.');
        props.setModal(true);
      })
      .catch(err => {
        ErrorStore.on(err?.response?.data?.message, ERROR_DEFAULT_VALUE.TITLE);
      });
    LoadingStore.off();
  };

  return (
    <>
      {props.isReject && (
        <ModalFooterContainer>
          <Button
            style={{ backgroundColor: defaultTheme.colors.Red }}
            onClick={() => {
              if (props?.rejectReason?.length < 1) {
                ErrorStore.on(
                  '취소 사유를 입력해주세요',
                  ERROR_DEFAULT_VALUE.TITLE,
                );
                return;
              }
              rejectMentoring(
                props.id,
                props.rejectReason,
                AuthStore.getAccessToken(),
              );
            }}
          >
            취소
          </Button>
          <Button
            style={{ backgroundColor: 'gray' }}
            onClick={() => {
              props.setIsReject(false);
            }}
          >
            닫기
          </Button>
        </ModalFooterContainer>
      )}

      {(props.status === '대기중' || props.status === '확정') &&
        !props.isReject && (
          <ModalFooterContainer>
            <Button
              style={{ backgroundColor: 'gray' }}
              onClick={() => {
                props.setIsReject(true);
              }}
            >
              취소
            </Button>
          </ModalFooterContainer>
        )}

      {props.status !== '대기중' &&
        props.status !== '확정' &&
        !props.isReject && <ModalFooterContainer />}
    </>
  );
}
