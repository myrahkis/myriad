import { useState } from "react";
import styles from "../ui/post.module.css";
import BgBlurModal from "./BgBlurModal";
import EditForm from "./EditForm";

function Post({ post, onDelete, onEdit, onUpdateReaction }) {
  const { id, title, body, userId, tags, reactions } = post;
  const { likes, dislikes } = reactions;

  const [showModal, setShowModal] = useState(false);

  //   console.log(post);

  function handleDelete() {
    if (!id) return;

    onDelete(id);
  }

  function handleReactionUpdate(reactionName) {
    onUpdateReaction(id, reactionName);
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
        <div className={styles["tags"]}>
          {tags.map((tag) => (
            <p key={tag}>#{tag}</p>
          ))}
        </div>
        <div className={styles["buttons"]}>
          <div className={styles["reactions-wrapper"]}>
            <button
              className={styles["reaction-btn"]}
              onClick={() => handleReactionUpdate("likes")}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Capa_1"
                  fill="currentColor"
                  viewBox="0 0 486.926 486.926"
                  width="2.5rem"
                  height="2.5rem"
                  xmlnsxml="http://www.w3.org/XML/1998/namespace"
                  xmlSpace="preserve"
                  version="1.1"
                >
                  <g>
                    <path d="M 462.8 181.564 c -12.3 -10.5 -27.7 -16.2 -43.3 -16.2 h -15.8 h -56.9 h -32.4 v -75.9 c 0 -31.9 -9.3 -54.9 -27.7 -68.4 c -29.1 -21.4 -69.2 -9.2 -70.9 -8.6 c -5 1.6 -8.4 6.2 -8.4 11.4 v 84.9 c 0 27.7 -13.2 51.2 -39.3 69.9 c -19.5 14 -39.4 20.1 -41.5 20.8 l -2.9 0.7 c -4.3 -7.3 -12.2 -12.2 -21.3 -12.2 H 24.7 c -13.6 0 -24.7 11.1 -24.7 24.7 v 228.4 c 0 13.6 11.1 24.7 24.7 24.7 h 77.9 c 7.6 0 14.5 -3.5 19 -8.9 c 12.5 13.3 30.2 21.6 49.4 21.6 h 65.9 h 6.8 h 135.1 c 45.9 0 75.2 -24 80.4 -66 l 26.9 -166.9 C 489.8 221.564 480.9 196.964 462.8 181.564 Z M 103.2 441.064 c 0 0.4 -0.3 0.7 -0.7 0.7 H 24.7 c -0.4 0 -0.7 -0.3 -0.7 -0.7 v -228.4 c 0 -0.4 0.3 -0.7 0.7 -0.7 h 77.9 c 0.4 0 0.7 0.3 0.7 0.7 v 228.4 H 103.2 Z M 462.2 241.764 l -26.8 167.2 c 0 0.1 0 0.3 -0.1 0.5 c -3.7 29.9 -22.7 45.1 -56.6 45.1 H 243.6 h -6.8 h -65.9 c -21.3 0 -39.8 -15.9 -43.1 -36.9 c -0.1 -0.7 -0.3 -1.4 -0.5 -2.1 v -191.6 l 5.2 -1.2 c 0.2 0 0.3 -0.1 0.5 -0.1 c 1 -0.3 24.7 -7 48.6 -24 c 32.7 -23.2 49.9 -54.3 49.9 -89.9 v -75.3 c 10.4 -1.7 28.2 -2.6 41.1 7 c 11.8 8.7 17.8 25.2 17.8 49 v 87.8 c 0 6.6 5.4 12 12 12 h 44.4 h 56.9 h 15.8 c 9.9 0 19.8 3.7 27.7 10.5 C 459 209.864 464.8 225.964 462.2 241.764 Z" />
                  </g>
                </svg>
              </span>
              {likes}
            </button>
            <button
              className={styles["reaction-btn"]}
              onClick={() => handleReactionUpdate("dislikes")}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Capa_1"
                  fill="currentColor"
                  viewBox="0 0 486.805 486.805"
                  width="2.5rem"
                  height="2.5rem"
                  xmlnsxml="http://www.w3.org/XML/1998/namespace"
                  xmlSpace="preserve"
                  version="1.1"
                >
                  <g>
                    <path d="M 485.9 241.402 l -26.8 -167 c -5.2 -41.9 -34.5 -66 -80.4 -66 H 243.6 h -6.8 h -65.9 c -19.2 0 -36.9 8.3 -49.4 21.6 c -4.5 -5.5 -11.4 -8.9 -19 -8.9 H 24.7 c -13.6 0 -24.7 11.1 -24.7 24.7 v 228.4 c 0 13.6 11.1 24.7 24.7 24.7 h 77.9 c 9 0 17 -4.9 21.3 -12.2 l 2.9 0.7 c 4.4 1.3 80.8 25 80.8 90.7 v 84.9 c 0 5.2 3.4 9.9 8.4 11.4 c 0.9 0.3 12.9 4 28.3 4 c 13.3 0 29.1 -2.7 42.5 -12.6 c 18.4 -13.5 27.7 -36.5 27.7 -68.4 v -75.8 h 32.4 h 56.9 h 15.8 c 15.6 0 31 -5.8 43.3 -16.2 C 480.9 290.002 489.8 265.402 485.9 241.402 Z M 103.2 274.302 c 0 0.4 -0.3 0.7 -0.7 0.7 H 24.7 c -0.4 0 -0.7 -0.3 -0.7 -0.7 v -228.4 c 0 -0.4 0.3 -0.7 0.7 -0.7 h 77.9 c 0.4 0 0.7 0.3 0.7 0.7 v 228.4 H 103.2 Z M 447.3 287.202 c -7.9 6.8 -17.8 10.5 -27.7 10.5 h -15.8 h -56.9 h -44.5 c -6.6 0 -12 5.4 -12 12 v 87.8 c 0 23.8 -6 40.3 -17.8 49 c -13 9.6 -30.8 8.6 -41.1 7 v -75.3 c 0 -35.6 -17.3 -66.7 -49.9 -89.9 c -23.9 -16.9 -47.6 -23.7 -48.6 -24 c -0.2 0 -0.3 -0.1 -0.5 -0.1 l -5.2 -1.2 v -191.5 c 0.2 -0.7 0.4 -1.4 0.5 -2.1 c 3.3 -21 21.8 -36.9 43.1 -36.9 h 65.9 h 6.8 h 135.1 c 33.9 0 52.9 15.2 56.6 45.1 c 0 0.2 0 0.3 0.1 0.4 l 26.9 167.1 C 464.8 261.002 459 277.102 447.3 287.202 Z" />
                  </g>
                </svg>
              </span>
              {dislikes}
            </button>
          </div>
          <div className={styles["actions-wrapper"]}>
            <button
              className={styles["action-btn"]}
              onClick={() => setShowModal(true)}
            >
              Edit
            </button>
            <button
              className={`${styles["action-btn"]} ${styles["delete-btn"]}`}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    </>
  );
}

export default Post;
