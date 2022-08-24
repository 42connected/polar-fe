import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import defaultTheme from '../../styles/theme';

const StatusColumn = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

export interface ReportButtonProps {
  status: string;
}

const MENTORING_STATUS = {
  WAIT: '대기중',
  CONFIRM: '확정',
  DONE: '완료',
  CANCLE: '취소',
};

export function StatusButton(props: ReportButtonProps) {
  const [underLine, setUnderLine] = useState<boolean>(false);

  useEffect(() => {
    if (props.status === MENTORING_STATUS.WAIT) {
      setUnderLine(true);
    } else if (props.status === MENTORING_STATUS.CONFIRM) {
      setUnderLine(true);
    }
  }, []);

  return (
    <>
      {underLine ? (
        <StatusColumn
          style={{
            color: defaultTheme.colors.polarSimpleMain,
            textDecoration: 'underline',
            fontWeight: 'bold',
          }}
        >
          {props.status}
        </StatusColumn>
      ) : (
        <StatusColumn>{props.status}</StatusColumn>
      )}
    </>
  );
}
