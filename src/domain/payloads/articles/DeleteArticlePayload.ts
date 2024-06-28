export interface DeleteArticlePayload {
  article: {
    title: string
    description: string
    body: string
    tagList: string[]
  }
}
