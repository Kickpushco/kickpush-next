import clsx from "clsx";
import { forwardRef } from "react";

import styles from "./Button.module.scss";

const Button = forwardRef(
  (
    {
      className,
      children,
      block,
      tag = "button",
      size = "medium",
      iconOnly,
      variant = "default", // "default" | "ghost" | "dark" | "light"
      ...props
    },
    ref
  ) => {
    const ButtonTag = tag;

    return (
      <ButtonTag
        className={clsx(
          className,
          styles.Button,
          styles[`Button-${size}`],
          styles[`Button-${variant}`],
          block && styles.BlockButton,
          iconOnly && styles.IconButton
        )}
        ref={ref}
        {...props}
      >
        {children}
      </ButtonTag>
    );
  }
);

export default Button;
