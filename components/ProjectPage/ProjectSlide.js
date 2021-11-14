import clsx from "clsx";
import Image from "components/Image/Image";
import { forwardRef } from "react";

import styles from "./ProjectSlide.module.scss";

const ProjectSlide = forwardRef(
  (
    {
      className,
      textColor = "light",
      backgroundColor = "project", // "project" | "dark" | "light" | Valid CSS color
      desktopBackgroundProps,
      mobileBackground,
      style = {},
      index,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <section
        className={clsx(
          className,
          styles.Slide,
          styles[`Slide-${textColor}Text`],
          styles[`Slide-${backgroundColor}Background`]
        )}
        style={{ zIndex: index, ...style }}
        ref={ref}
        {...props}
      >
        <Image
          className={clsx(styles.Background, styles["Background-desktop"])}
          variant="ghost"
          {...desktopBackgroundProps}
        />
        {children}
      </section>
    );
  }
);

ProjectSlide.displayName = "ProjectSlide";

export default ProjectSlide;
