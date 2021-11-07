import { forwardRef } from "react";
import clsx from "clsx";
import Link from "next/link";

import ActionCard from "components/ActionCard/ActionCard";
import Heading from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";

import styles from "./ProjectCard.module.scss";

function ProjectCard({
  className,
  slug,
  byline,
  year,
  backgroundColor,
  backgroundImage,
  size = "small",
  textColor = "light",
  title,
  ...props
}) {
  return (
    <Link href={`/projects/${slug}`} passHref>
      <ActionCard
        className={clsx(
          className,
          styles.Card,
          styles[`Card-${textColor}`],
          styles[`Card-${size}`]
        )}
        style={{
          backgroundColor,
        }}
        topChildren={
          <>
            <p className={clsx(styles.Top, styles["Top-info"])}>
              <Heading className={styles.Byline} level="h5" tag="span">
                {byline}
              </Heading>
              {year && (
                <Paragraph className={styles.Year} level="label" tag="span">
                  {year}
                </Paragraph>
              )}
            </p>
          </>
        }
        actionCta="See project"
        size={size}
        {...props}
      >
        {backgroundImage && (
          <span
            className={styles.Background}
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}

        <Heading className={styles.Title} level="h4" tag="h3">
          {title}
        </Heading>
      </ActionCard>
    </Link>
  );
}

export default ProjectCard;
