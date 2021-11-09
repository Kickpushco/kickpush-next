import Link from "next/link";
import clsx from "clsx";

import ActionCard from "./ActionCard";
import Heading from "components/Heading/Heading";
import { ContentfulImage } from "components/Image/Image";
import Paragraph from "components/Paragraph/Paragraph";

import styles from "./ActionCardAbout.module.scss";

export function ContentfulActionAboutCard({ globalSettings, ...props }) {
  return (
    <ActionAboutCard
      heading={globalSettings.aboutCardTitle}
      subtitle={globalSettings.aboutCardSubtitle}
      actionCta={globalSettings.aboutCardAction}
      photos={globalSettings.aboutCardPhotos.map((image, photoIndex) => (
        <ContentfulImage image={image} objectFit="cover" />
      ))}
      {...props}
    />
  );
}

function ActionAboutCard({
  className,
  heading,
  subtitle,
  actionCta = "Read more",
  photos,
  ...props
}) {
  console.log(photos);
  return (
    <Link href="/projects" passHref>
      <ActionCard
        className={clsx(className, styles.Card)}
        size="large"
        actionCta={actionCta}
        topChildren={
          <>
            <Heading className={styles.Title} level="h3" tag="p">
              {heading}
            </Heading>
            {subtitle && (
              <Paragraph level="label" className={styles.Subtitle}>
                {subtitle}
              </Paragraph>
            )}
          </>
        }
        {...props}
      >
        <div className={styles.Photos}>
          {photos.map((photo, photoIndex) => (
            <div className={styles.PhotosLayer} key={photoIndex}>
              {photo}
            </div>
          ))}
        </div>
      </ActionCard>
    </Link>
  );
}

export default ActionAboutCard;
