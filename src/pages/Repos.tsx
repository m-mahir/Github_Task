import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { get } from "../middleware/octokit";
import Repo from "../models/Repo";
import { checkIsBookmarked } from "../middleware/localStorage";
import { ReposContext } from "../store/repo-context";
import styles from "../styles/Repos.module.scss";
import { FaSearch } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { PAGE_SIZE } from "../services/constants";
import List from "../components/Repos/List";
import { useErrorBoundary } from "react-error-boundary";
import { addCommas } from "../services/utils/numberFormatter";
import EmptyResult from "../components/Repos/EmptyResult";
import useDebounce from "../hooks/useDebounce";

type Props = {
  page: number;
  setPage: (pageNum: number) => void;
  setShowPagination: (show: boolean) => void;
};

export default function Repos({ page, setPage, setShowPagination }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const abortController = useRef<AbortController | null>(null);

  const clearSearch = () => setSearchQuery("");

  const reposCtx = useContext(ReposContext)!;

  const { showBoundary } = useErrorBoundary();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchRepos = useCallback(async () => {
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
            page,
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
          setShowPagination(true);
        }
      } catch (error: any) {
        showBoundary(error);
      }
    } else {
      reposCtx.populateRepos([], 0);
    }
  }, [debouncedSearchQuery, page]);

  useEffect(() => {
    setShowPagination(false);
    fetchRepos();
  }, [debouncedSearchQuery, page]);

  useEffect(() => {
    setPage(1);
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
            <IoCloseCircle
              className={styles.x}
              size="30"
              color="lightgrey"
              onClick={clearSearch}
            />
          </div>
        )}
      </div>
      {!isLoading && reposCtx.repos.length === 0 ? (
        <EmptyResult keyword={searchQuery} />
      ) : (
        <List isLoading={isLoading} />
      )}
    </>
  );
}
