import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Card.module.scss";

export const CARD_DEFAULT_SIZE = "large";

const Card = forwardRef(
  ({ className, children, size = CARD_DEFAULT_SIZE, ...props }, ref) => {
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
