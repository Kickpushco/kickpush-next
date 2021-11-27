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
    ...computeImageProps(desktopImage, 2000),
    objectFit: computeObjectFit(desktopImageSize || "Cover"),
    objectPosition: (desktopImagePosition || "Center Center").toLowerCase(),
  };

  const mobile = mobileImage
    ? computeImageProps(mobileImage, 1000)
    : computeImageProps(desktopImage, 1600);
  mobile.objectFit = mobileImageFit
    ? computeObjectFit(mobileImageFit)
    : desktop.objectFit;
  mobile.objectPosition = mobileImagePosition
    ? mobileImagePosition.toLowerCase()
    : desktop.objectPosition;

  const backgroundProps = {
    desktop,
    mobile,
  };

  return {
    backgroundColor,
    backgroundProps,
  };
}

function ProjectSlideItem({
  className,
  backgroundProps,
  style = {},
  backgroundLoading,
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
      <Image
        className={styles.Background}
        {...backgroundPropsComputed}
        variant="ghost"
        loading={backgroundLoading}
      />
    </ProjectSlide>
  );
}

export default ProjectSlideItem;
