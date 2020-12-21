import { Comment as CommentInterface } from '../_types/comment';
import { formatDistance } from 'date-fns';

class Comment implements CommentInterface {
  date: number;
  content: string;
  authorId: string;
  displayTime: string;

  static fromInterface(data: CommentInterface): Comment {
    const comment = new Comment();

    comment.date = data.date;
    comment.content = data.content;
    comment.authorId = data.authorId;
    comment.displayTime = formatDistance(new Date(), new Date(data.date));

    return comment;
  }
}

export { Comment, CommentInterface };
