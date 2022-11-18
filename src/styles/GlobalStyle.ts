import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import defaultThemeV2 from '@/styles/themeV2';

const GlobalStyle = createGlobalStyle`
  ${normalize};
  button{
    display:flex;
    font-family: ${defaultThemeV2.font.sebangGothic};
    outline: none;
  }
  body {
    height:100%;
    /* Header와 Footer 길이 설정하려고 달아둠 */
    /* 차후 Header, Footer 수정 시 min-height 삭제 가능 */
    min-height: calc(100vh - 205px);
    font-family: ${defaultThemeV2.font.nanumGothic};
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
