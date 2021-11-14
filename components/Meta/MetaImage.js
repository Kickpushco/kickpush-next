import Head from "next/head";

export function ContentfulMetaImage({ image, globalSettings, ...props }) {
  if (!image && !globalSettings) return null;

  const { fields } = image || globalSettings.metaDefaultImage;
  const card = !image ? "summary_image" : undefined;
  return <MetaImage url={`https:${fields.file.url}`} card={card} {...props} />;
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