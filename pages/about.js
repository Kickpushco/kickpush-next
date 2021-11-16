import { useState } from "react";
import clsx from "clsx";

import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import { ContentfulActionCardProjects } from "components/ActionCard/ActionCardProjects";
import { ContentfulArticle } from "components/Article/Article";
import Card, { CardsWrapper } from "components/Card/Card";
import Description from "components/Meta/Description";
import Heading from "components/Heading/Heading";
import Hero, { HeroCopy } from "components/Hero/Hero";
import { ContentfulImage } from "components/Image/Image";
import { ContentfulFooter } from "components/Footer/Footer";
import { ContentfulNav } from "components/Nav/Nav";
import Manifesto from "components/Manifesto/Manifesto";
import Title from "components/Meta/Title";
import { ContentfulMetaImage } from "components/Meta/MetaImage";
import PrivacyPolicy from "components/PrivacyPolicy/PrivacyPolicy";

import styles from "../sass/pages/about.module.scss";

export default function About({ pageFields, globalSettings }) {
  const {
    shortName,
    metaDescription,
    metaImage,
    heroTitle,
    heroCopy,
    photosTitle,
    photosGrid,
    manifestoItems,
    articlesTitle,
    articlesItems,
  } = pageFields;

  return (
    <>
      <Title shortTitle={shortName} longTitle={heroTitle} />
      <Description description={metaDescription} />
      <ContentfulMetaImage image={metaImage} globalSettings={globalSettings} />

      <ContentfulNav globalSettings={globalSettings} selected="about" />

      <main>
        <Hero>
          <Heading level="h1">{heroTitle}</Heading>
          {heroCopy && <HeroCopy>{heroCopy}</HeroCopy>}
        </Hero>

        {!!photosGrid.length && (
          <section className={clsx("container", styles.Photos)}>
            {photosTitle && (
              <Heading level="h0" tag="h2">
                {photosTitle}
              </Heading>
            )}

            <div className={styles.PhotosGrid}>
              {photosGrid.map((photo, photoIndex) => (
                <Card className={styles.PhotosGridCell} key={photoIndex}>
                  {photo.fields.title && (
                    <Heading level="h6" tag="span">
                      {photo.fields.title}
                    </Heading>
                  )}
                  <ContentfulImage image={photo} objectFit="cover" />
                </Card>
              ))}
            </div>
          </section>
        )}

        {!!manifestoItems.length && (
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

        <div className="container">
          <CardsWrapper columns={false}>
            <ContentfulActionCardProjects globalSettings={globalSettings} />
          </CardsWrapper>

          {!!articlesItems.length && (
            <>
              {articlesTitle && (
                <Heading className={styles.ArticlesTitle} level="h1" tag="h2">
                  {articlesTitle}
                </Heading>
              )}

              <CardsWrapper columns={false}>
                {articlesItems.map((article, articleIndex) => (
                  <ContentfulArticle key={articleIndex} article={article} />
                ))}
              </CardsWrapper>
            </>
          )}
        </div>
      </main>

      <ContentfulFooter globalSettings={globalSettings} />

      <PrivacyPolicy />
    </>
  );
}

export async function getStaticProps() {
  const props = await fetchFromCache(
    "customPagePeople",
    async () => await fetchCustomPage("customPagePeople")
  );

  return {
    props,
  };
}
