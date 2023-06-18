import { useContext } from "react";
import { ReposContext } from "../../store/repo-context";
import { PAGE_SIZE } from "../../services/constants";
import { getPaginationRange } from "../../services/utils/pagination";

interface Props {
  onPageChange: (pageNum: number) => void;
}

export default function Pagination({ onPageChange }: Props) {
  const reposCtx = useContext(ReposContext)!;

  let pagesCount = Math.ceil(reposCtx.numberOfRepos / PAGE_SIZE);

  let array = getPaginationRange(pagesCount, reposCtx.currentPage);

  const pageChangeHandler = (value: number | string) => {
    let page = 0;
    if (value === "&laquo;" || value === "... ") page = 1;
    else if (value === "&lsaquo;") {
      if (reposCtx.currentPage !== 1) page = reposCtx.currentPage - 1;
    } else if (value === "&rsaquo;") {
      if (reposCtx.currentPage !== pagesCount) page = reposCtx.currentPage + 1;
    } else if (value === "&raquo;" || value === " ...") page = pagesCount;
    else page = +value;

    onPageChange(page);
  };

  return (
    <ul
      className="pagination pagination-md justify-content-center"
      role="navigation"
      aria-label="Pagination"
    >
      <li className="page-item">
        <span
          className={`page-link ${
            reposCtx.currentPage === 1 ? "disabled" : "text-dark"
          }`}
          onClick={() => pageChangeHandler("&laquo;")}
        >
          &laquo;
        </span>
      </li>
      <li className="page-item">
        <span
          className={`page-link ${
            reposCtx.currentPage === 1 ? "disabled" : "text-dark"
          }`}
          onClick={() => pageChangeHandler("&lsaquo;")}
        >
          &lsaquo;
        </span>
      </li>
      {array.map((value) => (
        <li
          key={value}
          className={`page-item ${
            value === reposCtx.currentPage ? "active" : ""
          }`}
        >
          <span
            className={`page-link ${
              value === reposCtx.currentPage
                ? "bg-dark border-dark"
                : "text-dark"
            }`}
            onClick={() => pageChangeHandler(value)}
          >
            {value}
          </span>
        </li>
      ))}
      <li className="page-item">
        <span
          className={`page-link ${
            reposCtx.currentPage === pagesCount ? "disabled" : "text-dark"
          }`}
          onClick={() => pageChangeHandler("&rsaquo;")}
        >
          &rsaquo;
        </span>
      </li>
      <li className="page-item">
        <span
          className={`page-link ${
            reposCtx.currentPage === pagesCount ? "disabled" : "text-dark"
          }`}
          onClick={() => pageChangeHandler("&raquo;")}
        >
          &raquo;
        </span>
      </li>
    </ul>
  );
}
