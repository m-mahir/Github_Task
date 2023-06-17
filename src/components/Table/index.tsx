import { useContext } from "react";
import Repo from "../../models/repo";
import { FaStar, FaRegStar } from "react-icons/fa";
import { addCommas } from "../../utils/numberFormatter";
import { ReposContext } from "../../context/repo-context";
import styles from "./Table.module.scss";

type Props = {
  items: Repo[];
  page: number;
  setPage: (pageNum: number) => void;
};

export default function Table({ items, page, setPage }: Props) {
  const reposCtx = useContext(ReposContext)!;

  return (
    <div className={styles.container}>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Stars</th>
            <th>Bookmark</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.owner}</td>
              <td>{addCommas(item.starsCount)}</td>
              <td>
                {item.isBookmarked ? (
                  <FaStar
                    onClick={() => reposCtx.favouriteRepo(item.id, false)}
                  />
                ) : (
                  <FaRegStar
                    onClick={() => reposCtx.favouriteRepo(item.id, true)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from(
          // { length: Math.ceil(totalPages / PAGE_SIZE) },
          { length: 10 },
          (_, index) => index + 1
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={pageNumber === page ? "active" : ""}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}
