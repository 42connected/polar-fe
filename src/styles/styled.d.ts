import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    shadow: {
      defaultShadow: string;
      buttonShadow: string;
    };
    colors: {
      polarMain: string;
      polarSimpleMain: string;
      polarBackground: string;
      polarBrightMain: string;
      polarGray: string;
      grayOne: string;
      grayTwo: string;
      grayThree: string;
      grayFour: string;
      grayFive: string;
      graySix: string;
      backgoundWhite: string;
      blackOne: string;
      blackTwo: string;
      blackThree: string;
      inputBoxBackgound: string;
      fontGray: string;
      Red: string;
      Yello: string;
    };
    fontFrame: {
      titleSmall: string;
      titleMedium: string;
      titleLarge: string;
      titleGiant: string;
      subTitleSmall: string;
      subTitleMiddle: string;
      bodySmall: string;
      bodyMiddle: string;
    };
    font: {
      sebangGothic: string;
      nanumGothic: string;
    };
    fontColor: {
      titleColor: string;
      blueColor: string;
      whiteColor: string;
      grayColor: string;
    };
  }
}
