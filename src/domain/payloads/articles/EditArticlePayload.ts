import Joi from 'joi'

export interface EditArticlePayload {
  article: {
    slug: string
    title: string
    description: string
    body: string
    tagList: string[]
  }
}

export const ARTICLE_VALIDATION = Joi.object({
  title: Joi.string().required().max(50),
  description: Joi.string(),
  body: Joi.string().required()
})
