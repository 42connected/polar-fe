import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { createTheme, lighten } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider } from '@emotion/react';
import theme from '../../../../styles/theme';
import { NewDateKr, NowDateKr } from '../../../../states/date-kr';
import Button from '../../../../components/button';
import { useState } from 'react';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: theme.colors.polarSimpleMain,
    },
    secondary: {
      main: theme.colors.polarBrightMain,
    },
  },
  typography: {
    fontFamily: theme.font.sebangGothic,
    fontSize: 20,
    fontWeightLight: 700,
  },
});

const CalendarDiv = styled.div`
  .react-calendar__navigation__label {
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }
  .react-calendar__navigation__arrow {
    justify-content: center;
    align-items: center;
    font-family: 'SEBANG Gothic';
    font-size: 2.5rem;
  }
  .react-calendar__tile {
    justify-content: center;
    align-items: center;
  }
  .react-calendar__tile--now {
    background-color: ${lighten(theme.colors.polarBrightMain, 0.6)};
    &:enabled:hover {
      background-color: ${lighten(theme.colors.polarBrightMain, 0.5)};
    }
    &:enabled:focus {
      background-color: ${lighten(theme.colors.polarBrightMain, 0.5)};
    }
  }
  .react-calendar__tile--active {
    background-color: ${theme.colors.polarSimpleMain};
    &:enabled:hover {
      background-color: ${theme.colors.polarSimpleMain};
    }
    &:enabled:focus {
      background-color: ${theme.colors.polarSimpleMain};
    }
  }
  .react-calendar__tile--hasActive {
    background-color: ${lighten(theme.colors.polarBrightMain, 0.4)};
    &:enabled:hover {
      background-color: ${lighten(theme.colors.polarBrightMain, 0.3)};
    }
    &:enabled:focus {
      background-color: ${lighten(theme.colors.polarBrightMain, 0.3)};
    }
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

export interface TimePickerProps {
  XButtonFunc: () => void;
  setStartDateTime: (date: Date) => void;
  setEndDateTime: (date: Date) => void;
}

function TimePicker(props: TimePickerProps) {
  const { XButtonFunc, setStartDateTime, setEndDateTime } = props;
  const [selectDate, onChange] = useState(NowDateKr());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  function allTimeMenuList() {
    let index = 0;
    const returnValue = [];

    for (let i = 0; i < 25; ++i) {
      returnValue.push(
        <MenuItem value={index} key={selectDate.getMilliseconds() + '' + index}>
          {i}:00
        </MenuItem>,
      );
      ++index;
      if (i !== 24) {
        returnValue.push(
          <MenuItem
            value={index}
            key={selectDate.getMilliseconds() + '' + index}
          >
            {i}:30
          </MenuItem>,
        );
      }
      ++index;
    }

    return returnValue;
  }
  return (
    <>
      <CalendarDiv>
        <Calendar onChange={onChange} value={selectDate} locale={'ko-KR'} />
      </CalendarDiv>
      <InputDiv>
        <ThemeProvider theme={muiTheme}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel>StartTime</InputLabel>
            <Select
              value={startTime}
              onChange={(event: SelectChangeEvent) =>
                setStartTime(event.target.value)
              }
              label="StartTime"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {allTimeMenuList()}
            </Select>
          </FormControl>
        </ThemeProvider>
        <ThemeProvider theme={muiTheme}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel>EndTime</InputLabel>
            <Select
              value={endTime}
              onChange={(event: SelectChangeEvent) =>
                setEndTime(event.target.value)
              }
              label="EndTime"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {allTimeMenuList()}
            </Select>
          </FormControl>
        </ThemeProvider>
      </InputDiv>
      <Button
        text="제출"
        onClick={() => {
          if (startTime === '' || endTime === '')
            alert('시작시간과 끝시간을 모두 선택해주세요');
          else {
            const startDate = NewDateKr(selectDate);
            startDate.setHours(Math.floor(Number(startTime) / 2));
            startDate.setMinutes(Number(startTime) % 2 ? 30 : 0);
            startDate.setSeconds(0);
            startDate.setMilliseconds(0);
            const endDate = NewDateKr(selectDate);
            endDate.setHours(Math.floor(Number(endTime) / 2));
            endDate.setMinutes(Number(endTime) % 2 ? 30 : 0);
            endDate.setSeconds(0);
            endDate.setMilliseconds(0);
            setStartDateTime(startDate);
            setEndDateTime(endDate);
            XButtonFunc();
          }
        }}
      />
    </>
  );
}
export default TimePicker;
