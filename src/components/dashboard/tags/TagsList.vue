<template>
  <div class="mb-3">
    <InputField
      v-model="newTag"
      typeOfInput="text"
      label="New Tag"
      inputId="newTag"
      @keypress.enter="addTag"
    />
  </div>
  <div class="d-flex">
    <ul class="list-group border w-100 scrollable-list">
      <li v-for="(tag, index) in combinedTags" :key="index" class="list-group-item">
        <input
          class="form-check-input me-1"
          type="checkbox"
          :value="tag"
          v-model="internalSelectedTags"
          aria-label="..."
        />
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import InputField from '@/components/form/input/InputField.vue'
import { TAGS_LIST_URL } from '@/config'
import type { Tags } from '@/domain/Article'
import { useQuery } from '@/hooks/useQuery'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
  name: 'TagsList',
  components: {
    InputField
  },
  props: {
    selectedTags: {
      type: Array as () => string[],
      required: true
    }
  },
  setup(props, { emit }) {
    const newTag = ref('')
    const userTags = ref<string[]>([])
    const internalSelectedTags = ref<string[]>(props.selectedTags)

    const { data, fetchData } = useQuery<Tags, {}>({
      url: TAGS_LIST_URL,
      method: 'GET'
    })

    watch(internalSelectedTags, (newVal) => {
      emit('update:selectedTags', newVal)
    })
    onMounted(() => {
      fetchData()
        .then(() => {
          if (data.value) {
            userTags.value.push(...data.value.tags)
          }
        })
        .catch((err) => {
          console.error('Failed to fetch tags:', err)
        })
    })
    const addTag = () => {
      const tag = newTag.value.trim()
      if (tag && !userTags.value.includes(tag)) {
        userTags.value.push(tag)
        userTags.value.sort((a, b) => a.localeCompare(b))
        internalSelectedTags.value = [...internalSelectedTags.value, tag]
        newTag.value = ''
      }
    }
    const combinedTags = computed(() => {
      const tagsSet = new Set([...userTags.value, ...props.selectedTags])
      return Array.from(tagsSet).sort((a, b) => a.localeCompare(b))
    })

    return {
      newTag,
      userTags,
      internalSelectedTags,
      addTag,
      combinedTags,
      data
    }
  }
})
</script>

<style scoped>
.list-group-item {
  border: none;
}
.scrollable-list {
  max-height: 200px;
  overflow-y: auto;
}
</style>
