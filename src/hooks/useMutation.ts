import { DEFAULT_HEADERS } from './contracts/Headers'
import { ref } from 'vue'
import type { FetchOptions } from './contracts/FetchOptions'
import { useAuth } from '@/modules/useAuth'

export function useMutation<T, P>({ url, method, headers, includeAuth }: FetchOptions) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)
  const { user } = useAuth()

  async function mutate(body: P) {
    loading.value = true
    error.value = null
    if (!user?.value?.user.token) {
      throw new Error('User is not Logged in.')
    }
    try {
      if (!body) {
        throw new Error('Body is empty')
      }
      const response = await callAPI(url, {
        method,
        headers: {
          ...DEFAULT_HEADERS,
          ...headers,
          ...(includeAuth ? { Authorization: `Token ${user.value.user.token}` } : {})
        },
        body: JSON.stringify(body)
      })

      data.value = await response.json()
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }
  return { data, error, loading, mutate }
}

async function callAPI(url: string, requestInit: RequestInit) {
  const response = await fetch(url, requestInit)

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response
}
