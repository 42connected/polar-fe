import { DefaultTheme } from 'styled-components';

const defaultTheme: DefaultTheme = {
  shadow: {
    defaultShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    buttonShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  colors: {
    polarMain:
      'linear-gradient(92.41deg, #757FB8 34.97%, rgba(35, 47, 117, 0.99) 81.79%)',
    polarSimpleMain: '#313C7A',
    polarBackground: '#F5F4F9',
    polarBrightMain: '#6D77AF',
    polarGray: '#6D77AF',
    grayOne: '#737373',
    grayTwo: '#615C5C',
    grayThree: '#9F9F9F',
    grayFour: '#C2C2C2',
    grayFive: '#D9D9D9',
    graySix: '#FAFAFA',
    backgoundWhite: '#FFFFFF',
    blackOne: '#000000',
    blackTwo: '#120A02',
    blackThree: '#1A1406',
    inputBoxBackgound: '#F4F4F4',
    fontGray: '#A2A3A8',
    Red: '#DA0D00',
    Yello: '#F9C132',
  },
  font: {
    titleSmall: 'font-weight: 700; font-size: 2.0rem;',
    titleMedium: 'font-weight: 700; font-size: 2.5rem;',
    titleLarge: 'font-weight: 700; font-size: 3.0rem;',
    titleGiant: 'font-weight: 400; font-size: 3.5rem;',
    subTitleSmall: 'font-weight: 700; font-size: 1.3rem;',
    subTitleMiddle: 'font-weight: 700; font-size: 1.6rem;',
    bodySmall: 'font-weight: 400; font-size: 1.3rem;',
    bodyMiddle: 'font-weight: 400; font-size: 1.6rem;',
  },
  fontColor: {
    titleColor: '#000000',
    blueColor: '#313C7A',
    whiteColor: '#FFFFFF',
    grayColor: '#A2A3A8',
  },
};

export { defaultTheme };
