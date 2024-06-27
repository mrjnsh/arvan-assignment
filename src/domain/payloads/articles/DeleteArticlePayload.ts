import type { TagsPayload } from "./TagsPayload"

export interface DeleteArticlePayload {
          article: {
            title: string
            description: string
            body: string
            tagList: TagsPayload
          }
        }