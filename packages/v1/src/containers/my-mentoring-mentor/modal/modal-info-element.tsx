import styled from '@emotion/styled';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultTheme from '../../../styles/theme';

export const Title = styled.div`
  font-weight: bold;
  width: 40%;
  ${defaultTheme.fontSize.sizeSmall};
`;

export const Content = styled.div`
  width: 60%;
`;

export const Container = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 80%;
  margin: 10px;
  ${defaultTheme.font.nanumGothic};
  ${defaultTheme.fontSize.sizeSmall};
`;

const LinkContent = styled.a`
  display: flex;
  width: 60%;
  text-decoration: underline;
`;

const IconBox = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  margin-right: 0.2rem;
`;

interface ModalInfoElementProps {
  title: string;
  titleColor: string;
  content: string;
  link?: string;
}

export function ModalInfoElement(props: ModalInfoElementProps) {
  return (
    <Container>
      <Title style={{ color: `${props.titleColor}` }}>{props.title}</Title>
      {props.link ? (
        <LinkContent href={props.link} target="_blank">
          <IconBox>
            <FontAwesomeIcon icon={faLink} />
          </IconBox>
          {props.content}
        </LinkContent>
      ) : (
        <Content>{props.content}</Content>
      )}
    </Container>
  );
}
