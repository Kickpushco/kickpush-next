import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./Card.module.scss";

export const CARD_DEFAULT_SIZE = "large";

export function CardsWrapper({ className, columns = true, ...props }) {
  return (
    <div
      className={clsx(
        className,
        styles.CardsWrapper,
        columns && styles["CardsWrapper-columns"]
      )}
      {...props}
    />
  );
}

const Card = forwardRef(
  (
    {
      className,
      children,
      size = CARD_DEFAULT_SIZE,
      textColor = "light",
      backgroundColor,
      style = {},
      ...props
    },
    ref
  ) => {
    const CardTag = props.href ? "a" : "div";
    return (
      <CardTag
        className={clsx(
          className,
          styles.Card,
          styles[`Card-${size}`],
          styles[`Card-${textColor}`]
        )}
        style={{
          ...style,
          backgroundColor,
        }}
        ref={ref}
        {...props}
      >
        {children}
      </CardTag>
    );
  }
);

export default Card;
