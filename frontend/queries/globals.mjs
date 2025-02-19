export const GLOBALS_QUERY = `
  query Globals {
    globalSets(limit: 1) {
      ... on companyInfo_GlobalSet {
        id
        name
        logo {
          filename
          url
          alt
        }
        address {
          addressLine1
          addressLine2
          addressLine3
          countryCode
          locality
          postalCode
          title
        }
      }
    }
  }
`