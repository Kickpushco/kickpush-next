import { fetchContact, fetchCustomPage } from "utils/contentful";

import { CardsWrapper } from "components/Card/Card";
import Nav from "components/Nav/Nav";
import Footer from "components/Footer/Footer";
import Hero, { HeroCopy } from "components/Hero/Hero";
import Heading from "components/Heading/Heading";
import ContentfulProjectCard from "components/ProjectCard/ContentfulProjectCard";

import Title from "components/Meta/Title";
import Description from "components/Meta/Description";

export default function Home({ page, contact }) {
  const { metaDescription, heroTitle, heroCopy, projectsList } = page.fields;

  return (
    <>
      <Title shortTitle="What we do" longTitle={heroTitle} />
      <Description description={metaDescription} />

      <Nav />

      <main>
        <Hero>
          <Heading level="h1">{heroTitle}</Heading>
          {heroCopy && <HeroCopy>{heroCopy}</HeroCopy>}
        </Hero>

        <section className="container">
          <CardsWrapper className={"container"}>
            {projectsList.fields.projects.map((project) => (
              <ContentfulProjectCard key={project.sys.id} project={project} />
            ))}
          </CardsWrapper>
        </section>
      </main>

      <Footer contact={contact} />
    </>
  );
}

export async function getStaticProps() {
  const page = await fetchCustomPage("customPageProjects", { include: 2 });
  const contact = await fetchContact();

  return {
    props: {
      page,
      contact,
    },
  };
}
