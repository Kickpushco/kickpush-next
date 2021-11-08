import { fetchCustomPage } from "services/contentful";

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

      <ContentfulNav globalSettings={globalSettings} />

      <ContentfulFooter globalSettings={globalSettings} isHero />
    </>
  );
}

export async function getStaticProps() {
  const props = await fetchCustomPage("customPageContact");

  return {
    props,
  };
}
