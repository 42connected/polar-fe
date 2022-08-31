import { CadetProps } from './cadet-props.interface';

export interface CommentProps {
  cadets: CadetProps;
  id: string;
  content: string;
  createdAt: string;
}
