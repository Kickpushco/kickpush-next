import clsx from "clsx";
import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";
import { useInView } from "react-intersection-observer";

import ActionCardProjects, {
  computeActionCardProjectsProps,
} from "components/ActionCard/ActionCardProjects";
import ActionCardAbout, {
  computeActionCardAboutProps,
} from "components/ActionCard/ActionCardAbout";
import { CardReveal, CardsWrapper } from "components/Card/Card";
import Nav, { computeNavProps } from "components/Nav/Nav";
import Footer, { computeFooterProps } from "components/Footer/Footer";
import Hero, { HeroCopy, HeroTitle } from "components/Hero/Hero";
import Heading from "components/Heading/Heading";
import Manifesto from "components/Manifesto/Manifesto";
import ProjectCard, {
  computeProjectCardProps,
} from "components/ProjectCard/ProjectCard";
import Title from "components/Meta/Title";
import Description from "components/Meta/Description";
import LabelData from "components/Meta/LabelData";
import MetaImage, { computeMetaImageProps } from "components/Meta/MetaImage";
import PrivacyPolicy from "components/PrivacyPolicy/PrivacyPolicy";

import styles from "../sass/pages/index.module.scss";

export default function Home({ pageFields, globalSettings }) {
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
  });

  const {
    metaImage,
    heroTitle,
    projectsTitle,
    heroCopy,
    projectsList,
    storyTitle,
  } = pageFields;

  return (
    <>
      <Title shortTitle={pageFields.shortName} longTitle={heroTitle} />
      <Description description={pageFields.metaDescription} />
      <LabelData number="1" label="Email" data={globalSettings.contactEmail} />
      <MetaImage {...computeMetaImageProps(metaImage, globalSettings)} />

      <Nav {...computeNavProps(globalSettings)} />

      <main>
        <Hero className={styles.Hero}>
          <HeroTitle>{heroTitle}</HeroTitle>
          {heroCopy && (
            <HeroCopy className={styles.HeroCopy}>{heroCopy}</HeroCopy>
          )}
        </Hero>

        <div
          ref={contentRef}
          className={clsx(
            "container",
            styles.Content,
            contentInView && styles["Content-inView"]
          )}
        >
          {projectsTitle && (
            <Heading className={styles.LargeTitle} level="h0" tag="h2">
              {projectsTitle}
            </Heading>
          )}

          <CardsWrapper className={styles.ProjectsList}>
            {(projectsList.fields.projects || []).map((project) => (
              <ProjectCard
                key={project.sys.id}
                {...computeProjectCardProps(project, globalSettings)}
              />
            ))}
            <ActionCardProjects
              wrapperClassName={styles.ActionCardProjects}
              {...computeActionCardProjectsProps(globalSettings)}
            />
          </CardsWrapper>

          {storyTitle && (
            <Heading className={styles.LargeTitle} level="h0" tag="h2">
              {storyTitle}
            </Heading>
          )}

          <CardsWrapper columns={false}>
            <CardReveal>
              <ActionCardAbout
                {...computeActionCardAboutProps(globalSettings)}
              />
            </CardReveal>
          </CardsWrapper>

          {pageFields.manifestoItems.map(({ sys, fields }) => (
            <Manifesto key={sys.id} long={fields.longText} />
          ))}
        </div>
      </main>

      <Footer {...computeFooterProps(globalSettings)} />

      <PrivacyPolicy />
    </>
  );
}

export async function getStaticProps() {
  const props = await fetchFromCache(
    "page-home",
    async () => await fetchCustomPage("customPageHome", { include: 2 }),
    true
  );

  return {
    props,
  };
}
