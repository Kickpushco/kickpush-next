import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Heading.module.scss";

const Heading = forwardRef(
  ({ className, children, tag, level = "h2", ...props }, ref) => {
    const HeadingTag = tag || level;
    return (
      <HeadingTag
        className={clsx(className, styles.Heading, styles[`Heading-${level}`])}
        ref={ref}
        {...props}
      >
        {children}
      </HeadingTag>
    );
  }
);

Heading.displayName = "Heading";

export default Heading;
