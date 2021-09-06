import Head from "next/head";

import Nav from "@components/Nav/Nav";
import Hero from "@components/Hero/Hero";
import Heading from "@components/Heading/Heading";
import Title from "@components/Meta/Title";

export default function PageNotFound() {
  return (
    <>
      <Title shortTitle="Page not found" />
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <Nav />

      <Hero>
        <Heading level="h1">Looks like you got lost.</Heading>
      </Hero>
    </>
  );
}
