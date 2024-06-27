<template>
  <div class="dropdown">
    <a
      class="btn btn-secondary dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      ...
    </a>

    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Edit</a></li>
      <li><button class="dropdown-item" @click="deleteArticle">Delete</button></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ARTICLES_LIST_URL } from '@/config'
import { useMutation } from '@/hooks/useMutation'
import type { Article } from '@/domain/Article'
import type { DeleteArticlePayload } from '@/domain/payloads/articles/DeleteArticlePayload'

export default defineComponent({
  name: 'DeleteArticle',
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  emits: ['article-deleted'],
  setup(props, { emit }) {
    const { mutate } = useMutation<Article, DeleteArticlePayload>({
      url: `${ARTICLES_LIST_URL}/${props.slug}`,
      method: 'DELETE',
      includeAuth: true
    })

    const deleteArticle = async () => {
      try {
        await mutate({
          article: {
            title: '',
            description: '',
            body: '',
            tagList: { tags: [] }
          }
        })
        emit('article-deleted', props.slug)
      } catch (error) {
        console.error('Failed to delete the article:', error)
      }
    }

    return {
      deleteArticle
    }
  }
})
</script>

<style scoped>
.dropdown {
  border: none;
}
.btn {
  background-color: var(--info-color);
}
</style>
