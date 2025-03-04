export interface Subhobby {
    subHobbyId: string;
    hobbyId: string; // Foreign Key -> Hobby.hobbyId
    name: string;
  }