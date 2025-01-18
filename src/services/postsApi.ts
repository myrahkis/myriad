import axios from "axios";

const url = "https://dummyjson.com/posts";
const limitPerPage = 12;

interface Post {
  id: number;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  done: boolean;
}

export async function getPostsByPage(page: number): Promise<Post[]> {
  const res = await axios.get(
    `${url}?limit=${limitPerPage}&skip=${page * limitPerPage}`
  );

  if (res.statusText !== "OK") throw new Error("Couldn't fetch all posts");

  // console.log(res.data.posts);

  return res.data.posts;
}

// export async function sortBy(field: string) {
//   const res = await axios.get(`${url}?sortBy=${field}&order=asc`)

//   if (res.statusText !== "OK") throw new Error("Couldn't fetch all posts");

//   // console.log(res.data);
//   return res.data.posts
// }