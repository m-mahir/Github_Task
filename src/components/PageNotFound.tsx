import { useNavigate } from "react-router-dom";
import styles from "../styles/general/NotFound.module.scss";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div role="alert" className={styles.content}>
      <p>404</p>
      <h2>Page not found</h2>
      <h2>The page you are looking for does not seem to exist.</h2>
      <button onClick={() => navigate("/")} className={styles.button}>
        Go to Home
      </button>
    </div>
  );
}
