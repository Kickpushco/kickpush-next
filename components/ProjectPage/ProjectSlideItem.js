import { useMemo } from "react";
import clsx from "clsx";

import { computeObjectFit } from "services/contentful";

import { computeImageProps } from "components/Image/Image";
import ProjectSlide from "./ProjectSlide";

import styles from "./ProjectSlideItem.module.scss";

export function ContentfulProjectSlideItem({ slide, ...props }) {
  const { desktop, mobile } = useMemo(() => {
    const { desktopImage, desktopBackgroundColor, desktopImageSize } =
      slide.fields;

    const backgroundProps = desktopImage && {
      ...computeImageProps(desktopImage),
      objectFit: computeObjectFit(desktopImageSize),
    };

    const desktop = {
      backgroundColor: desktopBackgroundColor,
      backgroundProps,
    };
    const mobile = {};

    return {
      desktop,
      mobile,
    };
  }, [slide]);

  return <ProjectSlideItem desktop={desktop} mobile={mobile} {...props} />;
}

function ProjectSlideItem({
  className,
  desktop,
  mobile,
  style = {},
  children,
  ...props
}) {
  return (
    <ProjectSlide
      className={clsx(className, styles.Slide)}
      style={{
        "--desktop-background-color": desktop.backgroundColor,
        ...style,
      }}
      desktopBackgroundProps={desktop.backgroundProps}
      {...props}
    >
      {children}
    </ProjectSlide>
  );
}

export default ProjectSlideItem;
