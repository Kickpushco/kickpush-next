# Kickpush

## Contributing

### Installation

Run `npm i` to install the dependencies and then run:

```
npm run dev
```

### Caching

To reduce the number of API requests to Contentful, the responses are cached to
`.contentful-cache` by key (typically the `id` of the page that is being
requested).

To reset the cache, either add `false` as the final argument for instances of
`fetchFromCache` or delete the specific (or all) `.json` file from the folder.
