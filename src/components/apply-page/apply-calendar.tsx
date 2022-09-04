import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { lighten } from '@mui/material';
import {
  axiosWithNoData,
  AXIOS_METHOD_WITH_NO_DATA,
} from '../../context/axios-interface';
import AuthStore from '../../states/auth/AuthStore';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

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
`;

interface availableTimeType {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}

const mentorIntraId = 'm-engeng';

function ApplyCalendar() {
  const [selectDate, onChange] = useState(new Date());
  const [availableTime, setAvailableTime] = useState(new Array(7).fill([]));
  const [requestTime, setRequestTime] = useState(new Array(new Array()));
  const [schedule, setSchedule] = useState(new Array(new Array<boolean>(48)));
  const [activeDate, setActiveDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    axiosWithNoData(
      AXIOS_METHOD_WITH_NO_DATA.GET,
      `/calendar/available-times/${mentorIntraId}`,
      {
        headers: {
          Authorization: `bearer ${AuthStore.getAccessToken()}`,
        },
      },
    ).then(response => {
      console.log(response.data);
      setAvailableTime(response.data);
    });
  }, []);

  useEffect(() => {
    axiosWithNoData(
      AXIOS_METHOD_WITH_NO_DATA.GET,
      `/calendar/request-times/${mentorIntraId}?date=${
        selectDate.getFullYear() +
        '-' +
        (selectDate.getMonth() + 1).toString().padStart(2, '0')
      }`,
      {
        headers: {
          Authorization: `bearer ${AuthStore.getAccessToken()}`,
        },
      },
    )
      .then(response => setRequestTime(response.data))
      .then(() => {
        const maxDate: number = new Date(
          selectDate.getFullYear(),
          selectDate.getMonth() + 1,
          0,
        ).getDate();
        const array = new Array(maxDate).fill([]);
        for (let i = 0; i < maxDate; i++) {
          array[i] = new Array<boolean>(48).fill(false);
        }
        setSchedule(array);
      });
  }, [activeDate]);

  useEffect(() => {
    console.log('activeDate:' + activeDate);
    const setInitSchedule = new Promise((resolve, reject) => {
      schedule.forEach((day, index) => {
        availableTime[
          new Date(
            activeDate.getFullYear(),
            activeDate.getMonth(),
            index + 1,
          ).getDay()
        ].forEach((data: availableTimeType) => {
          day.fill(
            true,
            data.startHour * 2 + (data.startMinute > 0 ? 1 : 0),
            data.endHour * 2 + (data.endMinute > 0 ? 1 : 0) - 1,
          );
        });
      });
      resolve(schedule);
    });
    const setRealSchedule = new Promise((resolve, reject) => {
      requestTime.forEach(data => {
        const startTime = new Date(data[0]);
        const endTime = new Date(data[1]);
        schedule[startTime.getDate() - 1]?.fill(
          false,
          startTime.getHours() * 2 + (startTime.getMinutes() > 0 ? 1 : 0),
          endTime.getHours() * 2 + (endTime.getMinutes() > 0 ? 1 : 0),
        );
      });
      resolve(requestTime);
    });

    setInitSchedule.then(() =>
      setRealSchedule.then(() => console.log(schedule)),
    );
  }, [schedule]);

  useEffect(() => {
    setStartTime('');
    setEndTime('');
  }, [selectDate]);

  return (
    <>
      <CalendarDiv>
        <Calendar
          onChange={onChange}
          onActiveStartDateChange={data => {
            if (data.view === 'month') setActiveDate(data.activeStartDate);
            else if (data.activeStartDate.getMonth() === 0)
              setActiveDate(data.activeStartDate);
          }}
          value={selectDate}
          locale={'ko-KR'}
        />
      </CalendarDiv>
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
            {schedule[selectDate.getDate() - 1]?.map((data, index) => {
              if (data) {
                console.log(index);
                return (
                  <MenuItem
                    key={selectDate.getMilliseconds() + '' + index}
                    value={index}
                  >{`${Math.floor(index / 2)}:${
                    index % 2 ? '30' : '00'
                  }`}</MenuItem>
                );
              }
            })}
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
            {schedule[selectDate.getDate() - 1]?.map((data, index) => {
              if (data)
                return (
                  <MenuItem
                    value={index}
                    key={selectDate.getMilliseconds() + '' + index}
                  >{`${Math.floor(index / 2)}:${
                    index % 2 ? '30' : '00'
                  }`}</MenuItem>
                );
            })}
          </Select>
        </FormControl>
      </ThemeProvider>
    </>
  );
}
export default ApplyCalendar;
