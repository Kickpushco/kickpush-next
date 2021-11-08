import { cloneElement, useMemo } from "react";
import clsx from "clsx";

import { ContentfulImage } from "components/Image/Image";
import ProjectSlide from "./ProjectSlide";

import styles from "./ProjectCover.module.scss";

function computeAlignment(string = "Center Center") {
  if (!string) return null;

  let [alignItems, justifyContent] = string.toLowerCase().split(" ");

  if (alignItems === "top") alignItems = "flex-start";
  if (alignItems === "bottom") alignItems = "flex-end";

  if (justifyContent === "left") justifyContent = "flex-start";
  if (justifyContent === "right") justifyContent = "flex-end";

  return {
    alignItems,
    justifyContent,
  };
}

export function ContentfulProjectCover({ pageFields, ...props }) {
  const {
    heroDesktopBackground: desktopBackground,
    heroDesktopLogo: desktopLogo,
    heroDesktopLogoPosition: desktopLogoPosition,
    heroDesktopLogoWidth: desktopLogoWidth,
  } = pageFields;

  const desktop = {
    background: desktopBackground && (
      <ContentfulImage image={desktopBackground} objectFit="cover" />
    ),
    logo: desktopLogo && <ContentfulImage image={desktopLogo} />,
    logoPosition: desktopLogoPosition,
    logoWidth: desktopLogoWidth,
  };

  const mobile = {};

  return <ProjectCover desktop={desktop} mobile={mobile} {...props} />;
}

function ProjectCover({ className, desktop, mobile, style = {}, ...props }) {
  const desktopBackground = useMemo(() => {
    if (!desktop.background) return null;

    return cloneElement(desktop.background, {
      className: styles.DesktopBackground,
      variant: "ghost",
    });
  }, [desktop.background]);

  const desktopLogo = useMemo(() => {
    if (!desktop.logo) return null;

    return cloneElement(desktop.logo, {
      className: styles.DesktopLogo,
      variant: "ghost",
    });
  }, [desktop.background]);

  return (
    <ProjectSlide
      className={clsx(className, styles.Cover)}
      style={{
        ...computeAlignment(desktop.logoPosition),
        "--desktop-logo-width": desktop.logoWidth,
        "--mobile-logo-width": mobile.logoWidth,
        ...style,
      }}
      {...props}
    >
      {desktopBackground}
      {desktopLogo}
    </ProjectSlide>
  );
}

export default ProjectCover;
