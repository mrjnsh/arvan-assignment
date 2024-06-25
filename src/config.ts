const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const LOGIN_URL = `${BASE_URL}/users/login`
export const REGISTER_URL = `${BASE_URL}/users`
export const CURRENT_USER_URL = `${BASE_URL}/user`
export const AUTH_KEY = 'blog_token'
