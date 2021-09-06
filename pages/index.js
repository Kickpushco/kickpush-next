import clsx from "clsx";

import {
  fetchContact,
  fetchCustomPage,
  fetchProjects,
} from "@utils/contentful";

import Nav from "@components/Nav/Nav";
import Footer from "@components/Footer/Footer";
import Hero, { HeroCopy } from "@components/Hero/Hero";
import Heading from "@components/Heading/Heading";
import Manifesto from "@components/Manifesto/Manifesto";
import ProjectCards from "@components/ProjectCards/ProjectCards";

import styles from "../sass/pages/index.module.scss";
import Title from "@components/Meta/Title";

export default function Home({ page, projects, contact }) {
  const { heroTitle, projectsTitle, manifestoItems, heroCopy } = page.fields;

  return (
    <>
      <Title shortTitle="Product design studio" longTitle={heroTitle} />

      <Nav />

      <main>
        <Hero>
          <Heading level="h1">{heroTitle}</Heading>
          {heroCopy && <HeroCopy>{heroCopy}</HeroCopy>}
        </Hero>

        <section className={clsx("container", styles.Projects)}>
          {projectsTitle && (
            <Heading className={styles.ProjectsHeading} level="h0" tag="h2">
              {projectsTitle}
            </Heading>
          )}
          <ProjectCards projects={projects} />
        </section>

        {manifestoItems.length && (
          <section className={clsx("container", styles.Manifesto)}>
            {manifestoItems.map((item) => (
              <Manifesto
                className={styles.ManifestoItem}
                key={item.sys.id}
                short={item.fields.shortText}
                long={item.fields.longText}
              />
            ))}
          </section>
        )}
      </main>

      <Footer contact={contact} />

      <details className="container" open>
        <summary>Test Data</summary>
        <pre>{JSON.stringify(page, null, 2)}</pre>
      </details>
      <br />
    </>
  );
}

export async function getStaticProps() {
  const page = await fetchCustomPage("customPageHome");
  const projects = await fetchProjects();
  const contact = await fetchContact();

  return {
    props: {
      page,
      projects,
      contact,
    },
  };
}
