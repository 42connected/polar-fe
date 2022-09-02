import styled from '@emotion/styled';
import axios from 'axios';
import {
  axiosInstance,
  axiosWithData,
  AXIOS_METHOD_WITH_DATA,
} from '../../../context/axios-interface';
import AuthStore from '../../../states/auth/AuthStore';
import LoadingStore from '../../../states/loading/LoadingStore';
import defaultTheme from '../../../styles/theme';
import { ModalType } from '../mentor-info-modal';
import { IAvailableDate, IRows } from './mentor-details-modal-inteface';

const ModalFooterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Button = styled.div`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  color: ${defaultTheme.fontColor.whiteColor};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  margin: 10px 20px;
  border-radius: 10px;
  &:hover {
    opacity: 0.8;
  }
  cursor: pointer;
`;

interface ModalFooterProps {
  modalType: ModalType;
  intraId: string;
  name: string;
  slackId: string;
  alreadyRegistered: boolean;
  isCodeSucess: boolean;
  checked: boolean;
  rows: IRows[];
  setApplyModal: (b: boolean) => void;
}

enum AvailableTimeError {
  INPUT_ERROR,
  OVERLAP_ERROR,
  SUCCESS,
}

async function validateRows(rows: IRows[]): Promise<boolean> {
  const invaild_data = -1;

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].date.length; j++) {
      if (rows[i].date[j] === invaild_data) {
        return false;
      }
    }
  }
  return true;
}

async function validateAvailableTime(
  time: IAvailableDate[][],
): Promise<AvailableTimeError> {
  for (let i = 0; i < time.length; i++) {
    for (let j = 0; j < time[i].length; j++) {
      if (!isValidTime(time[i][j])) {
        return AvailableTimeError.INPUT_ERROR;
      }
    }
  }

  for (let day = 0; day < 7; day++) {
    const length = time[day].length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (i === j) {
          continue;
        }
        if (!validateTimeOverlap(time[day][i], time[day][j])) {
          return AvailableTimeError.OVERLAP_ERROR;
        }
      }
    }
  }
  return AvailableTimeError.SUCCESS;
}

function isValidTime(time: IAvailableDate): boolean {
  if (
    !(time.startHour >= 0 && time.startHour < 24) ||
    !(time.startMinute === 0 || time.startMinute === 30) ||
    !(time.endHour >= 0 && time.endHour < 24) ||
    !(time.endMinute === 0 || time.endMinute === 30)
  ) {
    return false;
  }
  if (time.startHour >= time.endHour) {
    return false;
  }
  const endTotalMinute = time.endHour * 60 + time.endMinute;
  const startTotalMinute = time.startHour * 60 + time.startMinute;
  if (endTotalMinute - startTotalMinute < 60) {
    return false;
  }
  return true;
}

function validateTimeOverlap(
  time1: IAvailableDate,
  time2: IAvailableDate,
): boolean {
  if (time1.startHour <= time2.startHour && time1.endHour > time2.startHour) {
    return false;
  }
  if (
    time1.endHour === time2.startHour &&
    time1.endMinute === 30 &&
    time2.startMinute === 0
  ) {
    return false;
  }
  if (time2.startHour <= time1.startHour && time2.endHour > time1.startHour) {
    return false;
  }
  if (
    time2.endHour === time1.startHour &&
    time2.endMinute === 30 &&
    time1.endMinute === 0
  ) {
    return false;
  }
  return true;
}

async function getAvailableTime(
  rows: IRows[],
  checked: boolean,
): Promise<IAvailableDate[][]> {
  const availableTime: IAvailableDate[][] = Array.from(Array(7), () =>
    Array(0).fill(null),
  );

  if (checked) {
    rows.map(row => {
      const temp: IAvailableDate = {
        startHour: (row.date[1] + 8) % 24,
        startMinute: row.date[2] ? 30 : 0,
        endHour: (row.date[3] + 8) % 24,
        endMinute: row.date[4] ? 30 : 0,
      };
      availableTime[row.date[0]].push(temp);
    });
  }

  return availableTime;
}

async function updateMentorInfo(props: ModalFooterProps) {
  if (!props.name) {
    alert('이름을 입력하세요');
    return;
  }

  if (!props.slackId) {
    alert('Slack ID를 입력하세요');
    return;
  }

  if (!props.alreadyRegistered && !props.isCodeSucess) {
    alert('e-mail 인증을 완료해주세요');
    return;
  }

  LoadingStore.on();

  try {
    axios.defaults.headers.common[
      'Authorization'
    ] = `bearer ${AuthStore.getAccessToken()}`;

    const response = await axios.patch(
      `${process.env.REACT_APP_BASE_BACKEND_URL}/mentors/${props.intraId}`,
      {
        name: props.name,
        slackId: props.slackId,
      },
    );

    if (response.status === 200) {
      alert('제출에 성공하셨습니다');
      props.setApplyModal(false);
    } else {
      alert('제출에 실패하셨습니다');
    }
  } catch (err) {
    alert('제출에 실패하셨습니다');
  } finally {
    LoadingStore.off();
  }
}

async function updateMentorTime(props: ModalFooterProps) {
  LoadingStore.on();

  if (!(await validateRows(props.rows))) {
    alert('가능시간에 빈 칸이 있습니다');
    LoadingStore.off();
    return;
  }
  console.log(props.rows);
  const availableTime: IAvailableDate[][] = await getAvailableTime(
    props.rows,
    props.checked,
  );

  const resultVaildation: AvailableTimeError = await validateAvailableTime(
    availableTime,
  );

  if (resultVaildation === AvailableTimeError.INPUT_ERROR) {
    alert('가능시간은 시작 시간으로부터 1시간 이상이어야 합니다');
    LoadingStore.off();
    return;
  } else if (resultVaildation === AvailableTimeError.OVERLAP_ERROR) {
    alert('선택하신 가능시간 간에 중복이 있습니다');
    LoadingStore.off();
    return;
  }

  try {
    axios.defaults.headers.common[
      'Authorization'
    ] = `bearer ${AuthStore.getAccessToken()}`;

    const response = await axios.patch(
      `${process.env.REACT_APP_BASE_BACKEND_URL}/mentors/${props.intraId}`,
      {
        availableTime: availableTime,
        isActive: props.checked,
      },
    );

    if (response.status === 200) {
      alert('제출에 성공하셨습니다');
      props.setApplyModal(false);
    } else {
      alert('제출에 실패하셨습니다');
    }
  } catch (err) {
    alert('제출에 실패하셨습니다');
  } finally {
    LoadingStore.off();
  }
}

export function ModalFooter(props: ModalFooterProps) {
  return (
    <ModalFooterContainer>
      <Button
        style={{ backgroundColor: defaultTheme.colors.polarSimpleMain }}
        onClick={
          props.modalType === ModalType.MENTOR_INFO
            ? () => updateMentorInfo(props)
            : () => updateMentorTime(props)
        }
      >
        제출
      </Button>
    </ModalFooterContainer>
  );
}
