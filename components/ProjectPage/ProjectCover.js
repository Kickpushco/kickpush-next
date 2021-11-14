import clsx from "clsx";
import Head from "next/head";

import { computeImagePosition } from "services/contentful";

import Image, {
  computeImageContentType,
  computeImageProps,
} from "components/Image/Image";
import ProjectSlideItem from "./ProjectSlideItem";

import styles from "./ProjectCover.module.scss";

export function ContentfulProjectCover({ pageFields, ...props }) {
  const {
    heroDesktopBackground,
    heroDesktopLogo,
    heroDesktopLogoWidth,
    heroDesktopLogoPosition = "Center Center",
  } = pageFields;

  const desktop = {};
  const mobile = {};

  let desktopLogo = null;
  let mobileLogo = null;

  let desktopPreloadHref = null;

  if (heroDesktopBackground) {
    desktop.backgroundProps = {
      ...computeImageProps(heroDesktopBackground),
      objectFit: "cover", // TODO: Make cover adjustable
    };
  }

  if (heroDesktopLogo) {
    desktopLogo = {
      props: computeImageProps(heroDesktopLogo, heroDesktopLogoWidth),
      position: heroDesktopLogoPosition,
      width: heroDesktopLogoWidth,
    };
    if (computeImageContentType(heroDesktopLogo) === "svg") {
      desktopPreloadHref = desktopLogo.props.srcSet.legacy;
      desktopLogo.props.blurSrc = undefined;
    }
  }

  console.log(desktopPreloadHref);

  return (
    <>
      {desktopPreloadHref && (
        <Head>
          <link
            rel="preload"
            href={desktopPreloadHref}
            as="image"
            crossOrigin
          />
        </Head>
      )}

      <ProjectCover
        desktop={desktop}
        mobile={mobile}
        desktopLogo={desktopLogo}
        mobileLogo={mobileLogo}
        {...props}
      />
    </>
  );
}

function ProjectCover({ className, desktopLogo, mobileLogo, ...props }) {
  const [desktopLogoY, desktopLogoX] = computeImagePosition(
    desktopLogo?.position
  );
  return (
    <ProjectSlideItem className={clsx(className, styles.Slide)} {...props}>
      {desktopLogo && (
        <Image
          className={clsx(
            styles.Logo,
            styles["Logo-desktop"],
            desktopLogoX && styles[`Logo-${desktopLogoX}X`],
            desktopLogoY && styles[`Logo-${desktopLogoY}Y`]
          )}
          variant="ghost"
          alt="Project logo" // TODO: Make Project dynamic
          style={{
            "--logo-width": desktopLogo.width,
          }}
          {...desktopLogo.props}
        />
      )}
      {desktopLogoX}
    </ProjectSlideItem>
  );
}

export default ProjectCover;
