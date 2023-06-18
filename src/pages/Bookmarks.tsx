import { useContext, useEffect, useCallback } from "react";
import { getAllBookmarks } from "../middleware/localStorage";
import { ReposContext } from "../store/repo-context";
import { PAGE_SIZE } from "../services/constants";
import List from "../components/Repos/List";
import EmptyResult from "../components/Repos/EmptyResult";

export default function Bookmarks() {
  const reposCtx = useContext(ReposContext)!;

  const fetchRepos = useCallback((currentPage: number) => {
    const bookmarks = getAllBookmarks();
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    reposCtx.populateRepos(
      bookmarks.slice(startIndex, endIndex),
      bookmarks.length,
      currentPage
    );
  }, []);

  useEffect(() => {
    fetchRepos(1);
  }, []);

  return reposCtx.repos.length === 0 ? (
    <EmptyResult />
  ) : (
    <List onPageChange={fetchRepos} />
  );
}
