export interface Post {
  postId: string;
  userId: string; // Foreign Key -> User.userId
  description: string;
  image: string;
  subHobbyId: string; // Foreign Key -> Subhobby.subHobbyId
  createdAt: Date;
  isHighlited: boolean;
  likes: string[];
  dislikes: string[];
  commentsCount: number;
}
