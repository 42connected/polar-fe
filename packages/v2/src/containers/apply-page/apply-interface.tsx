export interface PostApply {
  topic: string;
  content: string;
  requestTime1: Date[];
  requestTime2: Date[] | null;
  requestTime3: Date[] | null;
}
