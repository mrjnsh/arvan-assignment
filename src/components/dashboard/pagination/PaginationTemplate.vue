<template>
  <div>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="goToPage(currentPage - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="goToPage(currentPage + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PaginationTemplate',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ['page-change'],
  setup(props, { emit }) {
    const goToPage = (page: number) => {
      if (page > 0 && page <= props.totalPages) {
        emit('page-change', page)
      }
    }

    return {
      goToPage
    }
  }
})
</script>

<style scoped>
.pagination {
  position: absolute;
  bottom: 20px;
  width: 100%;
}

.page-item.disabled .page-link {
  cursor: not-allowed;
}

.page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}
</style>
