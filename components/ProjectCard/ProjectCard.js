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
  const { comingSoon = false, cardImage, comingSoonCardImage } = fields;

  let backgroundImageProps = null;

  if (comingSoon && isValidImage(comingSoonCardImage)) {
    backgroundImageProps = computeImageProps(comingSoonCardImage);
  } else if (isValidImage(cardImage)) {
    backgroundImageProps = computeImageProps(cardImage);
  }

  return {
    slug: fields.slug,
    clientName: fields.clientName,
    comingSoon,
    year: fields.year,
    title: fields.cardTitle,
    backgroundColor: !comingSoon ? fields.cardColor : undefined,
    backgroundImageProps,
    textColor: !comingSoon ? computeTextColor(fields.cardTextColor) : undefined,
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
  comingSoon = false,
  ...props
}) {
  const projectHref = `/projects/${slug}`;

  const actionCard = (
    <ActionCard
      className={clsx(
        className,
        styles.Card,
        comingSoon && styles["Card-comingSoon"]
      )}
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
      comingSoon={comingSoon}
      {...props}
    >
      <ActionCardTitle className={styles.Title} size={size}>
        {title}
      </ActionCardTitle>
    </ActionCard>
  );

  if (comingSoon) {
    return actionCard;
  }

  return (
    <Link href={projectHref} passHref>
      {actionCard}
    </Link>
  );
}

export default ProjectCard;
