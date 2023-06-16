import  { useEffect, useState } from "react";
import { getAllBookmarks } from "../../lib/localStorage";
import Repo from "../../models/repo";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<Repo[]>([]);

  useEffect(() => {
    setBookmarks(getAllBookmarks());
  }, []);

  return <div>Bookmarks</div>;
}
