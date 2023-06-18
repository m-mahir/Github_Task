import {
  useState,
  useEffect,
  useRef,
  useDeferredValue,
  useContext,
} from "react";
import { get } from "../middleware/octokit";
import Repo from "../models/repo";
import { checkIsBookmarked } from "../middleware/localStorage";
import { ReposContext } from "../context/repo-context";
import styles from "../styles/Repos.module.scss";
import { FaSearch } from "react-icons/fa";
import { PAGE_SIZE } from "../services/constants";
import List from "../components/Repos/List";
import { useErrorBoundary } from "react-error-boundary";
import Loader from "../components/Layout/Loader";
import { addCommas } from "../services/utils/numberFormatter";

export default function Repos() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const abortController = useRef<AbortController | null>(null);

  const reposCtx = useContext(ReposContext)!;

  const keyword = useDeferredValue(searchQuery);

  const { showBoundary } = useErrorBoundary();

  const fetchRepos = async (currentPage: number) => {
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
      console.log(reposResult);
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
        reposCtx.populateRepos(reposList || [], reposResult!.data.total_count!);

        setIsLoading(false);
      }
    } catch (error: any) {
      showBoundary(error);
    }
  };

  const fetchData = (pageNum: number) => {
    if (keyword) {
      if (abortController.current) abortController.current.abort();
      abortController.current = new AbortController();
      fetchRepos(pageNum);
      reposCtx.setCurrentPage(pageNum);
    } else {
      reposCtx.populateRepos([], 0);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [keyword]);

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
      </div>

      <List onPageChange={fetchData} isLoading={isLoading} />
    </>
  );
}
