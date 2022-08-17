import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import { CardsWrapper } from "components/Card/Card";
import Nav, { computeNavProps } from "components/Nav/Nav";
import Footer, { computeFooterProps } from "components/Footer/Footer";
import Hero, { HeroTitle } from "components/Hero/Hero";
import ProjectCard, {
  computeProjectCardProps,
} from "components/ProjectCard/ProjectCard";
import Title from "components/Meta/Title";
import Description from "components/Meta/Description";
import MetaImage, { computeMetaImageProps } from "components/Meta/MetaImage";
import PrivacyPolicy from "components/PrivacyPolicy/PrivacyPolicy";

export default function Projects({ pageFields, globalSettings }) {
  const { metaDescription, metaImage, heroTitle, projectsList } = pageFields;

  return (
    <>
      <Title shortTitle={pageFields.shortName} longTitle={heroTitle} />
      <Description description={metaDescription} />
      <MetaImage {...computeMetaImageProps(metaImage, globalSettings)} />

      <Nav {...computeNavProps(globalSettings)} selected="projects" />

      <main>
        <Hero>
          <HeroTitle>{heroTitle}</HeroTitle>
        </Hero>

        <div className="container">
          <CardsWrapper>
            {projectsList.fields.projects.map((project) => (
              <ProjectCard
                key={project.sys.id}
                {...computeProjectCardProps(project, globalSettings)}
                id={project.fields.slug}
              />
            ))}
          </CardsWrapper>
        </div>
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
