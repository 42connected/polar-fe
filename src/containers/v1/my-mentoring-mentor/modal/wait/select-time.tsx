import styled from '@emotion/styled';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { NewDateKr, NowDateKr } from '@/states/date-kr';
import defaultTheme from '@/styles/theme';
import {
  getDayToString,
  getTimeToString,
} from '@/containers/v1/reports/report-form';

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

export function isValidTime(time: Date): boolean {
  const FAILED_TO_MAKE_NEW_DATE = -1;

  if (time.toString().indexOf('Invalid Date') > FAILED_TO_MAKE_NEW_DATE) {
    return false;
  }
  return true;
}

function isTimeover(time: Date): boolean {
  const now = NowDateKr();
  const requestTime = NewDateKr(time);
  const LIMIT_TIME_MINUTE = 10;

  if (!isValidTime(now) || !isValidTime(requestTime)) {
    return true;
  }
  now.setMinutes(now.getMinutes() + LIMIT_TIME_MINUTE);
  if (now.getTime() > requestTime.getTime()) {
    return true;
  }
  return false;
}

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

  const times = requestTime.filter(e => e?.length === 2);

  return (
    <Container>
      <Title>멘토링 시간</Title>
      {times?.length !== 0 ? (
        <FormControl variant="standard" sx={{ minWidth: 200 }}>
          <Select value={selectedTimeIndex} onChange={handleChange}>
            {times.map((e, i) => (
              <MenuItem value={i} disabled={isTimeover(e[0])} key={i}>
                {`${getDayToString(e[0])} ${getTimeToString(e)}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Content>시간 없음</Content>
      )}
    </Container>
  );
};
