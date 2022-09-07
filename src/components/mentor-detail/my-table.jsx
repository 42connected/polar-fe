import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

function MyTableComponent(props) {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const { appointments } = props;
  useEffect(() => {
    console.log(appointments);
    setAppointmentsData(appointments);
  }, [appointments]);

  return (
    <>
      <Calendar
        height="900px"
        calendars={[
          {
            id: '0',
            name: 'Private',
            bgColor: '#9e5fff',
            borderColor: '#9e5fff',
          },
          {
            id: '1',
            name: 'Company',
            bgColor: '#00a9ff',
            borderColor: '#00a9ff',
          },
        ]}
        isReadOnly={true}
        month={{
          startDayOfWeek: 0,
        }}
        events={appointmentsData}
        view="week"
        week={{
          taskView: false,
        }}
      />
    </>
  );
}

export default MyTableComponent;
