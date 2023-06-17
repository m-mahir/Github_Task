import LinkItem from "./LinkItem";
import styles from "../../../styles/Navbar/Navbar.module.scss";

export default function Navbar() {
  return (
    <header>
      <nav>
        <div className={styles.navbar}>
          <div className={styles.title}>GitHub Repos</div>
          <ul className={styles.links}>
            <LinkItem route="/" title="Repos" />
            <LinkItem route="/bookmarks" title="Bookmarks" />
          </ul>
        </div>
      </nav>
    </header>
  );
}
