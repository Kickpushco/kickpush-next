import clsx from "clsx";
import { forwardRef } from "react";

import styles from "./Button.module.scss";

const Button = forwardRef(
  ({ className, children, block, tag = "button", ...props }, ref) => {
    const ButtonTag = "button";

    return (
      <ButtonTag
        className={clsx(className, styles.Button, block && styles.BlockButton)}
        ref={ref}
        {...props}
      >
        {children}
      </ButtonTag>
    );
  }
);

export default Button;
