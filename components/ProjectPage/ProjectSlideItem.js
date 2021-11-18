import { useMemo } from "react";
import clsx from "clsx";

import { computeObjectFit } from "services/contentful";

import Image, { computeImageProps } from "components/Image/Image";
import ProjectSlide from "./ProjectSlide";

import styles from "./ProjectSlideItem.module.scss";

export function computeProjectSlideItemProps({ fields }) {
  const { desktopImage, mobileImage } = fields;

  let desktop, mobile;

  if (desktopImage) {
    const desktopObjectFit = computeObjectFit(
      fields.desktopImageSize || "Cover"
    );
    desktop = {
      ...computeImageProps(desktopImage),
      objectFit: desktopObjectFit,
    };

    if (!mobileImage) {
      mobile = {
        ...computeImageProps(desktopImage, 700),
        objectFit: desktopObjectFit,
      };
    }
  }

  return {
    backgroundColor: fields.desktopBackgroundColor,
    backgroundProps: {
      desktop,
      mobile,
    },
  };
}

function ProjectSlideItem({
  className,
  backgroundProps = {},
  children,
  ...props
}) {
  return (
    <ProjectSlide className={clsx(className, styles.Slide)} {...props}>
      {backgroundProps.desktop && (
        <Image
          className={clsx(styles.Background, styles["Background-desktop"])}
          {...backgroundProps.desktop}
        />
      )}
      {backgroundProps.mobile && (
        <Image
          className={clsx(styles.Background, styles["Background-mobile"])}
          {...backgroundProps.mobile}
        />
      )}
      {children}
    </ProjectSlide>
  );
}

export default ProjectSlideItem;
