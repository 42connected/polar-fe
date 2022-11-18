import styled from '@emotion/styled';
import ReportStore from '@/states/repoort/ReportStore';
import defaultTheme from '@/styles/theme';
import { REPORT_STATE } from '@/containers/reports/report-form';

const PageTitle = styled.div`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeMedium};
  border-top: 2px solid black;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px 0px 20px 30px;
  margin: 50px 0px;
`;

export interface TitleProps {
  title: string;
}

export function Title(props: TitleProps) {
  return (
    <>
      <PageTitle>
        {props.title}
        {ReportStore.report.status === REPORT_STATE.EDIT_IMPOSSIBLE ? (
          <> (작성 완료됨, 수정불가)</>
        ) : (
          <></>
        )}
      </PageTitle>
    </>
  );
}
