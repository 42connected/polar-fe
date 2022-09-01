import { useNavigate } from 'react-router-dom';
import { OneButtonModal } from '../../components/modal/one-button-modal/one-button-modal';
import ErrorStore from '../../states/error/ErrorStore';
import defaultTheme from '../../styles/theme';

interface ErrorProps {
  TitleText: string;
  errorMsg: string;
}

export function Error(props: ErrorProps) {
  const navigate = useNavigate();
  return (
    <OneButtonModal
      TitleText={props.TitleText}
      Text={props.errorMsg}
      XButtonFunc={() => {
        ErrorStore.off();
      }}
      ButtonText="뒤로 가기"
      ButtonFunc={() => {
        ErrorStore.off();
        navigate(-1);
      }}
      ButtonBg={defaultTheme.colors.Red}
    />
  );
}
