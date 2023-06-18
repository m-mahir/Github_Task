import React, { useState, createContext } from "react";
import Repo from "../models/Repo";
import {
  addToLocalStorage,
  removeFromLocalStorage,
} from "../middleware/localStorage";
import { useLocation } from "react-router-dom";
import { API_RESULTS_LIMIT } from "../config";

type RepoContextType = {
  repos: Repo[];
  numberOfRepos: number;
  currentPage: number;
  populateRepos: (repos: Repo[], totalPages: number) => void;
  favouriteRepo: (id: number, isFavourite: boolean) => void;
  setCurrentPage: (pageNum: number) => void;
};

type Props = {
  children: React.ReactNode;
};

export const ReposContext = createContext<RepoContextType>({
  repos: [],
  numberOfRepos: 0,
  currentPage: 0,
  populateRepos: (repos: Repo[], totalPages: number) => {},
  favouriteRepo: (id: number, isFavourite: boolean) => {},
  setCurrentPage: (pageNum: number) => {},
});

const ReposContextProvider = ({ children }: Props) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [numberOfRepos, setNumberOfRepos] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const location = useLocation();

  const populateRepos = (repos: Repo[], reposCount: number) => {
    setRepos(repos);
    setNumberOfRepos(Math.min(reposCount, API_RESULTS_LIMIT));
  };

  const toogleBookmark = (id: number) => {
    const newRepos = repos.map((repo) =>
      repo.id === id ? { ...repo, isBookmarked: !repo.isBookmarked } : repo
    );
    setRepos(newRepos);
  };

  const favouriteRepo = (id: number, isFavourite: boolean) => {
    toogleBookmark(id);
    if (isFavourite) {
      const repo = repos.find((r) => r.id === id);
      addToLocalStorage(repo!);
    } else {
      removeFromLocalStorage(id);
      if (location.pathname === "/bookmarks") {
        setNumberOfRepos((currVal) => currVal - 1);
        setRepos((oldRepos) => oldRepos.filter((r) => r.id !== id));
      }
    }
  };

  const contextValue: RepoContextType = {
    repos,
    numberOfRepos,
    currentPage,
    populateRepos,
    favouriteRepo,
    setCurrentPage,
  };

  return (
    <ReposContext.Provider value={contextValue}>
      {children}
    </ReposContext.Provider>
  );
};

export default ReposContextProvider;
