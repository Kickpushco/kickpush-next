import Link from "next/link";

import Logo from "../../assets/images/logo.svg";

import styles from "./Nav.module.scss";

function Nav({}) {
  return (
    <nav className={styles.Nav}>
      <div className="container">
        <Link href="/">
          <a className={styles.Logo}>
            <Logo aria-label="Kickpush" />
          </a>
        </Link>

        <ul className={styles.Links}>
          <li>
            <Link href="/projects">
              <a>Work</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
