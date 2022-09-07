import { OneButtonModal } from '../../components/modal/one-button-modal/one-button-modal';
import ErrorStore from '../../states/error/ErrorStore';
import defaultTheme from '../../styles/theme';

interface ErrorProps {
  TitleText: string;
  errorMsg: string;
}

export function Error(props: ErrorProps) {
  return (
    <OneButtonModal
      TitleText={props.TitleText}
      Text={props.errorMsg}
      ButtonText="닫기"
      ButtonFunc={() => {
        ErrorStore.off();
      }}
      ButtonBg={defaultTheme.colors.Red}
    />
  );
}
