import Link from "next/link";
import clsx from "clsx";

import ActionCard, { ActionCardLabel, ActionCardTitle } from "./ActionCard";
import Heading from "components/Heading/Heading";
import Image, { computeImageProps, isValidImage } from "components/Image/Image";

import styles from "./ActionCardAbout.module.scss";

export function computeActionCardAboutProps(globalSettings) {
  const photosProps = globalSettings.aboutCardPhotos
    .filter((image) => isValidImage(image))
    .map((image) => computeImageProps(image));

  return {
    heading: globalSettings.aboutCardTitle,
    subtitle: globalSettings.aboutCardSubtitle,
    actionCta: globalSettings.aboutCardAction,
    photosProps,
  };
}

function ActionCardAbout({
  className,
  heading,
  subtitle,
  actionCta = "Read more",
  photosProps,
  ...props
}) {
  return (
    <Link href="/about" passHref>
      <ActionCard
        className={clsx(className, styles.Card)}
        size="large"
        actionCta={actionCta}
        topChildren={
          <>
            <ActionCardTitle className={styles.Title}>
              {heading}
            </ActionCardTitle>
            {subtitle && <ActionCardLabel>{subtitle}</ActionCardLabel>}
          </>
        }
        {...props}
      >
        <div className={styles.Photos}>
          {photosProps.map((photoProps, photoIndex) => (
            <div className={styles.PhotosLayer} key={photoIndex}>
              <Image
                className={styles.Photo}
                {...photoProps}
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </ActionCard>
    </Link>
  );
}

export default ActionCardAbout;
