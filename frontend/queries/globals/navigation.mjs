import { CTA_FIELD } from "../fields/cta.mjs";

export const NAVIGATION_QUERY = `
  navigation {
    ... on navigationList_Entry {
        id
        title
        ctas {
            ... on linkList_Entry {
                id
                ${CTA_FIELD}
            }
        }
    }
  }
`