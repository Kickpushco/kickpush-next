import clsx from "clsx";
import Link from "next/link";

import { computeTextColor } from "services/contentful";

import ActionCard, {
  ActionCardLabel,
  ActionCardTitle,
} from "components/ActionCard/ActionCard";
import Heading from "components/Heading/Heading";
import { computeImageProps, isValidImage } from "components/Image/Image";

import styles from "./ProjectCard.module.scss";

export function computeProjectCardProps({ fields }, globalSettings) {
  const textColor = computeTextColor(fields.cardTextColor);
  const backgroundImageProps =
    isValidImage(fields.cardImage) && computeImageProps(fields.cardImage);

  return {
    slug: fields.slug,
    clientName: fields.clientName,
    year: fields.year,
    title: fields.cardTitle,
    backgroundColor: fields.cardColor,
    backgroundImageProps,
    textColor,
    actionCta: globalSettings.projectCardAction,
  };
}

function ProjectCard({
  className,
  slug,
  clientName,
  year,
  title,
  size = "small",
  actionCta = "See project",
  ...props
}) {
  const projectHref = `/projects/${slug}`;

  return (
    <Link href={projectHref} passHref>
      <ActionCard
        className={clsx(className, styles.Card)}
        animationId={`project-${slug}`}
        topChildren={
          <p className={styles.Action}>
            <Heading className={styles.Byline} level="h5" tag="span">
              {clientName}
            </Heading>
            {year && (
              <ActionCardLabel className={styles.Year} tag="span">
                {year}
              </ActionCardLabel>
            )}
          </p>
        }
        actionCta={actionCta}
        size={size}
        {...props}
      >
        <ActionCardTitle className={styles.Title} size={size}>
          {title}
        </ActionCardTitle>
      </ActionCard>
    </Link>
  );
}

export default ProjectCard;
