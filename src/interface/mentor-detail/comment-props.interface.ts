import { CadetProps } from './cadet-props.interface';

export interface CommentProps {
  cadet: CadetProps;
  id: string;
  content: string;
  createdAt: string;
}
