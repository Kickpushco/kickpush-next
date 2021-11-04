import { useState, useEffect, forwardRef, useRef, useCallback } from "react";
import clsx from "clsx";
import Link from "next/link";

import Button from "components/Button/Button";
import Heading from "components/Heading/Heading";

import Logo from "assets/images/logo.svg";
import IconHamburger from "assets/icons/16-hamburger.svg";
import IconClose from "assets/icons/20-close.svg";

import useFocusTrap from "hooks/useFocusTrap";

import styles from "./Nav.module.scss";

const NavLink = forwardRef(({ isMobile, children, ...props }, ref) => {
  if (isMobile) {
    return (
      <Heading level="h3" tag="a" ref={ref} {...props}>
        {children}
      </Heading>
    );
  }
  return (
    <a ref={ref} {...props}>
      {children}
    </a>
  );
});

function Nav() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeRef = useRef(null);
  const openRef = useRef(null);
  const menuRef = useRef(null);

  function toggleMobileOpen() {
    setMobileOpen((current) => !current);
  }

  useEffect(() => {
    const mediaQueryList = matchMedia(`(min-width: ${styles.mobileNav}`);

    function handleMQLChange(e) {
      const isNotMobile = e.matches;
      setIsMobile(!isNotMobile);
      // Set the open state to false if a user resizes the screen while it is
      // open so that if they resize it back again, it'll be closed
      if (isNotMobile) {
        setMobileOpen(false);
      }
    }

    handleMQLChange(mediaQueryList);

    mediaQueryList.addListener(handleMQLChange);

    return () => {
      mediaQueryList.removeListener(handleMQLChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "auto";
    if (mobileOpen) {
      closeRef.current?.focus();
    } else {
      openRef.current?.focus();
    }
  }, [mobileOpen]);

  const handleMobileClose = useCallback(() => {
    setMobileOpen(false);
  }, [setMobileOpen]);

  useFocusTrap(menuRef, mobileOpen, handleMobileClose);

  return (
    <nav className={clsx(styles.Nav, mobileOpen && styles["Nav-mobileOpen"])}>
      <div className="container">
        <Link href="/">
          <a className={styles.Logo}>
            <Logo aria-label="Kickpush" />
          </a>
        </Link>

        {isMobile && (
          <Button
            ref={openRef}
            className={styles.MobileToggle}
            aria-label="Open menu"
            onClick={toggleMobileOpen}
            ghost
            size="small"
          >
            <IconHamburger role="presentation" />
          </Button>
        )}

        <div className={styles.Menu} ref={menuRef}>
          <ul className={styles.Links}>
            <li>
              <Link href="/projects" passHref>
                <NavLink isMobile={isMobile}>Work</NavLink>
              </Link>
            </li>
            <li>
              <Link href="/about" passHref>
                <NavLink isMobile={isMobile}>About</NavLink>
              </Link>
            </li>
            <li>
              <Link href="/contact" passHref>
                <NavLink isMobile={isMobile}>Contact</NavLink>
              </Link>
            </li>
          </ul>

          {isMobile && (
            <Button
              className={styles.MobileClose}
              aria-label="Close menu"
              onClick={toggleMobileOpen}
              ref={closeRef}
              iconOnly
            >
              <IconClose role="presentation" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
