import Link from "next/link";
import clsx from "clsx";

import ActionCard, { ActionCardLabel, ActionCardTitle } from "./ActionCard";
import Image, { computeImageProps } from "components/Image/Image";

import styles from "./ActionCardProjects.module.scss";

export function computeActionCardProjectsProps(globalSettings) {
  const rows = globalSettings.projectsCardImageRows.map((a) => {
    return computeImageProps(a);
  });

  return {
    heading: globalSettings.projectsCardTitle,
    subtitle: globalSettings.projectsCardSubtitle,
    actionCta: globalSettings.projectsCardAction,
    rows,
  };
}

function ActionCardProjects({
  className,
  heading,
  subtitle,
  actionCta = "See all projects",
  rows = [],
  ...props
}) {
  return (
    <Link href="/projects" passHref>
      <ActionCard
        className={clsx(className, styles.Card)}
        size="large"
        actionCta={actionCta}
        topChildren={
          <>
            <ActionCardTitle>{heading}</ActionCardTitle>
            {subtitle && <ActionCardLabel>{subtitle}</ActionCardLabel>}
          </>
        }
        {...props}
      >
        <div className={styles.Rows}>
          {rows.map((rowProps, rowIndex) => (
            <Image
              key={rowIndex}
              className={styles.Row}
              variant="ghost"
              {...rowProps}
            />
          ))}
        </div>
      </ActionCard>
    </Link>
  );
}

export default ActionCardProjects;
