<template>
  <div class="dropdown">
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        style="background-color: var(--info-color)"
        role="button"
        type="button"
        data-bs-toggle="dropdown"
      >
        ...
      </button>

      <ul class="dropdown-menu">
        <li><button class="dropdown-item" @click="editArticle">Edit</button></li>
        <li>
          <button
            class="dropdown-item"
            :data-bs-target="'#confirm-' + makeHtmlIdCompatible(slug)"
            data-bs-toggle="modal"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
    <div :id="'confirm-' + makeHtmlIdCompatible(slug)" class="modal" tabindex="-1">
      <DeleteModal :handleDelete="deleteArticle" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ARTICLES_URL } from '@/config'
import type { Article } from '@/domain/Article'
import { useMutation } from '@/hooks/useMutation'
import { makeHtmlIdCompatible } from '@/utility/stringUtils'
import { toast } from 'vue3-toastify'
import DeleteModal from '../modal/DeleteModal.vue'

const props = defineProps<{ slug: string }>()
const emit = defineEmits(['article-deleted', 'article-edited'])

const { mutate, error } = useMutation<Article, {}>({
  url: `${ARTICLES_URL}/${props.slug}`,
  method: 'DELETE',
  includeAuth: true
})

const deleteArticle = async () => {
  try {
    await mutate({})
    if (error.value) {
      toast.error(error.value.message)
    } else {
      toast.success('Article deleted successfully')
    }
    emit('article-deleted', props.slug)
  } catch (error) {
    console.error('Failed to delete the article:', error)
  }
}

const editArticle = () => {
  emit('article-edited', props.slug)
}
</script>

<style scoped>
.dropdown {
  border: none;
}
.modal-body {
  display: flex;
  justify-content: start;
}
</style>
