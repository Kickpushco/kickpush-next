import clsx from "clsx";

import { fetchContact, fetchCustomPage } from "@utils/contentful";

import Nav from "@components/Nav/Nav";
import Footer from "@components/Footer/Footer";
import Hero, { HeroCopy } from "@components/Hero/Hero";
import Heading from "@components/Heading/Heading";
import Manifesto from "@components/Manifesto/Manifesto";
import Title from "@components/Meta/Title";
import Description from "@components/Meta/Description";

import styles from "../sass/pages/people.module.scss";

export default function People({ page, contact }) {
  const {
    shortName,
    metaDescription,
    heroTitle,
    heroCopy,
    photosTitle,
    photosOutro,
    manifestoItems,
  } = page.fields;

  const showPhotosSection = photosTitle || photosOutro;

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
              <Heading className={styles.PhotosHeading} level="h0" tag="h2">
                {photosTitle}
              </Heading>
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
