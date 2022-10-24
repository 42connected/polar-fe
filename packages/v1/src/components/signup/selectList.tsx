import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

export interface SelectListProps {
  lists: string[];
  width: number;
  id: number;
  value: number;
  index: number;
  onChange: (id: number, index: number, value: number) => void;
}

function SelectList(props: SelectListProps) {
  const [inputValue, setInputValue] = React.useState('');

  const style = {
    fontFamily: 'NanumGothic',
    fontSize: '1.2em',
    fontWeight: '400',
  };

  function inputValueToNum(inputValue: string | null): number {
    let result = -1;

    for (let i = 0; i < props.lists.length; i++) {
      if (props.lists[i] === inputValue) {
        result = i;
      }
    }
    return result;
  }

  return (
    <Autocomplete
      defaultValue={props.lists[props.value]}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        props.onChange(props.id, props.index, inputValueToNum(newInputValue));
      }}
      // onClose={() => {
      //   props.onChange(props.id, props.index, inputValueToNum(value));
      // }}
      size={'small'}
      disablePortal
      id="combo-box-demo"
      options={props.lists}
      sx={{ width: props.width }}
      renderInput={params => (
        <TextField
          {...params}
          inputProps={{ ...params.inputProps, style: style }}
        />
      )}
    />
  );
}

export default SelectList;
