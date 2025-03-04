export interface UserHobby {
    userId: string; // Foreign Key -> User.userId
    hobbyId: string; // Foreign Key -> Hobby.hobbyId
  }