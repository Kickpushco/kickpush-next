import { fetchContact } from "utils/contentful";
import { CONTACT_EMAIL } from "utils/constants";

import Nav from "components/Nav/Nav";
import Footer from "components/Footer/Footer";
import Title from "components/Meta/Title";
import LabelData from "components/Meta/LabelData";
import Description from "components/Meta/Description";

export default function Contact({ page }) {
  const { metaDescription, shortName } = page;

  return (
    <>
      <Title shortTitle={shortName} longTitle={page.fields.heroTitle} />
      <Description description={metaDescription} />
      <LabelData number="1" label="Email" data={CONTACT_EMAIL} />

      <Nav />

      <Footer contact={page} />
    </>
  );
}

export async function getStaticProps() {
  const page = await fetchContact();

  return {
    props: {
      page,
    },
  };
}
