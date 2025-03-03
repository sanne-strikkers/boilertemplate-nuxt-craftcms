import { NAVIGATION_QUERY } from "../queries/globals/navigation.mjs";
import { MEDIA_FIELD } from "../queries/fields/media.mjs";

export const GLOBALS_QUERY = `
  query Globals {
    globalSets {
      ... on websiteInfo_GlobalSet {
        id
        name
        ${MEDIA_FIELD()}
        ${NAVIGATION_QUERY}
      }
    }
  }
`