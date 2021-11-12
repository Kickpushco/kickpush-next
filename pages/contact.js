import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import { ContentfulNav } from "components/Nav/Nav";
import { ContentfulFooter } from "components/Footer/Footer";
import Title from "components/Meta/Title";
import LabelData from "components/Meta/LabelData";
import Description from "components/Meta/Description";

export default function Contact({ pageFields, globalSettings }) {
  return (
    <>
      <Title
        shortTitle={pageFields.shortName}
        longTitle={globalSettings.footerTitle}
      />
      <Description description={pageFields.metaDescription} />
      <LabelData number="1" label="Email" data={globalSettings.contactEmail} />

      <ContentfulNav globalSettings={globalSettings} selected="contact" />

      <ContentfulFooter globalSettings={globalSettings} isHero tag="main" />
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
