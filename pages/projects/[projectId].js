import { Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";

import useEscKey from "hooks/useEscKey";

import { useAppContext } from "context/state";

import {
  computeTextColor,
  fetchContentTypeSlugs,
  fetchCustomPage,
  fetchProject,
} from "services/contentful";
import { fetchFromCache } from "services/cache";

import { CloseButton } from "components/Button/CloseButton";
import Description from "components/Meta/Description";
import LabelData from "components/Meta/LabelData";
import ThemeColor from "components/Meta/ThemeColor";
import Footer, { computeFooterProps } from "components/Footer/Footer";
import Title from "components/Meta/Title";
import ProjectHero from "components/ProjectPage/ProjectHero";
import ProjectSlideItem, {
  computeProjectSlideItemProps,
} from "components/ProjectPage/ProjectSlideItem";
import ProjectSlide from "components/ProjectPage/ProjectSlide";
import ProjectSpacer from "components/ProjectPage/ProjectSpacer";
import MetaImage, { computeMetaImageProps } from "components/Meta/MetaImage";
import PrivacyPolicy from "components/PrivacyPolicy/PrivacyPolicy";
import ProjectCard, {
  computeProjectCardProps,
} from "components/ProjectCard/ProjectCard";
import { CardsWrapper } from "components/Card/Card";

import styles from "sass/pages/project.module.scss";

export default function Project({ pageFields, nextProject, globalSettings }) {
  const router = useRouter();

  const { cardTransitioning } = useAppContext();

  const [footerTriggerRef, footerInView] = useInView({
    rootMargin: "100% 0% -50% 0%",
  });

  const {
    slug,
    metaImage,
    clientName,
    year,
    heroTitle,
    heroCopy,
    slides = [],
  } = pageFields;

  const projectCloseUrl = `/projects#${slug}`;

  const backgroundColor = pageFields.cardColor;
  const textColor = computeTextColor(pageFields.cardTextColor);

  const nextProjectProps = computeProjectCardProps(nextProject, globalSettings);
  const nextProjectVariant = computeTextColor(
    nextProject.fields.cardTextColor,
    true
  );

  useEscKey(() => {
    router.push(projectCloseUrl);
  });

  function handleScrollFooter() {
    if (!matchMedia(`(min-width: ${styles.breakpointDesktop})`).matches) return;

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <>
      <Title shortTitle={clientName} longTitle={heroTitle} />
      <Description description={heroCopy} />
      <MetaImage {...computeMetaImageProps(metaImage, globalSettings)} />
      <LabelData number="1" label="Client" data={clientName} />
      <LabelData number="2" label="Designed in" data={year} />
      <ThemeColor color={styles.kickpushBlack} />

      <main className={styles.Main}>
        <Link href={projectCloseUrl} passHref>
          <CloseButton
            className={clsx(
              styles.Close,
              (footerInView || cardTransitioning) && styles["Close-hidden"]
            )}
            aria-label="Back to projects"
            variant="dark"
          />
        </Link>

        <div
          className={styles.Layer}
          key={`layer-${slug}`}
          style={{ backgroundColor }}
        >
          <ProjectHero
            variant={textColor}
            title={pageFields.heroTitle}
            copy={pageFields.heroCopy}
            backgroundColor={backgroundColor}
          />

          <ProjectSpacer />

          {slides.map((slide, slideIndex) => (
            <Fragment key={slideIndex}>
              <ProjectSlideItem
                backgroundLoading={slideIndex < 4 ? "priority" : undefined}
                {...computeProjectSlideItemProps(slide)}
              />
              <ProjectSpacer />
            </Fragment>
          ))}

          <ProjectSlide
            className={styles.ContactSlide}
            variant={textColor}
            backgroundColor={backgroundColor}
          >
            <Footer
              className={styles.Contact}
              {...computeFooterProps(globalSettings)}
              tag="div"
            />
          </ProjectSlide>

          <ProjectSpacer className={styles.FooterSpacer} />

          <span ref={footerTriggerRef} />
        </div>

        <ProjectSlide
          className={styles.Footer}
          key={`footer-${slug}`}
          variant={nextProjectVariant}
        >
          <div className={clsx(styles.Container, "container")}>
            <CardsWrapper columns={false}>
              <ProjectCard
                size="large"
                {...nextProjectProps}
                onClick={handleScrollFooter}
                onFocus={handleScrollFooter}
              />
            </CardsWrapper>
          </div>

          <PrivacyPolicy className={styles.PrivacyPolicy} />
        </ProjectSlide>
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
    "page-project",
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
    "global-project-slugs",
    async () => await fetchContentTypeSlugs("project"),
    true
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
