import { computeTextColor } from "services/contentful";

import ProjectSlide from "./ProjectSlide";
import { ContentfulProjectCard } from "components/ProjectCard/ProjectCard";
import { CardsWrapper } from "components/Card/Card";

import styles from "./ProjectFooter.module.scss";

export function ContentfulProjectFooter({
  globalSettings,
  nextProject,
  ...props
}) {
  return (
    <ProjectFooter
      textColor={computeTextColor(nextProject.fields.cardTextColor)}
      {...props}
    >
      <ContentfulProjectCard
        className={styles.FooterCard}
        size="large"
        project={nextProject}
        globalSettings={globalSettings}
      />
    </ProjectFooter>
  );
}

function ProjectFooter({ className, textColor, children, ...props }) {
  return (
    <ProjectSlide
      className={styles.Footer}
      backgroundColor={textColor}
      {...props}
    >
      <div className="container">
        <CardsWrapper columns={false}>
          {/* TODO: Fix scroll to on focus */}
          {children}
        </CardsWrapper>
      </div>
    </ProjectSlide>
  );
}

export default ProjectFooter;
