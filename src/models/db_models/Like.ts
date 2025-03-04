export interface Like {
    userId: string; // Foreign Key -> User.userId
    postId: string; // Foreign Key -> Post.postId
    createdAt: Date;
  }