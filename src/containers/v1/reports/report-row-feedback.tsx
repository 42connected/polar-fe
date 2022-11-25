import {
  ReportRowContainer,
  ReportRowTitle,
  ReportRowContent,
} from '@/containers/v1/reports/row-styled';
import styled from '@emotion/styled';
import { Rating } from '@mui/material';
import defaultTheme from '@/styles/theme';

const ReportRowContentTitie = styled.div`
  width: 100%;
  margin: 20px 0px 0px 15px;
  justify-content: left;
  ${defaultTheme.fontSize.sizeMedium};
  ${defaultTheme.font.sebangGothic};
`;

const ReportFeedbackRow = styled.div`
  display: flex;
  width: 400px;
  margin: 10px;
  justify-content: space-between;
  align-items: center;
  ${defaultTheme.fontSize.sizeExtraSmall};
  ${defaultTheme.font.nanumGothic};
`;

interface ReportRowFeedbackProps {
  feedback1: number;
  setFeedback1: (n: number) => void;
  feedback2: number;
  setFeedback2: (n: number) => void;
  feedback3: number;
  setFeedback3: (n: number) => void;
  isEditPossible: boolean;
}

export function ReportRowFeedback(props: ReportRowFeedbackProps) {
  return (
    <ReportRowContainer>
      <ReportRowTitle>피드백</ReportRowTitle>
      <ReportRowContent>
        <ReportRowContentTitie>멘토링 피드백</ReportRowContentTitie>
        <ReportFeedbackRow>
          1. 교육생이 궁금한 것을 잘 정리해 왔나?
          <Rating
            name="simple-controlled"
            defaultValue={5}
            value={props.feedback1}
            onChange={(event, newValue) => {
              if (newValue) {
                props.setFeedback1(newValue);
              }
            }}
            readOnly={!props.isEditPossible}
          />
        </ReportFeedbackRow>
        <ReportFeedbackRow>
          2. 교육생과 함께 한 시간이 만족스러웠나?
          <Rating
            name="simple-controlled"
            defaultValue={5}
            value={props.feedback2}
            onChange={(event, newValue) => {
              if (newValue) {
                props.setFeedback2(newValue);
              }
            }}
            readOnly={!props.isEditPossible}
          />
        </ReportFeedbackRow>
        <ReportFeedbackRow>
          3. 교육생이 전달한 내용을 잘 이해했나?
          <Rating
            name="simple-controlled"
            defaultValue={5}
            value={props.feedback3}
            onChange={(event, newValue) => {
              if (newValue) {
                props.setFeedback3(newValue);
              }
            }}
            readOnly={!props.isEditPossible}
          />
        </ReportFeedbackRow>
      </ReportRowContent>
    </ReportRowContainer>
  );
}
