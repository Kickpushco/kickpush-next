import clsx from "clsx";

import { computeTextColor } from "services/contentful";

import ActionCard, { ActionCardTitle } from "components/ActionCard/ActionCard";
import Heading from "components/Heading/Heading";
import { computeImageProps } from "components/Image/Image";

import styles from "./ArticleCard.module.scss";

export function computeArticleCardProps({ fields }) {
  const { title, slug, backgroundColor, backgroundImage } = fields;

  const textColor = computeTextColor(fields.textColor);
  const backgroundImageProps =
    backgroundImage && computeImageProps(backgroundImage);

  return {
    title,
    id: slug,
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
      style={{
        "--card-background": backgroundColor,
      }}
      {...props}
    >
      <ActionCardTitle className={styles.Title}>
        <span>{title}</span>
      </ActionCardTitle>
    </ActionCard>
  );
}

export default ArticleCard;
