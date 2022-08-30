import React, { useState } from 'react';
import styled from 'styled-components';
import { dataRoomQuery } from '../../interface/data-room/data-room-query.interface';
import theme from '../../styles/theme';
import Button from '../button';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, ThemeProvider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTheme } from '@mui/material';

const SearchBoxBackground = styled.div`
  position: absolute;
  top: -9.5rem;
  right: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: end;
  width: 25rem;
  height: 13rem;
  border-style: solid;
  border-radius: 0.5rem;
  border-width: 0.05rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-color: ${theme.colors.grayFive};
  background-color: ${theme.colors.backgoundWhite};
  box-shadow: ${theme.shadow.buttonShadow};
`;

const SearchBoxComponent = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 2fr 5fr;
  align-items: center;
  justify-items: start;

  ${theme.font.nanumGothic};
  ${theme.fontFrame.subTitleSmall};
`;

const SearchBoxInput = styled.input`
  width: ${props => props.width ?? '16.6rem'};
  height: 2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: ${theme.colors.inputBoxBackgound};
  border-style: solid;
  border-width: 0.05rem;
  border-color: ${theme.colors.grayFive};
  border-radius: 0.5rem;
  ${theme.fontFrame.bodySmall};
  ${theme.font.nanumGothic};
  &:focus {
    outline: none;
    border-width: 0.05rem;
    border-color: ${theme.colors.grayThree};
  }
`;

const muiTheme = createTheme({
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
  },
  palette: {
    primary: {
      main: theme.colors.polarSimpleMain,
    },
    secondary: {
      main: theme.colors.polarBrightMain,
    },
  },
  typography: {
    fontFamily: theme.font.sebangGothic,
    fontSize: 20,
    fontWeightLight: 700,
  },
});

const SearchButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DatePickerDiv = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchBoxButton = styled(Button)`
  margin-left: 0.8rem;
`;

type datepickertype = {
  value: Date | null;
  setValue: (value: Date | null) => void;
};

function BasicDatePicker({ value, setValue }: datepickertype) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={muiTheme}>
        <DatePicker
          label="Custom input"
          views={['year', 'month']}
          value={value}
          onChange={newValue => {
            setValue(newValue);
          }}
          inputFormat={'yyyy-MM'}
          renderInput={({ inputRef, inputProps, InputProps }) => (
            <DatePickerDiv>
              <SearchBoxInput
                ref={inputRef}
                width="12rem"
                {...inputProps}
                readOnly
              ></SearchBoxInput>
              {InputProps?.endAdornment}
            </DatePickerDiv>
          )}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

interface SearchBoxProps {
  query: dataRoomQuery;
  setQuery: (query: dataRoomQuery) => void;
}

function SearchBox(props: SearchBoxProps) {
  const [mentorName, setMentorName] = useState<string>();
  const [mentorIntraId, setMentorIntraId] = useState<string>();
  const [date, setDate] = useState<Date | null>(null);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.setQuery({
          ...props.query,
          mentorName: mentorName,
          mentorIntra: mentorIntraId,
          date: date
            ? date?.toLocaleDateString().split('. ')[0] +
              '-' +
              date?.toLocaleDateString().split('. ')[1].padStart(2, '0')
            : undefined,
        });
      }}
    >
      <SearchBoxBackground>
        <SearchBoxComponent>
          멘토 이름
          <SearchBoxInput
            name="mentorName"
            value={mentorName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMentorName(e.target.value)
            }
          ></SearchBoxInput>
        </SearchBoxComponent>
        <SearchBoxComponent>
          멘토 아이디
          <SearchBoxInput
            name="mentorIntraId"
            value={mentorIntraId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMentorIntraId(e.target.value)
            }
          ></SearchBoxInput>
        </SearchBoxComponent>
        <SearchBoxComponent>
          멘토링 일자
          <BasicDatePicker value={date} setValue={setDate} />
        </SearchBoxComponent>
        <SearchButtonDiv>
          <SearchBoxButton
            type="button"
            width="5.4rem"
            height="1.9rem"
            text="초기화"
            font={theme.font.nanumGothic}
            fontFrame={theme.fontFrame.bodySmall}
            backgroundColor={theme.colors.backgoundWhite}
            borderWidth="0.01rem"
            borderColor={theme.colors.grayThree}
            color={theme.fontColor.titleColor}
            onClick={() => {
              setMentorIntraId('');
              setMentorName('');
              setDate(null);
              props.setQuery({
                ...props.query,
                mentorName: undefined,
                mentorIntra: undefined,
                date: undefined,
              });
            }}
          ></SearchBoxButton>
          <SearchBoxButton
            type="submit"
            width="5.1rem"
            height="1.9rem"
            text="검색"
            font={theme.font.nanumGothic}
            fontFrame={theme.fontFrame.bodySmall}
            backgroundColor={theme.colors.backgoundWhite}
            borderWidth="0.01rem"
            borderColor={theme.colors.grayThree}
            color={theme.fontColor.titleColor}
          ></SearchBoxButton>
        </SearchButtonDiv>
      </SearchBoxBackground>
    </form>
  );
}

export default SearchBox;
