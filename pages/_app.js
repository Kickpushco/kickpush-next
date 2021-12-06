import { useEffect } from "react";
import Head from "next/head";

import { AppContextProvider, useAppContext } from "context/state";

import "sass/pages/_app.scss";
import styles from "sass/pages/_app.module.scss";

const PRELOAD_FONTS = [
  "kickpush-headings",
  "lineto-circular-bold",
  "lineto-circular-medium",
  "lineto-circular-book",
];
const FAVICON_SIZES = [16, 32, 96];
const APPLE_ICON_SIZES = [57, 60, 72, 76, 114, 120, 144, 152, 180, 192];
const ANDROID_ICON_SIZE = 192;

function BodyScrollObserver() {
  const { mobileOpen, cardTransitioning } = useAppContext();

  useEffect(() => {
    const blockScroll = mobileOpen || cardTransitioning;

    document.documentElement.style.overflow = blockScroll ? "hidden" : "auto";
  }, [mobileOpen, cardTransitioning]);

  return null;
}

function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <BodyScrollObserver />

      <Head>
        {FAVICON_SIZES.map((size) => (
          <link
            key={`favicon-${size}`}
            href={`/favicon-${size}.png`}
            rel="icon"
            sizes={`${size}x${size}`}
            type="image/png"
          />
        ))}
        {APPLE_ICON_SIZES.map((size) => (
          <link
            key={`apple-icon-${size}`}
            href={`/logo-${size}.png`}
            rel="apple-touch-icon"
            sizes={`${size}x${size}`}
          />
        ))}
        <link
          rel="icon"
          type="image/png"
          sizes={`${ANDROID_ICON_SIZE}x${ANDROID_ICON_SIZE}`}
          href={`/logo-${ANDROID_ICON_SIZE}.png`}
        />

        {PRELOAD_FONTS.map((font, fontIndex) => (
          <link
            key={`font-${fontIndex}`}
            rel="preload"
            href={`/fonts/${font}.woff2`}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}

        <meta name="msapplication-TileColor" content={styles.kickpushRed} />
        <meta name="msapplication-TileImage" content="/logo-144.png" />

        {/* TODO: Config */}
        <meta name="twitter:site" content="@kickpush" />
        <meta key="themeColor" name="theme-color" content={styles.themeColor} />
      </Head>

      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default App;
