<template>
  <div class="table-responsive">
    <table class="table">
      <thead class="table-active custom-header text-center">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Tags</th>
          <th scope="col">Excerpt</th>
          <th scope="col">Created</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(article, index) in articles" :key="article.slug" class="text-center">
          <th scope="row">{{ (currentPage - 1) * 6 + index + 1 }}</th>
          <td>{{ article.title || '-' }}</td>
          <td>{{ article.author.username || '-' }}</td>
          <td class="tags">{{ article.tagList?.join(',') || '-' }}</td>
          <td>{{ article.favorited || '-' }}</td>
          <td>{{ new Date(article.createdAt).toLocaleDateString() || '-' }}</td>
          <div class="d-flex justify-content-between">
            <td></td>
            <DropdownMenu
              :slug="article.slug"
              @article-deleted="deleteArticle"
              @article-edited="editArticle"
            />
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import DropdownMenu from '../dropdown/DropdownMenu.vue'
import { useRouter } from 'vue-router'
import type { ListArticle } from '@/domain/payloads/articles/ListsArticle';

defineProps<{
  articles?: ListArticle['articles']
  currentPage: number
}>()

const emit = defineEmits(['article-deleted'])
const router = useRouter()
const deleteArticle = (slug: string) => {
  emit('article-deleted', slug)
}
const editArticle = (slug: string) => {
  router.push({ name: 'article-edited', params: { slug } })
}
</script>

<style scoped>
td {
  max-width: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.custom-header th {
  color: var(--dark-gray-color);
}
</style>
