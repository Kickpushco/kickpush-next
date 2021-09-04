import Logo from "../../assets/images/logo.svg";

import styles from "./Nav.module.scss";

function Nav({}) {
  return (
    <nav className={styles.Nav}>
      <div className="container">
        <a href="/" className={styles.Logo}>
          <Logo aria-label="Kickpush" />
        </a>

        <ul className={styles.Links}>
          <li>
            <a href="/">Work</a>
          </li>
          <li>
            <a href="/">People</a>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
