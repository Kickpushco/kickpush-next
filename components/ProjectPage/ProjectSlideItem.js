import { useMemo } from "react";
import clsx from "clsx";

import { computeObjectFit } from "services/contentful";

import Image, { computeImageProps } from "components/Image/Image";
import ProjectSlide from "./ProjectSlide";

import styles from "./ProjectSlideItem.module.scss";

export function ContentfulProjectSlideItem({ slide, ...props }) {
  const backgroundProps = useMemo(() => {
    const { desktopImage, mobileImage } = slide.fields;

    let desktop, mobile;

    if (desktopImage) {
      const desktopObjectFit = computeObjectFit(
        slide.fields.desktopImageSize || "Cover"
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
      desktop,
      mobile,
    };
  }, [slide.fields]);

  return (
    <ProjectSlideItem
      backgroundColor={slide.fields.desktopBackgroundColor}
      backgroundProps={backgroundProps}
      {...props}
    />
  );
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
