import { Dispatch, SetStateAction } from "react";
import styles from "../ui/sort.module.css";

interface SortByInterface {
  order: string;
  setOrder: Dispatch<
    SetStateAction<"id" | "title" | "body" | "likes" | "dislikes">
  >;
}

function SortBy({ order, setOrder }: SortByInterface) {
  return (
    <>
      <label className={styles["sort-label"]}>Sort by:</label>
      <select
        name="sort"
        value={order}
        onChange={(e) =>
          setOrder(
            e.target.value as "id" | "title" | "body" | "likes" | "dislikes"
          )
        }
        className={styles["select"]}
      >
        <option value="id">Default</option>
        <option value="title">Title</option>
        <option value="body">Body</option>
        <option value="likes">Likes</option>
        <option value="dislikes">Dislikes</option>
      </select>
    </>
  );
}

export default SortBy;
