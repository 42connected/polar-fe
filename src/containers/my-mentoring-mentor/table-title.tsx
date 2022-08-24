import styled from '@emotion/styled';
import defaultTheme from '../../styles/theme';

const TableColumnLine = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid black;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 15px;
  height: 50px;
  font-weight: bold;
`;

const TableColumnDate = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeMedium};
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

const TableColumnUser = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeMedium};
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

const TableColumnTopic = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeMedium};
  display: flex;
  width: 30%;
  justify-content: center;
  align-items: center;
`;

const TableColumnTime = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeMedium};
  display: flex;
  width: 30%;
  justify-content: center;
  align-items: center;
`;

const TableColumnState = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeMedium};
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

const TableColumnReport = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeMedium};
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

export function TableTitle() {
  return (
    <TableColumnLine>
      <TableColumnDate>신청 일시</TableColumnDate>
      <TableColumnUser>신청 카뎃</TableColumnUser>
      <TableColumnTopic>주제</TableColumnTopic>
      <TableColumnTime>멘토링 시간</TableColumnTime>
      <TableColumnState>상태</TableColumnState>
      <TableColumnReport>보고서</TableColumnReport>
    </TableColumnLine>
  );
}
