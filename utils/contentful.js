const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const locale = "en-US";

const client = require("contentful").createClient({
  space,
  accessToken,
});

export async function fetchEntries() {
  const entries = await client.getEntries();

  if (entries.items) return entries.items;

  throw new Error(`Error getting Entries.`);
}

export async function fetchPage({ slug, contentType }) {
  const query = {
    limit: 1,
    include: 10,
    locale,
    content_type: contentType,
    "fields.slug": slug,
  };

  const entries = await client.getEntries(query);
  if (entries.items) return entries.items[0];

  throw new Error(`Error getting Entry for ${slug} (${contentType})`);
}
