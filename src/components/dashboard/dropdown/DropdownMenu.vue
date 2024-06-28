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
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Confirm Deletion</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">Are you sure you want to delete this item?</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="deleteArticle"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ARTICLES_URL } from '@/config'
import type { Article } from '@/domain/Article'
import { useMutation } from '@/hooks/useMutation'
import { makeHtmlIdCompatible } from '@/utility/stringUtils'
import { defineComponent } from 'vue'
import { toast } from 'vue3-toastify'

export default defineComponent({
  name: 'DropdownMenu',
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  emits: ['article-deleted', 'article-edited'],
  setup(props, { emit }) {
    const { mutate, loading, error } = useMutation<Article, {}>({
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
    return {
      deleteArticle,
      editArticle,
      makeHtmlIdCompatible,
      loading
    }
  }
})
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
