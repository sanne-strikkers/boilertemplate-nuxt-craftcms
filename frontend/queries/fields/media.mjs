export const MEDIA_FIELD = (transformHandle) => `
    media {
        id
        title
        filename
        url ${transformHandle ? `@transform(handle: "${transformHandle}")` : ""}
        alt
        focalPoint ${transformHandle ? `@transform(handle: "${transformHandle}")` : ""}
        width ${transformHandle ? `@transform(handle: "${transformHandle}")` : ""}
        height ${transformHandle ? `@transform(handle: "${transformHandle}")` : ""}
    }
`;