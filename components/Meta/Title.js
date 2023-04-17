import Head from "next/head";

function Title({ shortTitle, longTitle = shortTitle, prefix = true }) {
  if (!shortTitle) return null;

  const title = prefix ? `Kickpush | ${shortTitle}` : shortTitle;

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="metaTitle" name="title" content={longTitle} />
      <meta key="ogTitle" property="og:title" content={longTitle} />
      <meta key="twitterTitle" property="twitter:title" content={longTitle} />
    </Head>
  );
}

export default Title;
