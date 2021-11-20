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
    desktopImageSize = "Cover",
    desktopImagePosition = "Center Center",
    mobileImage,
    mobileImageFit = "Cover", // Note: Different to ImageSize from desktop
    mobileImagePosition = "Center Center",
  } = fields;

  let desktop, mobile;

  if (desktopImage) {
    desktop = {
      ...computeImageProps(desktopImage),
      objectFit: computeObjectFit(desktopImageSize || "Cover"),
      objectPosition: desktopImagePosition.toLowerCase(),
    };
  }

  if (mobileImage) {
    mobile = {
      ...computeImageProps(mobileImage),
      objectFit: computeObjectFit(mobileImageFit || "Cover"),
      objectPosition: mobileImagePosition.toLowerCase(),
    };
  }

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
  backgroundProps = {},
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

  const isUsingMobileSlide = isMobile && !!backgroundProps.mobile;
  const backgroundPropsComputed = isUsingMobileSlide
    ? backgroundProps.mobile
    : backgroundProps.desktop;

  if (!backgroundPropsComputed) return null;

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
