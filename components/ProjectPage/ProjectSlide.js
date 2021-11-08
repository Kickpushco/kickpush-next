import clsx from "clsx";

import styles from "./ProjectSlide.module.scss";

function ProjectSlide({
  className,
  textColor = "light",
  backgroundColor = "project",
  style = {},
  index,
  ...props
}) {
  return (
    <section
      className={clsx(
        className,
        styles.Slide,
        styles[`Slide-${textColor}Text`],
        styles[`Slide-${backgroundColor}Background`]
      )}
      style={{
        zIndex: index,
        ...style,
      }}
      {...props}
    />
  );
}

export default ProjectSlide;
