import styles from "../ui/sort.module.css";

function SortBy({ order, setOrder }) {
  return (
    <>
      <label>Sort by:</label>
      <select
        name="sort"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
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
