import React from 'react';
import { differenceInMinutes, endOfDay, isSameDay } from 'date-fns';
import styled from 'styled-components';

import { isBetweenDates } from '@/utils/date';
import { DuringDate } from '@/interfaces/timeScheduler.interface';

interface Props {
  startDate: Date;
  endDate: Date;
  currentDate: Date;
  isHover: boolean;
  onClickSelectedSchedule: (selectedSchedule: DuringDate) => void;
}

function SelectedTimeBlock({
  startDate,
  endDate,
  currentDate,
  onClickSelectedSchedule: handleClickSchedule,
  isHover,
  ...hoverProps
}: Props) {
  const isBetween =
    isBetweenDates(currentDate, startDate, endDate) ||
    isSameDay(currentDate, startDate);

  if (!isBetween) {
    return null;
  }

  const startPosition = isSameDay(currentDate, startDate)
    ? differenceInMinutes(startDate, currentDate)
    : 0;

  const endPosition = differenceInMinutes(
    isSameDay(currentDate, endDate) ? endDate : endOfDay(currentDate),
    isSameDay(currentDate, startDate) ? startDate : currentDate,
  );

  return (
    <Block
      {...hoverProps}
      startPosition={startPosition}
      endPosition={endPosition}
      isHover={isHover}
      data-date={startDate}
      onClick={() => handleClickSchedule({ start: startDate, end: endDate })}
    />
  );
}

export default SelectedTimeBlock;

const Block = styled.div<{
  startPosition: number;
  endPosition: number;
  isHover: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${({ startPosition }) => (startPosition / 30) * 4}rem;
  left: 0;
  width: 100%;
  height: ${({ endPosition }) => (endPosition / 30) * 4}rem;

  border: 0.5px solid #95afc0b3;

  user-select: none;

  background-color: ${({ isHover }) => (isHover ? '#ff5e57cc' : '#95afc0b3')};
  cursor: pointer;

  transition: background-color 0.2s ease-in-out;
`;
