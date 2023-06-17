import { useContext } from "react";
import Repo from "../../models/repo";
import Card from "./Card";
import styles from "../../styles/List.module.scss";
import { ReposContext } from "../../context/repo-context";
import Pagination from "./Pagination";

interface Props {
  onPageChange: (pageNum: number) => void;
}

const List = ({ onPageChange }: Props) => {
  const reposCtx = useContext(ReposContext)!;

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {reposCtx.repos.map((repo: Repo) => (
          <Card key={repo.id} repo={repo} onPageChange={onPageChange} />
        ))}
      </div>
      <Pagination onPageChange={onPageChange} />
    </div>
  );
};

export default List;
