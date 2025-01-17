import { useState } from "react";
import styles from "../ui/post.module.css";
import BgBlurModal from "./BgBlurModal";
import EditForm from "./EditForm";

function Post({ post, onDelete, onEdit }) {
  const [showModal, setShowModal] = useState(false);
  const { id, title, body } = post;

  function handleDelete() {
    if (!id) return;

    onDelete(id);
  }

  function handleEdit() {
    const newPost = {
      ...post,
      title: "HAHAHAH",
    };

    onEdit(id, newPost);
  }

  return (
    <>
      {showModal && (
        <BgBlurModal>
          <EditForm post={post} onEdit={onEdit} />
        </BgBlurModal>
      )}
      <li className={styles["post"]}>
        <h3>
          {id}. {title}
        </h3>
        <p>{body}</p>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => setShowModal(true)}>Edit</button>
      </li>
    </>
  );
}

export default Post;
