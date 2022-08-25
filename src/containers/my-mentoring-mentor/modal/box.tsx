import styled from '@emotion/styled';
import defaultTheme from '../../../styles/theme';
import { WaitProps } from './status/wait';

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 500px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const PageTitle = styled.div`
  display: flex;
  justify-content: center;
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeMedium};
  padding: 20px 0px;
`;

const StatusBox = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontFrame.titleLarge};
  ${defaultTheme.fontSize.sizeExtraSmall};
  color: ${defaultTheme.fontColor.whiteColor};
  display: flex;
  justify-content: center;
  width: 50px;
  padding: 0px 5px;
  margin-left: 20px;
  height: min-content;
  background-color: ${defaultTheme.colors.polarBrightMain};
  border-radius: 10px;
`;

const ModalHeader = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid black;
  height: 50px;
`;

const ModalBody = styled.div`
  display: flex;
  margin-top: 10px;
  width: 80%;
  justify-content: center;
  align-items: center;
  background-color: ${defaultTheme.colors.polarGray};
  border-radius: 10px;
`;

const ModalFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontFrame.titleLarge};
  ${defaultTheme.fontSize.sizeExtraSmall};
  color: ${defaultTheme.fontColor.whiteColor};
  display: flex;
  justify-content: center;
  width: 50px;
  padding: 5px 5px;
  margin: 10px 20px;
  height: min-content;
  background-color: ${defaultTheme.colors.polarBrightMain};
  border-radius: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

interface ModalBoxProps {
  title: string;
  status: string;
  button1: string;
  button1bg: string;
  button1fn: () => void;
  button2: string;
  button2bg: string;
  button2fn: () => void;
  innerbox: (props: WaitProps) => JSX.Element;
  innerboxProps: any;
  setter: (input: string) => void;
}

export function ModalBox(props: ModalBoxProps) {
  return (
    <Box>
      <ModalHeader>
        <PageTitle>{props.title}</PageTitle>
        <StatusBox>{props.status}</StatusBox>
      </ModalHeader>
      <ModalBody>
        {props.innerbox({
          cadetName: props.innerboxProps.cadetName,
          cadetIntraId: props.innerboxProps.cadetIntraId,
          cadetIsCommon: props.innerboxProps.cadetIsCommon,
          mentoringTopic: props.innerboxProps.mentoringTopic,
          setter: props.setter,
          question: 'Nestjs를 이용해서 프로젝트를 진행하고 있습니다!',
        })}
      </ModalBody>
      <ModalFooter>
        <Button
          style={{ backgroundColor: props.button1bg }}
          onClick={props.button1fn}
        >
          {props.button1}
        </Button>
        <Button
          style={{ backgroundColor: props.button2bg }}
          onClick={props.button2fn}
        >
          {props.button2}
        </Button>
      </ModalFooter>
    </Box>
  );
}
