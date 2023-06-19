import { useContext } from "react";
import { ReposContext } from "../../store/repo-context";
import { PAGE_SIZE } from "../../services/constants";
import { getPaginationRange } from "../../services/utils/pagination";

interface Props {
  page: number;
  setPage: (pageNum: number) => void;
}

export default function Pagination({ page, setPage }: Props) {
  const reposCtx = useContext(ReposContext)!;

  const pagesCount = Math.ceil(reposCtx.numberOfRepos / PAGE_SIZE);
  const isFirstPage = page === 1;
  const isLastPage = page === pagesCount;

  const array = getPaginationRange(pagesCount, page);

  const pageChangeHandler = (value: number | string) => {
    let newPage = page;
    if (value === "&laquo;" || value === "... ") newPage = 1;
    else if (value === "&lsaquo;") {
      if (!isFirstPage) newPage = newPage - 1;
    } else if (value === "&rsaquo;") {
      if (!isLastPage) newPage = newPage + 1;
    } else if (value === "&raquo;" || value === " ...") newPage = pagesCount;
    else newPage = +value;

    setPage(newPage);
  };

  return (
    <ul
      className="pagination pagination-md justify-content-center mb-4"
      role="navigation"
      aria-label="Pagination"
    >
      <li
        className="page-item d-none d-sm-block"
        role={isFirstPage ? "" : "button"}
      >
        <span
          className={`page-link ${isFirstPage ? "disabled" : "text-dark"}`}
          onClick={() => pageChangeHandler("&laquo;")}
        >
          &laquo;
        </span>
      </li>
      <li className="page-item" role={isFirstPage ? "" : "button"}>
        <span
          className={`page-link ${isFirstPage ? "disabled" : "text-dark"}`}
          onClick={() => pageChangeHandler("&lsaquo;")}
        >
          &lsaquo;
        </span>
      </li>
      {array.map((value) => (
        <li
          key={value}
          role="button"
          className={`page-item ${
            value === page ? "active" : ""
          }`}
        >
          <span
            className={`page-link ${
              value === page
                ? "bg-dark border-dark"
                : "text-dark"
            }`}
            onClick={() => pageChangeHandler(value)}
          >
            {value}
          </span>
        </li>
      ))}
      <li className="page-item" role={isLastPage ? "" : "button"}>
        <span
          className={`page-link ${isLastPage ? "disabled" : "text-dark"}`}
          onClick={() => pageChangeHandler("&rsaquo;")}
        >
          &rsaquo;
        </span>
      </li>
      <li
        className="page-item d-none d-sm-block"
        role={isLastPage ? "" : "button"}
      >
        <span
          className={`page-link ${isLastPage ? "disabled" : "text-dark"}`}
          onClick={() => pageChangeHandler("&raquo;")}
        >
          &raquo;
        </span>
      </li>
    </ul>
  );
}
