import Head from "next/head";

import { fetchContact } from "@utils/contentful";

import Nav from "@components/Nav/Nav";
import Footer from "@components/Footer/Footer";

export default function Contact({ contact }) {
  return (
    <>
      <Head>
        <title>Kickpush | Contact</title>
      </Head>

      <Nav />

      <Footer contact={contact} />
    </>
  );
}

export async function getStaticProps() {
  const contact = await fetchContact();

  return {
    props: {
      contact,
    },
  };
}
