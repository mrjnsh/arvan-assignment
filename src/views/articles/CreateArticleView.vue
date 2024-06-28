<template>
  <div>
    <ListTitle title="New Article" />
    <form class="d-flex flex-column flex-md-column w-100 gap-2" @submit.prevent="handleSubmit">
      <div class="d-flex flex-column flex-md-row gap-2">
        <div class="flex-grow-1">
          <div class="mb-3">
            <InputField
              v-model="values.title"
              @input="handleChange"
              typeOfInput="text"
              label="Title"
              :errorText="errors.title ? errors.title[0] : ''"
              inputId="title"
            />
          </div>
          <div class="mb-3">
            <InputField
              v-model="values.description"
              @input="handleChange"
              typeOfInput="text"
              label="Description"
              :errorText="errors.description ? errors.description[0] : ''"
              inputId="description"
            />
          </div>
          <div class="mb-3">
            <TextareaField
              v-model="values.body"
              name="body"
              :errorText="errors.body ? errors.body[0] : ''"
              @input="handleChange"
            />
          </div>
        </div>
        <div class="tag-container flex-grow-1">
          <TagsList :selectedTags="tags.tags" @update:selectedTags="updateSelectedTags" />
        </div>
      </div>
      <div class="d-sm-flex justify-content-start mt-3">
        <SubmitButton buttonText="Submit" :disabled="loading" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SubmitButton from '@/components/Form/Button/SubmitButton.vue'
import InputField from '@/components/Form/Input/InputField.vue'
import ListTitle from '@/components/dashboard/hearder/ListTitle.vue'
import { ARTICLES_URL } from '@/config'
import { useMutation } from '@/hooks/useMutation'
import type { Article } from '@/domain/Article'
import {
  ARTICLE_VALIDATION,
  type CreateArticlePayload
} from '@/domain/payloads/articles/CreateArticlePayload'
import TextareaField from '@/components/Form/Textarea/TextareaField.vue'
import { useForm } from '@/hooks/useForm'
import { RunValidation } from '@/hooks/joiValidator'
import { useRouter } from 'vue-router'
import TagsList from '@/components/dashboard/tags/TagsList.vue'
import type { TagsPayload } from '@/domain/payloads/articles/TagsPayload'
import { toast } from 'vue3-toastify'

export default defineComponent({
  name: 'NewArticleForm',
  components: {
    InputField,
    SubmitButton,
    TagsList,
    ListTitle,
    TextareaField
  },
  setup() {
    const router = useRouter()
    const tags = ref<TagsPayload>({ tags: [] })

    const updateSelectedTags = (newTags: string[]) => {
      tags.value = { tags: newTags }
    }

    const { values, errors, handleChange } = useForm<
      Omit<CreateArticlePayload['article'], 'tagList'>
    >(
      {
        title: '',
        description: '',
        body: ''
      },
      (value) => RunValidation(ARTICLE_VALIDATION, value)
    )

    const { mutate, data, error, loading } = useMutation<Article, CreateArticlePayload>({
      url: ARTICLES_URL,
      method: 'POST',
      includeAuth: true
    })

    const handleSubmit = async () => {
      try {
        await mutate({
          article: {
            ...values.value,
            tagList: tags.value.tags
          }
        })
        toast.success('Article added successfully')
        if (data.value === null || error.value !== null) {
          toast.error(error.value.message)
          return
        }
        router.push({ name: 'articles' })
        tags.value = { tags: [] }
      } catch (error) {
        console.error('Error creating article:', error)
      }
    }
    return {
      tags,
      handleSubmit,
      values,
      handleChange,
      updateSelectedTags,
      errors,
      loading
    }
  }
})
</script>

<style scoped>
.tag-container {
  max-width: 250px;
}

.form-group {
  margin-bottom: 1;
}
</style>
