import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";

import useEscKey from "hooks/useEscKey";

import {
  computeTextColor,
  fetchCustomPage,
  fetchProject,
  fetchProjectIds,
} from "services/contentful";

import Button from "components/Button/Button";
import Description from "components/Meta/Description";
import LabelData from "components/Meta/LabelData";
import { ContentfulFooter } from "components/Footer/Footer";
import Title from "components/Meta/Title";
import { ContentfulProjectHero } from "components/ProjectPage/ProjectHero";
import { ContentfulProjectCover } from "components/ProjectPage/ProjectCover";
import { ContentfulProjectFooter } from "components/ProjectPage/ProjectFooter";
import ProjectSlide from "components/ProjectPage/ProjectSlide";

import IconClose from "assets/icons/20-close.svg";

import styles from "sass/pages/project.module.scss";

const PROJECT_CLOSE_URL = "/projects";

export default function Project({ pageFields, nextProject, globalSettings }) {
  const router = useRouter();

  const [footerTriggerRef, footerInView] = useInView({
    rootMargin: "0% 0% -50% 0%",
  });

  const { clientName, color, year, heroTitle, heroCopy } = pageFields;

  const textColor = computeTextColor(pageFields.textColor);

  useEscKey(() => {
    router.push(PROJECT_CLOSE_URL);
  });

  // Temporary example slides
  const TEMP_SLIDES = [
    {
      backgroundColor: "dark",
    },
    {
      backgroundColor: "light",
    },
  ];

  const slidesLength = TEMP_SLIDES.length;
  const FOOTER_SLIDES_COUNT = 2;

  return (
    <>
      <Title shortTitle={clientName} longTitle={heroTitle} />
      <Description description={heroCopy} />
      <LabelData number="1" label="Client" data={clientName} />
      <LabelData number="2" label="Designed in" data={year} />

      <main
        className={clsx(styles.Main, styles[`Main-${textColor}`])}
        style={{
          "--project-background-color": color,
        }}
      >
        <div
          className={clsx(styles.Close, footerInView && styles["Close-hidden"])}
        >
          <Link href={PROJECT_CLOSE_URL} passHref>
            <Button
              aria-label="Back to projects"
              variant={textColor}
              size="small"
              iconOnly
            >
              <IconClose role="presentation" />
            </Button>
          </Link>
        </div>

        <ContentfulProjectCover
          pageFields={pageFields}
          index={slidesLength + 4}
        />

        <ContentfulProjectHero
          pageFields={pageFields}
          index={slidesLength + 3}
        />

        {TEMP_SLIDES.map((slide, slideIndex) => (
          <ProjectSlide
            key={slideIndex}
            backgroundColor={slide.backgroundColor}
            index={slidesLength - slideIndex + FOOTER_SLIDES_COUNT}
          >
            <div style={{ margin: "auto" }}>Example slide</div>
          </ProjectSlide>
        ))}

        <ProjectSlide index={2}>
          <ContentfulFooter
            className={styles.Contact}
            globalSettings={globalSettings}
            tag="div"
          />
        </ProjectSlide>

        <span className={styles.Trigger} ref={footerTriggerRef} />

        <ContentfulProjectFooter
          globalSettings={globalSettings}
          nextProject={nextProject}
          index={1}
        />
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const projectFields = await fetchProject(params.projectId);
  const { pageFields, globalSettings } = await fetchCustomPage(
    "customPageProject",
    { include: 2 }
  );

  const { projects } = pageFields.projectsList.fields;

  const currentProjectIndex = projects.findIndex((project) => {
    return project.fields.slug === params.projectId;
  });
  const nextProject = projects[currentProjectIndex + 1] || projects[0];

  return {
    props: {
      pageFields: {
        ...pageFields,
        ...projectFields,
      },
      nextProject,
      globalSettings,
    },
  };
}

export async function getStaticPaths() {
  const projects = await fetchProjectIds();

  const paths = projects.map((projectId) => ({
    params: {
      projectId,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
