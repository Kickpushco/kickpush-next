import { useMemo } from "react";
import clsx from "clsx";
import Link from "next/link";

import {
  computeTextColor,
  fetchArticle,
  fetchContentTypeSlugs,
  fetchCustomPage,
} from "services/contentful";
import { fetchFromCache } from "services/cache";

import { CloseButton } from "components/Button/CloseButton";
import { CardsWrapper } from "components/Card/Card";
import Description from "components/Meta/Description";
import Heading from "components/Heading/Heading";
import Hero from "components/Hero/Hero";
import Title from "components/Meta/Title";
import MetaImage, { computeMetaImageProps } from "components/Meta/MetaImage";
import PrivacyPolicy from "components/PrivacyPolicy/PrivacyPolicy";
import Paragraph from "components/Paragraph/Paragraph";
import ProjectSlide from "components/ProjectPage/ProjectSlide";
import ActionCardAbout, {
  computeActionCardAboutProps,
} from "components/ActionCard/ActionCardAbout";

import styles from "sass/pages/article.module.scss";
import Image, { computeImageProps } from "components/Image/Image";
import { joinStrings } from "utils/joinStrings";

export default function Article({ pageFields, globalSettings }) {
  const { metaImage, authors = [], title, backgroundColor, link } = pageFields;

  console.log(pageFields);

  const textColor = computeTextColor(pageFields.textColor);

  const intro = useMemo(() => {
    const { authors, date } = pageFields;
    if (!authors && !date) return "";

    let intro = "Written ";
    if (authors.length) {
      const authorsNames = joinStrings(authors.map((a) => a.fields.name));
      intro += `by ${authorsNames} `;
    }
    if (date) {
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(date));
      intro += `on ${formattedDate}`;
    }

    return intro;
  }, [pageFields]);

  return (
    <>
      <Title shortTitle={title} />
      <Description description={pageFields.metaDescription} />
      <MetaImage {...computeMetaImageProps(metaImage, globalSettings)} />

      <main className={styles.Main}>
        <div className={clsx(styles.Close)}>
          <Link href="/about" passHref>
            <CloseButton
              className={styles.CloseButton}
              aria-label="Back to about"
              variant="dark"
            />
          </Link>
        </div>

        <div
          className={clsx(styles.Layer, styles[`Layer-${textColor}`])}
          style={{
            backgroundColor,
            "--background-color": backgroundColor,
          }}
        >
          <Hero className={styles.Hero}>
            <Heading className={styles.HeroTitle} level="h1">
              {title}
            </Heading>
            {(intro || link) && (
              <div className={styles.HeroContent}>
                {!!authors.length && (
                  <div className={styles.HeroAvatars}>
                    {authors.map((author, authorIndex) => (
                      <Image
                        key={author.sys.id}
                        className={styles.HeroAvatar}
                        {...computeImageProps(author.fields.photo)}
                        width={140}
                        height={140}
                        objectFit="cover"
                        variant="ghost"
                        loading="priority"
                        style={{
                          zIndex: authors.length - authorIndex,
                        }}
                      />
                    ))}
                  </div>
                )}

                <div className={styles.HeroCopy}>
                  {intro && <Paragraph>{intro}</Paragraph>}
                  {link && (
                    <p>
                      Originally posted{" "}
                      <a href={link} target="_blank" rel="noreferrer">
                        here
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}
          </Hero>

          {/* CONTENT TO COME HERE */}
        </div>

        {/* <ProjectSlide className={styles.Footer} variant="light">
          <div className={clsx(styles.Container, "container")}>
            <CardsWrapper columns={false}>
              <ActionCardAbout
                {...computeActionCardAboutProps(globalSettings)}
              />
            </CardsWrapper>
          </div>

          <PrivacyPolicy className={styles.PrivacyPolicy} />
        </ProjectSlide> */}
      </main>

      <PrivacyPolicy />
    </>
  );
}

export async function getStaticProps({ params }) {
  const { articleId } = params;

  const pageFields = await fetchFromCache(
    `article-${articleId}`,
    async () => await fetchArticle(articleId),
    true
  );
  const { globalSettings } = await fetchFromCache(
    "page-about",
    async () => await fetchCustomPage("customPagePeople")
  );

  return {
    props: {
      pageFields,
      globalSettings,
    },
  };
}

export async function getStaticPaths() {
  const projects = await fetchFromCache(
    "global-article-slugs",
    async () => await fetchContentTypeSlugs("article")
  );

  const paths = projects.map((articleId) => ({
    params: {
      articleId,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
