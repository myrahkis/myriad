import { useState } from "react";
import styles from "../ui/post.module.css";
import BgBlurModal from "./BgBlurModal";
import EditForm from "./EditForm";

function Post({ post, onDelete, onEdit }) {
  const [showModal, setShowModal] = useState(false);
  const { id, title, body, userId, tags, reactions } = post;
  const { likes, dislikes } = reactions;

  //   console.log(post);

  function handleDelete() {
    if (!id) return;

    onDelete(id);
  }

  return (
    <>
      {showModal && (
        <BgBlurModal onClose={setShowModal}>
          <EditForm post={post} onEdit={onEdit} onClose={setShowModal} />
        </BgBlurModal>
      )}
      <li className={styles["post"]}>
        <h3>
          {id}. {title}
        </h3>
        <p>{body}</p>
        <span>likes: {likes}</span>
        <span>dislikes: {dislikes}</span>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => setShowModal(true)}>Edit</button>
      </li>
    </>
  );
}

export default Post;
