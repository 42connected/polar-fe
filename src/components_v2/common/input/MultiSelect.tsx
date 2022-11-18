import { SetStateAction } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { createTheme, ThemeProvider } from '@mui/material';
import { selectList } from '@/src/interfaces/selectProps.interface';
import defaultTheme from '../../../styles/themeV2';

interface Props {
  list: selectList[];
  name?: string;
  selectedValue: selectList[];
  setSelectedValue: (value: SetStateAction<selectList[]>) => void;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const selectTheme = createTheme({
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
 * `selectList[]`형태의 리스트 중 여러가지를 `checkbox`로 선택할 수 있는 컴포넌트 (검색 가능 / 선택값은 입력창 안에 보이지 않음)
 * @param {selectList[]} list `selectList[]` 전체 선택 가능한 리스트, category가 존재한다면 각 카테고리 별로 보여줌.
 * @param {selectedValue[]} selectedValue `selectList[]` 선택된 요소들의 리스트
 * @param {(value: SetStateAction<selectList[]>) => void} setSelectedValue `(value: SetStateAction<selectList[]>) => void` selectedValue의 setter 함수
 * @param {string} name 보여지는 컴포넌트의 이름, 리스트의 카테고리가 존재하지 않는다면 해당 값이 카테고리로 설정됨.
 */
function MultiSelect({
  list,
  selectedValue,
  setSelectedValue,
  name = '',
}: Props) {
  return (
    <ThemeProvider theme={selectTheme}>
      <Autocomplete
        size="small"
        sx={{ width: '100%' }}
        multiple
        disableCloseOnSelect
        openOnFocus
        options={list}
        groupBy={(option: selectList) =>
          option?.category ? option.category : name
        }
        isOptionEqualToValue={(option: selectList, val: selectList) =>
          option.value === val.value
        }
        getOptionLabel={option => option.name}
        value={selectedValue}
        onChange={(_, newValue) => {
          setSelectedValue(newValue);
        }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginLeft: -10 }}
              checked={selected}
            />
            {option.name}
          </li>
        )}
        renderTags={() => null}
        renderInput={params => (
          <TextField {...params} variant="outlined" placeholder={name} />
        )}
      />
    </ThemeProvider>
  );
}

MultiSelect.defaultProps = {
  name: '',
};

export default MultiSelect;
