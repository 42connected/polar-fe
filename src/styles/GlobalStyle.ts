import { createGlobalStyle } from 'styled-components';
import defaultTheme from './theme';

const GlobalStyle = createGlobalStyle`
  button{
    display:flex;
    font-family: 'SEBANG Gothic';
    outline: none;
  }
  body {
    height:100%;
    min-height: 100%;
    font-family: 'NanumGothic';
    line-height: 1.6;
    background-color: ${defaultTheme.colors.polarGray};
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
