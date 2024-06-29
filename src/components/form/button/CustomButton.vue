<template>
  <div>
    <button class="btn" type="button">{{ buttonText }}</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    buttonText: {
      type: String,
      required: true
    }
  }
})
</script>
