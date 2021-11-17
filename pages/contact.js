import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import { ContentfulNav } from "components/Nav/Nav";
import { ContentfulFooter } from "components/Footer/Footer";
import Title from "components/Meta/Title";
import LabelData from "components/Meta/LabelData";
import Description from "components/Meta/Description";
import { ContentfulMetaImage } from "components/Meta/MetaImage";
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
      <ContentfulMetaImage image={metaImage} globalSettings={globalSettings} />

      <ContentfulNav globalSettings={globalSettings} selected="contact" />

      <ContentfulFooter
        className={styles.Hero}
        globalSettings={globalSettings}
        tag="main"
        headingTag="h1"
      />

      <PrivacyPolicy />
    </>
  );
}

export async function getStaticProps() {
  const props = await fetchFromCache(
    "customPageContact",
    async () => await fetchCustomPage("customPageContact")
  );

  return {
    props,
  };
}
