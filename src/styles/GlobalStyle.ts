import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  button{
    display:flex;
    font-family: 'SEBANG Gothic';
    outline: none;
  }
  body {
    font-family: 'NanumGothic';
  }
  input {
    display: flex;
    padding-left: 10px;
  }
  html{
    font-size: 10px;
  }
`;
export default GlobalStyle;
