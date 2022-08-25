import styled from '@emotion/styled';
import defaultTheme from '../../../../styles/theme';
import { LittleBox } from './little-box';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0px;
  /*background-color: ${defaultTheme.colors.polarBrightMain};*/
`;

const InputContainer = styled.textarea`
  width: 80%;
  height: 100px;
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  vertical-align: top;
  resize: none;
  &:focus {
    outline: none;
  }
  background-color: ${defaultTheme.colors.polarGray};
`;

export interface WaitProps {
  cadetName: string;
  cadetIntraId: string;
  cadetIsCommon: boolean;
  mentoringTopic: string;
  setter: (input: string) => void;
  question?: string;
}

export function Wait(props: WaitProps) {
  return (
    <Container>
      <LittleBox
        title={'멘토링 시간'}
        content={'2020.08.15 12:00 ~ 2020.08.15 14:00'}
        underline={false}
        link={''}
      />
      <LittleBox
        title={'멘토링 구분'}
        content={props.cadetIsCommon ? '공통과정' : '심화과정'}
        underline={false}
        link={''}
      />
      <LittleBox
        title={'카뎃 이름'}
        content={props.cadetName}
        underline={true}
        link={'asdf'}
      />
      <LittleBox
        title={'카뎃 Intra ID'}
        content={props.cadetIntraId}
        underline={true}
        link={'asdf'}
      />
      <LittleBox
        title={'멘토링 주제'}
        content={props.mentoringTopic}
        underline={false}
        link={''}
      />
      <LittleBox
        title={'질문 내용'}
        titleColor={defaultTheme.colors.polarSimpleMain}
        content={''}
        underline={false}
        link={''}
      />
      <InputContainer
        onChange={e => {
          console.log('asd');
        }}
        disabled={true}
        value={props.question}
      />
    </Container>
  );
}
