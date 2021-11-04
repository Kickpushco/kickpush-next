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
      ghost,
      ...props
    },
    ref
  ) => {
    const ButtonTag = "button";

    return (
      <ButtonTag
        className={clsx(
          className,
          styles.Button,
          styles[`Button-${size}`],
          block && styles.BlockButton,
          iconOnly && styles.IconButton,
          ghost && styles.GhostButton
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
