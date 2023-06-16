import { Routes, Route } from "react-router-dom";
import Repos from "./Repos/Repos";
import Bookmarks from "./Bookmarks/Bookmarks";
import Navbar from "../components/ui/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Repos />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </div>
  );
}
