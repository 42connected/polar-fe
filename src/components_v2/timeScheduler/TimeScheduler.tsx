import React from 'react';
import styled from 'styled-components';

import Week from '@/src/components_v2/timeScheduler/Week';
import TimeBody from '@/src/components_v2/timeScheduler/TimeBody';
import { useSchedule } from '@/hooks/useSchedule';

export default function TimeScheduler() {
  const {
    schedule,
    selectedSchedules,
    selectedDate,
    handleTableClick,
    onClickSelectedSchedule,
  } = useSchedule();

  return (
    <TimeTableWrapper>
      <Table onClick={handleTableClick}>
        <Week
          schedule={schedule}
          selectedSchedules={selectedSchedules}
          onClickSelectedSchedule={onClickSelectedSchedule}
        />
        <TimeBody selectedDate={selectedDate} />
      </Table>
    </TimeTableWrapper>
  );
}

const TimeTableWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Table = styled.table`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-spacing: 0;
  border-collapse: collapse;
`;
