import { FC, useContext, useState } from "react";
import Pagination from "../components/Repos/Pagination";
import { ReposContext } from "../store/repo-context";

const withPagination = (Component: FC<any>) => (props: any) => {
  const [page, setPage] = useState(1);
  const reposCtx = useContext(ReposContext)!;

  return (
    <>
      <Component {...props} page={page} setPage={setPage} />
      {reposCtx.repos.length > 0 && (
        <Pagination page={page} setPage={setPage} />
      )}
    </>
  );
};

export default withPagination;
