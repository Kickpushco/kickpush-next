import clsx from "clsx";
import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import { ContentfulActionCardProjects } from "components/ActionCard/ActionCardProjects";
import { ContentfulActionAboutCard } from "components/ActionCard/ActionCardAbout";
import { CardsWrapper } from "components/Card/Card";
import { ContentfulNav } from "components/Nav/Nav";
import { ContentfulFooter } from "components/Footer/Footer";
import Hero, { HeroCopy } from "components/Hero/Hero";
import Heading from "components/Heading/Heading";
import Manifesto from "components/Manifesto/Manifesto";
import { ContentfulProjectCard } from "components/ProjectCard/ProjectCard";
import Title from "components/Meta/Title";
import Description from "components/Meta/Description";
import LabelData from "components/Meta/LabelData";

import styles from "../sass/pages/index.module.scss";

export default function Home({ pageFields, globalSettings }) {
  const {
    shortName,
    metaDescription,
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

      <ContentfulNav globalSettings={globalSettings} />

      <main>
        <Hero>
          <Heading level="h1">{heroTitle}</Heading>
          {heroCopy && <HeroCopy>{heroCopy}</HeroCopy>}
        </Hero>

        <section className={clsx("container", styles.Projects)}>
          {projectsTitle && (
            <Heading level="h0" tag="h2">
              {projectsTitle}
            </Heading>
          )}

          <CardsWrapper className={styles.ProjectsList}>
            {projectsList.fields.projects.map((project) => (
              <ContentfulProjectCard
                key={project.sys.id}
                project={project}
                globalSettings={globalSettings}
              />
            ))}
            <ContentfulActionCardProjects
              globalSettings={globalSettings}
              className={styles.AllProjects}
            />
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
            <ContentfulActionAboutCard globalSettings={globalSettings} />
          </CardsWrapper>
        </section>
      </main>

      <ContentfulFooter globalSettings={globalSettings} />
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
