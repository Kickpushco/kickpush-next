import Heading from "components/Heading/Heading";

import IconActionArrow from "assets/icons/21-action-arrow.svg";

import styles from "./Action.module.scss";

function Action({
  children,
  ctaText = "See more",
  ctaLevel = "h5",
  ctaTag = "span",
  infoTag = "div",
}) {
  const InfoTag = infoTag;
  return (
    <>
      <InfoTag className={styles.Info}>{children}</InfoTag>

      <Heading level={ctaLevel} tag={ctaTag} className={styles.Action}>
        {ctaText} <IconActionArrow role="presentation" />
      </Heading>
    </>
  );
}

export default Action;
