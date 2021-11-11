import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";

import { useAppContext } from "context/state";

import { loadImage } from "utils/image";

import styles from "./Image.module.scss";

function computeContentfulImageUrl(src, quality, format, width) {
  let url = `https:${src}?q=${quality}`;
  if (format) url += `&fm=${format}`;
  if (width) url += `&w=${width}`;
  return url;
}

export function ContentfulImage({ image, ...props }) {
  const { url, contentType } = image.fields.file;
  const { height, width } = image.fields.file.details.image;

  const isJpeg = contentType === "image/jpeg";
  const isPng = contentType === "image/png";

  const srcSet = {
    legacy: computeContentfulImageUrl(url, 75),
    avif: isJpeg && computeContentfulImageUrl(url, 85, "avif", width),
    webp: isPng && computeContentfulImageUrl(url, 85, "webp", width),
  };

  // WebP is very well supported so a good candidate for the blurSrc without
  // needing to wait for imageSupport checks to be made
  const blurSrc = computeContentfulImageUrl(url, 5, "webp", width / 4);

  return (
    <Image
      srcSet={srcSet}
      blurSrc={blurSrc}
      height={height}
      width={width}
      {...props}
    />
  );
}

function Image({
  className,
  srcSet,
  blurSrc,
  alt = "",
  variant = "regular", // "regular" | "ghost"
  objectFit,
  style,
  loading = "lazy", // "lazy" | "priority"
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
      {/* TODO: Check this works */}
      <noscript>
        <img
          src={srcSet.legacy}
          alt=""
          className={styles.NoScript}
          {...props}
        />
      </noscript>

      <picture>
        {!blurSrc && (
          <>
            {srcSet.avif && <source srcSet={srcSet.avif} type="image/avif" />}
            {srcSet.webp && <source srcSet={srcSet.webp} type="image/webp" />}
            <img src={srcSet.legacy} alt={alt} loading={loading} {...props} />
          </>
        )}
        {blurSrc && (
          <img src={loaded ? computedSrc : blurSrc} alt={alt} {...props} />
        )}
      </picture>

      {blurSrc && variant !== "ghost" && <span className={styles.Blur} />}
    </div>
  );
}

export default Image;
