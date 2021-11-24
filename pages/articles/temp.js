import { useMemo } from "react";
import clsx from "clsx";
import Link from "next/link";

import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import { CloseButton } from "components/Button/CloseButton";
import { CardsWrapper } from "components/Card/Card";
import Description from "components/Meta/Description";
import Heading from "components/Heading/Heading";
import Hero from "components/Hero/Hero";
import Title from "components/Meta/Title";
import MetaImage, { computeMetaImageProps } from "components/Meta/MetaImage";
import PrivacyPolicy from "components/PrivacyPolicy/PrivacyPolicy";
import ProjectSlide from "components/ProjectPage/ProjectSlide";
import ActionCardAbout, {
  computeActionCardAboutProps,
} from "components/ActionCard/ActionCardAbout";

import styles from "sass/pages/article.module.scss";

export default function About({ pageFields, globalSettings }) {
  const {
    metaImage,
    heroTitle,
    backgroundColor = "#fcddc1",
    author = "Sam Applebee",
    mediumUrl = "https://robsterlini.co.uk",
  } = pageFields;

  const textColor = "light";

  const formattedPublishedDate = useMemo(() => {
    const date = new Date(pageFields.publishDate || "01-01-2016");
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }, [pageFields.publishDate]);

  return (
    <>
      <Title shortTitle={pageFields.shortName} longTitle={heroTitle} />
      <Description description={pageFields.metaDescription} />
      <MetaImage {...computeMetaImageProps(metaImage, globalSettings)} />

      <main className={styles.Main}>
        <div className={clsx(styles.Close)}>
          <Link href={"/about"} passHref>
            <CloseButton
              className={styles.CloseButton}
              aria-label="Back to about"
              variant="dark"
            />
          </Link>
        </div>

        <div
          className={clsx(styles.Layer, styles[`Layer-${textColor}`])}
          style={{ backgroundColor }}
        >
          <Hero className={styles.Hero}>
            <Heading className={styles.HeroTitle} level="h1">
              {heroTitle}
            </Heading>
            <p>
              Written by {author} on {formattedPublishedDate}
            </p>
            {mediumUrl && (
              <p>
                Originally posted on{" "}
                <a href={mediumUrl} target="_blank" rel="noreferrer">
                  Medium
                </a>
              </p>
            )}
          </Hero>

          {/* CONTENT TO COME HERE */}
        </div>

        <ProjectSlide className={styles.Footer} variant="light">
          <div className={clsx(styles.Container, "container")}>
            <CardsWrapper columns={false}>
              <ActionCardAbout
                {...computeActionCardAboutProps(globalSettings)}
              />
            </CardsWrapper>
          </div>

          <PrivacyPolicy className={styles.PrivacyPolicy} />
        </ProjectSlide>
      </main>

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
