import { useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import styles from "../ui/form.module.css";

function EditForm({ post, onEdit, onClose }) {
  const { id, title, body } = post;

  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);
  const formRef = useOutsideClick<HTMLFormElement>(() => onClose(false));

  function handleSubmit(e) {
    e.preventDefault();

    const newPost = {
      ...post,
      title: editTitle,
      body: editBody,
    };

    onEdit(id, newPost);
  }
  return (
    <div className={styles["wrapper"]}>
      <button className={styles["close-btn"]} onClick={() => onClose(false)}>
        Close
      </button>
      <form onSubmit={handleSubmit} ref={formRef} className={styles["form"]}>
        <div className={styles["col"]}>
          <label className={styles["label"]}>Change post's title</label>
          <input
            className={styles["input"]}
            type="text"
            placeholder="title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </div>
        <div className={styles["col"]}>
          <label className={styles["label"]}>Change post's body</label>
          <textarea
            className={styles["input"]}
            placeholder="body"
            value={editBody}
            rows={7}
            onChange={(e) => setEditBody(e.target.value)}
          />
        </div>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}

export default EditForm;
