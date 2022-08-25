import {
  ReportRowContainer,
  ReportRowTitle,
  ReportRowContent,
} from './row-styled';
import styled from '@emotion/styled';
import defaultTheme from '../../styles/theme';
import ReportStore from '../../states/repoort/ReportStore';
import { REPORT_STATE } from './report-form';
import { observer } from 'mobx-react-lite';

const ReportRowContentTitie = styled.div`
  ${defaultTheme.fontSize.sizeMedium};
  ${defaultTheme.font.sebangGothic};
  width: 100%;
  margin: 20px 0px 0px 15px;
  justify-content: left;
`;

const ReportSummaryTitle = styled.div`
  ${defaultTheme.fontSize.sizeExtraSmall};
  ${defaultTheme.font.nanumGothic};
  width: 100%;
  margin: 20px 10px 10px 40px;
  justify-content: left;
`;

const ReportSummaryInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  vertical-align: top;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const ReportInputContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: center;
`;

const Count = styled.div`
  display: flex;
  width: 100%;
  justify-content: right;
  margin: 5px;
  align-items: center;
  ${defaultTheme.fontSize.sizeSmall};
  color: rgba(0, 0, 0, 0.5);
`;

const ReportRowWrite = observer(() => {
  return (
    <ReportRowContainer>
      <ReportRowTitle>보고서 작성</ReportRowTitle>
      <ReportRowContent>
        <ReportRowContentTitie>개요</ReportRowContentTitie>
        <ReportSummaryTitle>&#183; 주제</ReportSummaryTitle>
        <ReportInputContainer>
          <ReportSummaryInput
            defaultValue={ReportStore.report.topic}
            onChange={e => {
              ReportStore.setTopic(e.target.value);
            }}
            disabled={
              ReportStore.report.status === REPORT_STATE.EDIT_POSSIBLE
                ? false
                : true
            }
            maxLength={150}
          />
          <Count>
            {ReportStore?.report?.topic?.length
              ? ReportStore?.report?.topic?.length
              : 0}{' '}
            / 150
          </Count>
        </ReportInputContainer>
        <ReportSummaryTitle>&#183; 내용</ReportSummaryTitle>
        <ReportInputContainer>
          <ReportSummaryInput
            defaultValue={ReportStore.report.content}
            onChange={e => {
              ReportStore.setContent(e.target.value);
            }}
            disabled={
              ReportStore.report.status === REPORT_STATE.EDIT_POSSIBLE
                ? false
                : true
            }
            maxLength={800}
          />
          <Count>
            {ReportStore?.report?.content?.length
              ? ReportStore?.report?.content?.length
              : 0}{' '}
            / 800
          </Count>
        </ReportInputContainer>
        <ReportSummaryTitle>&#183; 교육생에게 남기는 말</ReportSummaryTitle>
        <ReportInputContainer>
          <ReportSummaryInput
            defaultValue={ReportStore.report.feedbackMessage}
            onChange={e => {
              ReportStore.setFeedbackMessage(e.target.value);
            }}
            disabled={
              ReportStore.report.status === REPORT_STATE.EDIT_POSSIBLE
                ? false
                : true
            }
            maxLength={800}
          />
          <Count>
            {ReportStore?.report?.feedbackMessage?.length
              ? ReportStore?.report?.feedbackMessage?.length
              : 0}{' '}
            / 800
          </Count>
        </ReportInputContainer>
      </ReportRowContent>
    </ReportRowContainer>
  );
});

export default ReportRowWrite;
