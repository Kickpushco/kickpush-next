import Head from "next/head";

import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import Nav, { computeNavProps } from "components/Nav/Nav";
import Hero, { HeroTitle } from "components/Hero/Hero";
import Title from "components/Meta/Title";
import Description from "components/Meta/Description";
import MetaImage, { computeMetaImageProps } from "components/Meta/MetaImage";

import styles from "sass/pages/404.module.scss";

export default function PageNotFound({ pageFields, globalSettings }) {
  const { shortName, metaDescription, metaImage, heroTitle } = pageFields;
  return (
    <>
      <Title shortTitle={shortName} longTitle={heroTitle} />
      <Description description={metaDescription} />
      <MetaImage {...computeMetaImageProps(metaImage, globalSettings)} />
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <Nav {...computeNavProps(globalSettings)} />

      <Hero className={styles.Hero}>
        <HeroTitle>{heroTitle}</HeroTitle>
      </Hero>
    </>
  );
}

export async function getStaticProps() {
  const props = await fetchFromCache(
    "page-404",
    async () => await fetchCustomPage("customPage404", { include: 1 })
  );

  return {
    props,
  };
}
