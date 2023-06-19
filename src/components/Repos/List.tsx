import { useContext } from "react";
import Repo from "../../models/Repo";
import Card from "./Card";
import styles from "../../styles/List.module.scss";
import { ReposContext } from "../../store/repo-context";
import Loader from "../Layout/Loader";

interface Props {
  checkPage?: () => void;
  isLoading?: boolean;
}

const List = ({ checkPage, isLoading }: Props) => {
  const reposCtx = useContext(ReposContext)!;

  return isLoading ? (
    <Loader />
  ) : reposCtx.repos.length > 0 ? (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {reposCtx.repos.map((repo: Repo) => (
          <Card key={repo.id} repo={repo} checkPage={checkPage} />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default List;
