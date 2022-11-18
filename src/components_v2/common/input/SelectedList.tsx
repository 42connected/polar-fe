import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { createTheme, ThemeProvider } from '@mui/material';
import { selectList } from '@/src/interfaces/selectProps.interface';
import defaultTheme from '@/styles/themeV2';

interface Props {
  modify?: boolean;
  list: selectList[];
  onDelete?: (delVal: number) => () => void;
}

const chipTheme = createTheme({
  palette: {
    primary: {
      main: defaultTheme.colors.slightBlue,
    },
    secondary: {
      main: defaultTheme.colors.polarMiddleBlue,
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: defaultTheme.font.sebangGothic,
    fontSize: 13,
    fontWeightMedium: defaultTheme.fontWeight.weightRegular,
    fontWeightBold: defaultTheme.fontWeight.weightBold,
  },
});

/**
 * 선택된 `selectList[]`형태의 리스트를 `Chip`의 형태로 보여주는 컴포넌트 (`width: 100%`)
 * @param {boolean} modify `boolean` 변경 가능 여부. 변경 가능하다면 onDelete는 필수, 이 때 각 chip에 x가 함께 표시됨
 * @param {selectList[]} list `selectList[]`선택된 리스트
 * @param {(delVal: number) => () => void} onDelete `(delVal: number) => () => void` 리스트 요소 삭제 함수
 * @returns full-width `Box`에 둘러싸인 `Chip` 리스트
 */
function SelectedList({ modify, list, onDelete }: Props) {
  return (
    <ThemeProvider theme={chipTheme}>
      <Box
        mt={1}
        sx={{
          '& > :not(:last-child)': { mr: 1 },
          '& > *': { mr: 1 },
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
        {list.map((v: selectList) => (
          <Chip
            sx={{ borderRadius: 3, margin: 0.3 }}
            key={v.value}
            label={v.name}
            onDelete={modify && onDelete ? onDelete(v.value) : undefined}
            color="primary"
            deleteIcon={<ClearOutlinedIcon />}
          />
        ))}
      </Box>
    </ThemeProvider>
  );
}

SelectedList.defaultProps = {
  modify: false,
  onDelete: null,
};

export default SelectedList;
