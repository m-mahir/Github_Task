import { NavLink } from "react-router-dom";
import styles from "./LinkItem.module.scss";

type Props = {
  route: string;
  title: string;
};

export default function LinkItem({ route, title }: Props) {
  return (
    <li>
      <NavLink className={styles.link} to={route}>
        {title}
      </NavLink>
    </li>
  );
}
