import { MentoringLog } from './mentoring-log.interface';

export interface MentoringInfo {
  username: string;
  resumeUrl: string;
  mentorings: MentoringLog[];
}
