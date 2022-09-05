import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import TableCell from '@material-ui/core/TableCell';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { AnySoaRecord } from 'dns';
import { appointmentsInterface } from '../../interface/mentor-detail/appointments.interface';
import { axiosInstance } from '../../context/axios-interface';
import { useParams } from 'react-router-dom';
import { mentorAvailableTimeInterface } from '../../interface/mentor-detail/mentor-available-time.interface';
interface TimeTableMuiProps {
  appointments: appointmentsInterface[];
}
// export const appointments: appointmentsInterface[] = [
//   {
//     startDate: new Date(2018, 5, 29, 14, 30),
//     endDate: new Date(2018, 5, 29, 15, 0),
//     // location: 'Room 2',
//   },
//   {
//     // title: 'Website Re-Design Plan',
//     startDate: new Date(2018, 5, 25, 9, 30),
//     endDate: new Date(2018, 5, 25, 11, 30),
//     // id: 0,
//     // location: 'Room 1',
//   },
//   {
//     // title: 'Book Flights to San Fran for Sales Trip',
//     startDate: new Date(2018, 5, 25, 12, 0),
//     endDate: new Date(2018, 5, 25, 13, 0),
//     // id: 1,
//     // location: 'Room 1',
//   },
//   {
//     startDate: new Date(2018, 5, 24, 12, 0),
//     endDate: new Date(2018, 5, 24, 13, 0),
//   },
// ];

const theme = createTheme({
  palette: { type: 'light', primary: purple },
});

const dayScaleCell = ({ startDate, endDate, today }: any) => (
  <TableCell>
    <span>
      {Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(startDate)}
    </span>
  </TableCell>
);

function TimeTableMuiComponent(props: TimeTableMuiProps) {
  const [appointments, setAppointments] = useState<appointmentsInterface[]>([]);
  const setMentorAvailableTimeData = async (metorAvailableTimeData: string) => {
    const mentorAvailableTimeDataToArray = JSON.parse(metorAvailableTimeData);
    const appointmentsData: appointmentsInterface[] = [];
    mentorAvailableTimeDataToArray?.forEach(
      (data: mentorAvailableTimeInterface[], index: number) => {
        if (data.length !== 0) {
          data.forEach(data2 => {
            let day = 25 + index;
            if (index === 6) {
              day = 24;
            }
            const startDate = new Date(
              2018,
              5,
              day,
              data2.startHour,
              data2.startMinute,
            );
            const endDate = new Date(
              2018,
              5,
              day,
              data2.endHour,
              data2.endMinute,
            );
            appointmentsData.push({ startDate, endDate });
          });
        }
      },
      setAppointments(appointmentsData),
    );
  };
  const getParams = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/mentors/${getParams.intraId}`)
      .then(result => {
        setMentorAvailableTimeData(result.data.availableTime);
      })
      .catch(err => {
        // ErrorStore.on(err, ERROR_DEFAULT_VALUE.TITLE);
        console.log(err);
      });
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Paper>
        <Scheduler data={appointments}>
          <ViewState currentDate="2018-06-28" />
          <WeekView
            startDayHour={9}
            endDayHour={19}
            dayScaleCellComponent={dayScaleCell}
          />
          <Appointments />
        </Scheduler>
      </Paper>
    </MuiThemeProvider>
  );
}

export default TimeTableMuiComponent;
