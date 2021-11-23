import clsx from "clsx";
import { useInView } from "react-intersection-observer";

import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import ActionCardProjects, {
  computeActionCardProjectsProps,
} from "components/ActionCard/ActionCardProjects";
import Article, { computeArticleProps } from "components/Article/Article";
import Card, { CardReveal, CardsWrapper } from "components/Card/Card";
import Description from "components/Meta/Description";
import Heading from "components/Heading/Heading";
import Hero from "components/Hero/Hero";
import Image, { computeImageProps } from "components/Image/Image";
import Footer, { computeFooterProps } from "components/Footer/Footer";
import Nav, { computeNavProps } from "components/Nav/Nav";
import Manifesto from "components/Manifesto/Manifesto";
import Title from "components/Meta/Title";
import MetaImage, { computeMetaImageProps } from "components/Meta/MetaImage";
import PrivacyPolicy from "components/PrivacyPolicy/PrivacyPolicy";

import styles from "../sass/pages/about.module.scss";

export default function About({ pageFields, globalSettings }) {
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
  });

  const { metaImage, heroTitle, photosTitle, photosGrid, articlesItems } =
    pageFields;

  return (
    <>
      <Title shortTitle={pageFields.shortName} longTitle={heroTitle} />
      <Description description={pageFields.metaDescription} />
      <MetaImage {...computeMetaImageProps(metaImage, globalSettings)} />

      <Nav {...computeNavProps(globalSettings)} selected="about" />

      <main>
        <Hero>
          <Heading level="h1">{heroTitle}</Heading>
          {!!articlesItems.length && (
            <CardsWrapper columns={false}>
              {articlesItems.map((article, articleIndex) => (
                <CardReveal key={articleIndex}>
                  <Article {...computeArticleProps(article)} />
                </CardReveal>
              ))}
            </CardsWrapper>
          )}
        </Hero>

        <div
          ref={contentRef}
          className={clsx(
            "container",
            contentInView && styles["Content-inView"]
          )}
        >
          {photosTitle && (
            <Heading className={styles.LargeTitle} level="h0" tag="h2">
              {photosTitle}
            </Heading>
          )}

          {!!photosGrid.length && (
            <div className={styles.PhotosGrid}>
              {photosGrid.map((photo, photoIndex) => (
                <CardReveal className={styles.PhotosGridCell} key={photoIndex}>
                  <Card className={styles.PhotosGridCard}>
                    {photo.fields.title && (
                      <Heading
                        className={styles.PhotosGridYear}
                        level="h6"
                        tag="span"
                      >
                        {photo.fields.title}
                      </Heading>
                    )}
                    <Image objectFit="cover" {...computeImageProps(photo)} />
                  </Card>
                </CardReveal>
              ))}
            </div>
          )}

          {pageFields.manifestoItems.map(({ fields, sys }) => (
            <Manifesto
              key={sys.id}
              short={fields.shortText}
              long={fields.longText}
            />
          ))}

          <CardsWrapper columns={false}>
            <CardReveal>
              <ActionCardProjects
                {...computeActionCardProjectsProps(globalSettings)}
              />
            </CardReveal>
          </CardsWrapper>
        </div>
      </main>

      <Footer {...computeFooterProps(globalSettings)} />

      <PrivacyPolicy />
    </>
  );
}

export async function getStaticProps() {
  const props = await fetchFromCache(
    "page-about",
    async () => await fetchCustomPage("customPagePeople")
  );

  return {
    props,
  };
}
