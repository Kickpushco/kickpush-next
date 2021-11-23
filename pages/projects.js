import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import { CardsWrapper } from "components/Card/Card";
import Nav, { computeNavProps } from "components/Nav/Nav";
import Footer, { computeFooterProps } from "components/Footer/Footer";
import Hero, { HeroCopy } from "components/Hero/Hero";
import Heading from "components/Heading/Heading";
import ProjectCard, {
  computeProjectCardProps,
} from "components/ProjectCard/ProjectCard";
import Title from "components/Meta/Title";
import Description from "components/Meta/Description";
import MetaImage, { computeMetaImageProps } from "components/Meta/MetaImage";
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
      <MetaImage {...computeMetaImageProps(metaImage, globalSettings)} />

      <Nav {...computeNavProps(globalSettings)} selected="projects" />

      <main>
        <Hero>
          <Heading level="h1">{heroTitle}</Heading>
          {heroCopy && <HeroCopy>{heroCopy}</HeroCopy>}
        </Hero>

        <section className="container">
          <CardsWrapper>
            {projectsList.fields.projects.map((project) => (
              <ProjectCard
                key={project.sys.id}
                {...computeProjectCardProps(project, globalSettings)}
              />
            ))}
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
    "page-projects",
    async () => await fetchCustomPage("customPageProjects", { include: 2 })
  );

  return {
    props,
  };
}
