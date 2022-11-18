import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material';
import defaultTheme from '../../../styles/themeV2';
import {
  selectProps,
  selectList,
} from '@/src/interfaces/selectProps.interface';

const theme = createTheme({
  palette: {
    primary: {
      main: defaultTheme.colors.polarBlue,
    },
    secondary: {
      main: defaultTheme.colors.polarMiddleBlue,
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: defaultTheme.font.sebangGothic,
    fontSize: 11,
    fontWeightMedium: defaultTheme.fontWeight.weightRegular,
    fontWeightBold: defaultTheme.fontWeight.weightBold,
  },
});

/**
 * `selectList[]`형태의 리스트 중 하나를 선택하는 컴포넌트 (검색 가능 / `width: 100%`)
 *
 * **선택한 값은 null일 수 없습니다.**
 *
 * @param {selectList[]} list `selectList[]` 전체 선택 가능한 리스트
 * @param {selectedList} selectedValue `selectList` 선택된 요소
 * @param {(value: SetStateAction<selectList>) => void} setSelectedValue `(value: SetStateAction<selectList>) => void` selectedValue의 setter 함수
 * @param {string} name 보여지는 컴포넌트의 이름
 */
function BasicSelect({
  list,
  selectedValue,
  setSelectedValue,
  name,
}: selectProps) {
  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        isOptionEqualToValue={(option: selectList, val: selectList) =>
          option.value === val.value && option.name === val.name
        }
        blurOnSelect
        disableClearable
        autoSelect
        autoHighlight
        getOptionLabel={option => option.name}
        size="small"
        value={selectedValue}
        onChange={(_, newValue: selectList) => {
          setSelectedValue(newValue);
        }}
        options={list}
        sx={{ width: '100%' }}
        renderInput={params => (
          <TextField {...params} label={name} size="small" variant="standard" />
        )}
      />
    </ThemeProvider>
  );
}

BasicSelect.defaultProps = {
  name: '',
};

export default BasicSelect;
