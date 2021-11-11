import Head from "next/head";

import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import { ContentfulNav } from "components/Nav/Nav";
import Hero from "components/Hero/Hero";
import Heading from "components/Heading/Heading";
import Title from "components/Meta/Title";
import { ContentfulMetaImage } from "components/Meta/MetaImage";

import styles from "sass/pages/404.module.scss";

export default function PageNotFound({ globalSettings }) {
  return (
    <>
      {/* TODO: Add to CMS */}
      <Title shortTitle="Page not found" />
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <ContentfulMetaImage
        image={globalSettings.metaDefaultImage}
        card="summary"
      />

      <ContentfulNav globalSettings={globalSettings} />

      <Hero className={styles.Hero}>
        {/* TODO: Add to CMS */}
        <Heading level="h1">Looks like you got lost.</Heading>
      </Hero>
    </>
  );
}

export async function getStaticProps() {
  const props = await fetchFromCache(
    "customPageHome",
    async () => await fetchCustomPage("customPageHome", { include: 1 })
  );

  return {
    props,
  };
}
