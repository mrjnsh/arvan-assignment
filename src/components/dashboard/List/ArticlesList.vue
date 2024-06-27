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
        <tr v-for="(article, index) in paginatedArticles" :key="article.slug" class="text-center">
          <th scope="row">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</th>
          <td>{{ article.title || '-'  }}</td>
          <td>{{ article.author.username || '-' }}</td>
          <td class="tags">{{ article.tagList?.join(',') || '-' }}</td>
          <td>{{ article.favorited || '-'}}</td>
          <td>{{ new Date(article.createdAt).toLocaleDateString() || '-' }}</td>
          <div class="d-flex justify-content-between">
            <td></td>
              <DropdownTemplate />
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import DropdownTemplate from '@/components/dashboard/List/DropdownTemplate.vue';

export default defineComponent({
  name: 'ArticlesList',
  components: {
    DropdownTemplate
  },
  props: {
    paginatedArticles: {
      type: Array as PropType<Array<any>>,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    }
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
.custom-header th {
  color: var(--dark-gray-color);
}

</style>
