import 'styled-components';

declare module 'styled-components' {
  export interface ThemeV2 {
    shadow: {
      defaultShadow: string;
    };
    colors: {
      polarBlue: string;
      backgroundPink: string;
      brightBlue: string;
      black: string;
      brightGray: string;
      inputBoxColor: string;
      simpleGray: string;
      darkGray: string;
      red: string;
      yellow: string;
      green: string;
      slightBlue: string;
      white: string;
      middleGray: string;
      polarMiddleBlue: string;
      backgroundGray: string;
    };

    fontWeight: {
      weightRegular: string;
      weightBold: string;
      weightExtraBold: string;
    };

    pcFontSize: {
      sizeSmall: string;
      sizeExtraSmall: string;
      sizeMedium: string;
      sizeExtraMedium: string;
      sizeLarge: string;
      sizeExtraLarge: string;
    };
    mobileFontSize: {
      sizeSmall: string;
      sizeMedium: string;
      sizeLarge: string;
    };

    font: {
      sebangGothic: string;
      nanumGothic: string;
    };

    typography: {
      bigSebang: string;
      middleSebang: string;
      smallSebang: string;
      boldBigSebang: string;
      boldMiddleSebang: string;
      boldSmallSebang: string;
      bigNanum: string;
      middleNanum: string;
      smallNanum: string;
      boldBigNanum: string;
      boldMiddleNanum: string;
      boldSmallNanum: string;
      ExtraBoldBigNanum: string;
      ExtraBoldMiddleNanum: string;
      ExtraBoldSmallNanum: string;
    };

    zIndex: {
      header: string;
      footer: string;
      headerNav: string;
      modal: string;
      loading: string;
      error: string;
    };
  }

  export interface ThemeV1 {
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
      Yellow: string;
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
    fontWeight: {
      weightSmall: string;
      weightLarge: string;
    };

    fontSize: {
      sizeSmall: string;
      sizeExtraSmall: string;
      sizeMedium: string;
      sizeExtraMedium: string;
      sizeLarge: string;
      sizeExtraLarge: string;
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
