import { useMemo } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

import useEscKey from "hooks/useEscKey";

import {
  computeTextColor,
  fetchArticle,
  fetchContentTypeSlugs,
  fetchCustomPage,
} from "services/contentful";
import { fetchFromCache } from "services/cache";

import { joinStrings } from "utils/joinStrings";

import { CloseButton } from "components/Button/CloseButton";
import Description from "components/Meta/Description";
import Heading from "components/Heading/Heading";
import Hero, { HeroTitle } from "components/Hero/Hero";
import Title from "components/Meta/Title";
import MetaImage, { computeMetaImageProps } from "components/Meta/MetaImage";
import PrivacyPolicy from "components/PrivacyPolicy/PrivacyPolicy";
import Paragraph from "components/Paragraph/Paragraph";
import Image, { computeImageProps } from "components/Image/Image";

import IconActionArrow from "assets/icons/21-action-arrow.svg";

import styles from "../../sass/pages/article.module.scss";

function ArticleHeading({ ...props }) {
  return <Heading className={styles.Heading} {...props} />;
}

export default function Article({ pageFields, globalSettings }) {
  const router = useRouter();

  const {
    slug,
    authors = [],
    title,
    date,
    originalPublisherName,
    backgroundColor,
    link,
    body,
  } = pageFields;
  const { metaImage, metaDescription } = body?.fields || {};

  const articleCloseUrl = `/about#${slug}`;

  const textColor = computeTextColor(pageFields.textColor);

  useEscKey(() => {
    router.push(articleCloseUrl);
  });

  const intro = useMemo(() => {
    const parts = [];

    if (authors.length) {
      parts.push(joinStrings(authors.map((a) => a.fields.name)));
    }

    if (date) {
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
      }).format(new Date(date));
      parts.push(formattedDate);
    }

    return parts.join(", ");
  }, [pageFields, pageFields, link]);

  const publisherName = useMemo(() => {
    if (!link) return null;
    return originalPublisherName || new URL(link).host;
  }, [link, originalPublisherName]);

  const richText = useMemo(() => {
    if (!body) return null;

    const nestedMarks = {
      [MARKS.BOLD]: (text) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text) => <em>{text}</em>,
    };
    const nestedBlocks = {
      [BLOCKS.HEADING_2]: (node, children) => (
        <ArticleHeading level="h3" tag="h2">
          {children}
        </ArticleHeading>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <ArticleHeading level="h4" tag="h3">
          {children}
        </ArticleHeading>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <ArticleHeading level="h5" tag="h4">
          {children}
        </ArticleHeading>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <Paragraph tag="ul" className={styles.List}>
          {children}
        </Paragraph>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <Paragraph tag="ol" className={styles.List}>
          {children}
        </Paragraph>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className={styles.Blockquote}>{children}</blockquote>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = node.data.target;
        const { file, description } = asset.fields;
        if (!file.contentType.startsWith("image/")) return null;

        return (
          <>
            <Image
              className={styles.Image}
              {...computeImageProps(asset)}
              variant="ghost"
            />
            {description && (
              <Paragraph className={styles.ImageCaption} level="medium">
                {description}
              </Paragraph>
            )}
          </>
        );
      },
    };

    const options = {
      renderMark: nestedMarks,
      renderNode: {
        ...nestedBlocks,
        [BLOCKS.PARAGRAPH]: (node, children) => (
          <Paragraph className={styles.Paragraph}>{children}</Paragraph>
        ),
        [BLOCKS.LIST_ITEM]: (node, children) => {
          const normalisedListChildren = documentToReactComponents(node, {
            renderMark: nestedMarks,
            renderNode: {
              ...nestedBlocks,
              [BLOCKS.PARAGRAPH]: (node, children) => children,
              [BLOCKS.LIST_ITEM]: (node, children) => (
                <li className={styles.ListItem}>{children}</li>
              ),
            },
          });
          return normalisedListChildren;
        },
      },
    };

    return documentToReactComponents(body.fields.body, options);
  }, [body]);

  function handleScrollFooter() {
    if (!matchMedia(`(min-width: ${styles.breakpointDesktop})`).matches) return;

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <>
      <Title shortTitle={title} />
      <Description description={metaDescription} />
      <MetaImage {...computeMetaImageProps(metaImage, globalSettings)} />

      <main className={styles.Main}>
        <div className={clsx(styles.Close)}>
          <Link href={articleCloseUrl} passHref>
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
          <Hero
            className={styles.Hero}
            containerClassName={styles.ArticleContainer}
            noNav
          >
            <HeroTitle className={styles.HeroTitle} isLarge={false}>
              {title}
            </HeroTitle>
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
                  {intro && (
                    <Paragraph className={styles.HeroIntro}>{intro}</Paragraph>
                  )}
                  {publisherName && (
                    <Paragraph className={styles.HeroPosted} level="medium">
                      Originally posted on{" "}
                      <a href={link} target="_blank" rel="noreferrer">
                        {publisherName}
                      </a>
                    </Paragraph>
                  )}
                </div>
              </div>
            )}
          </Hero>

          <div
            className={clsx("container", styles.ArticleContainer, styles.Body)}
          >
            {richText}
          </div>
        </div>

        <Link href={articleCloseUrl}>
          <a
            aria-label="Back to about"
            className={styles.Footer}
            onFocus={handleScrollFooter}
          >
            <Heading className={styles.FooterFauxLink} tag="span" level="h0">
              <IconActionArrow role="presentation" />
              Back
            </Heading>
          </a>
        </Link>
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
