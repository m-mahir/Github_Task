import { useContext } from "react";
import Repo from "../../models/Repo";
import Card from "./Card";
import styles from "../../styles/List.module.scss";
import { ReposContext } from "../../store/repo-context";
import Pagination from "./Pagination";
import Loader from "../Layout/Loader";

interface Props {
  onPageChange: (pageNum: number) => void;
  isLoading?: boolean;
}

const List = ({ onPageChange, isLoading }: Props) => {
  const reposCtx = useContext(ReposContext)!;

  return isLoading ? (
    <Loader />
  ) : reposCtx.repos.length > 0 ? (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {reposCtx.repos.map((repo: Repo) => (
          <Card key={repo.id} repo={repo} onPageChange={onPageChange} />
        ))}
      </div>
      <Pagination onPageChange={onPageChange} />
    </div>
  ) : (
    <></>
  );
};

export default List;
