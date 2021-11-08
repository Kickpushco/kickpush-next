import Link from "next/link";
import clsx from "clsx";

import ActionCard from "./ActionCard";
import Heading from "components/Heading/Heading";
import Image from "components/Image/Image";
import Paragraph from "components/Paragraph/Paragraph";

import workRow1png from "assets/images/work-row-1.png";
import workRow1webp from "assets/images/work-row-1.webp";
import workRow2png from "assets/images/work-row-2.png";
import workRow2webp from "assets/images/work-row-2.webp";

import styles from "./ActionCardProjects.module.scss";

function computeRowProps(pngSrc, webpSrc) {
  const { src, width, height } = pngSrc;
  return {
    className: styles.Row,
    src,
    webpSrc: webpSrc?.src,
    variant: "ghost",
    width,
    height,
  };
}

export function ContentfulActionCardProjects({ globalSettings, ...props }) {
  return (
    <ActionCardProjects
      heading={globalSettings.projectsCardTitle}
      subtitle={globalSettings.projectsCardSubtitle}
      actionCta={globalSettings.projectsCardAction}
      {...props}
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
            <Heading level="h3" tag="p">
              {heading}
            </Heading>
            {subtitle && <Paragraph level="label">{subtitle}</Paragraph>}
          </>
        }
        {...props}
      >
        <div className={styles.Rows}>
          <Image {...computeRowProps(workRow1png, workRow1webp)} />
          <Image {...computeRowProps(workRow2png, workRow2webp)} />
        </div>
      </ActionCard>
    </Link>
  );
}

export default ActionCardProjects;
