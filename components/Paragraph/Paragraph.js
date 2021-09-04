import clsx from "clsx";

import styles from "./Paragraph.module.scss";

function Paragraph({ className, children, tag = "p", level = "big" }) {
  const ParagraphTag = tag;
  return (
    <ParagraphTag
      className={clsx(
        className,
        styles.Paragraph,
        styles[`Paragraph-${level}`]
      )}
    >
      {children}
    </ParagraphTag>
  );
}

export default Paragraph;
