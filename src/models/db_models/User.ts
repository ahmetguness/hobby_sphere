export interface User {
  userId: string;
  email: string;
  hashedPassword: string;
  name: string;
  image: string;
  followers: string[];
  following: string[];
  createdAt: Date;
}
