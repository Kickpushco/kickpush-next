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

export default function Home({ page, contact }) {
  const { heroTitle, heroCopy, projectsList } = page.fields;

  return (
    <>
      <Title shortTitle="What we do" longTitle={heroTitle} />

      <Nav />

      <main>
        <Hero>
          <Heading level="h1">{heroTitle}</Heading>
          {heroCopy && <HeroCopy>{heroCopy}</HeroCopy>}
        </Hero>

        <section className={clsx("container", styles.Projects)}>
          <ProjectCards projectsList={projectsList} />
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
