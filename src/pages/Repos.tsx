import { useState, useEffect, useRef, useContext } from "react";
import { get } from "../middleware/octokit";
import Repo from "../models/repo";
import { checkIsBookmarked } from "../middleware/localStorage";
import { ReposContext } from "../context/repo-context";
import styles from "../styles/Repos.module.scss";
import { FaSearch } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { PAGE_SIZE } from "../services/constants";
import List from "../components/Repos/List";
import { useErrorBoundary } from "react-error-boundary";
import { addCommas } from "../services/utils/numberFormatter";
import EmptyResult from "../components/EmptyResult";
import useDebounce from "../hooks/useDebounce";

export default function Repos() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const abortController = useRef<AbortController | null>(null);

  const reposCtx = useContext(ReposContext)!;

  const { showBoundary } = useErrorBoundary();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchRepos = async (currentPage: number) => {
    if (debouncedSearchQuery) {
      if (abortController.current) abortController.current.abort();
      abortController.current = new AbortController();
      try {
        setIsLoading(true);

        const reposResult = await get(
          "/search/repositories",
          {
            q: searchQuery,
            per_page: PAGE_SIZE,
            page: currentPage,
          },
          abortController.current!
        );
        if (reposResult && reposResult!.data) {
          let reposList = reposResult!.data.items.map(
            (repo: any) =>
              new Repo(
                repo.id,
                repo.name,
                repo.owner?.login || "",
                repo.description || "",
                addCommas(repo.stargazers_count),
                !!checkIsBookmarked(repo.id)
              )
          );
          reposCtx.populateRepos(
            reposList || [],
            reposResult!.data.total_count!
          );

          setIsLoading(false);
        }
      } catch (error: any) {
        showBoundary(error);
      }
      reposCtx.setCurrentPage(currentPage);
    } else {
      reposCtx.populateRepos([], 0);
    }
  };

  const clearSearch = () => setSearchQuery("");

  useEffect(() => {
    fetchRepos(1);
  }, [debouncedSearchQuery]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.icon}>
          <FaSearch />
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.search}
        />
        {searchQuery && (
          <div className={styles.closeIcon}>
            <IoCloseCircle className={styles.x} size="30" color="lightgrey" onClick={clearSearch} />
          </div>
        )}
      </div>
      {!isLoading && reposCtx.repos.length === 0 ? (
        <EmptyResult keyword={searchQuery} />
      ) : (
        <List onPageChange={fetchRepos} isLoading={isLoading} />
      )}
    </>
  );
}
