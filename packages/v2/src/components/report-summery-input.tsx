import styled from 'styled-components';

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

function ReportSummaryInputComponent() {
  return <ReportSummaryInput />;
}

export default ReportSummaryInputComponent;
