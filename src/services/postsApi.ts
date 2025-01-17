import axios from "axios";

const url = "https://dummyjson.com/posts";
const limitPerPage = 12;

type Post = {
  body: string;
  id: number;
  reactions: object;
  tags: string[];
  title: string;
  userId: number;
  views: number;
};

export async function getPostsByPage(page: number): Promise<Post[]> {
  const res = await axios.get(
    `${url}?limit=${limitPerPage}&skip=${page * limitPerPage}`
  );

  if (res.statusText !== "OK") throw new Error("Couldn't fetch all posts");

  console.log(res.data.posts);

  return res.data.posts;
}
