import { SetStateAction } from 'react';

export interface selectList {
  category?: string;
  value: number;
  name: string;
}

export interface selectProps {
  list: selectList[];
  selectedValue: selectList;
  setSelectedValue: (value: SetStateAction<selectList>) => void;
  name?: string;
  width?: number;
}
