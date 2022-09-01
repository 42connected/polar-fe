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
  intraId: string;
  name: string;
  slackId: string;
  alreadyRegistered: boolean;
  isCodeSucess: boolean;
  setApplyModal: (b: boolean) => void;
}

async function joinMentorServer(props: ModalFooterProps) {
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

export function ModalFooter(props: ModalFooterProps) {
  return (
    <ModalFooterContainer>
      <Button
        style={{ backgroundColor: defaultTheme.colors.polarSimpleMain }}
        onClick={() => joinMentorServer(props)}
      >
        제출
      </Button>
    </ModalFooterContainer>
  );
}
