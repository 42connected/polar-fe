import styled from 'styled-components';

const Container = styled.div`
  display: 'flex';
  align-items: 'center';
  justify-content: 'center';
  font-size: 10rem;
  position: 'absolute';
  width: '100%';
  height: '100%';
`;

export default function NotFoundPage() {
  return <Container>404</Container>;
}
