import { Routes, Route } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Repos from "./Repos";
import ReposContextProvider from "../context/repo-context";
import Bookmarks from "./Bookmarks";

export default function Home() {
  return (
    <div>
      <Navbar />
      <ReposContextProvider>
        <Routes>
          <Route path="/" element={<Repos />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </ReposContextProvider>
    </div>
  );
}
