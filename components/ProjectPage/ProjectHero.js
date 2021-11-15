import clsx from "clsx";

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
  return (
    <ProjectSlide className={clsx(className, styles.Slide)} {...props}>
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
