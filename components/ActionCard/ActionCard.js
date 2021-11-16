import { forwardRef } from "react";
import clsx from "clsx";

import Action from "components/Action/Action";
import Card, { CARD_DEFAULT_SIZE } from "components/Card/Card";
import Image from "components/Image/Image";

import styles from "./ActionCard.module.scss";

const ActionCard = forwardRef(
  (
    {
      className,
      children,
      topChildren,
      backgroundImageProps,
      size = CARD_DEFAULT_SIZE,
      disabled,
      actionCta,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        className={clsx(
          className,
          styles.Card,
          styles[`Card-${size}`],
          !disabled && styles["Card-enabled"]
        )}
        size={size}
        ref={ref}
        data-disable-action={disabled ? "" : undefined}
        {...props}
      >
        {backgroundImageProps && (
          <Image
            objectFit="cover"
            variant="ghost"
            {...backgroundImageProps}
            className={clsx(styles.Background, backgroundImageProps.className)}
          />
        )}

        <div className={styles.Content}>
          <Action ctaText={actionCta} disabled={disabled}>
            {topChildren}
          </Action>

          {children}
        </div>
      </Card>
    );
  }
);

export default ActionCard;
