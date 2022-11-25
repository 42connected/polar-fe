import styled from '@emotion/styled';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import defaultTheme from '@/styles/theme';
import {
  getDayToString,
  getTimeToString,
} from '@/containers/reports/report-form';

export const Title = styled.div`
  font-weight: bold;
  width: 40%;
  ${defaultTheme.fontSize.sizeSmall};
`;

export const Content = styled.div`
  width: 60%;
`;

export const Container = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 80%;
  margin: 10px;
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeSmall};
`;

export const selectTime = (
  requestTime: Date[][],
  selectedTimeIndex: string,
  setSelectedTimeIndex: (s: string) => void,
) => {
  if (!requestTime) {
    return;
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTimeIndex(event.target.value);
  };

  const times = requestTime
    .filter(e => e?.length > 0)
    .map(e => `${getDayToString(e[0])} ${getTimeToString(e)}`);

  return (
    <Container>
      <Title>멘토링 시간</Title>
      {times?.length !== 0 ? (
        <FormControl variant="standard" sx={{ minWidth: 200 }}>
          <Select value={selectedTimeIndex} onChange={handleChange}>
            {times
              .filter(e => e)
              .map((e, i) => (
                <MenuItem value={i}>{e}</MenuItem>
              ))}
          </Select>
        </FormControl>
      ) : (
        <Content>시간 없음</Content>
      )}
    </Container>
  );
};
