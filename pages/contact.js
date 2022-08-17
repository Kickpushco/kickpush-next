import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import Nav, { computeNavProps } from "components/Nav/Nav";
import Footer, { computeFooterProps } from "components/Footer/Footer";
import Title from "components/Meta/Title";
import LabelData from "components/Meta/LabelData";
import Description from "components/Meta/Description";
import MetaImage, { computeMetaImageProps } from "components/Meta/MetaImage";
import PrivacyPolicy from "components/PrivacyPolicy/PrivacyPolicy";

import styles from "sass/pages/contact.module.scss";

export default function Contact({ pageFields, globalSettings }) {
  const { metaDescription, metaImage } = pageFields;
  return (
    <>
      <Title
        shortTitle={pageFields.shortName}
        longTitle={globalSettings.footerTitle}
      />
      <Description description={metaDescription} />
      <LabelData number="1" label="Email" data={globalSettings.contactEmail} />
      <MetaImage {...computeMetaImageProps(metaImage, globalSettings)} />

      <Nav {...computeNavProps(globalSettings)} selected="contact" />

      <Footer
        className={styles.Hero}
        {...computeFooterProps(globalSettings)}
        tag="main"
        headingTag="h1"
      />

      <PrivacyPolicy />
    </>
  );
}

export async function getStaticProps() {
  const props = await fetchFromCache(
    "page-contact",
    async () => await fetchCustomPage("customPageContact")
  );

  return {
    props,
  };
}
