import styled from '@emotion/styled';
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

interface ModalInfoElementProps {
  title: string;
  titleColor: string;
  content: string;
  link: string;
}

export function ModalInfoElement(props: ModalInfoElementProps) {
  return (
    <Container>
      <Title style={{ color: `${props.titleColor}` }}>{props.title}</Title>
      {props.link !== '' ? (
        <LinkContent href={props.link} target="_blank">
          {props.content}
        </LinkContent>
      ) : (
        <Content>{props.content}</Content>
      )}
    </Container>
  );
}
