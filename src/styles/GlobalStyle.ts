import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  button{
    display:flex;
    font-family: sebangGothic;
    outline: none;
  }
  body {
    display: flex;
    font-family: NanumGothic;
  }
  input {
    display: flex;
    padding-left: 10px;
  }
`;
export default GlobalStyle;
