<template>
  <div>
    <ListTitle title="Edit Article" />
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
import SubmitButton from '@/components/Form/Button/SubmitButton.vue'
import InputField from '@/components/Form/Input/InputField.vue'
import TextareaField from '@/components/Form/Textarea/TextareaField.vue'
import ListTitle from '@/components/dashboard/hearder/ListTitle.vue'
import TagsList from '@/components/dashboard/tags/TagsList.vue'
import { ARTICLES_URL } from '@/config'
import type { Article, ArticleItem } from '@/domain/Article'
import { ARTICLE_VALIDATION } from '@/domain/payloads/articles/CreateArticlePayload'
import type { EditArticlePayload } from '@/domain/payloads/articles/EditArticlePayload'
import type { TagsPayload } from '@/domain/payloads/articles/TagsPayload'
import { RunValidation } from '@/hooks/joiValidator'
import { useForm } from '@/hooks/useForm'
import { useMutation } from '@/hooks/useMutation'
import { defineComponent, ref, type PropType } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

export default defineComponent({
  name: 'EditArticleForm',
  props: {
    articleData: {
      type: Object as PropType<ArticleItem['article']>,
      required: true
    }
  },
  components: {
    InputField,
    SubmitButton,
    TagsList,
    ListTitle,
    TextareaField
  },
  setup(props) {
    const tags = ref<TagsPayload>({ tags: props.articleData.tagList })
    const router = useRouter()
    const updateSelectedTags = (newTags: string[]) => {
      tags.value = { tags: newTags }
    }

    const { values, errors, handleChange } = useForm<
      Omit<EditArticlePayload['article'], 'tagList'>
    >(
      {
        slug: props.articleData?.slug ?? '',
        title: props.articleData?.title ?? '',
        description: props.articleData?.description ?? '',
        body: props.articleData?.body ?? ''
      },
      (value) => RunValidation(ARTICLE_VALIDATION, value)
    )

    const { mutate, data, error, loading } = useMutation<Article, EditArticlePayload>({
      url: `${ARTICLES_URL}/${props.articleData.slug}`,
      method: 'PUT',
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
        if (data.value === null || error.value !== null) {
          toast.error(error.value.message)
          return
        } else {
          toast.success('Article updated successfully')
        }
        router.push({ name: 'articles' })
        tags.value = { tags: [] }
      } catch (error) {
        console.error('Error updating article:', error)
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
