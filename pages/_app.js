import Head from "next/head";

import { AppContextProvider } from "context/state";

import "../sass/pages/_app.scss";

function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default App;
