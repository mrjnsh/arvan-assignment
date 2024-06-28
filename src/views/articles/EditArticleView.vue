<template>
  <div>
    <LoadingTemplate v-if="!articleData" />
    <div v-else>
      <EditArticle :articleData="articleData.article" />
    </div>
  </div>
</template>

<script lang="ts">
import LoadingTemplate from '@/components/Loading/LoadingTemplate.vue'
import EditArticle from '@/components/dashboard/List/EditArticle.vue'
import { ARTICLES_URL } from '@/config'
import type { ArticleItem } from '@/domain/Article'
import { useQuery } from '@/hooks/useQuery'
import { defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'NewArticleForm',
  components: {
    EditArticle,
    LoadingTemplate
  },
  setup() {
    const route = useRoute()
    const { slug } = route.params

    const { data: articleData, fetchData } = useQuery<ArticleItem, {}>({
      url: `${ARTICLES_URL}/${slug}`,
      method: 'GET',
      includeAuth: true
    })

    onMounted(async () => {
      await fetchData()
    })

    return {
      articleData
    }
  }
})
</script>
