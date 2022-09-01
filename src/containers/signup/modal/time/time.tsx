import { Switch } from '@mui/material';
import { useRef, useState } from 'react';
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

// async function getRows(available: IRows[]): Promise<IAvailableDate[][]> {
//   const availableTime: IAvailableDate[][] = Array.from(Array(7), () =>
//     Array(0).fill(null),
//   );

//   if (checked) {
//     rows.map(row => {
//       const temp: IAvailableDate = {
//         startHour: (row.date[1] + 8) % 24,
//         startMinute: row.date[2] ? 30 : 0,
//         endHour: (row.date[3] + 8) % 24,
//         endMinute: row.date[4] ? 30 : 0,
//       };
//       availableTime[row.date[0]].push(temp);
//     });
//   }

//   return availableTime;
// }

interface IRows {
  id: number;
  date: number[];
}

interface AddColumnsProps {
  rows: IRows[];
  onRemove: (id: number) => void;
  onChange: (id: number, index: number, value: number) => void;
}

export function Time() {
  const [checked, setChecked] = useState(true);
  const [rows, setRows] = useState<IRows[]>([
    {
      id: 0,
      date: [0, 0, 0, 0, 0],
    },
  ]);

  const nextId = useRef(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const onRowCreate = () => {
    const newRows: IRows = {
      id: nextId.current,
      date: [0, 0, 0, 0, 0],
    };
    setRows([...rows, newRows]);
    nextId.current += 1;
  };

  const onRowRemove = (id: number) => {
    setRows(rows.filter(rows => rows.id !== id));
  };

  const onRowChange = (id: number, index: number, value: number) => {
    const firstIndex = 0;
    const row = rows.filter(rows => rows.id === id);
    row[firstIndex].date[index] = value;
  };

  return (
    <Container>
      <ToggleContainer>
        <NameTitle>멘토링 가능/불가</NameTitle>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
          sx={{ mb: 1, mr: -6 }}
        />
        <BodySmallFont style={{ paddingBottom: '6px' }}>가능</BodySmallFont>
      </ToggleContainer>
      <NameTitle
        style={{
          paddingLeft: '1rem',
          height: '0rem',
        }}
      >
        시간
      </NameTitle>
      <TimeTableContainer style={{ marginTop: '0rem' }}>
        <ColumnDays>
          <BodyBigFont>요일</BodyBigFont>
        </ColumnDays>
        <ColumnName>
          <BodyBigFont>가능시간</BodyBigFont>
        </ColumnName>
        <ColumnLine></ColumnLine>
      </TimeTableContainer>
      <>
        {checked && (
          <AddColumns
            rows={rows}
            onRemove={onRowRemove}
            onChange={onRowChange}
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
