import Head from "next/head";
import { isValidImage } from "components/Image/Image";

export function computeMetaImageProps(image, globalSettings) {
  let _image;

  if (isValidImage(image)) {
    _image = image;
  } else if (isValidImage(globalSettings?.metaDefaultImage)) {
    _image = globalSettings.metaDefaultImage;
  }

  const url = _image?.fields?.file?.url;

  if (!url) return {};

  return {
    url: `https:${url}`,
    card: isValidImage(image) ? "summary_image" : undefined,
  };
}

function MetaImage({ url, card = "summary_large_image" }) {
  if (!url) return null;

  return (
    <Head>
      <meta key="twitterImage" name="twitter:image" content={url} />
      <meta key="ogImage" name="og:image" content={url} />

      <meta key="twitterCard" name="twitter:card" content={card} />
    </Head>
  );
}

export default MetaImage;
