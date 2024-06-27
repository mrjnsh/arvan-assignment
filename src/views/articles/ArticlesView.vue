<template>
  <div>
    <ListTitle title="All Posts" />
    <ArticlesList
      :paginatedArticles="paginatedArticles"
      :currentPage="currentPage"
      :itemsPerPage="itemsPerPage"
    />
    <div class="d-flex justify-content-center">
      <PaginationTemplate
        :currentPage="currentPage"
        :totalPages="totalPages"
        @page-change="goToPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@/hooks/useQuery';
import { ARTICLES_LIST_URL } from '@/config';
import type { ListArticle } from '@/domain/payloads/articles/ListsArticle';
import ArticlesList from '@/components/dashboard/List/ArticlesList.vue';
import PaginationTemplate from '@/components/dashboard/pagination/PaginationTemplate.vue';
import ListTitle from '@/components/dashboard/hearder/ListTitle.vue';

export default defineComponent({
  name: 'ArticlesView',
  components: {
    ListTitle,
    ArticlesList,
    PaginationTemplate
  },
  setup() {
    const { data, fetchData } = useQuery<ListArticle, {}>({
      url: ARTICLES_LIST_URL,
      method: 'GET',
      includeAuth: true
    });

    const route = useRoute();
    const router = useRouter();
    const currentPage = ref(Number(route.params.page) || 1);
    const itemsPerPage = ref(7);

    const totalPages = computed(() => {
      return data.value ? Math.ceil(data.value.articles.length / itemsPerPage.value) : 0;
    });

    const paginatedArticles = computed(() => {
      if (!data.value) return [];
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return data.value.articles.slice(start, end);
    });

    const goToPage = (page: number) => {
      if (page > 0 && page <= totalPages.value) {
        router.push({ name: 'articles-page', params: { page } });
      }
    };

    watch(() => route.params.page, (newPage) => {
      currentPage.value = Number(newPage) || 1;
    });

    onMounted(async () => {
      await fetchData();
    });

    return {
      articles: data,
      currentPage,
      itemsPerPage,
      totalPages,
      paginatedArticles,
      goToPage
    };
  }
});
</script>

<style scoped>
td {
  max-width: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
