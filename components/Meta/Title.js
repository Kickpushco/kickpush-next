import Head from "next/head";

function Title({ shortTitle, longTitle = shortTitle, prefix = true }) {
  if (!shortTitle) return null;

  return (
    <Head>
      <title key="title">
        {prefix && "Kickpush | "}
        {shortTitle}
      </title>
      <meta key="metaTitle" name="title" content={longTitle} />
      <meta key="ogTitle" property="og:title" content={longTitle} />
      <meta key="twitterTitle" property="twitter:title" content={longTitle} />
    </Head>
  );
}

export default Title;
