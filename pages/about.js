import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";

import { fetchContact, fetchCustomPage } from "utils/contentful";

import AllProjectsCard from "components/Card/AllProjectsCard";
import Button from "components/Button/Button";
import Card from "components/Card/Card";
import Description from "components/Meta/Description";
import Heading from "components/Heading/Heading";
import Hero, { HeroCopy } from "components/Hero/Hero";
import Footer from "components/Footer/Footer";
import Nav from "components/Nav/Nav";
import Manifesto from "components/Manifesto/Manifesto";
import Paragraph from "components/Paragraph/Paragraph";
import Title from "components/Meta/Title";

import styles from "../sass/pages/about.module.scss";

export default function People({ page, contact }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const {
    shortName,
    metaDescription,
    heroTitle,
    heroCopy,
    photosTitle,
    photosOutro,
    manifestoItems,
    articlesTitle,
  } = page.fields;

  const photosGrid = page.fields.photosGrid.map(({ sys, fields }) => {
    const { title, file, description } = fields;
    return {
      id: sys.id,
      title,
      alt: description || "",
      src: `https:${file.url}`,
    };
  });

  const articlesItems = page.fields.articlesItems?.map(({ sys, fields }) => {
    const { title, link, type } = fields;
    return {
      id: sys.id,
      title,
      link,
      type,
    };
  });

  const handleShowMorePhotos = () => {
    setShowAllPhotos(true);
  };

  const showPhotosSection = photosTitle || photosGrid.length || photosOutro;
  const showArticlesSection = articlesTitle || articlesItems?.length;

  return (
    <>
      <Title shortTitle={shortName} longTitle={heroTitle} />
      <Description description={metaDescription} />

      <Nav />

      <main>
        <Hero>
          <Heading level="h1">{heroTitle}</Heading>
          {heroCopy && <HeroCopy>{heroCopy}</HeroCopy>}
        </Hero>

        {showPhotosSection && (
          <section className={clsx("container", styles.Photos)}>
            {photosTitle && (
              <Heading level="h0" tag="h2">
                {photosTitle}
              </Heading>
            )}
            {photosGrid.length && (
              <>
                <div
                  className={clsx(
                    styles.PhotosGrid,
                    showAllPhotos && styles["PhotosGridCell-show"]
                  )}
                >
                  {photosGrid.map((photo, photoIndex) => (
                    <Card className={styles.PhotosGridCell} key={photoIndex}>
                      {photo.title && (
                        <Heading level="h6" tag="span">
                          {photo.title}
                        </Heading>
                      )}
                      <Image
                        className={styles.PhotosGridImage}
                        key={photo.id}
                        src=""
                        alt={photo.alt}
                        src={photo.src}
                        objectFit="cover"
                        layout="fill"
                      />
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
              </>
            )}
            {photosOutro && (
              <Heading className={styles.PhotosOutro} level="h1" tag="p">
                {photosOutro}
              </Heading>
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
          <AllProjectsCard />

          {showArticlesSection && (
            <>
              {articlesTitle && (
                <Heading className={styles.ArticlesTitle} level="h1" tag="h2">
                  {articlesTitle}
                </Heading>
              )}

              {articlesItems?.map((article) => (
                <Card
                  className={styles.ArticlesCard}
                  href={article.link}
                  key={article.id}
                >
                  {article.type && (
                    <Paragraph level="label" tag="p">
                      {article.type}
                    </Paragraph>
                  )}
                  <Heading tag="p" level="h5">
                    The British Museum, November 2016
                  </Heading>

                  <Heading className={styles.ArticlesCardTitle} level="h3">
                    Beyond Reality: Reinventing VR workflows.
                  </Heading>
                </Card>
              ))}

              <Card
                className={clsx(
                  styles.ArticlesCard,
                  styles["ArticlesCard--growing"]
                )}
                href="https://google.com"
              >
                <Paragraph level="label" tag="p">
                  Article
                </Paragraph>
                <Heading tag="p" level="h5">
                  London, April 2016
                </Heading>

                <Heading className={styles.ArticlesCardTitle} level="h3">
                  Growing pains: The first year of Kickpush.
                </Heading>
              </Card>
            </>
          )}
        </div>
      </main>

      <Footer contact={contact} />
    </>
  );
}

export async function getStaticProps() {
  const page = await fetchCustomPage("customPagePeople");
  const contact = await fetchContact();

  return {
    props: {
      page,
      contact,
    },
  };
}
