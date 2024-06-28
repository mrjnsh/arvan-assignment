import { DEFAULT_HEADERS } from './contracts/Headers'
import { ref } from 'vue'
import type { FetchOptions } from './contracts/FetchOptions'
import { useAuth } from '@/modules/useAuth'

export function useQuery<T, P extends Record<string, string>>({
  url,
  method,
  headers,
  includeAuth
}: FetchOptions) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)
  const { user } = useAuth()

  async function fetchData(params?: P) {
    loading.value = true
    error.value = null
    if (includeAuth && !user?.value?.user.token) {
      throw new Error('User is not Logged in.')
    }
    try {
      const queryString = new URLSearchParams(params).toString()
      const response = await callAPI([url, queryString].filter(Boolean).join('?'), {
        method,
        headers: {
          ...DEFAULT_HEADERS,
          ...headers,
          ...(includeAuth ? { Authorization: `Token ${user!.value!.user.token}` } : {})
        }
      })

      data.value = response.status === 204 ? null : await response.json()
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
    let errorMessage = 'Network response was not ok'
    try{
      errorMessage =errorToString(await response.json())
    }catch{ /* empty */ }
    throw new Error(errorMessage)
  }
  return response
}

function errorToString(error: Record<string, unknown>) : string{
  if('errors' in error){
return Object.entries(error?.errors??{})
  .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
  .join(', ');
  }
  if('message' in error){
      return error.message as string;
  }
  return 'Unknown error occurred.';
}