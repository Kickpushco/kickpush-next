const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = require("contentful").createClient({
  space: space,
  accessToken: accessToken,
});

export async function fetchEntries() {
  const entries = await client.getEntries();
  if (entries.items) return entries.items;
  console.log(`Error getting Entries for ${contentType.name}.`);
}

export async function fetchPage({ slug, contentType }) {
  const query = {
    limit: 1,
    include: 10,
    locale: "en-US",
    "fields.slug": slug,
    content_type: contentType,
    // "fields.content.sys.contentType.sys.id": pageContentType,
  };
  const {
    items: [page],
  } = await client.getEntries(query);
  console.log(page);
  return page || null;
}
