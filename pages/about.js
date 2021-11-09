import { useState } from "react";
import clsx from "clsx";

import { fetchCustomPage } from "services/contentful";

import { ContentfulActionCardProjects } from "components/ActionCard/ActionCardProjects";
import Button from "components/Button/Button";
import Card, { CardsWrapper } from "components/Card/Card";
import Description from "components/Meta/Description";
import Heading from "components/Heading/Heading";
import Hero, { HeroCopy } from "components/Hero/Hero";
import { ContentfulImage } from "components/Image/Image";
import { ContentfulFooter } from "components/Footer/Footer";
import { ContentfulNav } from "components/Nav/Nav";
import Manifesto from "components/Manifesto/Manifesto";
import Title from "components/Meta/Title";

import styles from "../sass/pages/about.module.scss";
import { ContentfulArticle } from "components/Article/Article";

export default function About({ pageFields, globalSettings }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const {
    shortName,
    metaDescription,
    heroTitle,
    heroCopy,
    photosTitle,
    photosGrid,
    manifestoItems,
    articlesTitle,
    articlesItems,
  } = pageFields;

  const handleShowMorePhotos = () => {
    setShowAllPhotos(true);
  };

  return (
    <>
      <Title shortTitle={shortName} longTitle={heroTitle} />
      <Description description={metaDescription} />

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

            <div
              className={clsx(
                styles.PhotosGrid,
                showAllPhotos && styles["PhotosGridCell-show"]
              )}
            >
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
            {!showAllPhotos && (
              <Button
                className={styles.PhotosGridShowMore}
                onClick={handleShowMorePhotos}
                block
              >
                Load more
              </Button>
            )}
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
          <ContentfulActionCardProjects globalSettings={globalSettings} />

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
    </>
  );
}

export async function getStaticProps() {
  const props = await fetchCustomPage("customPagePeople");

  return {
    props,
  };
}
