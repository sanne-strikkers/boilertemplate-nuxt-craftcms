export const SEO_QUERY = (uri = "/") => `
  query Seo {
    seomatic(uri: "${uri}") {
        metaTitleContainer
        metaTagContainer
        metaLinkContainer
        metaScriptContainer
        metaJsonLdContainer
        metaSiteVarsContainer
        frontendTemplateContainer
    }
  }
`