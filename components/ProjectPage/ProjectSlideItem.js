import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

import { computeObjectFit } from "services/contentful";

import Image, { computeImageProps } from "components/Image/Image";
import ProjectSlide from "./ProjectSlide";

import styles from "./ProjectSlideItem.module.scss";

export function computeProjectSlideItemProps({ fields }) {
  const {
    desktopBackgroundColor: backgroundColor,
    desktopImage,
    desktopImageSize,
    desktopImagePosition,
    mobileImage,
    mobileImageFit, // Note: Different to ImageSize from desktop
    mobileImagePosition,
  } = fields;

  if (!desktopImage && !mobileImage) return null;

  const desktop = {
    ...computeImageProps(desktopImage),
    objectFit: computeObjectFit(desktopImageSize || "Cover"),
    objectPosition: (desktopImagePosition || "Center Center").toLowerCase(),
  };

  const mobile = {
    ...computeImageProps(mobileImage || desktopImage, 2000),
    objectFit: desktop.objectFit,
    objectPosition: desktop.objectPosition,
  };

  if (mobileImageFit) mobile.objectFit = computeObjectFit(mobileImageFit);
  if (mobileImagePosition) mobile.objectPosition.toLowerCase();

  return {
    backgroundColor,
    backgroundProps: {
      desktop,
      mobile,
    },
  };
}

function ProjectSlideItem({
  className,
  backgroundProps,
  style = {},
  ...props
}) {
  const [isMobile, setIsMobile] = useState(null);
  useEffect(() => {
    const mediaQueryList = matchMedia(
      `(min-width: ${styles.breakpointMobileSlide})`
    );

    function handleMQLChange(e) {
      setIsMobile(!e.matches);
    }

    handleMQLChange(mediaQueryList);

    mediaQueryList.addListener(handleMQLChange);
    return () => {
      mediaQueryList.removeListener(handleMQLChange);
    };
  }, []);

  if (!backgroundProps) return null;

  const isUsingMobileSlide = isMobile && !!backgroundProps.mobile;
  const backgroundPropsComputed = isUsingMobileSlide
    ? backgroundProps.mobile
    : backgroundProps.desktop;

  const { height, width } = backgroundPropsComputed;
  const mobileAspectRatio =
    isUsingMobileSlide &&
    backgroundProps.mobile.objectFit === "contain" &&
    height / width;

  return (
    <ProjectSlide
      className={clsx(
        className,
        styles.Slide,
        mobileAspectRatio && styles["Slide-mobileContain"]
      )}
      style={{
        ...style,
        "--mobile-aspect-ratio": mobileAspectRatio,
      }}
      {...props}
    >
      <Image className={styles.Background} {...backgroundPropsComputed} />
    </ProjectSlide>
  );
}

export default ProjectSlideItem;
