import type { Article } from '@/domain/Article'

interface Item extends Omit<Article, 'tagList'> {
  tagList: string[]
}

export interface ListArticle {
  articles: Item[]
  articlesCount:number
}
