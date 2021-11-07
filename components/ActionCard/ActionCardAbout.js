import Link from "next/link";
import clsx from "clsx";

import ActionCard from "./ActionCard";
import Heading from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";

// TODO: Reorder these
import workRow1 from "assets/images/work-row-1.png";
import workRow2 from "assets/images/work-row-2.png";

import styles from "./ActionCardAbout.module.scss";

export function ContentfulActionAboutCard({ globalSettings, ...props }) {
  const {
    aboutCardTitle,
    aboutCardSubtitle,
    aboutCardAction,
    aboutCardPhotos,
  } = globalSettings.fields;

  const photos = globalSettings.fields.aboutCardPhotos.map(
    ({ sys, fields }) => ({
      id: sys.id,
      src: `https:${fields.file.url}`,
    })
  );

  return (
    <ActionAboutCard
      heading={aboutCardTitle}
      subtitle={aboutCardSubtitle}
      actionCta={aboutCardAction}
      photos={photos}
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
  return (
    <Link href="/projects" passHref>
      <ActionCard
        className={clsx(className, styles.Card)}
        size="large"
        actionCta={actionCta}
        topChildren={
          <>
            <Heading className={styles.Heading} level="h3" tag="p">
              {heading}
            </Heading>
            <Paragraph level="label">2008–Present</Paragraph>
          </>
        }
        {...props}
      >
        <div className={styles.Photos}>
          {photos.map((photo, photoIndex) => (
            <div className={styles.PhotosCell}>
              <img
                className={styles.PhotosImage}
                key={photoIndex}
                src={photo.src}
                alt=""
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </ActionCard>
    </Link>
  );
}

export default ActionAboutCard;
