import React, { useMemo } from "react";
import clsx from "clsx";
import Link from "next/link";

import { computeTextColor } from "services/contentful";

import ActionCard from "components/ActionCard/ActionCard";
import Heading from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";
import { ContentfulImage } from "components/Image/Image";

import styles from "./ProjectCard.module.scss";

export function ContentfulProjectCard({ project, globalSettings, ...props }) {
  const { slug, clientName, year, cardTitle, cardColor, cardImage } =
    project.fields;

  const textColor = computeTextColor(project.fields.cardTextColor);

  return (
    <ProjectCard
      slug={slug}
      byline={clientName}
      year={year}
      title={cardTitle}
      backgroundColor={cardColor}
      backgroundImage={cardImage && <ContentfulImage image={cardImage} />}
      textColor={textColor}
      actionCta={globalSettings.projectCardAction}
      {...props}
    />
  );
}

function ProjectCard({
  className,
  slug,
  byline,
  year,
  title,
  size = "small",
  actionCta = "See project",
  ...props
}) {
  return (
    <Link href={`/projects/${slug}`} passHref>
      <ActionCard
        className={className}
        topChildren={
          <p>
            <Heading className={styles.Byline} level="h5" tag="span">
              {byline}
            </Heading>
            {year && (
              <Paragraph className={styles.Year} level="label" tag="span">
                {year}
              </Paragraph>
            )}
          </p>
        }
        actionCta={actionCta}
        size={size}
        {...props}
      >
        <Heading className={styles.Title} level="h4" tag="h3">
          {title}
        </Heading>
      </ActionCard>
    </Link>
  );
}

export default ProjectCard;
