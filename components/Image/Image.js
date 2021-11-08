import clsx from "clsx";

import styles from "./Image.module.scss";

export function ContentfulImage({ image, quality = 85, ...props }) {
  const { details, url, contentType } = image.fields.file;

  const src = `https://${url}?q=${quality}`;
  const avifSrc = contentType !== "image/svg+xml" && `${src}&fm=avif`;

  return (
    <Image
      src={src}
      avifSrc={avifSrc}
      height={details.image.height}
      width={details.image.width}
      {...props}
    />
  );
}

function Image({
  className,
  src,
  avifSrc,
  webpSrc,
  alt = "",
  variant = "regular", // "regular" | "ghost"
  objectFit,
  style,
  ...props
}) {
  return (
    <picture
      className={clsx(
        className,
        styles.Image,
        objectFit && styles[`Image-${objectFit}`],
        styles[`Image-${variant}`]
      )}
      style={style}
    >
      {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img src={src} alt={alt} loading="lazy" {...props} />
    </picture>
  );
}

export default Image;
