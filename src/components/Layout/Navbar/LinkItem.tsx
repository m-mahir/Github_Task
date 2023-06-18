import { NavLink } from "react-router-dom";
import styles from "../../../styles/navbar/LinkItem.module.scss";

type Props = {
  route: string;
  title: string;
};

export default function LinkItem({ route, title }: Props) {
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ""}`
        }
        to={route}
      >
        {title}
      </NavLink>
    </li>
  );
}
