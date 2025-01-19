import { PostStructure } from "../interfaces/interfaces";
import axios from "axios";

const url = "https://dummyjson.com/posts";
const limitPerPage = 12;

export async function getPostsByPage(page: number): Promise<PostStructure[]> {
  const res = await axios.get(
    `${url}?limit=${limitPerPage}&skip=${page * limitPerPage}`
  );

  if (res.statusText !== "OK") throw new Error("Couldn't fetch all posts");

  return res.data.posts;
}
