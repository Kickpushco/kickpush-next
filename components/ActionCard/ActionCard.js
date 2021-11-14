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
      actionCta,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        className={clsx(className, styles.Card, styles[`Card-${size}`])}
        size={size}
        ref={ref}
        {...props}
      >
        <Image
          className={styles.Background}
          objectFit="cover"
          variant="ghost"
          {...backgroundImageProps}
        />

        <div className={styles.Content}>
          <Action ctaText={actionCta}>{topChildren}</Action>

          {children}
        </div>
      </Card>
    );
  }
);

export default ActionCard;
