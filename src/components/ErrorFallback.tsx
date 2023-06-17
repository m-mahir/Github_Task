import { useErrorBoundary } from "react-error-boundary";
import styles from "../styles/general/Error.module.scss";

type Props = {
  error: { message: string };
};

export default function ErrorFallback({ error }: Props) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div role="alert" className={styles.content}>
      <h1>Somethig went wrong!</h1>
      <h2>Oops, an error has occurred. Please try again.</h2>
      {/* <h2>{error.message}</h2> */}
      <button onClick={resetBoundary} className={styles.button}>
        Try again
      </button>
    </div>
  );
}
