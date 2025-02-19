import { PAGE_ENTRY } from "../entries/page.mjs";

export const HOME_QUERY = `
  query Home {
    entry(section: "Homepage", limit: 1) {
        ${PAGE_ENTRY}
    }
  }
`