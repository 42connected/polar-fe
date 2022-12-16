import styled from '@emotion/styled';
import ReportStore from '@/states/repoort/ReportStore';
import defaultTheme from '@/styles/theme';
import { REPORT_STATE } from '@/containers/v1/reports/report-form';

const PageTitle = styled.div`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeMedium};
  border-top: 2px solid black;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px 0px 20px 30px;
  margin: 50px 0px;
  display: flex;
`;

export interface TitleProps {
  title: string;
}

export function Title(props: TitleProps) {
  return (
    <>
      <PageTitle>
        {props.title}
        {ReportStore.report.status === REPORT_STATE.EDIT_IMPOSSIBLE && (
          <> (작성 완료됨, 수정불가)</>
        )}
        {ReportStore.report.status === REPORT_STATE.EDIT_ONLYONE && (
          <> (수정 기간, 제출 후에도 수정 가능)</>
        )}
      </PageTitle>
    </>
  );
}
