import {
  ReportRowContainer,
  ReportRowTitle,
  ReportRowContent,
} from './row-styled';
import styled from '@emotion/styled';
import { Rating } from '@mui/material';
import defaultTheme from '../../styles/theme';
import ReportStore from '../../states/repoort/ReportStore';
import { REPORT_STATE } from './report-form';

const ReportRowContentTitie = styled.div`
  width: 100%;
  ${defaultTheme.fontSize.sizeMedium};
  ${defaultTheme.font.sebangGothic};
  margin: 20px 0px 0px 15px;
  justify-content: left;
`;

const ReportFeedbackRow = styled.div`
  ${defaultTheme.fontSize.sizeExtraSmall};
  ${defaultTheme.font.nanumGothic};
  display: flex;
  width: 50%;
  margin: 10px;
  justify-content: space-between;
  align-items: center;
`;

export function ReportRowFeedback() {
  return (
    <ReportRowContainer>
      <ReportRowTitle>피드백</ReportRowTitle>
      <ReportRowContent>
        <ReportRowContentTitie>멘토링 피드백</ReportRowContentTitie>
        <ReportFeedbackRow>
          1. 교육생이 궁금한 것을 잘 정리해 왔나?
          <Rating
            name="simple-controlled"
            defaultValue={
              ReportStore?.report?.feedback1 ? ReportStore.report.feedback1 : 5
            }
            onChange={(event, newValue) => {
              if (newValue) {
                ReportStore.setFeedback1(newValue);
              }
            }}
            readOnly={
              ReportStore.report.status === REPORT_STATE.EDIT_POSSIBLE
                ? false
                : true
            }
          />
        </ReportFeedbackRow>
        <ReportFeedbackRow>
          2. 교육생과 함께 한 시간이 만족스러웠나?
          <Rating
            name="simple-controlled"
            defaultValue={
              ReportStore?.report?.feedback2 ? ReportStore.report.feedback2 : 5
            }
            onChange={(event, newValue) => {
              if (newValue) {
                ReportStore.setFeedback2(newValue);
              }
            }}
            readOnly={
              ReportStore.report.status === REPORT_STATE.EDIT_POSSIBLE
                ? false
                : true
            }
          />
        </ReportFeedbackRow>
        <ReportFeedbackRow>
          3. 교육생이 전달한 내용을 잘 이해했나?
          <Rating
            name="simple-controlled"
            defaultValue={
              ReportStore?.report?.feedback3 ? ReportStore.report.feedback3 : 5
            }
            onChange={(event, newValue) => {
              if (newValue) {
                ReportStore.setFeedback3(newValue);
              }
            }}
            readOnly={
              ReportStore.report.status === REPORT_STATE.EDIT_POSSIBLE
                ? false
                : true
            }
          />
        </ReportFeedbackRow>
      </ReportRowContent>
    </ReportRowContainer>
  );
}
