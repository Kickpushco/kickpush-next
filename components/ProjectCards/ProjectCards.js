import { forwardRef } from "react";
import clsx from "clsx";
import Link from "next/link";

import Heading from "@components/Heading/Heading";
import Paragraph from "@components/Paragraph/Paragraph";

import styles from "./ProjectCards.module.scss";

export const projectCardTextColorMap = {
  Light: "light",
  Dark: "dark",
};

function ProjectCards({ projectsList, showProjectsLink }) {
  const { projects } = projectsList.fields;

  return (
    <div className={styles.Wrapper}>
      {projects.map((project) => {
        const { slug, clientName, year, cardTitle, cardColor, cardTextColor } =
          project.fields;

        return (
          <Link key={project.sys.id} href={`/projects/${slug}`} passHref>
            <ProjectCard
              byline={clientName}
              year={year}
              title={cardTitle}
              backgroundColor={cardColor}
              textColor={projectCardTextColorMap[cardTextColor]}
            />
          </Link>
        );
      })}
      {showProjectsLink && (
        <Link href="/projects" passHref>
          <ProjectCard byline="Kickpush Work" year="2014–present" />
        </Link>
      )}
    </div>
  );
}

export const ProjectCard = forwardRef(
  (
    {
      size = "small",
      byline,
      year,
      backgroundColor,
      textColor = "Light",
      title,
      href,
    },
    ref
  ) => {
    return (
      <a
        className={clsx(
          styles.Card,
          styles[`Card-${textColor}`],
          styles[`Card-${size}`]
        )}
        style={{ backgroundColor }}
        href={href}
        ref={ref}
      >
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

        <Heading className={styles.Title} level="h4" tag="h3">
          {title}
        </Heading>
      </a>
    );
  }
);

export default ProjectCards;
