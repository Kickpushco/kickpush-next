import { fetchCustomPage } from "services/contentful";

import { CardsWrapper } from "components/Card/Card";
import { ContentfulNav } from "components/Nav/Nav";
import { ContentfulFooter } from "components/Footer/Footer";
import Hero, { HeroCopy } from "components/Hero/Hero";
import Heading from "components/Heading/Heading";
import { ContentfulProjectCard } from "components/ProjectCard/ProjectCard";
import Title from "components/Meta/Title";
import Description from "components/Meta/Description";

export default function Projects({ pageFields, globalSettings }) {
  const { shortName, metaDescription, heroTitle, heroCopy, projectsList } =
    pageFields;

  return (
    <>
      <Title shortTitle={shortName} longTitle={heroTitle} />
      <Description description={metaDescription} />

      <ContentfulNav globalSettings={globalSettings} />

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
    </>
  );
}

export async function getStaticProps() {
  const props = await fetchCustomPage("customPageProjects", { include: 2 });

  return {
    props,
  };
}
