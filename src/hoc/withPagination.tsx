import { FC, useContext, useState } from "react";
import Pagination from "../components/Repos/Pagination";
import { ReposContext } from "../store/repo-context";

const withPagination = (Component: FC<any>) => (props: any) => {
  const [page, setPage] = useState(1);
  const [showPagination, setShowPagination] = useState(true);
  const reposCtx = useContext(ReposContext)!;

  return (
    <>
      <Component
        {...props}
        page={page}
        setPage={setPage}
        setShowPagination={setShowPagination}
      />
      {reposCtx.repos.length > 0 && showPagination && (
        <Pagination page={page} setPage={setPage} />
      )}
    </>
  );
};

export default withPagination;
