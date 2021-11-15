import Link from "next/link";

import { computeTextColor } from "services/contentful";

import ActionCard from "components/ActionCard/ActionCard";
import Heading from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";
import { computeImageProps } from "components/Image/Image";

import styles from "./ProjectCard.module.scss";

export function ContentfulProjectCard({ project, globalSettings, ...props }) {
  const { slug, clientName, year, cardTitle, cardColor, cardImage } =
    project.fields;

  const textColor = computeTextColor(project.fields.cardTextColor);

  return (
    <ProjectCard
      slug={slug}
      clientName={clientName}
      year={year}
      title={cardTitle}
      backgroundColor={cardColor}
      backgroundImageProps={cardImage && computeImageProps(cardImage)}
      textColor={textColor}
      actionCta={globalSettings.projectCardAction}
      {...props}
    />
  );
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
  return (
    <Link href={`/projects/${slug}`} passHref>
      <ActionCard
        className={className}
        topChildren={
          <p>
            <Heading className={styles.Byline} level="h5" tag="span">
              {clientName}
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
