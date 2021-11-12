import Head from "next/head";

export function ContentfulMetaImage({ image, ...props }) {
  return <MetaImage url={`https:${image.fields.file.url}`} {...props} />;
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
