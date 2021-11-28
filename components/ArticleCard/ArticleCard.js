import clsx from "clsx";

import { computeTextColor } from "services/contentful";

import ActionCard from "components/ActionCard/ActionCard";
import Heading from "components/Heading/Heading";
import { computeImageProps } from "components/Image/Image";

import styles from "./ArticleCard.module.scss";

export function computeArticleCardProps({ fields, sys }) {
  const { title, slug, backgroundColor, backgroundImage } = fields;

  const textColor = computeTextColor(fields.textColor);
  const backgroundImageProps =
    backgroundImage && computeImageProps(backgroundImage);

  return {
    title,
    id: sys.id,
    href: `/articles/${slug}`,
    backgroundColor,
    backgroundImageProps,
    textColor,
  };
}

function ArticleCard({
  className,
  backgroundColor,
  textColor,
  title,
  href,
  displayDate = "",
  id,
  actionCta = "Read Article",
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
        <Heading tag="p" level="h5">
          {displayDate}
        </Heading>
      }
      actionCta={actionCta}
      {...props}
    >
      <Heading
        className={styles.Title}
        level="h4"
        tag="h3"
        style={{
          "--card-background": backgroundColor,
        }}
      >
        <span>{title}</span>
      </Heading>
    </ActionCard>
  );
}

export default ArticleCard;
