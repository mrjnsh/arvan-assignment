import { AUTH_KEY, CURRENT_USER_URL } from '@/config'
import { reactive, toRefs, watch } from 'vue'
import type { User } from '@/domain/User'
import { useQuery } from '@/hooks/useQuery'

interface AuthState {
  authenticating: boolean
  user?: User
  error?: Error
}

const state = reactive<AuthState>({
  authenticating: false,
  user: undefined,
  error: undefined
})

const token = window.localStorage.getItem(AUTH_KEY)

if (token) {
  const { loading, error, data, fetchData } = useQuery<User, {}>({
    url: CURRENT_USER_URL,
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`
    }
  })
  state.authenticating = true

  fetchData()

  watch([loading], () => {
    if (error.value) {
      window.localStorage.removeItem(AUTH_KEY)
    } else if (data.value) {
      state.user = data.value
    }

    state.authenticating = false
  })
}

export const useAuth = () => {
  const setUser = (payload: User, remember: boolean): void => {
    if (remember) {
      window.localStorage.setItem(AUTH_KEY, payload.user.token)
    }

    state.user = payload
    state.error = undefined
  }

  const logout = async (): Promise<void> => {
    window.localStorage.removeItem(AUTH_KEY)
    state.user = undefined
  }

  return {
    setUser,
    logout,
    ...toRefs(state)
  }
}
