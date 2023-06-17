import React, { useState, createContext } from "react";
import Repo from "../models/repo";
import { addToLocalStorage, removeFromLocalStorage } from "../lib/localStorage";

type RepoContextType = {
  repos: Repo[];
  totalPages: number;
  populateRepos: (repos: Repo[], totalPages: number) => void;
  favouriteRepo: (id: number, isFavourite: boolean) => void;
};

type Props = {
  children: React.ReactNode;
};

export const ReposContext = createContext<RepoContextType>({
  repos: [],
  totalPages: 0,
  populateRepos: (repos: Repo[], totalPages: number) => {},
  favouriteRepo: (id: number, isFavourite: boolean) => {},
});

const ReposContextProvider = ({ children }: Props) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  const populateRepos = (repos: Repo[], totalPages: number) => {
    setRepos(repos);
    setTotalPages(totalPages);
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
    } else removeFromLocalStorage(id);
  };

  const contextValue: RepoContextType = {
    repos: repos,
    totalPages: totalPages,
    populateRepos: populateRepos,
    favouriteRepo: favouriteRepo,
  };

  return (
    <ReposContext.Provider value={contextValue}>
      {children}
    </ReposContext.Provider>
  );
};

export default ReposContextProvider;
