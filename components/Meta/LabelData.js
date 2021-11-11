import Head from "next/head";

function LabelData({ number = 1, label, data }) {
  if (!label || !data) return null;

  return (
    <Head>
      <meta
        key={`twitterLabel${number}`}
        property={`twitter:label${number}`}
        content={label}
      />
      <meta
        key={`twitterData${number}`}
        property={`twitter:data${number}`}
        content={data}
      />
    </Head>
  );
}

export default LabelData;
