import { cloneElement, forwardRef, useMemo } from "react";
import clsx from "clsx";

import Action from "components/Action/Action";
import Card, { CARD_DEFAULT_SIZE } from "components/Card/Card";

import styles from "./ActionCard.module.scss";

const ActionCard = forwardRef(
  (
    {
      className,
      children,
      topChildren,
      backgroundImage,
      size = CARD_DEFAULT_SIZE,
      actionCta,
      ...props
    },
    ref
  ) => {
    const backgroundImageMemo = useMemo(() => {
      if (!backgroundImage) return null;

      return cloneElement(backgroundImage, {
        className: styles.Background,
        objectFit: "cover",
        variant: "ghost",
      });
    }, [backgroundImage]);

    return (
      <Card
        className={clsx(className, styles.Card, styles[`Card-${size}`])}
        size={size}
        ref={ref}
        {...props}
      >
        {backgroundImageMemo}

        <div className={styles.Content}>
          <Action ctaText={actionCta}>{topChildren}</Action>

          {children}
        </div>
      </Card>
    );
  }
);

export default ActionCard;
