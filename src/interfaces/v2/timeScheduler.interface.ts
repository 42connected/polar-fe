export type DuringDate = {
  start: Date;
  end: Date;
};

export type SelectDuringDate = Partial<DuringDate>;

export interface Schedule {
  date: Date;
  isToday: boolean;
  time: {
    date: number;
    isWeekend: boolean;
    value: Date;
    isCurrentMonth: boolean;
    isCurrentDate: boolean;
    key: string;
  }[];
  isWeekend: boolean;
}
