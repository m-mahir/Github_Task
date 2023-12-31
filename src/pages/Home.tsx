import { Routes, Route, useNavigate } from "react-router-dom";
import Repos from "./Repos";
import ReposContextProvider from "../store/repo-context";
import { Suspense, lazy } from "react";
import Navbar from "../components/Layout/Navbar";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";
import Loader from "../components/Layout/Loader";
import styles from "../styles/general/Global.module.scss";
import PageNotFound from "../components/PageNotFound";
import withPagination from "../hoc/withPagination";

const Bookmarks = lazy(() => import("./Bookmarks"));

const ReposWithPagination = withPagination(Repos);
const BookmarksWithPagination = withPagination(Bookmarks);

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <Navbar />
      <ReposContextProvider>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => navigate("/")}
        >
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={<ReposWithPagination />}
                aria-label="Repositories"
              />
              <Route
                path="/bookmarks"
                element={<BookmarksWithPagination />}
                aria-label="Bookmarks"
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </ReposContextProvider>
    </div>
  );
}
