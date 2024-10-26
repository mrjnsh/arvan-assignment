<template>
  <div>
    <label :for="inputId" :class="{ 'text-danger': isInvalid }" class="form-label">{{
      label
    }}</label>
    <input
      ref="inputRef"
      :name="inputId"
      :type="typeOfInput"
      class="form-control"
      :id="inputId"
      :value="modelValue"
      :required="required"
      @input="handleInput"
      :class="{ 'is-invalid': isInvalid }"
    />
    <div class="invalid-feedback my-2">{{ errorText }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const props = withDefaults(
  defineProps<{
    modelValue: string
    label: string
    errorText: string
    inputId: string
    typeOfInput: string
    required: boolean
  }>(),
  {
    required: false
  }
)

const emit = defineEmits(['update:modelValue'])

const inputRef = ref<HTMLInputElement | null>(null)
const isInvalid = ref(false)
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

watch(
  () => props.errorText,
  (value) => {
    isInvalid.value = !!value
  }
)
</script>

<style scoped>
.is-invalid {
  border-color: red;
}
</style>
