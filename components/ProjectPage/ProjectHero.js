import clsx from "clsx";

import { useAppContext } from "context/state";

import { HeroCopy, HeroTitle } from "components/Hero/Hero";
import ProjectSlide from "./ProjectSlide";

import styles from "./ProjectHero.module.scss";

function ProjectHero({ className, title, copy, ...props }) {
  const { cardTransitioning } = useAppContext();

  return (
    <ProjectSlide
      className={clsx(
        className,
        styles.Slide,
        !cardTransitioning && styles["Slide-inView"]
      )}
      {...props}
    >
      <div className={clsx("container", styles.Content)}>
        <HeroTitle isLarge={false}>{title}</HeroTitle>
        {copy && <HeroCopy>{copy}</HeroCopy>}
      </div>
    </ProjectSlide>
  );
}

export default ProjectHero;
