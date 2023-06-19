import { useContext, useEffect } from "react";
import { getAllBookmarks } from "../middleware/localStorage";
import { ReposContext } from "../store/repo-context";
import { PAGE_SIZE } from "../services/constants";
import List from "../components/Repos/List";
import EmptyResult from "../components/Repos/EmptyResult";

type Props = {
  page: number;
  setPage: (pageNum: number) => void;
};

export default function Bookmarks({ page, setPage }: Props) {
  const reposCtx = useContext(ReposContext)!;

  const checkUnFavouriteLastInPage = () => {
    if (
      page !== 1 &&
      page === Math.ceil(reposCtx.numberOfRepos / PAGE_SIZE) &&
      reposCtx.numberOfRepos % PAGE_SIZE === 1
    ) {
      setPage(page - 1);
    } else loadBookmarks();
  };

  const loadBookmarks = () => {
    const bookmarks = getAllBookmarks();

    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    reposCtx.populateRepos(
      bookmarks.slice(startIndex, endIndex),
      bookmarks.length
    );
  };

  useEffect(() => {
    loadBookmarks();
  }, [page]);

  return reposCtx.repos.length === 0 ? (
    <EmptyResult />
  ) : (
    <List checkPage={checkUnFavouriteLastInPage} />
  );
}
