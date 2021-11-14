import { fetchCustomPage } from "services/contentful";
import { fetchFromCache } from "services/cache";

import { ContentfulNav } from "components/Nav/Nav";
import { ContentfulFooter } from "components/Footer/Footer";
import Title from "components/Meta/Title";
import LabelData from "components/Meta/LabelData";
import Description from "components/Meta/Description";
import { ContentfulMetaImage } from "components/Meta/MetaImage";

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
