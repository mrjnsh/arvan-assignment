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
      @blur="checkValidity"
      @input="handleInput"
      :class="{ 'is-invalid': isInvalid }"
    />
    <div class="invalid-feedback my-2">{{ errorText }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'UserInput',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    errorText: {
      type: String
    },
    inputId: {
      type: String,
      required: true
    },
    typeOfInput: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputRef = ref<HTMLInputElement | null>(null)
    const isInvalid = ref(false)

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      emit('update:modelValue', target.value)
    }

    const checkValidity = () => {
      if (inputRef.value) {
        isInvalid.value = !inputRef.value.checkValidity()
      }
    }

    watch(() => props.modelValue, checkValidity)

    return {
      inputRef,
      isInvalid,
      handleInput,
      checkValidity
    }
  }
})
</script>

<style scoped>
.is-invalid {
  border-color: red;
}
</style>
