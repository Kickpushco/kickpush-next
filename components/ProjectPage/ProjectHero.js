import clsx from "clsx";

import { useInView } from "react-intersection-observer";

import Heading from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";
import ProjectSlide from "./ProjectSlide";

import styles from "./ProjectHero.module.scss";

export function ContentfulProjectHero({ pageFields, ...props }) {
  const { year, designer, platform, heroTitle, heroCopy, heroDeliverables } =
    pageFields;

  return (
    <ProjectHero
      title={heroTitle}
      copy={heroCopy}
      year={year}
      designer={designer}
      platform={platform}
      deliverables={heroDeliverables}
      {...props}
    />
  );
}

function FooterElement({ title, value }) {
  if (!value) return null;

  return (
    <div>
      <dt>{title}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function ProjectHero({
  className,
  title,
  copy,
  year,
  designer,
  deliverables,
  platform,
  ...props
}) {
  const [triggerRef, heroInView] = useInView({
    triggerOnce: true,
    rootMargin: "0% 0% -50% 0%",
  });

  return (
    <>
      <span ref={triggerRef} />
      <ProjectSlide
        className={clsx(
          className,
          styles.Slide,
          heroInView && styles["Slide-inView"]
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
        <Paragraph className={clsx("container", styles.Footer)} tag="dl">
          <FooterElement title="Designed in" value={year} />
          <FooterElement title="Designed by" value={designer} />
          <FooterElement title="Deliverables" value={deliverables} />
          <FooterElement title="Platform" value={platform} />
        </Paragraph>
      </ProjectSlide>
    </>
  );
}

export default ProjectHero.apply;
