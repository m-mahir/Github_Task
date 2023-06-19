import LinkItem from "./LinkItem";
import styles from "../../../styles/navbar/Navbar.module.scss";

export default function Navbar() {
  return (
    <header>
      <nav>
        <div className={styles.navbar}>
          <div className={styles.title}>GitHub Search</div>
          <ul className={styles.links}>
            <LinkItem route="/" title="Repos" />
            <LinkItem route="/bookmarks" title="Bookmarks" />
          </ul>
        </div>
      </nav>
    </header>
  );
}
