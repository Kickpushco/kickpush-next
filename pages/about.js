import clsx from "clsx";

import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import ActionCardProjects, {
  computeActionCardProjectsProps,
} from "components/ActionCard/ActionCardProjects";
import Article, { computeArticleProps } from "components/Article/Article";
import Card, { CardReveal, CardsWrapper } from "components/Card/Card";
import Description from "components/Meta/Description";
import Heading from "components/Heading/Heading";
import Hero, { HeroCopy } from "components/Hero/Hero";
import Image, { computeImageProps } from "components/Image/Image";
import Footer, { computeFooterProps } from "components/Footer/Footer";
import Nav, { computeNavProps } from "components/Nav/Nav";
import Manifesto from "components/Manifesto/Manifesto";
import Title from "components/Meta/Title";
import MetaImage, { computeMetaImageProps } from "components/Meta/MetaImage";
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
      <MetaImage {...computeMetaImageProps(metaImage, globalSettings)} />

      <Nav {...computeNavProps(globalSettings)} selected="about" />

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
            <CardReveal>
              <ActionCardProjects
                {...computeActionCardProjectsProps(globalSettings)}
              />
            </CardReveal>
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
                  <CardReveal key={articleIndex}>
                    <Article {...computeArticleProps(article)} />
                  </CardReveal>
                ))}
              </CardsWrapper>
            </>
          )}
        </div>
      </main>

      <Footer {...computeFooterProps(globalSettings)} />

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
