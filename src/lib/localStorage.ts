import Repo from "../models/repo";

const BOOKMARKS_KEY = "Bookmarks";

export const addToLocalStorage = (repo: Repo) => {
  repo.isBookmarked = true;
  let bookmarksStr = localStorage.getItem(BOOKMARKS_KEY);
  let bookmarks: Repo[] = bookmarksStr ? JSON.parse(bookmarksStr) : [];
  bookmarks.push(repo);
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
};

export const removeFromLocalStorage = (id: number) => {
  let bookmarks: Repo[] = JSON.parse(localStorage.getItem(BOOKMARKS_KEY)!);
  bookmarks = bookmarks.filter((repo) => repo.id !== id);
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
};

export const checkIsBookmarked = (id: number) => {
  let bookmarksStr = localStorage.getItem(BOOKMARKS_KEY);
  let bookmarks: Repo[] = bookmarksStr ? JSON.parse(bookmarksStr) : [];
  return bookmarks.find((repo) => repo.id === id);
};

export const getAllBookmarks = () => {
  let bookmarksStr = localStorage.getItem(BOOKMARKS_KEY);
  let bookmarks: Repo[] = bookmarksStr ? JSON.parse(bookmarksStr) : [];
  return bookmarks;
};
