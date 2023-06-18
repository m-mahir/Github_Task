import styles from "../../styles/general/EmptyResult.module.scss";

type Props = {
  keyword?: string;
};

export default function EmptyResult({ keyword }: Props) {
  let header = "",
    subtitle = "";
  if (keyword) {
    header = "No results found";
    subtitle = "We couldn't find what you searched for. Try searching again.";
  } else if (keyword === undefined) {
    header = "No bookmarks to display";
  } else {
    header = "Search results appear here";
    subtitle = "Start exploring GitHub repositories.";
  }

  return (
    <div className={styles.wrapper}>
      <h1>{header}</h1>
      <h2>{subtitle}</h2>
    </div>
  );
}
