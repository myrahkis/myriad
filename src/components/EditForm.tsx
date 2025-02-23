import { Dispatch, SetStateAction, useState } from "react";
import { PostStructure } from "../interfaces/interfaces";
import styles from "../ui/form.module.css";

interface EditForm {
  post: PostStructure;
  onEdit: (id: number, post: PostStructure) => void;
  onClose: Dispatch<SetStateAction<boolean>>;
}

function EditForm({ post, onEdit, onClose }: EditForm) {
  const { id, title, body } = post;

  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newPost = {
      ...post,
      title: editTitle,
      body: editBody,
    };

    onEdit(id, newPost);
    onClose(false);
  }

  return (
    <div className={styles["wrapper"]}>
      <button className={styles["close-btn"]} onClick={() => onClose(false)}>
        &#x2716;
      </button>
      <form onSubmit={handleSubmit} className={styles["form"]}>
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
        <button type="submit" className={styles["edit-btn"]}>
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditForm;
