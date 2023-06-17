import { useContext, useEffect, useState } from "react";
import { getAllBookmarks } from "../../lib/localStorage";
import { ReposContext } from "../../context/repo-context";
import Table from "../../components/Table";

export default function Bookmarks() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const reposCtx = useContext(ReposContext)!;

  useEffect(() => {
    let bookmarks = getAllBookmarks();
    reposCtx.populateRepos(bookmarks, bookmarks.length);
  }, []);

  return reposCtx.repos.length > 0 ? (
    <Table
      items={reposCtx.repos}
      page={currentPage}
      setPage={handlePageChange}
    />
  ) : (
    <></>
  );
}
