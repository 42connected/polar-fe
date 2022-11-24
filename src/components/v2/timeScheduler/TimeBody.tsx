import React from 'react';
import { isEqual } from 'date-fns';
import styled from 'styled-components';

import { useSchedule } from '@/hooks/useSchedule';
import { DuringDate } from '@/interfaces/v2/timeScheduler.interface';

interface Props {
  selectedDate: Partial<DuringDate>;
}

function TimeBody({ selectedDate }: Props) {
  const { timeSet, schedule } = useSchedule();

  return (
    <Tbody>
      <TimeTr>
        {timeSet.map((time, index) => (
          <Time key={time}>
            <span>{index % 2 === 0 && index !== 0 && time}</span>
          </Time>
        ))}
      </TimeTr>
      {schedule.map(day => (
        <Tr>
          {day.time.map(({ value }) => {
            return (
              <TimeBlock
                data-date={value}
                isSelected={isEqual(value, selectedDate?.start ?? 0)}
              />
            );
          })}
        </Tr>
      ))}
    </Tbody>
  );
}

export default TimeBody;

const Tbody = styled.tbody`
  display: flex;
  width: 100%;
`;

const TimeTr = styled.tr`
  display: flex;
  flex-direction: column;
  min-width: 50px;
`;

const TimeBlock = styled.td<{ isSelected: boolean }>`
  display: block;

  border: 0.5px solid ${({ theme }) => theme.colors.brightGray};
  border-top: 0;
  border-right: 0;

  &:first-child {
    border-top: 0.5px solid ${({ theme }) => theme.colors.brightGray};
  }

  height: 4rem;
  background-color: ${({ isSelected }) => (isSelected ? '#95afc0' : 'white')};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  user-select: none;
  &:hover {
    background-color: #dfe4ea;
  }
  &:active {
    background-color: #7f8fa6;
  }
`;

const Tr = styled.tr`
  width: 100%;
  &:last-child {
    ${TimeBlock} {
      border-right: 0.5px solid ${({ theme }) => theme.colors.brightGray};
    }
  }
`;

const Time = styled.td`
  display: block;
  position: relative;
  height: 4rem;
  margin-right: 0.5rem;

  span {
    display: block;
    transform: translateY(-50%);
  }
`;
