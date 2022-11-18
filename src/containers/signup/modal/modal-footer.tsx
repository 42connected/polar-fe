import styled from '@emotion/styled';
import axios from 'axios';
import { useState } from 'react';
import {
  OneButtonModal,
  OneButtonModalProps,
} from '@/components/v1/modal/one-button-modal/one-button-modal';
import AuthStore from '@/states/auth/AuthStore';
import LoadingStore from '@/states/loading/LoadingStore';
import defaultTheme from '@/styles/theme';
import { ModalType } from '@/containers/signup/mentor-info-modal';
import {
  IAvailableDate,
  IRows,
} from '@/containers/signup/modal/mentor-details-modal-inteface';

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
        startHour: row.date[1] % 24,
        startMinute: row.date[2] ? 30 : 0,
        endHour: row.date[3] % 24,
        endMinute: row.date[4] ? 30 : 0,
      };
      availableTime[row.date[0]].push(temp);
    });
  }

  return availableTime;
}

export function ModalFooter(props: ModalFooterProps) {
  const [isError, setIsError] = useState<boolean>(false);
  const [oneButtonModalProps, setOneButtonModalProps] =
    useState<OneButtonModalProps>({
      TitleText: '',
      Text: 'ss',
      XButtonFunc: () => {
        setIsError(false);
      },
      ButtonText: '',
      ButtonBg: '',
      ButtonFunc: () => {
        setIsError(false);
      },
    });

  async function updateMentorInfo(props: ModalFooterProps) {
    if (!props.name) {
      setOneButtonModalProps({
        TitleText: '이름을 입력하세요',
        Text: '이름을 입력하세요',
        XButtonFunc: () => {
          setIsError(false);
        },
        ButtonText: '확인',
        ButtonFunc: () => {
          setIsError(false);
        },
      });

      setIsError(true);
      return;
    }

    if (!props.slackId) {
      setOneButtonModalProps({
        TitleText: 'Slack ID를 입력하세요',
        Text: 'Slack ID를 입력하세요',
        XButtonFunc: () => {
          setIsError(false);
        },
        ButtonText: '확인',
        ButtonFunc: () => {
          setIsError(false);
        },
      });

      setIsError(true);
      return;
    }

    if (!props.alreadyRegistered && !props.isCodeSucess) {
      setOneButtonModalProps({
        TitleText: 'e-mail 인증을 완료해주세요',
        Text: 'e-mail 인증을 완료해주세요',
        XButtonFunc: () => {
          setIsError(false);
        },
        ButtonText: '확인',
        ButtonFunc: () => {
          setIsError(false);
        },
      });

      setIsError(true);
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
        setOneButtonModalProps({
          TitleText: '제출 성공',
          Text: '제출에 성공하셨습니다',
          XButtonFunc: () => {
            setIsError(false);
          },
          ButtonText: '확인',
          ButtonFunc: () => {
            setIsError(false);
          },
        });

        setIsError(true);
        props.setApplyModal(false);
        window.location.reload();
      } else {
        setOneButtonModalProps({
          TitleText: '제출 실패',
          Text: '제출에 실패하셨습니다',
          XButtonFunc: () => {
            setIsError(false);
          },
          ButtonText: '확인',
          ButtonFunc: () => {
            setIsError(false);
          },
        });

        setIsError(true);
      }
    } catch (err) {
      setOneButtonModalProps({
        TitleText: '제출 실패',
        Text: '제출에 실패하셨습니다',
        XButtonFunc: () => {
          setIsError(false);
        },
        ButtonText: '확인',
        ButtonFunc: () => {
          setIsError(false);
        },
      });

      setIsError(true);
    } finally {
      LoadingStore.off();
    }
  }

  async function updateMentorTime(props: ModalFooterProps) {
    LoadingStore.on();

    if (props.rows?.length === 0 && props.checked) {
      setOneButtonModalProps({
        TitleText: '가능시간 입력',
        Text: '입력하신 가능시간이 없습니다',
        XButtonFunc: () => {
          setIsError(false);
        },
        ButtonText: '확인',
        ButtonFunc: () => {
          setIsError(false);
        },
      });

      setIsError(true);
      LoadingStore.off();
      return;
    }

    if (!(await validateRows(props.rows))) {
      setOneButtonModalProps({
        TitleText: '가능시간 빈 칸',
        Text: '가능시간에 빈 칸이 있습니다',
        XButtonFunc: () => {
          setIsError(false);
        },
        ButtonText: '확인',
        ButtonFunc: () => {
          setIsError(false);
        },
      });

      setIsError(true);
      LoadingStore.off();
      return;
    }
    const availableTime: IAvailableDate[][] = await getAvailableTime(
      props.rows,
      props.checked,
    );

    const resultVaildation: AvailableTimeError = await validateAvailableTime(
      availableTime,
    );

    if (resultVaildation === AvailableTimeError.INPUT_ERROR) {
      setOneButtonModalProps({
        TitleText: '올바르지 않은 가능시간',
        Text: '가능시간은 시작 시간으로부터 1시간 이상이어야 합니다',
        XButtonFunc: () => {
          setIsError(false);
        },
        ButtonText: '확인',
        ButtonFunc: () => {
          setIsError(false);
        },
      });

      setIsError(true);
      LoadingStore.off();
      return;
    } else if (resultVaildation === AvailableTimeError.OVERLAP_ERROR) {
      setOneButtonModalProps({
        TitleText: '가능시간 간 중복',
        Text: '선택하신 가능시간 간에 중복이 있습니다',
        XButtonFunc: () => {
          setIsError(false);
        },
        ButtonText: '확인',
        ButtonFunc: () => {
          setIsError(false);
        },
      });

      setIsError(true);
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
        setOneButtonModalProps({
          TitleText: '제출 성공',
          Text: '제출에 성공하셨습니다',
          XButtonFunc: () => {
            setIsError(false);
          },
          ButtonText: '확인',
          ButtonFunc: () => {
            setIsError(false);
          },
        });

        setIsError(true);
        props.setApplyModal(false);
        window.location.reload();
      } else {
        setOneButtonModalProps({
          TitleText: '제출 실패',
          Text: '제출에 실패하셨습니다',
          XButtonFunc: () => {
            setIsError(false);
          },
          ButtonText: '확인',
          ButtonFunc: () => {
            setIsError(false);
          },
        });

        setIsError(true);
      }
    } catch (err) {
      setOneButtonModalProps({
        TitleText: '제출 실패',
        Text: '제출에 실패하셨습니다',
        XButtonFunc: () => {
          setIsError(false);
        },
        ButtonText: '확인',
        ButtonFunc: () => {
          setIsError(false);
        },
      });

      setIsError(true);
    } finally {
      LoadingStore.off();
    }
  }

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
      {isError && <OneButtonModal {...oneButtonModalProps} />}
    </ModalFooterContainer>
  );
}
