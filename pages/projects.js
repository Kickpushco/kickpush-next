import clsx from "clsx";

import { fetchContact, fetchCustomPage } from "utils/contentful";

import Nav from "components/Nav/Nav";
import Footer from "components/Footer/Footer";
import Hero, { HeroCopy } from "components/Hero/Hero";
import Heading from "components/Heading/Heading";
import Manifesto from "components/Manifesto/Manifesto";
import ContentfulProjectCard from "components/ProjectCard/ContentfulProjectCard";

import Title from "components/Meta/Title";
import Description from "components/Meta/Description";

import styles from "sass/pages/projects.module.scss";

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

        <section className={clsx("container", styles.Projects)}>
          {projectsList.fields.projects.map((project) => (
            <ContentfulProjectCard key={project.sys.slug} project={project} />
          ))}
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
