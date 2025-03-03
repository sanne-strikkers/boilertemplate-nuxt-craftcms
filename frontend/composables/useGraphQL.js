import { useRuntimeConfig } from '#app'
import { usePreview } from '@/composables/usePreview'

/**
 * useGraphQL - Provides a function to execute GraphQL queries.
 * 
 * This function retrieves the runtime configuration and sends 
 * GraphQL queries to the Craft CMS API. It handles authentication, 
 * error handling, and response validation.
 * 
 * @returns {Object} An object containing the `query` function.
 */
export function useGraphQL() {
  const config = useRuntimeConfig()

  const query = async (query, variables = {}, options = {}) => {
    try {
      if (!config.public.CRAFT_SITE_URL) {
        throw new Error('CRAFT_SITE_URL is not configured')
      }

      let apiUrl = `${config.public.CRAFT_SITE_URL}/api`

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

      if (options.private) {
        headers['Authorization'] = `Bearer ${config.public.CRAFT_GRAPHQL_TOKEN}`
      }

      if (options.previewToken) {
        headers['X-Craft-Token'] = options.previewToken
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query,
          variables
        }),
        credentials: 'include'
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const result = await response.json()

      if (!result || typeof result !== 'object') {
        throw new Error('Invalid response format')
      }

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'GraphQL error')
      }

      return JSON.parse(JSON.stringify(result.data))
    } catch (err) {
      console.error('GraphQL Error:', {
        message: err.message,
        craftUrl: config.public.CRAFT_SITE_URL
      })
      throw err
    }
  }

  return { query }
}

/**
 * useGraphQLQuery - Fetches data from the GraphQL API with reactivity support.
 * 
 * This function wraps `useAsyncData` to automatically update data when dependencies change.
 * It also handles preview tokens for Craft CMS.
 * 
 * @param key - A unique key for caching the query result.
 * @param query - The GraphQL query string.
 * @param variables - Query variables.
 * @param watchDeps - Dependencies that trigger a refresh.
 * @returns GraphQL response data with reactive state management.
 */
export function useGraphQLQuery(key, query, variables = {}, watchDeps = []) {
  const { previewToken, previewTimestamp } = usePreview()
  const graphql = useGraphQL();

  const { data, refresh, error, pending } = useAsyncData(
    key,
    async () => {
      try {
        const result = await graphql.query(query, variables, {
          previewToken: previewToken.value
        });

        return result || [];
      } catch (err) {
        console.error(`Failed to fetch data for ${key}:`, err);
        return []; 
      }
    },
    {
      watch: [previewToken, previewTimestamp, ...watchDeps],
      default: () => []
    }
  );

  return { data, refresh, error, pending };
}