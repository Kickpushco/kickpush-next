import clsx from "clsx";

import { computeTextColor } from "services/contentful";

import ProjectSlide from "./ProjectSlide";
import { ContentfulProjectCard } from "components/ProjectCard/ProjectCard";
import { CardsWrapper } from "components/Card/Card";
import PrivacyPolicy from "components/PrivacyPolicy/PrivacyPolicy";

import styles from "./ProjectFooter.module.scss";

export function ContentfulProjectFooter({
  globalSettings,
  nextProject,
  onClick,
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
        onClick={onClick}
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
      <div className={clsx(styles.Container, "container")}>
        <CardsWrapper columns={false}>
          {/* TODO: Fix scroll to on focus */}
          {children}
        </CardsWrapper>
      </div>

      <PrivacyPolicy className={styles.PrivacyPolicy} />
    </ProjectSlide>
  );
}

export default ProjectFooter;
