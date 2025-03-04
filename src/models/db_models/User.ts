export interface User {
    userId: string;
    email: string;
    hashedPassword: string;
    name: string;
    image: string;
    createdAt: Date;
  }