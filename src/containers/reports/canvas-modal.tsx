import styled from '@emotion/styled';
import { faRotateRight, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ModalBackground,
  ModalButton,
  ModalButtonContainer,
} from '@/components/modal/modal-styled';
import AuthStore from '@/states/auth/AuthStore';
import ReportStore from '@/states/repoort/ReportStore';
import defaultTheme from '@/styles/theme';

const CanvasModalBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  padding: 20px;
`;

const CanvasTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CanvasModalTitle = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
`;

const CanvasContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0px;
  width: 200px;
  height: 200px;
  padding: 5px;
  background-color: #f6f6f6;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  vertical-align: top;
  resize: none;
`;

const FixableIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  opacity: 1;
  &:hover {
    opacity: 0.5;
  }
`;

interface Coordinate {
  x: number;
  y: number;
}

interface CanvasModalProps {
  CloseFunc: () => void;
}

export function CanvasModal(props: CanvasModalProps) {
  useEffect(() => {
    document.body.style.overflow = `hidden`;
    return () => {
      document.body.style.overflow = `auto`;
    };
  }, []);

  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined,
  );
  const [isPainting, setIsPainting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft - window.scrollX,
      y: event.pageY - canvas.offsetTop - window.scrollY,
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
      const img = new FormData();
      img.append('signature', sign);
      ReportStore.uploadImage(
        ReportStore.report.id,
        AuthStore.getAccessToken(),
        img,
      );
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

  return (
    <ModalBackground>
      <CanvasModalBox>
        <CanvasTop>
          <CanvasModalTitle>
            ✏️ 서명란{' '}
            <FixableIcon
              onClick={() => {
                clearCanvas();
              }}
            >
              <FontAwesomeIcon icon={faRotateRight} />
            </FixableIcon>
          </CanvasModalTitle>
          <FontAwesomeIcon
            icon={faX}
            size="2x"
            style={{ opacity: 0.3, cursor: 'pointer' }}
            onClick={() => props.CloseFunc()}
          />
        </CanvasTop>
        <CanvasContainer>
          <canvas ref={canvasRef} />
        </CanvasContainer>
        <ModalButtonContainer>
          <ModalButton
            onClick={() => {
              props.CloseFunc();
              saveCanvasImg();
            }}
            style={{
              backgroundColor: defaultTheme.colors.polarSimpleMain,
            }}
          >
            저장
          </ModalButton>
        </ModalButtonContainer>
      </CanvasModalBox>
    </ModalBackground>
  );
}
