import { Fragment } from "react";
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
import { fetchFromCache } from "services/cache";

import { CloseButton } from "components/Button/CloseButton";
import Description from "components/Meta/Description";
import LabelData from "components/Meta/LabelData";
import { ContentfulFooter } from "components/Footer/Footer";
import Title from "components/Meta/Title";
import { ContentfulProjectHero } from "components/ProjectPage/ProjectHero";
import { ContentfulProjectFooter } from "components/ProjectPage/ProjectFooter";
import { ContentfulProjectSlideItem } from "components/ProjectPage/ProjectSlideItem";
import ProjectSlide from "components/ProjectPage/ProjectSlide";
import ProjectSpacer from "components/ProjectPage/ProjectSpacer";
import { ContentfulMetaImage } from "components/Meta/MetaImage";

import IconClose from "assets/icons/20-close.svg";

import styles from "sass/pages/project.module.scss";

const PROJECT_CLOSE_URL = "/projects";

export default function Project({ pageFields, nextProject, globalSettings }) {
  const router = useRouter();

  const [footerTriggerRef, footerInView] = useInView({
    rootMargin: "0% 0% -50% 0%",
  });

  const {
    metaImage,
    clientName,
    color,
    year,
    heroTitle,
    heroCopy,
    slides = [],
  } = pageFields;

  const textColor = computeTextColor(pageFields.textColor);

  useEscKey(() => {
    router.push(PROJECT_CLOSE_URL);
  });

  const slidesLength = slides.length;
  const FOOTER_SLIDES_COUNT = 2;

  return (
    <>
      <Title shortTitle={clientName} longTitle={heroTitle} />
      <Description description={heroCopy} />
      <ContentfulMetaImage image={metaImage} globalSettings={globalSettings} />
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
            <CloseButton aria-label="Back to projects" variant="dark">
              <IconClose role="presentation" />
            </CloseButton>
          </Link>
        </div>

        <div className={styles.Layer}>
          <ContentfulProjectHero pageFields={pageFields} />

          <ProjectSpacer />

          {slides.map((slide, slideIndex) => (
            <Fragment key={slideIndex}>
              <ContentfulProjectSlideItem slide={slide} />
              <ProjectSpacer />
            </Fragment>
          ))}

          <ProjectSlide className={styles.ContactSlide}>
            <ContentfulFooter
              className={styles.Contact}
              globalSettings={globalSettings}
              tag="div"
            />
          </ProjectSlide>

          <span ref={footerTriggerRef} />
        </div>

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
  const { projectId } = params;

  const projectFields = await fetchFromCache(
    `project-${projectId}`,
    async () => await fetchProject(projectId)
    // true
  );
  const { pageFields, globalSettings } = await fetchFromCache(
    "customPageProject",
    async () => await fetchCustomPage("customPageProject", { include: 2 })
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
  const projects = await fetchFromCache(
    "projectIds",
    async () => await fetchProjectIds()
  );

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
