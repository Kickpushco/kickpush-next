const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = require("contentful").createClient({
  space,
  accessToken,
});

export async function fetchEntries() {
  const entries = await client.getEntries();

  if (entries.items) return entries.items;

  throw new Error(`Error fetching all entries`);
}

export async function fetchCustomPage(contentType) {
  const query = {
    limit: 1,
    include: 1,
    content_type: contentType,
  };

  const entries = await client.getEntries(query);
  if (entries.items) return entries.items[0];

  throw new Error(`Error fetching Entry for ${slug} (${contentType})`);
}

export async function fetchContact() {
  return await fetchCustomPage("customPageContact");
}

export async function fetchProjects() {
  const query = {
    content_type: "project",
    include: 0,
  };

  const entries = await client.getEntries(query);

  if (entries.items) return entries.items;

  throw new Error(`Error fetching projects`);
}

export async function fetchProject(slug) {
  const query = {
    limit: 1,
    include: 2,
    content_type: "project",
    "fields.slug": slug,
  };

  const entries = await client.getEntries(query);
  if (entries.items) return entries.items[0];

  throw new Error(`Error fetching Project for ${slug}`);
}
