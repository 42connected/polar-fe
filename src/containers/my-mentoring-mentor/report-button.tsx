import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import AuthStore from '../../states/auth/AuthStore';
import ReportStore from '../../states/repoort/ReportStore';
import defaultTheme from '../../styles/theme';

const TableColumnReport = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

const LinkContainer = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
  color: ${defaultTheme.colors.polarSimpleMain};
  font-weight: bold;
  text-decoration: underline;
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
      props.mentoringLogStatus === '대기중' ||
      props.mentoringLogStatus === '확정'
    ) {
      setStatus(REPORT_BUTTON_STATUS.WRITE_IMPOSSIBLE);
    } else if (props.mentoringLogStatus === '완료') {
      if (props?.report?.id) {
        if (props?.report?.status === '작성완료') {
          setStatus(REPORT_BUTTON_STATUS.DONE);
        } else {
          setStatus(REPORT_BUTTON_STATUS.WRITING);
        }
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
          // FIXME: AuthStore ...
          await AuthStore.Login();
          await ReportStore.createReport(props.mentoringId, AuthStore.jwt);
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
