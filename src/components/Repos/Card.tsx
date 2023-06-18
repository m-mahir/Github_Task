import { useContext } from "react";
import { BiLike, BiUser } from "react-icons/bi";
import Repo from "../../models/repo";
import styles from "../../styles/Card.module.scss";
import { IconContext } from "react-icons/lib";
import { FaRegStar, FaStar } from "react-icons/fa";
import { ReposContext } from "../../context/repo-context";
import { PAGE_SIZE } from "../../services/constants";

type Props = {
  repo: Repo;
  onPageChange: (pageNum: number) => void;
};

export default function Card({ repo, onPageChange }: Props) {
  const reposCtx = useContext(ReposContext)!;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{repo.name}</span>
        <span className={styles.owner}>
          {repo.owner} <BiUser className={styles.icon} />
        </span>
      </div>
      <div className={styles.desc}>{repo.description}</div>
      <div className={styles.footer}>
        <span className={styles.rate}>
          {repo.starsCount}
          <BiLike className={styles.icon} />
        </span>
        <span>
          <IconContext.Provider
            value={{
              color: "#fdbf00",
              size: "1.5em",
              className: styles.bookmark,
            }}
          >
            {repo.isBookmarked ? (
              <FaStar
                onClick={() => {
                  reposCtx.favouriteRepo(repo.id, false);
                  if (
                    reposCtx.currentPage ===
                      Math.ceil(reposCtx.numberOfRepos / PAGE_SIZE) &&
                    reposCtx.numberOfRepos % PAGE_SIZE === 1
                  )
                    onPageChange(reposCtx.currentPage - 1);
                  else onPageChange(reposCtx.currentPage);
                }}
              />
            ) : (
              <FaRegStar
                onClick={() => reposCtx.favouriteRepo(repo.id, true)}
              />
            )}
          </IconContext.Provider>
        </span>
      </div>
    </div>
  );
}