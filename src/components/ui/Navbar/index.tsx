import LinkItem from "../LinkItem";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <header>
      <nav>
        <ul className={styles.navbar}>
          <LinkItem route="/" title="Repos" />
          <LinkItem route="/bookmarks" title="Bookmarks" />
        </ul>
      </nav>
    </header>
  );
}
