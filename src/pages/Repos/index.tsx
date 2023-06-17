import {
  useState,
  useEffect,
  useRef,
  useDeferredValue,
  useContext,
} from "react";
import { search } from "../../lib/octokit";
import Repo from "../../models/repo";
import { checkIsBookmarked } from "../../lib/localStorage";
import Table from "../../components/Table";
import { ReposContext } from "../../context/repo-context";

export default function Repos() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const abortController = useRef<AbortController | null>(null);

  const reposCtx = useContext(ReposContext)!;

  const keyword = useDeferredValue(searchQuery);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchRepos = async () => {
    setIsLoading(true);
    const res = await search(
      searchQuery,
      currentPage,
      abortController.current!
    );
    console.log(res);
    if (res && res!.data) {
      let resultRepos = res!.data.items.map(
        (repo) =>
          new Repo(
            repo.id,
            repo.name,
            repo.owner?.login || "",
            repo.description || "",
            repo.stargazers_count,
            !!checkIsBookmarked(repo.id)
          )
      );
      reposCtx.populateRepos(resultRepos || [], res!.data.total_count!);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (keyword) {
      if (abortController.current) abortController.current.abort();
      abortController.current = new AbortController();
      fetchRepos();
    } else {
      reposCtx.populateRepos([], 0);
    }
  }, [keyword, currentPage]);

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {isLoading ? (
        <div>Loading..</div>
      ) : (
        reposCtx.repos.length > 0 && (
          <Table
            items={reposCtx.repos}
            page={currentPage}
            setPage={handlePageChange}
          />
        )
      )}
    </>
  );
}
