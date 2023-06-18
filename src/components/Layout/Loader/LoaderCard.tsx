import cardStyles from "../../../styles/Card.module.scss";
import styles from "../../../styles/general/Loader.module.scss";

export default function LoaderCard() {
  return (
    <div className={cardStyles.card}>
      <div className={styles.skeleton}>
        <div className={styles.w70}></div>
        <div></div>
        <div></div>
        <div className={styles.w50}></div>
      </div>
    </div>
  );
}
