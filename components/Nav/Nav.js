import { useState, useEffect, forwardRef, useRef, useCallback } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAppContext } from "context/state";

import { CloseButton } from "components/Button/CloseButton";
import Heading from "components/Heading/Heading";

import Logo from "assets/images/logo.svg";
import IconHamburger from "assets/icons/16-hamburger.svg";

import useFocusTrap from "hooks/useFocusTrap";

import styles from "./Nav.module.scss";

export function computeNavProps(globalSettings) {
  const labels = {
    projects: globalSettings.navWork,
    about: globalSettings.navAbout,
    contact: globalSettings.navContact,
  };

  return { labels };
}

const NavLink = forwardRef(
  ({ className, isMobile, children, selected, ...props }, ref) => {
    const NavLinkTag = isMobile ? Heading : "a";

    return (
      <NavLinkTag
        ref={ref}
        className={clsx(className, styles.Link)}
        aria-current={selected || undefined}
        level={isMobile ? "h3" : undefined}
        tag={isMobile ? "a" : undefined}
        {...props}
      >
        <span>{children}</span>
      </NavLinkTag>
    );
  }
);

function Nav({ labels, selected, ...props }) {
  const { pathname } = useRouter();
  const { projectTransitioning, mobileOpen, setMobileOpen } = useAppContext();

  const [isMobile, setIsMobile] = useState(false);

  const menuRef = useRef(null);

  function toggleMobileOpen() {
    setMobileOpen((current) => !current);
  }

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mediaQueryList = matchMedia(
      `(min-width: ${styles.breakpointHamburgerMenu})`
    );

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
  }, [setMobileOpen]);

  const handleMobileClose = useCallback(() => {
    setMobileOpen(false);
  }, [setMobileOpen]);

  useFocusTrap(menuRef, mobileOpen, handleMobileClose);

  return (
    <nav
      className={clsx(
        styles.Nav,
        mobileOpen && styles["Nav-mobileOpen"],
        projectTransitioning && styles["Nav-projectTransitioning"]
      )}
      {...props}
    >
      <div className={clsx(styles.Container, "container")}>
        <Link href="/">
          <a className={styles.Logo}>
            <Logo aria-label="Kickpush" />
          </a>
        </Link>

        <div ref={menuRef}>
          {isMobile && (
            <CloseButton
              className={clsx(
                styles.Toggle,
                !mobileOpen && styles["Toggle-closed"]
              )}
              aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
              onClick={toggleMobileOpen}
              icon={!mobileOpen ? IconHamburger : undefined}
            />
          )}

          <ul className={styles.Links}>
            <li>
              <Link href="/projects" passHref>
                <NavLink isMobile={isMobile} selected={selected === "projects"}>
                  {labels.projects}
                </NavLink>
              </Link>
            </li>
            <li>
              <Link href="/about" passHref>
                <NavLink isMobile={isMobile} selected={selected === "about"}>
                  {labels.about}
                </NavLink>
              </Link>
            </li>
            <li>
              <Link href="/contact" passHref>
                <NavLink isMobile={isMobile} selected={selected === "contact"}>
                  {labels.contact}
                </NavLink>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
