import clsx from "clsx";

import styles from "./Paragraph.module.scss";

function Paragraph({
  className,
  children,
  tag = "p",
  level = "big",
  ...props
}) {
  const ParagraphTag = tag;
  return (
    <ParagraphTag
      className={clsx(
        className,
        styles.Paragraph,
        styles[`Paragraph-${level}`]
      )}
      {...props}
    >
      {children}
    </ParagraphTag>
  );
}

export default Paragraph;
