import styles from "../../styles/general/Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.skeleton}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default Loader;
