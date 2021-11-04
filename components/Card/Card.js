import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Card.module.scss";

const Card = forwardRef(
  ({ className, children, size = "large", ...props }, ref) => {
    const CardTag = props.href ? "a" : "div";
    return (
      <CardTag
        className={clsx(className, styles.Card, styles[`Card-${size}`])}
        ref={ref}
        {...props}
      >
        {children}
      </CardTag>
    );
  }
);

export default Card;
