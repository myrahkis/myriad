import { useState } from "react";
import styles from "../ui/post.module.css";
import BgBlurModal from "./BgBlurModal";
import EditForm from "./EditForm";

function Post({ post, onDelete, onEdit }) {
  const [showModal, setShowModal] = useState(false);
  const { id, title, body, userId, likes, dislikes, tags } = post;

//   console.log(post);

  function handleDelete() {
    if (!id) return;

    onDelete(id);
  }

  return (
    <>
      {showModal && (
        <BgBlurModal>
          <EditForm post={post} onEdit={onEdit} onClose={setShowModal} />
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
