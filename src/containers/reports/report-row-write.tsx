import {
  ReportRowContainer,
  ReportRowTitle,
  ReportRowContent,
} from './row-styled';
import styled from '@emotion/styled';
import defaultTheme from '../../styles/theme';
import { InputCounter } from '../../components/input-counter';

const ReportRowContentTitie = styled.div`
  width: 100%;
  margin: 20px 0px 0px 15px;
  justify-content: left;
  ${defaultTheme.fontSize.sizeMedium};
  ${defaultTheme.font.sebangGothic};
  @media screen and (max-width: 900px) {
    ${defaultTheme.fontSize.sizeExtraSmall};
  }
  @media screen and (max-width: 800px) {
    ${defaultTheme.fontSize.sizeSmall};
  }
`;

const ReportSummaryTitle = styled.div`
  width: 100%;
  margin: 20px 10px 10px 40px;
  justify-content: left;
  ${defaultTheme.fontSize.sizeExtraSmall};
  ${defaultTheme.font.nanumGothic};
  @media screen and (max-width: 900px) {
    ${defaultTheme.fontSize.sizeSmall};
  }
  @media screen and (max-width: 800px) {
    font-size: 1rem;
  }
`;

interface ReportRowWriteProps {
  status: string;
  topic: string;
  setTopic: (s: string) => void;
  content: string;
  setContent: (s: string) => void;
  feedbackMessage: string;
  setFeedbackMessage: (s: string) => void;
  isEditPossible: boolean;
}

export function ReportRowWrite(props: ReportRowWriteProps) {
  return (
    <ReportRowContainer>
      <ReportRowTitle>보고서 작성</ReportRowTitle>
      <ReportRowContent>
        <ReportRowContentTitie>개요</ReportRowContentTitie>
        <ReportSummaryTitle>&#183; 주제</ReportSummaryTitle>
        <InputCounter
          setter={props.setTopic}
          value={props.topic}
          maxLength={150}
          disabled={!props.isEditPossible}
        />
        <ReportSummaryTitle>&#183; 내용</ReportSummaryTitle>
        <InputCounter
          setter={props.setContent}
          value={props.content}
          maxLength={800}
          disabled={!props.isEditPossible}
        />
        <ReportSummaryTitle>&#183; 교육생에게 남기는 말</ReportSummaryTitle>
        <InputCounter
          setter={props.setFeedbackMessage}
          value={props.feedbackMessage}
          maxLength={800}
          disabled={!props.isEditPossible}
        />
      </ReportRowContent>
    </ReportRowContainer>
  );
}
