import { forwardRef } from "react";
import clsx from "clsx";
import Link from "next/link";

import Card from "components/Card/Card";
import Heading from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";

import styles from "./ProjectCard.module.scss";

function ProjectCard({
  slug,
  byline,
  year,
  backgroundColor,
  size = "small",
  textColor = "light",
  title,
}) {
  return (
    <Link href={`/projects/${slug}`} passHref>
      <Card
        className={clsx(styles.Card, styles[`Card-${textColor}`])}
        style={{ backgroundColor }}
        size={size}
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
      </Card>
    </Link>
  );
}

export default ProjectCard;
