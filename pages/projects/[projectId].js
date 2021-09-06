import clsx from "clsx";

import { fetchProject, fetchProjects } from "@utils/contentful";

import styles from "../../sass/pages/project.module.scss";
import Heading from "@components/Heading/Heading";
import Paragraph from "@components/Paragraph/Paragraph";
import Description from "@components/Meta/Description";
import Title from "@components/Meta/Title";
import LabelData from "@components/Meta/LabelData";

export default function Project({ project }) {
  const { clientName, year, designer, projectPage, platform } = project.fields;
  const { heroTitle, heroCopy, heroDeliverables } = projectPage.fields;

  return (
    <>
      <Title shortTitle={clientName} longTitle={heroTitle} />
      <Description description={heroCopy} />
      <LabelData number="1" label="Client" data={clientName} />
      <LabelData number="2" label="Designed in" data={year} />

      <main>
        <ProjectHero
          title={heroTitle}
          copy={heroCopy}
          year={year}
          designer={designer}
          platform={platform}
          deliverables={heroDeliverables}
        />
      </main>
    </>
  );
}

function ProjectHero({ title, copy, year, designer, deliverables, platform }) {
  return (
    <section className={clsx(styles.Slide, styles.Hero)}>
      <div className={clsx("container", styles.HeroContent)}>
        <Heading level="h1">{title}</Heading>
        {copy && (
          <Paragraph className={styles.HeroCopy} level="huge">
            {copy}
          </Paragraph>
        )}
      </div>
      <dl className={clsx("container", styles.HeroFooter)}>
        {year && (
          <div>
            <dt>Designed in</dt>
            <dd>{year}</dd>
          </div>
        )}
        {designer && (
          <div>
            <dt>Designed by</dt>
            <dd>{designer}</dd>
          </div>
        )}
        {deliverables && (
          <div>
            <dt>Deliverables</dt>
            <dd>{deliverables}</dd>
          </div>
        )}
        {platform && (
          <div>
            <dt>Platform</dt>
            <dd>{platform}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}

export async function getStaticProps({ params }) {
  const project = await fetchProject(params.projectId);

  return {
    props: {
      project,
    },
  };
}

export async function getStaticPaths() {
  const projects = await fetchProjects();

  const paths = projects.map((project) => {
    const { slug } = project.fields;
    return {
      params: {
        projectId: slug,
      },
    };
  });

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
}
