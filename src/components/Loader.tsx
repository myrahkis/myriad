import styles from "../ui/loader.module.css";

function Loader() {
  return (
    <div className={styles["loader-wrapper"]}>
      <span className={styles["loader"]}></span>
    </div>
  );
}

export default Loader;
