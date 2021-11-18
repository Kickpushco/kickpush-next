import clsx from "clsx";
import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import ActionCardProjects, {
  computeActionCardProjectsProps,
} from "components/ActionCard/ActionCardProjects";
import ActionAboutCard, {
  computeActionAboutCardProps,
} from "components/ActionCard/ActionCardAbout";
import { CardReveal, CardsWrapper } from "components/Card/Card";
import Nav, { computeNavProps } from "components/Nav/Nav";
import Footer, { computeFooterProps } from "components/Footer/Footer";
import Hero, { HeroCopy } from "components/Hero/Hero";
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
  const {
    shortName,
    metaDescription,
    metaImage,
    heroTitle,
    projectsTitle,
    manifestoItems,
    heroCopy,
    projectsList,
  } = pageFields;

  return (
    <>
      <Title shortTitle={shortName} longTitle={heroTitle} />
      <Description description={metaDescription} />
      <LabelData number="1" label="Email" data={globalSettings.contactEmail} />
      <MetaImage {...computeMetaImageProps(metaImage, globalSettings)} />

      <Nav {...computeNavProps(globalSettings)} />

      <main>
        <Hero>
          <Heading level="h1">{heroTitle}</Heading>
          {heroCopy && (
            <HeroCopy className={styles.HeroCopy}>{heroCopy}</HeroCopy>
          )}
        </Hero>

        <section className={clsx("container", styles.Projects)}>
          {projectsTitle && (
            <Heading level="h0" tag="h2">
              {projectsTitle}
            </Heading>
          )}

          <CardsWrapper className={styles.ProjectsList}>
            {projectsList.fields.projects.map((project) => (
              <ProjectCard
                key={project.sys.id}
                {...computeProjectCardProps(project, globalSettings)}
              />
            ))}
            <CardReveal className={styles.AllProjects}>
              <ActionCardProjects
                {...computeActionCardProjectsProps(globalSettings)}
              />
            </CardReveal>
          </CardsWrapper>
        </section>

        {!!manifestoItems.length && (
          <section className={clsx("container", styles.Manifesto)}>
            {manifestoItems.map(({ sys, fields }) => (
              <Manifesto
                key={sys.id}
                short={fields.shortText}
                long={fields.longText}
              />
            ))}
          </section>
        )}

        <section className="container">
          <CardsWrapper columns={false}>
            <CardReveal>
              <ActionAboutCard
                {...computeActionAboutCardProps(globalSettings)}
              />
            </CardReveal>
          </CardsWrapper>
        </section>
      </main>

      <Footer {...computeFooterProps(globalSettings)} />

      <PrivacyPolicy />
    </>
  );
}

export async function getStaticProps() {
  const props = await fetchFromCache(
    "customPageHome",
    async () => await fetchCustomPage("customPageHome", { include: 2 })
  );

  return {
    props,
  };
}
