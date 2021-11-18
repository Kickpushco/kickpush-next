import clsx from "clsx";
import { forwardRef } from "react";

import styles from "./ProjectSlide.module.scss";

const ProjectSlide = forwardRef(
  (
    {
      className,
      backgroundColor,
      variant = "light", // "light" | "dark"
      style = {},
      children,
      ...props
    },
    ref
  ) => {
    return (
      <section
        className={clsx(className, styles.Slide, styles[`Slide-${variant}`])}
        style={{
          backgroundColor,
          ...style,
        }}
        ref={ref}
        {...props}
      >
        {children}
      </section>
    );
  }
);

ProjectSlide.displayName = "ProjectSlide";

export default ProjectSlide;
