import { MEDIA_FIELD } from "../fields/media.mjs";
import { CTA_FIELD } from "../fields/cta.mjs";

export const HEROBLOCK_ENTRY = `
    ... on heroBlock_Entry {
        typeHandle
        uid
        id
        title
        subtitle
        paragraph
        backgroundColor
        ${MEDIA_FIELD("hero")}
        ${CTA_FIELD}
    }
`;