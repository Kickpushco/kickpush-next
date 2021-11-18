import clsx from "clsx";
import { forwardRef } from "react";

import styles from "./Button.module.scss";

const Button = forwardRef(
  (
    {
      className,
      children,
      block,
      tag,
      size = "medium",
      iconOnly,
      fauxHover,
      variant = "default", // "default" | "ghost" | "dark" | "light"
      ...props
    },
    ref
  ) => {
    const ButtonTag = tag || (props.href ? "a" : "button");

    return (
      <ButtonTag
        className={clsx(
          className,
          styles.Button,
          styles[`Button-${size}`],
          styles[`Button-${variant}`],
          block && styles.BlockButton,
          iconOnly && styles.IconButton,
          fauxHover && styles[`Button-fauxHover`]
        )}
        ref={ref}
        {...props}
      >
        <span className={styles.Children}>{children}</span>
      </ButtonTag>
    );
  }
);

export default Button;
