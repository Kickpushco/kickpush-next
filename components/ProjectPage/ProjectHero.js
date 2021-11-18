import clsx from "clsx";

import { useAppContext } from "context/state";

import { computeTextColor } from "services/contentful";

import Heading from "components/Heading/Heading";
import { HeroCopy } from "components/Hero/Hero";
import ProjectSlide from "./ProjectSlide";

import styles from "./ProjectHero.module.scss";

export function ContentfulProjectHero({ pageFields, ...props }) {
  const textColor = computeTextColor(pageFields.cardTextColor);

  return (
    <ProjectHero
      title={pageFields.heroTitle}
      copy={pageFields.heroCopy}
      variant={textColor}
      backgroundColor={pageFields.cardColor}
      {...props}
    />
  );
}

function ProjectHero({ className, title, copy, ...props }) {
  const { projectTransitioning } = useAppContext();

  return (
    <ProjectSlide
      className={clsx(
        className,
        styles.Slide,
        !projectTransitioning && styles["Slide-inView"]
      )}
      {...props}
    >
      <div className={clsx("container", styles.Content)}>
        <Heading className={styles.Title} level="h1">
          {title}
        </Heading>
        {copy && <HeroCopy>{copy}</HeroCopy>}
      </div>
    </ProjectSlide>
  );
}

export default ProjectHero.apply;
