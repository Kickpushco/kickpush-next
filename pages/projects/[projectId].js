import Link from "next/link";
import clsx from "clsx";

import {
  fetchProject,
  fetchProjects,
  fetchCustomPage,
} from "@utils/contentful";

import Heading from "@components/Heading/Heading";
import Paragraph from "@components/Paragraph/Paragraph";
import Description from "@components/Meta/Description";
import Title from "@components/Meta/Title";
import LabelData from "@components/Meta/LabelData";

import styles from "../../sass/pages/project.module.scss";
import {
  ProjectCard,
  projectCardTextColorMap,
} from "@components/ProjectCards/ProjectCards";

const footerStyles = {
  Light: styles["Footer-light"],
  Dark: styles["Footer-dark"],
};

export default function Project({ project, nextProject }) {
  const { clientName, year, designer, projectPage, platform } = project.fields;
  const { heroTitle, heroCopy, heroDeliverables } = projectPage.fields;

  const {
    clientName: nextClientName,
    cardColor: nextCardColor,
    cardTitle: nextCardTitle,
    cardTextColor: nextCardTextColor,
    year: nextYear,
  } = nextProject.fields;

  return (
    <>
      <Title shortTitle={clientName} longTitle={heroTitle} />
      <Description description={heroCopy} />
      <LabelData number="1" label="Client" data={clientName} />
      <LabelData number="2" label="Designed in" data={year} />

      <main>
        <Link href="/projects">
          <a className={styles.Close} aria-label="Back to projects">
            &times;
          </a>
        </Link>

        <ProjectHero
          title={heroTitle}
          copy={heroCopy}
          year={year}
          designer={designer}
          platform={platform}
          deliverables={heroDeliverables}
        />

        <section className={clsx(styles.Slide, styles.Contact)}>
          <div className="container">
            <Heading level="h2">Seen enough?</Heading>
            <Link href="/contact">
              <a>Let’s chat.</a>
            </Link>
          </div>
        </section>

        <section
          className={clsx(
            styles.Slide,
            styles.Footer,
            footerStyles[nextCardTextColor]
          )}
        >
          <div className="container">
            <Link href={`/projects/${nextProject.fields.slug}`} passHref>
              <ProjectCard
                className={styles.FooterCard}
                size="large"
                byline={nextClientName}
                year={nextYear}
                title={nextCardTitle}
                backgroundColor={nextCardColor}
                textColor={projectCardTextColorMap[nextCardTextColor]}
              />
            </Link>
          </div>
        </section>
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
  const projectsPage = await fetchCustomPage("customPageProjects", {
    include: 2,
  });

  const { projects } = projectsPage.fields.projectsList.fields;

  const currentProjectIndex = projects.findIndex((project) => {
    return project.fields.slug === params.projectId;
  });

  const nextProject = projects[currentProjectIndex + 1] || projects[0];

  return {
    props: {
      project,
      nextProject,
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

  return {
    paths,
    fallback: false,
  };
}
