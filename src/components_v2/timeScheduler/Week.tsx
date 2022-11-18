import React, { useState } from 'react';
import { format, isEqual, isSaturday } from 'date-fns';
import { useHover } from 'react-aria';
import styled from 'styled-components';

import SelectedTimeBlock from '@/src/components_v2/timeScheduler/SelectedTimeBlock';
import { DuringDate, Schedule } from '@/interfaces/timeScheduler.interface';

interface Props {
  schedule: Schedule[];
  onClickSelectedSchedule: (selectedSchedule: DuringDate) => void;
  selectedSchedules: DuringDate[];
}

function Week({ schedule, selectedSchedules, onClickSelectedSchedule }: Props) {
  const { hoverProps } = useHover({
    onHoverStart: e => {
      if (e.target.dataset.date) {
        const date = new Date(e.target.dataset.date);
        setHoveredDate(date);
      }
    },
    onHoverEnd: () => {
      setHoveredDate(null);
    },
  });

  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  return (
    <th>
      <Tr>
        <Blank />
        {schedule.map(({ date, isWeekend, isToday }) => (
          <Td>
            <Day
              isWeekend={isWeekend}
              isSaturday={isSaturday(date)}
              isToday={isToday}
            >
              <span>{format(date, 'E')}</span>
              <span>{format(date, 'd')}</span>
            </Day>
            <SelectedTimeBlockWrapper>
              {selectedSchedules.map(({ start, end }) => (
                <SelectedTimeBlock
                  startDate={start}
                  endDate={end}
                  currentDate={date}
                  onClickSelectedSchedule={onClickSelectedSchedule}
                  isHover={isEqual(hoveredDate ?? 0, start)}
                  {...hoverProps}
                />
              ))}
            </SelectedTimeBlockWrapper>
          </Td>
        ))}
      </Tr>
    </th>
  );
}

export default Week;

const Blank = styled.td`
  min-width: 50px;
`;

const Tr = styled.tr`
  display: flex;
  width: 100%;
`;

const Td = styled.td`
  width: 100%;
`;

const Day = styled.div<{
  isWeekend: boolean;
  isSaturday: boolean;
  isToday: boolean;
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 5;

  height: 100%;

  padding: 0.5rem 0;

  color: ${({ isWeekend, isSaturday, theme }) =>
    isSaturday
      ? theme.colors.polarBlue
      : isWeekend
      ? theme.colors.red
      : theme.colors.darkGray};
  span:first-child {
    font-size: 0.8rem;
    margin-bottom: 0.2rem;
  }
  span:last-child {
    font-size: 1.5rem;
  }
`;

const SelectedTimeBlockWrapper = styled.div`
  position: relative;
`;
