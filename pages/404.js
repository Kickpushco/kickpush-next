import Head from "next/head";

import { fetchCustomPage } from "services/contentful";

import { ContentfulNav } from "components/Nav/Nav";
import Hero from "components/Hero/Hero";
import Heading from "components/Heading/Heading";
import Title from "components/Meta/Title";

import styles from "sass/pages/404.module.scss";

export default function PageNotFound({ globalSettings }) {
  return (
    <>
      {/* TODO: Add to CMS */}
      <Title shortTitle="Page not found" />
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <ContentfulNav globalSettings={globalSettings} />

      <Hero className={styles.Hero}>
        {/* TODO: Add to CMS */}
        <Heading level="h1">Looks like you got lost.</Heading>
      </Hero>
    </>
  );
}

export async function getStaticProps() {
  const props = await fetchCustomPage("customPageHome", { include: 1 });

  return {
    props,
  };
}
