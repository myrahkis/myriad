import { createPortal } from "react-dom";
import styles from "../ui/bgBlurModal.module.css";
import { useEffect } from "react";

function BgBlurModal({ children, onClose }) {
  // отключение взаимодействия с фоном
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div className={styles["modal-bg"]} onClick={onClose}>
      {children}
    </div>,
    document.body
  );
}

export default BgBlurModal;
