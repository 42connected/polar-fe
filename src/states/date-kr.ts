import { isValidTime } from '../containers/my-mentoring-mentor/modal/wait/select-time';

export function StringToDateKr(dateString: string): Date | boolean {
  const localDate = new Date(dateString);
  if (!isValidTime(localDate)) return false;
  const utcDate =
    localDate.getTime() + localDate.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaDate = new Date(utcDate + koreaTimeDiff);
  return koreaDate;
}

export function NumToDateKr(
  year: number,
  month: number,
  day: number,
  hour?: number,
  minute?: number,
): Date | boolean {
  let localDate;
  if (hour && minute) localDate = new Date(year, month, day, hour, minute);
  else localDate = new Date(year, month, day);
  if (!isValidTime(localDate)) return false;
  const utcDate =
    localDate.getTime() + localDate.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaDate = new Date(utcDate + koreaTimeDiff);
  return koreaDate;
}

export function NewDateKr(date: Date): Date | boolean {
  const localDate = new Date(date);
  if (!isValidTime(localDate)) return false;
  const utcDate =
    localDate.getTime() + localDate.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaDate = new Date(utcDate + koreaTimeDiff);
  return koreaDate;
}

export function NowDateKr(): Date {
  const localDate = new Date();
  const utcDate =
    localDate.getTime() + localDate.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaDate = new Date(utcDate + koreaTimeDiff);
  return koreaDate;
}
