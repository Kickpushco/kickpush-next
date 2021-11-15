import clsx from "clsx";
import { forwardRef } from "react";

import styles from "./ProjectSlide.module.scss";

const BACKGROUND_VARIANTS = ["dark", "light", "project"];

const ProjectSlide = forwardRef(
  (
    {
      className,
      textColor = "light",
      backgroundColor = "project", // "project" | "dark" | "light" | Valid CSS color
      style = {},
      children,
      ...props
    },
    ref
  ) => {
    const isVariant = BACKGROUND_VARIANTS.includes(backgroundColor);

    return (
      <section
        className={clsx(
          className,
          styles.Slide,
          styles[`Slide-${textColor}Text`],
          isVariant && styles[`Slide-${backgroundColor}Background`]
        )}
        style={{
          backgroundColor: !isVariant ? backgroundColor : undefined,
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
