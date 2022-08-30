import styled from '@emotion/styled';
import defaultTheme from '../../styles/theme';

export interface LogDetailProps {
  createdAt: Date;
  requestTime: Date[][];
  meetingAt: Date[] | null;
  topic: string;
  mentorName: string;
  status: string;
  content: string;
}

export function MentorCard(props: LogDetailProps) {
  return <>asdf</>;
}
