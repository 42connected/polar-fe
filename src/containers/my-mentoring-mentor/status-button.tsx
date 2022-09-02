import styled from '@emotion/styled';
import defaultTheme from '../../styles/theme';

const StatusColumn = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  @media screen and (max-width: 800px) {
    ${defaultTheme.fontSize.sizeSmall};
  }
  @media screen and (max-width: 700px) {
    font-size: 1rem;
  }
`;

const MENTORING_STATUS = {
  WAIT: '대기중',
  CONFIRM: '확정',
  DONE: '완료',
  CANCLE: '취소',
};

export interface ReportButtonProps {
  status: string;
}

export function StatusButton(props: ReportButtonProps) {
  return (
    <>
      {props.status === MENTORING_STATUS.WAIT ||
      props.status === MENTORING_STATUS.CONFIRM ? (
        <StatusColumn
          style={{
            color: defaultTheme.colors.polarSimpleMain,
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
