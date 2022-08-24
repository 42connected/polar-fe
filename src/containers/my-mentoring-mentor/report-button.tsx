import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultTheme from '../../styles/theme';

const TableColumnReport = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

const LinkContainer = styled(Link)`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
  color: ${defaultTheme.colors.polarSimpleMain};
  font-weight: bold;
`;

export interface ReportButtonProps {
  mentoringLogStatus: string;
  reportId: string;
}

const REPORT_BUTTON_STATUS = {
  WRITING: '작성중',
  WRITE_NEED: '작성필요',
  WRITE_IMPOSSIBLE: '작성불가',
};

export function ReportButton(props: ReportButtonProps) {
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if (props.mentoringLogStatus !== '완료') {
      setStatus(REPORT_BUTTON_STATUS.WRITE_IMPOSSIBLE);
    } else if (!props.reportId) {
      setStatus(REPORT_BUTTON_STATUS.WRITE_NEED);
    } else {
      setStatus(REPORT_BUTTON_STATUS.WRITING);
    }
  }, []);

  if (status === REPORT_BUTTON_STATUS.WRITE_IMPOSSIBLE) {
    return <TableColumnReport>{status}</TableColumnReport>;
  }
  return (
    <LinkContainer to={`/mentorings/reports/${props.reportId}`}>
      {status}
    </LinkContainer>
  );
}
