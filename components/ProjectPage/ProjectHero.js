import clsx from "clsx";

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
  return (
    <ProjectSlide className={clsx(className, styles.Hero)} {...props}>
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
      <dl className={clsx("container", styles.Footer)}>
        <FooterElement title="Designed in" value={year} />
        <FooterElement title="Designed by" value={designer} />
        <FooterElement title="Deliverables" value={deliverables} />
        <FooterElement title="Platform" value={platform} />
      </dl>
    </ProjectSlide>
  );
}

export default ProjectHero.apply;
