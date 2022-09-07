import { ReportRowContainer } from './row-styled';
import styled from '@emotion/styled';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useRef, useState } from 'react';
import defaultTheme from '../../styles/theme';
import ReportStore from '../../states/repoort/ReportStore';
import { REPORT_STATE } from './report-form';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '../../states/error/ErrorStore';
import AuthStore from '../../states/auth/AuthStore';
import { OneButtonModal } from '../../components/modal/one-button-modal/one-button-modal';
import { CanvasModal } from './canvas-modal';
import { observer } from 'mobx-react-lite';

const Left = styled.div`
  display: flex;
  width: 25%;
  align-items: center;
  flex-direction: column;
  ${defaultTheme.fontSize.sizeSmall};
  ${defaultTheme.font.sebangGothic};
`;

const ReportSummaryTitle = styled.div`
  width: 100%;
  margin: 20px 0px 0px 40px;
  justify-content: left;
  ${defaultTheme.fontSize.sizeExtraSmall};
  ${defaultTheme.font.nanumGothic};
`;

const ReportQuestion = styled.div`
  ${defaultTheme.fontSize.sizeSmall};
  ${defaultTheme.font.nanumGothic};
  margin: 10px;
  width: 80%;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-line;
`;

const UploadFileContainer = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
`;

const DeleteImgButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -1rem;
  right: -1rem;
  width: 2rem;
  height: 2rem;
  z-index: 100;
  background-color: white;
  color: red;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const SignatureContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const UploadFileBox = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ButtonRow = styled.div`
  display: flex;
  width: 90%;
  justify-content: right;
`;

const Button = styled.button`
  font-family: 'NanumGothic';
  border-radius: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  text-decoration: none;
  background-color: #ffffff;
  color: black;
  padding: 5px 10px;
  margin: 5px;
  &:hover {
    background-color: #f6f6f6;
  }
  cursor: pointer;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const RightTitle = styled.div`
  width: 100%;
  margin: 20px 0px 0px 15px;
  justify-content: left;
  ${defaultTheme.fontSize.sizeMedium};
  ${defaultTheme.font.sebangGothic};
`;

const SignatureTitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: left;
  margin: 20px 0px 5px 15px;
  align-items: center;
`;

const SignatureTitle = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  ${defaultTheme.fontSize.sizeMedium};
  ${defaultTheme.font.sebangGothic};
`;

export const ReportRowSignature = observer(() => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(-1);
  const [signatureBlock, setSignatureBlock] = useState<boolean>(false);

  const UploadMentoringImg = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onUploadImage = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
          return;
        }
        if (ReportStore.report.imageUrl.length >= 2) {
          ErrorStore.on(
            '사진 파일은 최대 2개까지 업로드 할 수 있습니다.',
            ERROR_DEFAULT_VALUE.TITLE,
          );
          return;
        }
        if (e.target.files[0].size > 3000000) {
          ErrorStore.on(
            '3MB 이상 사진 파일은 업로드할 수 없습니다.',
            ERROR_DEFAULT_VALUE.TITLE,
          );
          return;
        }
        const img = new FormData();
        img.append('image', e.target.files[0]);
        ReportStore.uploadImage(
          ReportStore.report.id,
          AuthStore.getAccessToken(),
          img,
        );
      },

      [],
    );

    const uploadImg = useCallback(() => {
      if (!inputRef.current) {
        return;
      }
      inputRef.current.click();
    }, []);

    return (
      <>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={event => {
            onUploadImage(event);
            event.target.value = '';
          }}
          style={{ display: 'none' }}
        />
        {ReportStore.report.status !== REPORT_STATE.EDIT_IMPOSSIBLE && (
          <Button onClick={uploadImg}>가져오기</Button>
        )}
      </>
    );
  };

  return (
    <ReportRowContainer>
      {signatureBlock && (
        <CanvasModal
          CloseFunc={() => {
            setSignatureBlock(false);
          }}
        />
      )}
      {deleteModal && (
        <OneButtonModal
          TitleText="⚠️ 삭제 확인"
          Text={`정말 삭제하시겠습니까?\n삭제된 파일은 복구할 수 없습니다.`}
          XButtonFunc={() => {
            setDeleteModal(false);
          }}
          ButtonFunc={() => {
            setDeleteModal(false);
            ReportStore.deleteImage(
              ReportStore.report.id,
              AuthStore.getAccessToken(),
              imageIndex,
            );
          }}
          ButtonText="확인"
          ButtonBg={defaultTheme.colors.Red}
        />
      )}
      <Left>
        <SignatureTitleContainer>
          <SignatureTitle>서명란</SignatureTitle>
        </SignatureTitleContainer>
        <SignatureContainer>
          {ReportStore.report.signatureUrl ? (
            <UploadFileBox src={ReportStore.report.signatureUrl} />
          ) : (
            '서명 필요'
          )}
        </SignatureContainer>
        {ReportStore.report.status !== REPORT_STATE.EDIT_IMPOSSIBLE && (
          <ButtonRow>
            {ReportStore.report.signatureUrl && (
              <Button
                onClick={() => {
                  ReportStore.deleteSign(
                    ReportStore.report.id,
                    AuthStore.getAccessToken(),
                  );
                }}
              >
                삭제
              </Button>
            )}
            <Button
              onClick={() => {
                setSignatureBlock(true);
              }}
            >
              열기
            </Button>
          </ButtonRow>
        )}

        <SignatureTitleContainer>
          <SignatureTitle>증빙사진</SignatureTitle>
        </SignatureTitleContainer>
        <UploadFileContainer>
          {ReportStore?.report?.imageUrl?.map((e, i) => (
            <ImageContainer key={i}>
              <UploadFileBox src={e} />
              {ReportStore.report.status !== REPORT_STATE.EDIT_IMPOSSIBLE && (
                <DeleteImgButton
                  onClick={() => {
                    setImageIndex(i);
                    setDeleteModal(true);
                  }}
                >
                  <FontAwesomeIcon icon={faX} />
                </DeleteImgButton>
              )}
            </ImageContainer>
          ))}
        </UploadFileContainer>
        <ButtonRow>{UploadMentoringImg()}</ButtonRow>
      </Left>

      <Right>
        <RightTitle>카뎃 신청 메세지</RightTitle>
        <ReportSummaryTitle>&#183; 주제</ReportSummaryTitle>
        <ReportQuestion>
          {ReportStore.report.mentoringLogs.topic}
        </ReportQuestion>
        <ReportSummaryTitle>&#183; 궁금한 점</ReportSummaryTitle>
        <ReportQuestion>
          {ReportStore.report.mentoringLogs.content}
        </ReportQuestion>
      </Right>
    </ReportRowContainer>
  );
});
