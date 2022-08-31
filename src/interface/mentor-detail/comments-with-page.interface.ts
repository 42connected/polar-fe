import { CommentProps } from './comment-props.interface';

export interface CommentsWithPageProps {
  comments: CommentProps[];
  total: number;
}
