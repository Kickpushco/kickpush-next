import { fetchContact } from "@utils/contentful";
import { CONTACT_EMAIL } from "@utils/constants";

import Nav from "@components/Nav/Nav";
import Footer from "@components/Footer/Footer";
import Title from "@components/Meta/Title";
import LabelData from "@components/Meta/LabelData";

export default function Contact({ contact }) {
  return (
    <>
      <Title shortTitle="Contact" longTitle={contact.fields.heroTitle} />
      <LabelData number="1" label="Email" data={CONTACT_EMAIL} />

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
