import { useState, useEffect, useRef, useDeferredValue } from "react";
import { search } from "../../lib/octokit";
import Repo from "../../models/repo";
import styles from "./Repos.module.scss";
import { addCommas } from "../../utils/numberFormatter";
import { FaStar, FaRegStar } from "react-icons/fa";
import {
  addToLocalStorage,
  checkIsBookmarked,
  removeFromLocalStorage,
} from "../../lib/localStorage";

const PAGE_SIZE = 10;

export default function Repos() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const abortController = useRef<AbortController | null>(null);

  const totalPages = Math.ceil(repos.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentData = repos.slice(startIndex, endIndex);
  const keyword = useDeferredValue(searchQuery);

  const fetchRepos = async () => {
    setIsLoading(true);
    const res = await search(searchQuery, abortController.current!);
    let resultRepos = res?.data.items.map(
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
    setRepos(resultRepos || []);
    console.log(res);
    setIsLoading(false);
  };

  useEffect(() => {
    if (keyword) {
      if (abortController.current) abortController.current.abort();
      abortController.current = new AbortController();
      fetchRepos();
    }
  }, [keyword]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const favouriteRepo = (id: number, isFavourite: boolean) => {
    if (isFavourite) {
      const repo = repos.find((r) => r.id === id);
      addToLocalStorage(repo!);
    } else removeFromLocalStorage(id);
    toogleBookmark(id);
  };

  const toogleBookmark = (id: number) => {
    const newRepos = repos.map((repo) =>
      repo.id === id ? { ...repo, isBookmarked: !repo.isBookmarked } : repo
    );
    setRepos(newRepos);
  };

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
        repos.length > 0 && (
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
                {currentData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.owner}</td>
                    <td>{addCommas(item.starsCount)}</td>
                    <td>
                      {item.isBookmarked ? (
                        <FaStar onClick={() => favouriteRepo(item.id, false)} />
                      ) : (
                        <FaRegStar
                          onClick={() => favouriteRepo(item.id, true)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={pageNumber === currentPage ? "active" : ""}
                  >
                    {pageNumber}
                  </button>
                )
              )}
            </div>
          </div>
        )
      )}
    </>
  );
}
