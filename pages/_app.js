import Head from "next/head";

import { AppContextProvider } from "context/state";

import "../sass/pages/_app.scss";

const PRELOAD_FONTS = [
  "kickpush-headings",
  "lineto-circular-bold",
  "lineto-circular-medium",
];
const FAVICON_SIZES = [16, 32, 96];

function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Head>
        {FAVICON_SIZES.map((iconSize, iconSizeIndex) => (
          <link
            key={`icon-${iconSizeIndex}`}
            href={`/favicon-${iconSize}x${iconSize}.png`}
            rel="icon"
            type="image/png"
          />
        ))}
        {PRELOAD_FONTS.map((font, fontIndex) => (
          <link
            key={`font-${fontIndex}`}
            rel="preload"
            href={`/fonts/${font}.woff2`}
            as="font"
          />
        ))}
      </Head>

      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default App;
