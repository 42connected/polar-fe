import { ThemeV2 } from 'styled-components';

const defaultThemeV2: ThemeV2 = {
  shadow: {
    defaultShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  colors: {
    polarBlue: '#313C7A',
    backgroundPink: '#F5F4F9',
    brightBlue: '#6D77AF',
    black: '#000000',
    brightGray: '#D3D3D3',
    inputBoxColor: '#F4F4F4',
    simpleGray: '#C2C2C2',
    darkGray: '#737373',
    red: '#DA0D00',
    yellow: '#F9C132',
    green: '#1EB640',
    slightBlue: '#E1E3EE',
    white: '#FFFFFF',
    middleGray: '#CCCCCC',
    polarMiddleBlue: '#3F4D97',
    backgroundGray: '#F6F6F6',
  },

  fontWeight: {
    weightRegular: '400',
    weightBold: '700',
    weightExtraBold: '800',
  },

  pcFontSize: {
    sizeSmall: '1.3rem',
    sizeExtraSmall: '1.6rem',
    sizeMedium: '2.0rem',
    sizeExtraMedium: '2.5rem',
    sizeLarge: '3.0rem',
    sizeExtraLarge: '3.5rem',
  },

  mobileFontSize: {
    sizeSmall: '0.9rem',
    sizeMedium: '1.2rem',
    sizeLarge: '1.6rem',
  },

  font: {
    sebangGothic: 'SEBANG Gothic',
    nanumGothic: 'NanumGothic',
  },

  typography: {
    bigSebang:
      'font-family: "SEBANG Gothic"; font-weight: 400; font-size: 1.6rem;',
    middleSebang:
      'font-family: "SEBANG Gothic"; font-weight: 400; font-size: 1.2rem;',
    smallSebang:
      'font-family: "SEBANG Gothic"; font-weight: 400; font-size: 0.9rem;',
    boldBigSebang:
      'font-family: "SEBANG Gothic"; font-weight: 700; font-size: 1.6rem;',
    boldMiddleSebang:
      'font-family: "SEBANG Gothic"; font-weight: 700; font-size: 1.2rem;',
    boldSmallSebang:
      'font-family: "SEBANG Gothic"; font-weight: 700; font-size: 0.9rem;',
    bigNanum:
      'font-family: "NanumGothic"; font-weight: 400; font-size: 1.6rem;',
    middleNanum:
      'font-family: "NanumGothic"; font-weight: 400; font-size: 1.2rem;',
    smallNanum:
      'font-family: "NanumGothic"; font-weight: 400; font-size: 0.9rem;',
    boldBigNanum:
      'font-family: "NanumGothic"; font-weight: 700; font-size: 1.6rem;',
    boldMiddleNanum:
      'font-family: "NanumGothic"; font-weight: 700; font-size: 1.2rem;',
    boldSmallNanum:
      'font-family: "NanumGothic"; font-weight: 700; font-size: 0.9rem;',
    ExtraBoldBigNanum:
      'font-family: "NanumGothic"; font-weight: 800; font-size: 1.6rem;',
    ExtraBoldMiddleNanum:
      'font-family: "NanumGothic"; font-weight: 800; font-size: 1.2rem;',
    ExtraBoldSmallNanum:
      'font-family: "NanumGothic"; font-weight: 800; font-size: 0.9rem;',
  },

  zIndex: {
    header: '500',
    footer: '500',
    headerNav: '100',
    modal: '900',
    loading: '999',
    error: '1000',
  },
};

export default defaultThemeV2;
