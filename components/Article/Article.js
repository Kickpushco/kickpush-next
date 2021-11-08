import clsx from "clsx";

import { computeTextColor } from "services/contentful";

import ActionCard from "components/ActionCard/ActionCard";
import Button from "components/Button/Button";
import Paragraph from "components/Paragraph/Paragraph";
import Heading from "components/Heading/Heading";
import { ContentfulImage } from "components/Image/Image";

import IconPlay from "assets/icons/18-play.svg";

import styles from "./Article.module.scss";

export function ContentfulArticle({ article, ...props }) {
  const { fields } = article;
  const { backgroundImage } = fields;

  return (
    <Article
      title={fields.title}
      type={fields.type}
      link={fields.link}
      location={fields.location}
      backgroundColor={fields.backgroundColor}
      backgroundImage={
        backgroundImage && <ContentfulImage image={backgroundImage} />
      }
      isVideo={fields.isVideo}
      textColor={computeTextColor(fields.textColor)}
      date={fields.date}
      {...props}
    />
  );
}

function Article({
  className,
  backgroundColor,
  textColor,
  title,
  type,
  link,
  location = "",
  date = "",
  isVideo,
  ...props
}) {
  return (
    <ActionCard
      className={clsx(className, styles.Article)}
      href={link}
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
      actionCta={`View ${type}`}
      {...props}
    >
      {isVideo && (
        <Button
          className={styles.Play}
          aria-hidden="true"
          tag="span"
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
