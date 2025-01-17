import styles from "../ui/post.module.css";

function Post({ post, onDelete }) {
  const { id, title, body } = post;

  function handleDelete() {
    if (!id) return;

    onDelete(id);
  }

  return (
    <li className={styles["post"]}>
      <h3>
        {id}. {title}
      </h3>
      <p>{body}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Post;
