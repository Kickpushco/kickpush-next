import { forwardRef, useCallback, useEffect } from "react";
import clsx from "clsx";

import { useInView } from "react-intersection-observer";

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

export const CardReveal = forwardRef(({ className, ...props }, ref) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
  });

  // See https://github.com/thebuilder/react-intersection-observer#how-can-i-assign-multiple-refs-to-a-component
  const setRefs = useCallback(
    (node) => {
      if (ref) ref.current = node;
      inViewRef(node);
    },
    [inViewRef, ref]
  );

  return (
    <div
      className={clsx(
        className,
        styles.Reveal,
        inView && styles["Reveal-inView"]
      )}
      ref={setRefs}
      {...props}
    />
  );
});

const Card = forwardRef(
  (
    {
      className,
      children,
      size = CARD_DEFAULT_SIZE,
      textColor = "light",
      backgroundColor,
      style = {},
      reveal = true,
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
