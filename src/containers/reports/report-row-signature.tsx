import { ReportRowContainer } from './row-styled';
import styled from '@emotion/styled';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef, useState } from 'react';
import defaultTheme from '../../styles/theme';
import ReportStore from '../../states/repoort/ReportStore';
import { observer } from 'mobx-react-lite';
import { REPORT_STATE } from './report-form';

const Left = styled.div`
  display: flex;
  width: 25%;
  align-items: center;
  flex-direction: column;
  ${defaultTheme.fontSize.sizeSmall};
  ${defaultTheme.font.sebangGothic};
  @media screen and (max-width: 800px) {
    font-size: 1rem;
  }
`;

const ReportSummaryTitle = styled.div`
  width: 100%;
  margin: 20px 0px 0px 40px;
  justify-content: left;
  ${defaultTheme.fontSize.sizeExtraSmall};
  ${defaultTheme.font.nanumGothic};
  @media screen and (max-width: 800px) {
    ${defaultTheme.fontSize.sizeSmall};
  }
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

const CanvasContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
  width: 80%;
  height: 200px;
  padding: 5px;
  background-color: #f6f6f6;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  vertical-align: top;
  resize: none;
`;

const UploadFileContainer = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
`;

const UploadFileBox = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 10px 0px;
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
  @media screen and (max-width: 900px) {
    ${defaultTheme.fontSize.sizeExtraSmall};
  }
  @media screen and (max-width: 800px) {
    ${defaultTheme.fontSize.sizeSmall};
  }
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
  @media screen and (max-width: 900px) {
    ${defaultTheme.fontSize.sizeExtraSmall};
  }
  @media screen and (max-width: 800px) {
    ${defaultTheme.fontSize.sizeSmall};
  }
`;

const FixableIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  &:hover {
    color: gray;
  }
`;

const UploadFile = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
`;

interface Coordinate {
  x: number;
  y: number;
}

// TODO: REFACTOR
const ReportRowSignature = observer(() => {
  const [signatureConfirm, setSignatureConfirm] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined,
  );
  const [isPainting, setIsPainting] = useState(false);
  const [uploadImage, setUploadImage] = useState<string[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate,
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(originalMousePosition.x, originalMousePosition.y);
      ctx.lineTo(newMousePosition.x, newMousePosition.y);
      ctx.closePath();
      ctx.stroke();
    }
  };

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  const paint = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition],
  );

  const stopPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    /*
    워터마크 ...
    */
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.fillStyle = '#999';
    ctx.textAlign = 'center';
    ctx.fillText('서명을 그려주세요', canvas.width / 2, canvas.height / 2);
    canvas.addEventListener('mousedown', watermark, false);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mousemove', paint);
    canvas.addEventListener('mouseup', stopPaint);
    canvas.addEventListener('mouseleave', stopPaint);
    return () => {
      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('mousemove', paint);
      canvas.removeEventListener('mouseup', stopPaint);
      canvas.removeEventListener('mouseleave', stopPaint);
    };
  }, [startPaint, paint, stopPaint]);

  const clearCanvas = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  const saveCanvasImg = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.toBlob(blob => {
      if (!blob) {
        return;
      }
      const sign = new File([blob], 'signature.png', { type: 'image/png' });
      ReportStore.save.append('signature', sign);
    });
  };

  function watermark() {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.removeEventListener('mousedown', watermark, false);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  /*
   * 파일 업로드
   */
  const UploadMentoringImg = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onUploadImage = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
          return;
        }
        if (e.target.files[0].size > 3000000) {
          alert('3MB 이상 파일은 업로드할 수 없습니다');
          return;
        }
        if (ReportStore.save.getAll('image').length > 2) {
          alert('사진은 최대 3장까지 업로드 할 수 있습니다');
          return;
        }
        ReportStore.save.append('image', e.target.files[0]);
        const fileName = e.target.files[0].name;
        if (e.target.files[0])
          setUploadImage(uploadImage => [...uploadImage, fileName]);
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
          onChange={onUploadImage}
          style={{ display: 'none' }}
        />
        {uploadImage.length > 0 ? (
          <Button
            onClick={() => {
              setUploadImage([]);
              ReportStore.save.delete('image');
            }}
          >
            전체 취소
          </Button>
        ) : (
          <></>
        )}
        {ReportStore.report.status === REPORT_STATE.EDIT_POSSIBLE ? (
          <>
            <Button onClick={uploadImg}>가져오기</Button>
          </>
        ) : null}
      </>
    );
  };

  return (
    <ReportRowContainer>
      <Left>
        <SignatureTitleContainer>
          <SignatureTitle>서명란</SignatureTitle>
          {ReportStore.report.status === REPORT_STATE.EDIT_IMPOSSIBLE ? null : (
            <FixableIcon
              onClick={() => {
                if (!signatureConfirm) {
                  clearCanvas();
                } else {
                  alert('확인 상태에서는 서명을 초기화 할 수 없습니다');
                }
              }}
            >
              <FontAwesomeIcon icon={faRotateRight} />
            </FixableIcon>
          )}
        </SignatureTitleContainer>
        {ReportStore.report.status === REPORT_STATE.EDIT_IMPOSSIBLE ? (
          <>
            <UploadFileBox src={ReportStore.report.signatureUrl} />
          </>
        ) : (
          <>
            <CanvasContainer>
              <canvas ref={canvasRef} />
            </CanvasContainer>
            <ButtonRow>
              {signatureConfirm ? (
                <>
                  <Button
                    onClick={() => {
                      setSignatureConfirm(false);
                      if (!canvasRef.current) {
                        return;
                      }
                      const canvas: HTMLCanvasElement = canvasRef.current;
                      canvas.addEventListener('mousedown', startPaint);
                      canvas.addEventListener('mousemove', paint);
                      canvas.addEventListener('mouseup', stopPaint);
                      canvas.addEventListener('mouseleave', stopPaint);
                    }}
                  >
                    취소
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      saveCanvasImg();
                      setSignatureConfirm(true);
                      if (!canvasRef.current) {
                        return;
                      }
                      const canvas: HTMLCanvasElement = canvasRef.current;
                      canvas.removeEventListener('mousedown', startPaint);
                      canvas.removeEventListener('mousemove', paint);
                      canvas.removeEventListener('mouseup', stopPaint);
                      canvas.removeEventListener('mouseleave', stopPaint);
                    }}
                  >
                    확인
                  </Button>
                </>
              )}
            </ButtonRow>
          </>
        )}
        <SignatureTitleContainer>
          <SignatureTitle>증빙사진</SignatureTitle>
        </SignatureTitleContainer>
        <UploadFileContainer>
          {ReportStore.report.status === REPORT_STATE.EDIT_IMPOSSIBLE
            ? ReportStore?.report?.imageUrl?.map((e, i) => (
                <UploadFileBox src={e} key={i} />
              ))
            : null}
        </UploadFileContainer>
        {uploadImage.map((e, i) => (
          <UploadFile key={i}>
            <div key={i}>
              {i + 1}. {e}
            </div>
          </UploadFile>
        ))}
        <ButtonRow>{UploadMentoringImg()}</ButtonRow>
        <br />* 제출 시 업로드 된 파일만 최종 적용됩니다.
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

export default ReportRowSignature;
