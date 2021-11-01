import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";

import { fetchContact, fetchCustomPage } from "@utils/contentful";

import Nav from "@components/Nav/Nav";
import Footer from "@components/Footer/Footer";
import Hero, { HeroCopy } from "@components/Hero/Hero";
import Button from "@components/Button/Button";
import Heading from "@components/Heading/Heading";
import Manifesto from "@components/Manifesto/Manifesto";
import Title from "@components/Meta/Title";
import Description from "@components/Meta/Description";

import styles from "../sass/pages/about.module.scss";

const MOBILE_PHOTO_GRID_MAX = 4;

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
  } = page.fields;

  const photosGrid = page.fields.photosGrid.map(({ sys, fields }) => {
    const { title, file, description } = fields;
    return {
      title,
      alt: description || "",
      src: `https:${file.url}`,
      id: sys.id,
    };
  });

  const handleShowMorePhotos = () => {
    setShowAllPhotos(true);
  };

  const showPhotosSection = photosTitle || photosGrid.length || photosOutro;

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
                  {photosGrid.map((photo) => (
                    <div className={styles.PhotosGridCell}>
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
                    </div>
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
