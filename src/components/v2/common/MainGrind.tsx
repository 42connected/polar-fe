import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  background-color: white;
  margin: auto 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: auto minmax(100vh, auto) auto;
  grid-template-areas:
    'nav'
    'main'
    'footer';
  text-align: center;
  grid-gap: 0.25rem;
`;

export const HeaderWrap = styled.header`
  grid-area: nav;
  margin-left: -1rem;
  margin-right: -1rem;
`;

export const MainWrap = styled.main`
  grid-area: main;
`;

export const FooterWrap = styled.footer`
  grid-area: footer;
  margin-left: -1rem;
  margin-right: -1rem;
`;
