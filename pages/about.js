import clsx from "clsx";
import { useInView } from "react-intersection-observer";

import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import ArticleCard, {
  computeArticleCardProps,
} from "components/ArticleCard/ArticleCard";
import Card, { CardReveal, CardsWrapper } from "components/Card/Card";
import Description from "components/Meta/Description";
import Heading from "components/Heading/Heading";
import Hero, { HeroTitle } from "components/Hero/Hero";
import Image, { computeImageProps } from "components/Image/Image";
import Footer, { computeFooterProps } from "components/Footer/Footer";
import Nav, { computeNavProps } from "components/Nav/Nav";
import Title from "components/Meta/Title";
import MetaImage, { computeMetaImageProps } from "components/Meta/MetaImage";
import PrivacyPolicy from "components/PrivacyPolicy/PrivacyPolicy";

import styles from "sass/pages/about.module.scss";

export default function About({ pageFields, globalSettings }) {
  const [vrRef, vrInView] = useInView({ triggerOnce: true });
  const [movingRef, movingInView] = useInView({ triggerOnce: true });
  const [photosRef, photosInView] = useInView({ triggerOnce: true });

  const {
    metaImage,
    heroTitle,
    heroArticle,
    vrTitle,
    vrArticle,
    movingTitle,
    movingArticle,
    photosTitle,
    photosGrid,
  } = pageFields;

  const heroArticleProps = heroArticle && computeArticleCardProps(heroArticle);
  const vrArticleProps = vrArticle && computeArticleCardProps(vrArticle);
  const movingArticleProps =
    movingArticle && computeArticleCardProps(movingArticle);

  return (
    <>
      <Title shortTitle={pageFields.shortName} longTitle={heroTitle} />
      <Description description={pageFields.metaDescription} />
      <MetaImage {...computeMetaImageProps(metaImage, globalSettings)} />

      <Nav {...computeNavProps(globalSettings)} selected="about" />

      <main>
        <Hero id={heroArticleProps?.id}>
          <HeroTitle>{heroTitle}</HeroTitle>
          {heroArticleProps && (
            <CardsWrapper className={styles.HeroCardWrapper} columns={false}>
              <ArticleCard
                {...heroArticleProps}
                displayDate={pageFields.heroArticleDate}
                actionCta={pageFields.heroArticleCta}
              />
            </CardsWrapper>
          )}
        </Hero>

        <div className="container">
          <div
            ref={vrRef}
            className={clsx(
              styles.Section,
              vrInView && styles["Section-inView"]
            )}
            id={vrArticleProps?.id}
          >
            {vrTitle && (
              <Heading className={styles.LargeTitle} level="h0" tag="h2">
                {vrTitle}
              </Heading>
            )}

            {vrArticleProps && (
              <CardsWrapper columns={false}>
                <ArticleCard
                  {...vrArticleProps}
                  displayDate={pageFields.vrArticleDate}
                  actionCta={pageFields.vrArticleCta}
                />
              </CardsWrapper>
            )}
          </div>

          <div
            ref={movingRef}
            className={clsx(
              styles.Section,
              movingInView && styles["Section-inView"]
            )}
            id={movingArticleProps?.id}
          >
            {movingTitle && (
              <Heading className={styles.LargeTitle} level="h0" tag="h2">
                {movingTitle}
              </Heading>
            )}

            {movingArticleProps && (
              <CardsWrapper columns={false}>
                <ArticleCard
                  {...movingArticleProps}
                  displayDate={pageFields.movingArticleDate}
                  actionCta={pageFields.movingArticleCta}
                />
              </CardsWrapper>
            )}
          </div>

          <div
            ref={photosRef}
            className={clsx(photosInView && styles["Section-inView"])}
            id="photos"
          >
            {photosTitle && (
              <Heading className={styles.LargeTitle} level="h0" tag="h2">
                {photosTitle}
              </Heading>
            )}

            {!!photosGrid.length && (
              <div className={styles.PhotosGrid}>
                {photosGrid.map((photo, photoIndex) => (
                  <CardReveal
                    className={styles.PhotosGridCell}
                    key={photoIndex}
                  >
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
          </div>
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
    async () => await fetchCustomPage("customPagePeople"),
    true
  );

  return {
    props,
  };
}
