import { createPortal } from "react-dom";
import styles from "../ui/bgBlurModal.module.css";
import { useEffect } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

function BgBlurModal({ children, onClose }) {
  const modalRef = useOutsideClick<HTMLDivElement>(() => onClose(false));

  // отключение взаимодействия с фоном
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div className={styles["modal-bg"]}>
      <div className={styles["content"]} ref={modalRef}>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default BgBlurModal;
