import { TextField } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import ApplyCalendar from '../../components/apply-page/apply-calendar';

const CalendarStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

const Modal = (props: {
  open: any;
  close: any;
  header: any;
  mentorIntraId: string | undefined;
  setStartDateTime: (date: Date) => void;
  setEndDateTime: (date: Date) => void;
}) => {
  const {
    open,
    close,
    header,
    mentorIntraId,
    setStartDateTime,
    setEndDateTime,
  } = props;
  const [value, onChange] = useState(new Date());

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <CalendarStyle></CalendarStyle>

          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default Modal;
