import styled from 'styled-components';
import { CommentProps } from '../../interface/mentor-detail/comment-props.interface';

function CommentComponent(props: CommentProps | any) {
  return (
    <Comment>
      <img src={props?.cadet?.profileImage} />
      <div>
        <div>
          <div>{props?.cadet?.name}</div>
          <div>{props?.createdAt}</div>
        </div>
        <div>{props?.comment}</div>
      </div>
    </Comment>
  );
}

const Comment = styled.div`
  display: flex;
`;

export default CommentComponent;
