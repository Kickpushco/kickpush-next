import { forwardRef } from "react";
import clsx from "clsx";

import Button from "./Button";

import IconClose from "assets/icons/20-close.svg";

import styles from "./Button.module.scss";

export const CloseButton = forwardRef(
  ({ className, icon: Icon = IconClose, ...props }, ref) => {
    return (
      <Button
        className={clsx(className, styles.CloseButton)}
        size="small"
        iconOnly
        ref={ref}
        {...props}
      >
        <Icon role="presentation" />
      </Button>
    );
  }
);
