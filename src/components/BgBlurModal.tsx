import { createPortal } from "react-dom";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import styles from "../ui/bgBlurModal.module.css";
import useOutsideClick from "../hooks/useOutsideClick";

interface BgBlurModalProps {
  children: ReactNode;
  onClose: Dispatch<SetStateAction<boolean>>;
}

function BgBlurModal({ children, onClose }: BgBlurModalProps) {
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
