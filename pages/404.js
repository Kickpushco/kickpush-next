import Head from "next/head";

import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import { ContentfulNav } from "components/Nav/Nav";
import Hero from "components/Hero/Hero";
import Heading from "components/Heading/Heading";
import Title from "components/Meta/Title";
import Description from "components/Meta/Description";
import { ContentfulMetaImage } from "components/Meta/MetaImage";

import styles from "sass/pages/404.module.scss";

export default function PageNotFound({ pageFields, globalSettings }) {
  const { shortName, metaDescription, metaImage, heroTitle } = pageFields;
  return (
    <>
      <Title shortTitle={shortName} longTitle={heroTitle} />
      <Description description={metaDescription} />
      <ContentfulMetaImage image={metaImage} globalSettings={globalSettings} />
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <ContentfulNav globalSettings={globalSettings} />

      <Hero className={styles.Hero}>
        <Heading level="h1">{heroTitle}</Heading>
      </Hero>
    </>
  );
}

export async function getStaticProps() {
  const props = await fetchFromCache(
    "customPage404",
    async () => await fetchCustomPage("customPage404", { include: 1 })
  );

  return {
    props,
  };
}
