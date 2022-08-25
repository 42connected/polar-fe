import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import KeywordStore from '../../states/mentor-list/KeywordStore';
import MentorsStore from '../../states/mentor-list/MentorsStore';
import defaultTheme from '../../styles/theme';

export const KeywordButton = styled.button`
  ${defaultTheme.font.sebangGothic};
  ${defaultTheme.fontSize.sizeExtraSmall};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin: 10px 5px;
  border-radius: 30px;
  border: none;
  text-align: center;
  text-decoration: none;
  background-color: ${props => props.color};
  color: #ffffff;
  &:hover {
    opacity: 0.8;
  }
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

export interface KeywordProps {
  name: string;
  isClicked: boolean;
}

export function MentorKeyword(props: KeywordProps) {
  const { category } = useParams();

  return (
    <KeywordButton
      onClick={() => {
        if (!props.isClicked) {
          KeywordStore.pushSelected(props.name);
          MentorsStore.Initializer(category, KeywordStore.selected, undefined);
        } else {
          KeywordStore.removeSelectedByKeyword(props.name);
          MentorsStore.Initializer(category, KeywordStore.selected, undefined);
        }
      }}
      color={props.isClicked ? defaultTheme.colors.polarSimpleMain : 'gray'}
    >
      {props.name}
    </KeywordButton>
  );
}
