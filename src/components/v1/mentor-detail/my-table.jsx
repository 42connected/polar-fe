import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

function MyTableComponent(props) {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const { appointments } = props;
  useEffect(() => {
    setAppointmentsData(appointments);
  }, [appointments]);

  return (
    <Container>
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
          dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  .toastui-calendar-day-name__date {
    visibility: hidden;
  }
  .toastui-calendar-day-name__name {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .toastui-calendar-allday {
    display: none;
  }
  .toastui-calendar-day-view
    .toastui-calendar-panel:not(.toastui-calendar-time),
  .toastui-calendar-week-view
    .toastui-calendar-panel:not(.toastui-calendar-time) {
    overflow-y: hidden;
  }
  .toastui-calendar-event-time-content {
    background-color: ${props => props.theme.colors.polarBrightMain};
    color: ${props => props.theme.colors.grayFive};
    padding-top: 0.5rem;
  }
  .toastui-calendar-event-time {
    border-left: 1px solid ${props => props.theme.colors.grayFive};
  }
`;

export default MyTableComponent;
