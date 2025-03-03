import { ARTICLE_ENTRY } from "../entries/articleLayout.mjs";
import { SEO_QUERY } from "../seo.mjs";

export const GENERIC_QUERY = `
  query Generic($uri: [String]!) {
    genericEntries(uri: $uri) {
        ${ARTICLE_ENTRY}
            ... on EntryInterface {
              ${SEO_QUERY}
         }
    }
  }
`