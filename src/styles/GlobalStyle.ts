import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  button{
    display:flex;
    font-family: 'SEBANG Gothic';
    outline: none;
  }
  body {
    font-family: 'NanumGothic';
    background-color: ${theme.colors.polarBackground};
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
