import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import AuthStore from '@/states/auth/AuthStore';
import ReportStore from '@/states/repoort/ReportStore';
import defaultTheme from '@/styles/theme';
import { MENTORING_STATUS } from '@/containers/my-mentoring-mentor/modal/apply-detail-modal';

const TableColumnReport = styled.div`
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

const LinkContainer = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
  color: ${defaultTheme.colors.polarSimpleMain};
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    opacity: 0.6;
    text-underline-position: under;
  }
`;

export interface ReportButtonProps {
  mentoringLogStatus: string;
  report: {
    id: string;
    status: string;
  };
  mentoringId: string;
}

const REPORT_BUTTON_STATUS = {
  WRITING: '작성중',
  WRITE_NEED: '작성필요',
  WRITE_IMPOSSIBLE: '작성불가',
  DONE: '작성완료',
};

export function ReportButton(props: ReportButtonProps) {
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if (
      props.mentoringLogStatus === MENTORING_STATUS.WAITING ||
      props.mentoringLogStatus === MENTORING_STATUS.CONFIRM ||
      props.mentoringLogStatus === MENTORING_STATUS.CANCLE
    ) {
      setStatus(REPORT_BUTTON_STATUS.WRITE_IMPOSSIBLE);
    } else if (props.mentoringLogStatus === MENTORING_STATUS.DONE) {
      if (props?.report?.id) {
        // DONE, WRITING...
        setStatus(props?.report?.status);
      } else {
        setStatus(REPORT_BUTTON_STATUS.WRITE_NEED);
      }
    }
  }, []);

  /**
   * 작성 불가
   */
  if (status === REPORT_BUTTON_STATUS.WRITE_IMPOSSIBLE) {
    return <TableColumnReport>{status}</TableColumnReport>;
  }

  /**
   * 작성 가능
   */
  if (status === REPORT_BUTTON_STATUS.WRITE_NEED) {
    return (
      <LinkContainer
        onClick={async () => {
          await ReportStore.createReport(
            props.mentoringId,
            AuthStore.getAccessToken(),
          );
        }}
      >
        {status}
      </LinkContainer>
    );
  }

  /**
   * 작성 완료, 작성중
   */
  return (
    <LinkContainer
      onClick={() => {
        document.location.href = `/mentorings/reports/${props?.report?.id}`;
      }}
    >
      {status}
    </LinkContainer>
  );
}
