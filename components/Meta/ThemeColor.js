import Head from "next/head";

function ThemeColor({ color }) {
  return (
    <Head>
      <meta key="themeColor" name="theme-color" content={color} />
    </Head>
  );
}

export default ThemeColor;
