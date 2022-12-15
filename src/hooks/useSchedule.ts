import React, { useMemo, useState } from 'react';
import { useCalendar } from '@h6s/calendar';
import CalendarViewtype from '@h6s/calendar/dist/models/CalendarViewType';
import { getMinutes, isBefore, isEqual, setMinutes } from 'date-fns';

import { getDateTheAppliedNewTime, isBetweenDates } from '@/utils/date';
import {
  DuringDate,
  SelectDuringDate,
} from '@/interfaces/v2/timeScheduler.interface';

export const useSchedule = () => {
  const { body, navigation } = useCalendar({
    defaultViewType: CalendarViewtype.Week,
  });
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<SelectDuringDate>({});
  const [selectedSchedules, setSelectedSchedules] = useState<DuringDate[]>([]);

  const timeSet = useMemo(
    () => [
      '00:00',
      '00:30',
      '01:00',
      '01:30',
      '02:00',
      '02:30',
      '03:00',
      '03:30',
      '04:00',
      '04:30',
      '05:00',
      '05:30',
      '06:00',
      '06:30',
      '07:00',
      '07:30',
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
      '20:30',
      '21:00',
      '21:30',
      '22:00',
      '22:30',
      '23:00',
      '23:30',
    ],
    [],
  );

  const schedule = useMemo(
    () =>
      body.value.map(({ value }) =>
        value.map(day => ({
          date: day.value,
          isWeekend: day.isWeekend,
          isToday: day.isCurrentDate,
          time: timeSet.map(time => ({
            ...day,
            value: getDateTheAppliedNewTime(
              day.value,
              +time.split(':')[0],
              +time.split(':')[1],
              0,
            ),
          })),
        })),
      ),
    [body.value, timeSet],
  );

  const handleTableClick = (
    e: React.MouseEvent<HTMLTableElement, MouseEvent>,
  ) => {
    if (e.target instanceof HTMLTableCellElement) {
      const { date } = e.target.dataset;

      if (!date) {
        return;
      }

      const startDate = new Date(date);
      const endDate = setMinutes(startDate, getMinutes(startDate) + 30);

      if (!isSelecting) {
        const newSelectedDate = {
          start: startDate,
          end: endDate,
        };
        setSelectedDate(newSelectedDate);
      } else if (isSelecting && selectedDate.start) {
        const newSelectedDate = isBefore(startDate, selectedDate.start)
          ? ({
              start: startDate,
              end: selectedDate.end,
            } as DuringDate)
          : ({
              start: selectedDate.start,
              end: endDate,
            } as DuringDate);

        const filteredSchedules = selectedSchedules.filter(prevSchedule => {
          const isPrevScheduleBetween =
            isBetweenDates(
              prevSchedule.start,
              newSelectedDate.start,
              newSelectedDate.end,
            ) &&
            isBetweenDates(
              prevSchedule.end,
              newSelectedDate.start,
              newSelectedDate.end,
            );
          return !isPrevScheduleBetween;
        });

        setSelectedSchedules([...filteredSchedules, newSelectedDate]);
        setSelectedDate({});
      }
      setIsSelecting(!isSelecting);
    }
  };

  const onClickSelectedSchedule = (selectedSchedule: DuringDate) => {
    setSelectedSchedules(prevSchedule =>
      prevSchedule.filter(
        currentSchedule =>
          !isEqual(currentSchedule.start, selectedSchedule.start) &&
          !isEqual(currentSchedule.end, selectedSchedule.end),
      ),
    );
  };

  return {
    handleTableClick,
    onClickSelectedSchedule,
    selectedSchedules,
    selectedDate,
    schedule: schedule[0],
    toNext: navigation.toNext,
    toPrev: navigation.toPrev,
    timeSet,
  };
};
