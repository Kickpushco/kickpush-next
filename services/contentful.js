const client = require("contentful").createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function fetchCustomPage(contentType, args = {}) {
  const { include = 1 } = args;

  const query = {
    limit: 1,
    include,
    content_type: contentType,
  };

  const entries = await client.getEntries(query);
  if (!entries.items)
    throw new Error(`Error fetching Entry for ${slug} (${contentType})`);

  const {
    globalSettings: { fields: globalSettings },
    ...pageFields
  } = entries.items[0].fields;

  if (!globalSettings)
    throw new Error(
      `Page is missing globalSettings in Contentful (${contentType})`
    );

  return {
    pageFields,
    globalSettings,
  };
}

export async function fetchProjectIds() {
  const query = {
    content_type: "project",
    include: 0,
  };

  const entries = await client.getEntries(query);

  if (!entries.items) throw new Error(`Error fetching projects`);

  return entries.items.map((project) => project.fields.slug);
}

export async function fetchProject(slug) {
  const query = {
    limit: 1,
    include: 2,
    content_type: "project",
    "fields.slug": slug,
  };

  const entries = await client.getEntries(query);
  if (!entries.items) throw new Error(`Error fetching Project for ${slug}`);

  const { projectPage, ...pageFields } = entries.items[0].fields;
  return {
    ...pageFields,
    ...projectPage.fields,
  };
}

const TEXT_COLOR_MAP = {
  Light: "light",
  Dark: "dark",
};

export function computeTextColor(string, invert = false) {
  const textColor = TEXT_COLOR_MAP[string];

  if (!invert) return textColor;

  return textColor === "dark" ? "light" : "dark";
}
