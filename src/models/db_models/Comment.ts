export interface Comment {
    commentId: string;
    userId: string; // Foreign Key -> User.userId
    postId: string; // Foreign Key -> Post.postId
    text: string;
    createdAt: Date;
  }