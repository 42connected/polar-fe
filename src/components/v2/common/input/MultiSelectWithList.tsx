import { SetStateAction } from 'react';
import Box from '@mui/material/Box';
import MultiSelect from './MultiSelect';
import SelectedList from './SelectedList';
import { selectList } from '@/interfaces/v2/selectProps.interface';

interface Props {
  list: selectList[];
  name?: string;
  selectedValue: selectList[];
  setSelectedValue: (value: SetStateAction<selectList[]>) => void;
}

/**
 * `MultiSelect`와 `selectedList`를 합친 예시 컴포넌트 (검색 가능 / `width: 100%`)
 * @param {selectList[]} list `selectList[]` 전체 선택 가능한 리스트, category가 존재한다면 각 카테고리 별로 보여줌.
 * @param {selectedValue[]} selectedValue `selectList[]` 선택된 요소들의 리스트
 * @param {(value: SetStateAction<selectList[]>) => void} setSelectedValue `(value: SetStateAction<selectList[]>) => void` selectedValue의 setter 함수
 * @param {string} name 보여지는 컴포넌트의 이름, 리스트의 카테고리가 존재하지 않는다면 해당 값이 카테고리로 설정됨.
 */
function MultiSelectWithList({
  list,
  name,
  selectedValue,
  setSelectedValue,
}: Props) {
  const onDelete = (delVal: number) => () => {
    setSelectedValue((val: selectList[]) =>
      val.filter(v => v.value !== delVal),
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <MultiSelect
        list={list}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        name={name}
      />
      <SelectedList modify list={selectedValue} onDelete={onDelete} />
    </Box>
  );
}
MultiSelectWithList.defaultProps = {
  name: '',
};

export default MultiSelectWithList;
