import Head from "next/head";

import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import Nav, { computeNavProps } from "components/Nav/Nav";
import Hero, { HeroTitle } from "components/Hero/Hero";
import Title from "components/Meta/Title";
import Description from "components/Meta/Description";
import MetaImage, { computeMetaImageProps } from "components/Meta/MetaImage";

import styles from "../sass/pages/404.module.scss";

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
      {/* There's no better way to handle global styles than this, and as it is
          only for this page, it feels safe to do. */}
      <style global jsx>{`
        html,
        body {
          background: #7520ff;
        }
      `}</style>

      <Nav {...computeNavProps(globalSettings)} is404 />

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
