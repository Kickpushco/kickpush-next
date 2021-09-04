import clsx from "clsx";

import styles from "./Heading.module.scss";

function Heading({ className, children, tag, level = "h2" }) {
  const HeadingTag = tag || level;
  return (
    <HeadingTag
      className={clsx(className, styles.Heading, styles[`Heading-${level}`])}
    >
      {children}
    </HeadingTag>
  );
}

export default Heading;
