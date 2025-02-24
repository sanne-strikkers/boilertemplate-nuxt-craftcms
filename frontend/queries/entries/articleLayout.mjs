import { CONTENTBLOCK_FIELD } from "../fields/contentBlock.mjs";
import { MEDIA_FIELD } from "../fields/media.mjs";

export const ARTICLE_ENTRY = `
    ... on articlelayout_Entry {
        typeHandle
        uid
        id
        title
        subtitle
        paragraph
        ${MEDIA_FIELD("generic")}
        ${CONTENTBLOCK_FIELD}
    }
`