import { User } from "../models/User";

interface Hobby {
  name: string;
}

export const users: User[] = [
  {
    id: "asd",
    name: "Ahmet",
    email: "amo@gmail.com",
    password: "123",
    hobbies: ["Football", "Basketball", "Tennis"],
    image: "",
  },
  {
    id: "asd",

    name: "Güneş",
    email: "123",
    password: "123",
    hobbies: ["Football", "Basketball", "Tennis"],
    image: "",
  },
];
export const hobbies: Hobby[] = [
  {
    name: "Football",
  },
  {
    name: "Basketball",
  },
  {
    name: "Tennis",
  },
  {
    name: "Books",
  },
  {
    name: "Music",
  },
  {
    name: "Traveling",
  },
  {
    name: "Cooking",
  },
  {
    name: "Photography",
  },
  {
    name: "Gaming",
  },
];
