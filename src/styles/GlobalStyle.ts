import { createGlobalStyle } from 'styled-components';
import defaultTheme from '@/styles/theme';

const GlobalStyle = createGlobalStyle`
  button{
    display:flex;
    font-family: 'SEBANG Gothic';
    outline: none;
  }
  body {
    height:100%;
    min-height: calc(100vh - 205px);
    font-family: 'NanumGothic';
    line-height: 1.6;
  }
  input {
    display: flex;
    padding-left: 10px;
  }
  html {
    font-size: 10px;
  }
`;
export default GlobalStyle;
