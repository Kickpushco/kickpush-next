import Head from "next/head";

function Description({ description }) {
  if (!description) return null;

  return (
    <Head>
      <meta key="metaDescription" name="description" content={description} />
      <meta
        key="ogDescription"
        property="og:description"
        content={description}
      />
      <meta
        key="twitterDescription"
        property="twitter:description"
        content={description}
      />
    </Head>
  );
}

export default Description;
