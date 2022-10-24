export function StringToDateKr(dateString: string): Date {
  const localDate = new Date(dateString);
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
): Date {
  let localDate;
  if (hour && minute) localDate = new Date(year, month, day, hour, minute);
  else localDate = new Date(year, month, day);
  const utcDate =
    localDate.getTime() + localDate.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const koreaDate = new Date(utcDate + koreaTimeDiff);
  return koreaDate;
}

export function NewDateKr(date: Date): Date {
  const localDate = new Date(date);
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
