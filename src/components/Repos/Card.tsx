import { useContext } from "react";
import { BiStar, BiUser } from "react-icons/bi";
import Repo from "../../models/Repo";
import styles from "../../styles/Card.module.scss";
import { IconContext } from "react-icons/lib";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { ReposContext } from "../../store/repo-context";
import { useLocation } from "react-router-dom";

type Props = {
  repo: Repo;
  checkPage?: () => void;
};

export default function Card({ repo, checkPage }: Props) {
  const reposCtx = useContext(ReposContext)!;

  const location = useLocation();

  const unfavouriteRepo = () => {
    reposCtx.favouriteRepo(repo.id, false);
    if (location.pathname === "/bookmarks") {
      checkPage!();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{repo.name}</span>
        <span className={styles.owner}>
          <BiUser className={styles.icon} /> {repo.owner}
        </span>
      </div>
      <div>{repo.description}</div>
      <div className={styles.footer}>
        <span className={styles.rate}>
          <BiStar className={styles.icon} />
          {repo.starsCount}
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
              <BsBookmarkStarFill onClick={unfavouriteRepo} />
            ) : (
              <BsBookmarkStar
                onClick={() => reposCtx.favouriteRepo(repo.id, true)}
              />
            )}
          </IconContext.Provider>
        </span>
      </div>
    </div>
  );
}
