import { isAfter, isBefore, isEqual, set } from 'date-fns';

/**
 * Returns a date object with the time set to params
 * @param prevDate
 * @param newHours
 * @param newMinutes
 * @param newSeconds
 * @returns Date
 */
export const getDateTheAppliedNewTime = (
  prevDate: Date,
  newHours: number,
  newMinutes: number,
  newSeconds?: number,
): Date => {
  return set(prevDate, {
    hours: newHours,
    minutes: newMinutes,
    seconds: newSeconds,
  });
};

/**
 * Returns true if the first date is after the second date
 * @param date
 * @param start
 * @param end
 * @returns boolean
 */
export const isBetweenDates = (date: Date, start: Date, end: Date): boolean => {
  return isEqual(date, start) || (isAfter(date, start) && isBefore(date, end));
};
