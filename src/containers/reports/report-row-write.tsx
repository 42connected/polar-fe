import {
  ReportRowContainer,
  ReportRowTitle,
  ReportRowContent,
} from './row-styled';
import styled from '@emotion/styled';
import defaultTheme from '../../styles/theme';
import ReportStore from '../../states/repoort/ReportStore';

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
  width: 80%;
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

export function ReportRowWrite() {
  return (
    <ReportRowContainer>
      <ReportRowTitle>보고서 작성</ReportRowTitle>
      <ReportRowContent>
        <ReportRowContentTitie>개요</ReportRowContentTitie>
        <ReportSummaryTitle>&#183; 주제</ReportSummaryTitle>
        <ReportSummaryInput
          defaultValue={ReportStore.report.topic}
          onChange={e => {
            ReportStore.setTopic(e.target.value);
          }}
        />
        <ReportSummaryTitle>&#183; 내용</ReportSummaryTitle>
        <ReportSummaryInput
          defaultValue={ReportStore.report.content}
          onChange={e => {
            ReportStore.setContent(e.target.value);
          }}
        />
        <ReportSummaryTitle>&#183; 교육생에게 남기는 말</ReportSummaryTitle>
        <ReportSummaryInput
          defaultValue={ReportStore.report.feedbackMessage}
          onChange={e => {
            ReportStore.setFeedbackMessage(e.target.value);
          }}
        />
      </ReportRowContent>
    </ReportRowContainer>
  );
}
