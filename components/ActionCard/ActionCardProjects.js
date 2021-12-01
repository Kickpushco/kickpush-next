import Link from "next/link";
import clsx from "clsx";

import ActionCard, { ActionCardLabel, ActionCardTitle } from "./ActionCard";
import Image from "components/Image/Image";

import workRow1Png from "assets/images/work-row-1.png";
import workRow1Webp from "assets/images/work-row-1.webp";
import workRow2Png from "assets/images/work-row-2.png";
import workRow2Webp from "assets/images/work-row-2.webp";

import styles from "./ActionCardProjects.module.scss";

export function computeActionCardProjectsProps(globalSettings) {
  return {
    heading: globalSettings.projectsCardTitle,
    subtitle: globalSettings.projectsCardSubtitle,
    actionCta: globalSettings.projectsCardAction,
  };
}

function Row({ png, webp }) {
  return (
    <Image
      className={styles.Row}
      variant="ghost"
      srcSet={{
        legacy: png.src,
        webp: webp.src,
      }}
      width={png.width}
      height={png.height}
    />
  );
}

function ActionCardProjects({
  className,
  heading,
  subtitle,
  actionCta = "See all projects",
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
          <Row png={workRow1Png} webp={workRow1Webp} />
          <Row png={workRow2Png} webp={workRow2Webp} />
        </div>
      </ActionCard>
    </Link>
  );
}

export default ActionCardProjects;
