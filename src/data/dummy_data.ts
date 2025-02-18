interface Hobby {
  name: string;
}

export const hobbies: Hobby[] = [
  {
    name: "MMA",
  },
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

export interface Post {
  id?: number;
  image?: string;
  user?: string;
  likes?: number;
  date?: string;
  description?: string;
  topic?: string;
}

export const posts: Post[] = [
  {
    id: 0,
    image:
      "https://c4.wallpaperflare.com/wallpaper/787/854/424/jujutsu-kaisen-satoru-gojo-anime-boys-anime-girls-hd-wallpaper-preview.jpg",
    user: "John Doe",
    likes: 10,
    date: "2021-02-10",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    topic: "MMA",
  },
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    user: "Jane Smith",
    likes: 25,
    date: "2022-04-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
    topic: "Nature",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/1707213/pexels-photo-1707213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    user: "Alice Cooper",
    likes: 15,
    date: "2023-01-18",
    description:
      "Donec interdum, nisl id vestibulum scelerisque, ipsum erat pretium nunc, vitae convallis metus elit vitae orci.",
    topic: "Art",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    user: "Bob Marley",
    likes: 30,
    date: "2022-07-19",
    description:
      "Curabitur nec tincidunt ligula. Mauris a ante et turpis volutpat laoreet eget ac ante.",
    topic: "Travel",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    user: "Sarah Connor",
    likes: 40,
    date: "2023-09-22",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.",
    topic: "Technology",
  },
  {
    id: 5,
    image:
      "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    user: "Leonard Cohen",
    likes: 12,
    date: "2023-03-10",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    topic: "Music",
  },
  {
    id: 6,
    image:
      "https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    user: "Eliza Doolittle",
    likes: 35,
    date: "2022-11-15",
    description:
      "Nullam eget dui ut elit tincidunt placerat. Fusce at felis nec ligula scelerisque bibendum.",
    topic: "Photography",
  },
  {
    id: 7,
    image:
      "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    user: "Harry Potter",
    likes: 50,
    date: "2021-12-03",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor sapien ac urna efficitur, vitae cursus ante efficitur.",
    topic: "Adventure",
  },
  {
    id: 8,
    image:
      "https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    user: "Wanda Maximoff",
    likes: 28,
    date: "2023-06-17",
    description:
      "Aliquam erat volutpat. Donec sodales, tortor eget venenatis lacinia, metus odio hendrerit neque, ac faucibus nulla orci eu neque.",
    topic: "Health",
  },
  {
    id: 9,
    image:
      "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    user: "Peter Parker",
    likes: 18,
    date: "2022-10-25",
    description:
      "Maecenas volutpat dui eu felis rhoncus, eu gravida felis euismod. Suspendisse potenti.",
    topic: "Science",
  },
  {
    id: 10,
    image: "https://images2.alphacoders.com/666/666358.jpg",
    user: "Bruce Wayne",
    likes: 60,
    date: "2023-08-29",
    description:
      "Sed auctor orci nec velit feugiat auctor. Nulla facilisi. Cras venenatis ante libero, in volutpat ipsum bibendum sit amet.",
    topic: "Fitness",
  },
  {
    id: 10,
    image: "",
    user: "Jon Jones",
    likes: 12,
    date: "2023-08-22",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    topic: "MMA",
  },
];
