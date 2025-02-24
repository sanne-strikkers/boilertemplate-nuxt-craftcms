import { TEXTBLOCK_ENTRY } from "../entries/textBlock.mjs";
import { HEROBLOCK_ENTRY } from "../entries/heroBlock.mjs";

export const CONTENTBLOCK_FIELD = `
    contentBlock {
        ${TEXTBLOCK_ENTRY}
        ${HEROBLOCK_ENTRY}
    }
`