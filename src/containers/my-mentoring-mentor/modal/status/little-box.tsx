import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import defaultTheme from '../../../../styles/theme';

const LittleTitle = styled.div`
  font-weight: bold;
  width: 40%;
  ${defaultTheme.fontSize.sizeSmall};
`;

const LittleContent = styled.div`
  text-decoration: underline;
  width: 60%;
`;

const Box = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 80%;
  margin: 10px;
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeSmall};
`;

const LinkWrapper = styled(Link)`
  display: flex;
  width: 60%;
  text-decoration: underline;
`;

interface LittleBoxProps {
  title: string;
  titleColor?: string;
  content: string;
  underline: boolean;
  link: string;
}

export function LittleBox(props: LittleBoxProps) {
  if (props.underline) {
    return (
      <Box>
        <LittleTitle
          style={{ color: `${props.titleColor ? props.titleColor : 'black'}` }}
        >
          {props.title}
        </LittleTitle>
        <LinkWrapper to={props.link}>{props.content}</LinkWrapper>
      </Box>
    );
  }
  return (
    <Box>
      <LittleTitle
        style={{ color: `${props.titleColor ? props.titleColor : 'black'}` }}
      >
        {props.title}
      </LittleTitle>
      <LittleContent
        style={{
          textDecoration: `${props.underline ? 'underline' : 'none'}`,
        }}
      >
        {props.content}
      </LittleContent>
    </Box>
  );
}
