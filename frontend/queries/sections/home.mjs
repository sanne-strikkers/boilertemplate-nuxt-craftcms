import { PAGE_ENTRY } from "../entries/pageLayout.mjs";

export const HOME_QUERY = `
  query Home {
    entry(section: "homepage", limit: 1) {
        ${PAGE_ENTRY}
    }
  }
`