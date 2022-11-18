import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { lighten } from '@mui/material';
import {
  axiosWithNoData,
  AXIOS_METHOD_WITH_NO_DATA,
} from '@/context/axios-interface';
import AuthStore from '@/states/auth/AuthStore';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Button from '@/components/button';
import LoadingStore from '@/states/loading/LoadingStore';
import { ApplyCalendarModalProps } from '@/components/apply-page/apply-calendar-modal';
import ErrorStore, { ERROR_DEFAULT_VALUE } from '@/states/error/ErrorStore';
import { NewDateKr, NowDateKr, NumToDateKr } from '@/states/date-kr';

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

interface availableTimeType {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}

interface scheduleType {
  able: boolean;
  array: boolean[];
}

function ApplyCalendar(props: ApplyCalendarModalProps) {
  const { XButtonFunc, mentorIntraId, setStartDateTime, setEndDateTime } =
    props;
  const [selectDate, onChange] = useState(NowDateKr());
  const [availableTime, setAvailableTime] = useState(new Array(7).fill([]));
  const [requestTime, setRequestTime] = useState<Date[][]>(new Array([]));
  const [schedule, setSchedule] = useState(new Array<scheduleType>());
  const [activeDate, setActiveDate] = useState(NowDateKr());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [getMonthArray, setGetMonthArray] = useState(false);
  const [getAvailableTime, setGetAvailableTime] = useState(false);
  const today = NowDateKr();

  useEffect(() => {
    try {
      axiosWithNoData(
        AXIOS_METHOD_WITH_NO_DATA.GET,
        `/calendar/available-times/${mentorIntraId}`,
        {
          headers: {
            Authorization: `bearer ${AuthStore.getAccessToken()}`,
          },
        },
      ).then(response => {
        if (response.status === 200) {
          setAvailableTime(response.data);
          setGetAvailableTime(true);
        } else {
          ErrorStore.on(
            '멘토 데이터를 가져오는 중 오류가 발생하였습니다.\n 다시 시도해주세요.',
            ERROR_DEFAULT_VALUE.TITLE,
          );
          props.XButtonFunc();
        }
      });
    } catch (error) {
      ErrorStore.on(
        '멘토 데이터를 가져오는 중 오류가 발생하였습니다.\n 다시 시도해주세요.',
        ERROR_DEFAULT_VALUE.TITLE,
      );
      props.XButtonFunc();
    }
  }, []);

  useEffect(() => {
    if (getAvailableTime) {
      LoadingStore.on();
      setGetMonthArray(false);
      setSchedule([]);
      try {
        axiosWithNoData(
          AXIOS_METHOD_WITH_NO_DATA.GET,
          `/calendar/request-times/${mentorIntraId}?date=${
            activeDate.getFullYear() +
            '-' +
            (activeDate.getMonth() + 1).toString().padStart(2, '0')
          }`,
          {
            headers: {
              Authorization: `bearer ${AuthStore.getAccessToken()}`,
            },
          },
        )
          .then(response => {
            if (response.status === 200) setRequestTime(response.data);
            else {
              ErrorStore.on(
                '가능 시간 데이터를 가져오는 중 오류가 발생하였습니다.\n 다시 시도해주세요.',
                ERROR_DEFAULT_VALUE.TITLE,
              );
              props.XButtonFunc();
            }
          })
          .then(() => {
            const maxDate: number = NumToDateKr(
              activeDate.getFullYear(),
              activeDate.getMonth() + 1,
              0,
            ).getDate();
            const array: scheduleType[] = new Array(maxDate);
            for (let i = 0; i < maxDate; i++) {
              const element: scheduleType = {
                array: new Array<boolean>(48).fill(false),
                able: false,
              };
              array[i] = element;
            }
            setSchedule(array);
            setGetMonthArray(true);
          });
      } catch (error) {
        ErrorStore.on(
          '가능 시간 데이터를 가져오는 중 오류가 발생하였습니다.\n 다시 시도해주세요.',
          ERROR_DEFAULT_VALUE.TITLE,
        );
        props.XButtonFunc();
      }
    }
  }, [activeDate, getAvailableTime]);

  useEffect(() => {
    if (getMonthArray === true) {
      const setInitSchedule = new Promise((resolve, reject) => {
        schedule.forEach((day, index) => {
          availableTime[
            NumToDateKr(
              activeDate.getFullYear(),
              activeDate.getMonth(),
              index + 1,
            ).getDay()
          ].forEach((data: availableTimeType) => {
            day.array.fill(
              true,
              data.startHour * 2 + (data.startMinute > 0 ? 1 : 0),
              data.endHour * 2 + (data.endMinute > 0 ? 1 : 0),
            );
            day.able = true;
          });
        });
        resolve(schedule);
      });
      const setRealSchedule = new Promise((resolve, reject) => {
        requestTime.forEach(data => {
          const startTime = NewDateKr(data[0]);
          const endTime = NewDateKr(data[1]);
          schedule[startTime.getDate() - 1]?.array.fill(
            false,
            startTime.getHours() * 2 + (startTime.getMinutes() > 0 ? 1 : 0),
            endTime.getHours() * 2 + (endTime.getMinutes() > 0 ? 1 : 0),
          );
        });
        resolve(schedule);
      });

      const refineSchedule = new Promise((resolve, reject) => {
        schedule.forEach(day => {
          day.array.forEach((time: boolean, index: number) => {
            if (
              !(
                time &&
                ((index > 0 && day.array[index - 1]) ||
                  (index < 47 && day.array[index + 1]))
              )
            )
              day.array[index] = false;
          });
        });
        resolve(schedule);
      });

      const setTodaySchedule = new Promise((resolve, reject) => {
        const today = NowDateKr();
        if (
          activeDate.getMonth() !== today.getMonth() ||
          activeDate.getFullYear() !== today.getFullYear()
        )
          resolve(schedule);

        const available: number =
          today.getHours() * 2 +
          (today.getMinutes() > 30
            ? today.getMinutes() - 30 > 0
              ? 2
              : 1
            : today.getMinutes() > 0
            ? 1
            : 0);

        for (let i = 0; i <= available; i++)
          schedule[today.getDate() - 1].array[i] = false;
        resolve(schedule);
      });

      const setAble = new Promise((resolve, reject) => {
        schedule.forEach(day => {
          if (
            day.array.find((element: boolean) => element === true) === undefined
          )
            day.able = false;
        });
        resolve(schedule);
      });

      setInitSchedule.then(data => {
        setRealSchedule.then(data => {
          refineSchedule.then(data => {
            setTodaySchedule.then(data => {
              setAble.then(data => {
                setSchedule([...schedule]);
                const maxDate: number = NumToDateKr(
                  selectDate.getFullYear(),
                  selectDate.getMonth() + 1,
                  0,
                ).getDate();
                if (schedule[selectDate.getDate() - 1].able === false)
                  for (let i = selectDate.getDate(); i < maxDate; i++) {
                    if (schedule[i].able === true) {
                      selectDate.setDate(i + 1);
                      onChange(NewDateKr(selectDate));
                      break;
                    }
                  }
              });
            });
          });
        });
      });
      LoadingStore.off();
    }
  }, [getMonthArray]);

  useEffect(() => {
    setStartTime('');
    setEndTime('');
  }, [selectDate]);

  function GetStartTimeMenuList() {
    let index = 0;
    const returnValue = [];
    if (schedule[selectDate.getDate() - 1]) {
      for (const data of schedule[selectDate.getDate() - 1].array) {
        if (
          data &&
          index < 47 &&
          schedule[selectDate.getDate() - 1]?.array[index + 1]
        ) {
          returnValue.push(
            <MenuItem
              key={selectDate.getMilliseconds() + '' + index}
              value={index}
            >{`${Math.floor(index / 2)}:${index % 2 ? '30' : '00'}`}</MenuItem>,
          );
        }
        index++;
      }
    }
    return returnValue;
  }

  function GetEndTimeMenuList() {
    let index = 0;
    const returnValue = [];
    if (schedule[selectDate.getDate() - 1]) {
      for (const data of schedule[selectDate.getDate() - 1].array) {
        if (
          startTime === '' &&
          data &&
          index > 0 &&
          schedule[selectDate.getDate() - 1]?.array[index - 1]
        )
          returnValue.push(
            <MenuItem
              value={index}
              key={selectDate.getMilliseconds() + '' + index}
            >{`${Math.floor((index + 1) / 2)}:${
              (index + 1) % 2 ? '30' : '00'
            }`}</MenuItem>,
          );
        else if (
          startTime !== '' &&
          data &&
          index > Number(startTime) &&
          index - Number(startTime) < 6
        )
          returnValue.push(
            <MenuItem
              value={index}
              key={selectDate.getMilliseconds() + '' + index}
            >{`${Math.floor((index + 1) / 2)}:${
              (index + 1) % 2 ? '30' : '00'
            }`}</MenuItem>,
          );
        else if (
          startTime !== '' &&
          index > Number(startTime) &&
          !data &&
          index - Number(startTime) >= 6
        )
          break;
        index++;
      }
    }
    return returnValue;
  }

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
          tileDisabled={({ date, view }) =>
            view === 'month' &&
            (schedule[date.getDate() - 1]?.able === false ||
              date.getMonth() !== activeDate.getMonth() ||
              (date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear() &&
                date.getDate() < today.getDate()))
          }
          locale={'ko-KR'}
        />
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
              {GetStartTimeMenuList()}
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
              {GetEndTimeMenuList()}
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
            endDate.setHours(Math.floor((Number(endTime) + 1) / 2));
            endDate.setMinutes((Number(endTime) + 1) % 2 ? 30 : 0);
            endDate.setSeconds(0);
            endDate.setMilliseconds(0);
            setStartDateTime(startDate);
            setEndDateTime(endDate);
            XButtonFunc();
          }
        }}
      ></Button>
    </>
  );
}
export default ApplyCalendar;
