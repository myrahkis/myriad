import styles from "../ui/bgBlurModal.module.css";

function BgBlurModal({ children }) {
  return <div className={styles["modal-bg"]}>{children}</div>;
}

export default BgBlurModal;
