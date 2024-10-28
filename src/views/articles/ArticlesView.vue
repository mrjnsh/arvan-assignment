<template>
  <div>
    <ListTitle title="All Posts" />
    <div class="container">
      <ArticlesList
        :articles="articles?.articles"
        :currentPage="currentPage"
        @article-deleted="deleteArticle"
      />
      <div class="d-flex justify-content-center" v-if="articles?.articlesCount !== 0">
        <PaginationTemplate
          :currentPage="currentPage"
          :totalPages="totalPages"
          @page-change="goToPage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@/hooks/useQuery'
import { ARTICLES_LIMIT, ARTICLES_URL } from '@/config'
import type { ListArticle } from '@/domain/payloads/articles/ListsArticle'
import ArticlesList from '@/components/dashboard/List/ArticlesList.vue'
import PaginationTemplate from '@/components/dashboard/pagination/ListPagination.vue'
import ListTitle from '@/components/dashboard/hearder/ListTitle.vue'
import { offsetUtils } from '@/utility/offsetUtils'

const { data: articles, fetchData } = useQuery<ListArticle, { offset: number; limit: number }>({
  url: ARTICLES_URL,
  method: 'GET',
  includeAuth: true
})

const route = useRoute()
const router = useRouter()
const currentPage = computed(() => parseInt(route.params.page as string, 10) || 1)
const totalPages = computed(() => Math.ceil((articles.value?.articlesCount ?? 0) / ARTICLES_LIMIT))

const goToPage = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    router.push({ name: 'articles-page', params: { page } })
  }
}

watch(currentPage, (newCurrentPage) => {
  fetchData({ offset: offsetUtils(newCurrentPage), limit: ARTICLES_LIMIT })
})

const deleteArticle = () => {
  fetchData({ offset: offsetUtils(currentPage.value), limit: ARTICLES_LIMIT })
}

onMounted(async () => {
  await fetchData({ offset: offsetUtils(currentPage.value), limit: ARTICLES_LIMIT })
})
</script>

<style scoped>
td {
  max-width: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.container {
  display: flex;
  flex-direction: column;
  height: 70vh;
  justify-content: space-between;
}
</style>
