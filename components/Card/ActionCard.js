import { forwardRef } from "react";
import clsx from "clsx";

import Card from "./Card";
import Heading from "components/Heading/Heading";

import ActionCardArrow from "./action-card-arrow.svg";

import styles from "./ActionCard.module.scss";

const ActionCard = forwardRef(
  (
    { className, children, topChildren, actionCta = "See more", ...props },
    ref
  ) => {
    return (
      <Card className={clsx(className, styles.Card)} ref={ref} {...props}>
        <span className={clsx(styles.Top, styles["Top-info"])}>
          {topChildren}
        </span>

        {children}

        <Heading
          level="h5"
          tag="p"
          className={clsx(styles.Top, styles["Top-action"])}
        >
          {actionCta} <ActionCardArrow role="presentation" />
        </Heading>
      </Card>
    );
  }
);

export default ActionCard;
