import { DEFAULT_HEADERS } from './contracts/Headers'
import { ref } from 'vue'
import type { FetchOptions } from './contracts/FetchOptions'

export function useQuery<T, P extends Record<string, string>>({
  url,
  method,
  headers
}: FetchOptions) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  async function fetchData(params?: P) {
    loading.value = true
    error.value = null
    try {
      const queryString = new URLSearchParams(params).toString()
      const response = await callAPI([url, queryString].filter(Boolean).join('?'), {
        method,
        headers: { ...DEFAULT_HEADERS, ...headers }
      })

      data.value = await response.json()
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, fetchData }
}

async function callAPI(url: string, requestInit: RequestInit) {
  const response = await fetch(url, requestInit)

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response
}
