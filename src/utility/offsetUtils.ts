import { ARTICLES_LIMIT } from '@/config'

export const offsetUtils = (page: number) => {
  const offset = (page - 1) * ARTICLES_LIMIT
  return offset
}
