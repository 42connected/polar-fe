import SelectList from './selectList';
import deleteButtonImage from '@/assets/signup/deleteButton.png';
import {
  BodyBigFont,
  DeleteButtonImage,
  TimeTableContainer,
} from '@/containers/signup/signup-style';

const days: string[] = ['일', '월', '화', '수', '목', '금', '토'];

const hours: string[] = [
  '00시',
  '01시',
  '02시',
  '03시',
  '04시',
  '05시',
  '06시',
  '07시',
  '08시',
  '09시',
  '10시',
  '11시',
  '12시',
  '13시',
  '14시',
  '15시',
  '16시',
  '17시',
  '18시',
  '19시',
  '20시',
  '21시',
  '22시',
  '23시',
];

const minutes: string[] = ['00분', '30분'];

interface ColumnsProps {
  id: number;
  date: number[];
  onRemove: (id: number) => void;
  onChange: (id: number, index: number, value: number) => void;
}

function Columns(props: ColumnsProps) {
  const boxWidth = 75;

  return (
    <TimeTableContainer>
      <SelectList
        lists={days}
        width={boxWidth}
        value={props.date[0]}
        id={props.id}
        index={0}
        onChange={props.onChange}
      ></SelectList>
      <SelectList
        lists={hours}
        width={boxWidth}
        value={props.date[1]}
        id={props.id}
        index={1}
        onChange={props.onChange}
      ></SelectList>
      <SelectList
        lists={minutes}
        width={boxWidth}
        value={props.date[2]}
        id={props.id}
        index={2}
        onChange={props.onChange}
      ></SelectList>
      <BodyBigFont style={{ paddingLeft: '0.6rem', marginTop: '10px' }}>
        ~
      </BodyBigFont>
      <SelectList
        lists={hours}
        width={boxWidth}
        value={props.date[3]}
        id={props.id}
        index={3}
        onChange={props.onChange}
      ></SelectList>
      <SelectList
        lists={minutes}
        width={boxWidth}
        value={props.date[4]}
        id={props.id}
        index={4}
        onChange={props.onChange}
      ></SelectList>
      <DeleteButtonImage
        src={deleteButtonImage}
        alt="delete-button-image"
        onClick={() => props.onRemove(props.id)}
      />
    </TimeTableContainer>
  );
}

export default Columns;
