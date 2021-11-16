import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import { CardsWrapper } from "components/Card/Card";
import { ContentfulNav } from "components/Nav/Nav";
import { ContentfulFooter } from "components/Footer/Footer";
import Hero, { HeroCopy } from "components/Hero/Hero";
import Heading from "components/Heading/Heading";
import { ContentfulProjectCard } from "components/ProjectCard/ProjectCard";
import Title from "components/Meta/Title";
import Description from "components/Meta/Description";
import { ContentfulMetaImage } from "components/Meta/MetaImage";
import PrivacyPolicy from "components/PrivacyPolicy/PrivacyPolicy";

export default function Projects({ pageFields, globalSettings }) {
  const {
    shortName,
    metaDescription,
    metaImage,
    heroTitle,
    heroCopy,
    projectsList,
  } = pageFields;

  return (
    <>
      <Title shortTitle={shortName} longTitle={heroTitle} />
      <Description description={metaDescription} />
      <ContentfulMetaImage image={metaImage} globalSettings={globalSettings} />

      <ContentfulNav globalSettings={globalSettings} selected="projects" />

      <main>
        <Hero>
          <Heading level="h1">{heroTitle}</Heading>
          {heroCopy && <HeroCopy>{heroCopy}</HeroCopy>}
        </Hero>

        <section className="container">
          <CardsWrapper className={"container"}>
            {projectsList.fields.projects.map((project) => (
              <ContentfulProjectCard
                key={project.sys.id}
                project={project}
                globalSettings={globalSettings}
              />
            ))}
          </CardsWrapper>
        </section>
      </main>

      <ContentfulFooter globalSettings={globalSettings} />

      <PrivacyPolicy />
    </>
  );
}

export async function getStaticProps() {
  const props = await fetchFromCache(
    "customPageProjects",
    async () => await fetchCustomPage("customPageProjects", { include: 2 })
  );

  return {
    props,
  };
}
