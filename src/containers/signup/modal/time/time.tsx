import { Switch } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Columns from '../../../../components/signup/getColumns';
import addButtonImage from '../../../../assets/signup/addButton.png';
import {
  AddButtonImage,
  BodyBigFont,
  BodySmallFont,
  ColumnDays,
  ColumnLine,
  ColumnName,
  Container,
  NameTitle,
  TimeTableContainer,
  ToggleContainer,
} from './time-style';
import {
  AddColumnsProps,
  IAvailableDate,
  IRows,
  MentorsData,
} from '../mentor-details-modal-inteface';

function AddColumns(props: AddColumnsProps) {
  return (
    <>
      {props.rows.map(rows => (
        <Columns
          key={rows.id}
          onRemove={props.onRemove}
          onChange={props.onChange}
          id={rows.id}
          date={rows.date}
        ></Columns>
      ))}
    </>
  );
}

interface TimeProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  rows: IRows[];
  setRows: React.Dispatch<React.SetStateAction<IRows[]>>;
  MentorsData: MentorsData;
  setMentorsData: React.Dispatch<React.SetStateAction<MentorsData>>;
  onRowChange: (id: number, index: number, value: number) => void;
}

export function Time(props: TimeProps) {
  const defaultChecked: boolean = props.MentorsData.isActive;
  const defaultAvailableTime: IAvailableDate[][] =
    props.MentorsData.availableTime;
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const data = getRows(defaultAvailableTime);
    props.setRows(data);
    props.setChecked(defaultChecked);
  }, [defaultAvailableTime, defaultChecked]);

  function getRows(availableTimes: IAvailableDate[][]): IRows[] {
    const rows: IRows[] = [];

    let index = 0;
    for (let i = 0; i < availableTimes.length; i++) {
      for (let j = 0; j < availableTimes[i].length; j++) {
        const temp: IRows = {
          id: index++,
          date: [
            i,
            availableTimes[i][j].startHour - (8 % 24),
            availableTimes[i][j].startMinute === 30 ? 1 : 0,
            availableTimes[i][j].endHour - (8 % 24),
            availableTimes[i][j].endMinute === 30 ? 1 : 0,
          ],
        };
        rows.push(temp);
      }
    }

    setCount(count + index);
    return rows;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setChecked(event.target.checked);
  };

  const onRowCreate = () => {
    const newRows: IRows = {
      id: count,
      date: [0, 0, 0, 0, 0],
    };
    props.setRows([...props.rows, newRows]);
    setCount(count + 1);
  };

  const onRowRemove = (id: number) => {
    props.setRows(props.rows.filter(rows => rows.id !== id));
  };

  return (
    <Container>
      <ToggleContainer>
        <NameTitle>멘토링 가능/불가</NameTitle>
        <Switch
          checked={props.checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
          sx={{ mb: 1, mr: -6 }}
        />
        <BodySmallFont style={{ paddingBottom: '6px' }}>가능</BodySmallFont>
      </ToggleContainer>
      <TimeTableContainer style={{ marginTop: '0rem', marginLeft: '3.5rem' }}>
        <ColumnDays>
          <BodyBigFont>요일</BodyBigFont>
        </ColumnDays>
        <ColumnName>
          <BodyBigFont>가능시간</BodyBigFont>
        </ColumnName>
        <ColumnLine></ColumnLine>
      </TimeTableContainer>
      <>
        {props.checked && (
          <AddColumns
            rows={props.rows}
            onRemove={onRowRemove}
            onChange={props.onRowChange}
          />
        )}
      </>
      <AddButtonImage
        src={addButtonImage}
        alt="add-button-image"
        onClick={onRowCreate}
      />
    </Container>
  );
}
