import clsx from "clsx";
import Link from "next/link";

import Heading from "@components/Heading/Heading";
import Paragraph from "@components/Paragraph/Paragraph";

import styles from "./ProjectCards.module.scss";

const cardTextColorMap = {
  Light: "light",
  Dark: "dark",
};

function ProjectCards({ projects = [] }) {
  return (
    <div className={styles.Wrapper}>
      {projects.map((project) => {
        const { slug, clientName, year, cardTitle, cardColor, cardTextColor } =
          project.fields;

        return (
          <ProjectCard
            key={project.sys.id}
            byline={clientName}
            year={year}
            title={cardTitle}
            backgroundColor={cardColor}
            textColor={cardTextColorMap[cardTextColor]}
            href={`/projects/${slug}`}
          />
        );
      })}
      {/* <pre>{JSON.stringify(projects, null, 2)}</pre> */}
    </div>
  );
}

const cardTextColorStyles = {
  Light: styles["Card-light"],
  Dark: styles["Card-dark"],
};

function ProjectCard({
  byline,
  year,
  backgroundColor,
  textColor = "light",
  title,
  href,
}) {
  // const { clientName, year, cardColor, cardTextColor, cardTitle } =
  //   project.fields;

  return (
    <Link href={href}>
      <a
        className={clsx(styles.Card, styles[`Card-${textColor}`])}
        style={{ backgroundColor }}
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
    </Link>
  );
}

export default ProjectCards;
