export interface Post {
    postId: string;
    userId: string; // Foreign Key -> User.userId
    subHobbyId: string; // Foreign Key -> Subhobby.subHobbyId
    image: string;
    description: string;
    createdAt: Date;
  }