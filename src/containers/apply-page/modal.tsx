import { TextField } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const CalendarStyle = styled.div`
  display: flex;
  text-align: center;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 10px;
`;

const Modal = (props: { open: any; close: any; header: any }) => {
  const { open, close, header } = props;
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
          - 멘토링 일정 선택
          <CalendarStyle>
            <Calendar onChange={onChange} value={value} />
          </CalendarStyle>
          <div className="text-gray-500 mt-4">
            {moment(value).format('YYYY년 MM월 DD일')}
          </div>
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
