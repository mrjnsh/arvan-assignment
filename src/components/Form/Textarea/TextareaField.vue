<template>
  <div class="mb-3">
    <label class="form-label" :class="{ 'text-danger': !!errorText }">Body</label>
    <textarea
      v-model="model"
      class="form-control"
      rows="3"
      :name="name"
      :class="{ 'is-invalid': !!errorText }"
    >
    </textarea>
    <div class="invalid-feedback my-2">{{ errorText }}</div>
  </div>
</template>

<script setup lang="ts">
const model = defineModel()
defineProps<{ errorText: string; name: string }>()
</script>
