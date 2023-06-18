import { useContext, useEffect } from "react";
import { getAllBookmarks } from "../middleware/localStorage";
import { ReposContext } from "../context/repo-context";
import { PAGE_SIZE } from "../services/constants";
import List from "../components/Repos/List";
import EmptyResult from "../components/EmptyResult";

export default function Bookmarks() {
  const reposCtx = useContext(ReposContext)!;

  const fetchRepos = (currentPage: number) => {
    const bookmarks = getAllBookmarks();
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    reposCtx.populateRepos(
      bookmarks.slice(startIndex, endIndex),
      bookmarks.length
    );
    reposCtx.setCurrentPage(currentPage);
  };

  useEffect(() => {
    fetchRepos(1);
  }, []);

  return reposCtx.repos.length === 0 ? (
    <EmptyResult />
  ) : (
    <List onPageChange={fetchRepos} />
  );
}