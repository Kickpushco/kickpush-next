import clsx from "clsx";

import { computeTextColor } from "services/contentful";

import ActionCard from "components/ActionCard/ActionCard";
import Button from "components/Button/Button";
import Paragraph from "components/Paragraph/Paragraph";
import Heading from "components/Heading/Heading";
import { computeImageProps } from "components/Image/Image";

import IconPlay from "assets/icons/18-play.svg";

import styles from "./Article.module.scss";

export function computeArticleProps({ fields, sys }) {
  const { title, type, location, backgroundColor, isVideo, date } = fields;

  const textColor = computeTextColor(fields.textColor);
  const backgroundImageProps =
    fields.backgroundImage && computeImageProps(fields.backgroundImage);

  return {
    title,
    id: sys.id,
    type,
    href: `/articles/temp`,
    location,
    backgroundColor,
    backgroundImageProps,
    isVideo,
    textColor,
    date,
  };
}

function Article({
  className,
  backgroundColor,
  textColor,
  title,
  type,
  href,
  location = "",
  date = "",
  isVideo,
  id,
  ...props
}) {
  return (
    <ActionCard
      animationId={`article-${id}`}
      className={clsx(className, styles.Card)}
      href={href}
      backgroundColor={backgroundColor}
      textColor={textColor}
      topChildren={
        <>
          {type && (
            <Paragraph level="label" tag="p">
              {type}
            </Paragraph>
          )}
          {(location || date) && (
            <Heading className={styles.Subtitle} tag="p" level="h5">
              <span>
                {location}
                {location && date && ", "}
              </span>
              <span>{date}</span>
            </Heading>
          )}
        </>
      }
      actionCta={`Read ${type}`}
      target="_blank"
      rel="noopener"
      {...props}
    >
      {isVideo && (
        <Button
          className={styles.Play}
          aria-hidden="true"
          tag="span"
          fauxHover
          iconOnly
          variant={textColor}
        >
          <IconPlay role="presentation" />
        </Button>
      )}

      <Heading
        className={styles.Title}
        level="h3"
        style={{ "--card-background": backgroundColor }}
      >
        <span>{title}</span>
      </Heading>
    </ActionCard>
  );
}

export default Article;
