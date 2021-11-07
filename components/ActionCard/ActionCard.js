import { forwardRef } from "react";
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
        <Action ctaText={actionCta}>{topChildren}</Action>

        {children}
      </Card>
    );
  }
);

export default ActionCard;
