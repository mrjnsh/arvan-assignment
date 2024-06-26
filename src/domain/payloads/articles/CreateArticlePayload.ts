import Joi from 'joi'
import type { TagsPayload } from './TagsPayload'
export interface CreateArticlePayload {
  article: {
    title: string
    description: string
    body: string
    tagList: TagsPayload
  }
}

export const ARTICLE_VALIDATION = Joi.object({
  title: Joi.string().required().max(50),
  description: Joi.string(),
  body: Joi.string().required()
})
