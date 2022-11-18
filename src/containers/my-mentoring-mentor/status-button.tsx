import styled from '@emotion/styled';
import defaultTheme from '@/styles/theme';
import { MentoringLogs } from '@/states/my-mentoring-mentor/MentorLogStore';

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

const LinkStatusColumn = styled.div`
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
  &:hover {
    text-decoration: underline wavy;
    opacity: 0.6;
    text-underline-position: under;
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
  log: MentoringLogs;
  setApplyModal: (b: boolean) => void;
  setLog: (l: MentoringLogs) => void;
}

export function StatusButton(props: ReportButtonProps) {
  return (
    <>
      {props.status === MENTORING_STATUS.WAIT ||
      props.status === MENTORING_STATUS.CONFIRM ? (
        <LinkStatusColumn
          style={{
            color: defaultTheme.colors.polarSimpleMain,
            fontWeight: 'bold',
          }}
          onClick={() => {
            props.setLog(props.log);
            props.setApplyModal(true);
          }}
        >
          {props.status}
        </LinkStatusColumn>
      ) : (
        <StatusColumn>{props.status}</StatusColumn>
      )}
    </>
  );
}
