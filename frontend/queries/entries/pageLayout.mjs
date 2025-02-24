import { CONTENTBLOCK_FIELD } from "../fields/contentBlock.mjs";

export const PAGE_ENTRY = `
    ... on pageLayout_Entry {
        typeHandle
        uid
        id
        title
        ${CONTENTBLOCK_FIELD}
    }
`