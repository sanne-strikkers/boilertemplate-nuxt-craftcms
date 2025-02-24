import { ARTICLE_ENTRY } from "../entries/articleLayout.mjs";

export const GENERIC_QUERY = `
  query Generic($uri: [String]!) {
    genericEntries(uri: $uri) {
        ${ARTICLE_ENTRY}
    }
  }
`