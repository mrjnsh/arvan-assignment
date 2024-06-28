interface Author {
  username: string
  bio: string | null
  image: string
  following: boolean
}

export interface Tags {
  tags: string[]
}

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: Tags
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Author
}

export interface ArticleItem {
  article: Omit<Article, 'tagList'> & { tagList: string[] }
}
