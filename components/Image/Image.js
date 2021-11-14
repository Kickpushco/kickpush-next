import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";

import { computeImageUrl } from "services/contentful";

import { useAppContext } from "context/state";

import { loadImage } from "utils/image";

import styles from "./Image.module.scss";

export function computeImageContentType(image) {
  if (!image) return null;
  const { contentType } = image.fields.file;
  switch (contentType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/svg+xml":
      return "svg";
    default:
      process.env.NODE_ENV === "development" &&
        console.warn(`Unknown image contentType "${contentType}`);
      return null;
  }
}

export function computeImageProps(image, overrideWidth) {
  const { url } = image.fields.file;

  let { height, width } = image.fields.file.details.image;
  if (overrideWidth) {
    height = Math.ceil((overrideWidth / width) * height);
    width = overrideWidth;
  }

  const contentType = computeImageContentType(image);

  if (contentType === "svg") {
    const svgUrl = computeImageUrl(url, 100);
    return {
      srcSet: {
        legacy: svgUrl,
      },
      blurSrc: svgUrl,
      width,
      height,
    };
  }

  const legacy = computeImageUrl(url, 75);

  const srcSet = {
    legacy,
    avif: contentType === "jpg" && computeImageUrl(url, 85, "avif", width),
    webp: contentType === "png" && computeImageUrl(url, 85, "webp", width),
  };

  // WebP is very well supported so a good candidate for the blurSrc without
  // needing to wait for imageSupport checks to be made
  const blurSrc = computeImageUrl(url, 5, "webp", Math.round(width / 4));

  return {
    srcSet,
    blurSrc,
    height,
    width,
  };
}

export function ContentfulImage({ image, ...props }) {
  return <Image {...computeImageProps(image)} {...props} />;
}

function Image({
  className,
  srcSet = {},
  blurSrc,
  alt = "",
  variant = "regular", // "regular" | "ghost"
  objectFit, // null | "cover" | "contain"
  objectPosition = "center center", // "left top", "center top", "right top" etc…
  loading = "lazy", // "lazy" | "priority"
  style,
  ...props
}) {
  const { imageSupport } = useAppContext();
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
    skip: !blurSrc,
  });

  const [loaded, setLoaded] = useState(!blurSrc);

  const computedSrc = useMemo(() => {
    if (!imageSupport) return null;

    const { avif, webp, legacy } = srcSet;

    if (imageSupport === "avif") return avif || webp || legacy;
    if (imageSupport === "webp") return webp || legacy;
    if (imageSupport === "legacy") return legacy;
  }, [imageSupport, srcSet]);

  const readyToLoad = useMemo(
    () => inView || loading === "priority",
    [inView, loading]
  );

  useEffect(() => {
    if (!blurSrc || !computedSrc || !readyToLoad || loaded) return;

    async function asyncLoadImage() {
      await loadImage(computedSrc);
      setLoaded(true);
    }

    asyncLoadImage();
  }, [blurSrc, computedSrc, readyToLoad, loaded]);

  const imageProps = {
    ...props,
    style: {
      objectPosition: objectFit && objectPosition,
      ...(props.style || {}),
    },
  };

  return (
    <div
      className={clsx(
        className,
        styles.Image,
        objectFit && styles[`Image-${objectFit}`],
        styles[`Image-${variant}`],
        loaded && styles["Image-loaded"]
      )}
      style={style}
      ref={ref}
    >
      {/* TODO: Fix the styling here */}
      <noscript>
        <img
          src={srcSet.legacy}
          alt=""
          className={styles.NoScript}
          {...imageProps}
        />
      </noscript>

      <picture>
        {!blurSrc && (
          <>
            {srcSet.avif && <source srcSet={srcSet.avif} type="image/avif" />}
            {srcSet.webp && <source srcSet={srcSet.webp} type="image/webp" />}
            <img
              src={srcSet.legacy}
              alt={alt}
              loading={loading}
              {...imageProps}
            />
          </>
        )}
        {blurSrc && (
          <img src={loaded ? computedSrc : blurSrc} alt={alt} {...imageProps} />
        )}
      </picture>

      {blurSrc && variant !== "ghost" && <span className={styles.Blur} />}
    </div>
  );
}

export default Image;
