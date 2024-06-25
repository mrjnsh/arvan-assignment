<template>
  <div class="d-grid my-2">
    <button class="btn btn-primary" type="submit">{{ buttonText }}</button>
  </div>
</template>

<script lang="ts">
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
