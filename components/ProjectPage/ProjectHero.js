import clsx from "clsx";

import { useAppContext } from "context/state";

import Heading from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";
import ProjectSlide from "./ProjectSlide";

import styles from "./ProjectHero.module.scss";

export function ContentfulProjectHero({ pageFields, ...props }) {
  return (
    <ProjectHero
      title={pageFields.heroTitle}
      copy={pageFields.heroCopy}
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
        {copy && (
          <Paragraph className={styles.Copy} level="huge">
            {copy}
          </Paragraph>
        )}
      </div>
    </ProjectSlide>
  );
}

export default ProjectHero.apply;
