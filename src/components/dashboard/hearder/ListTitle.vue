<template>
  <h2 class="header text-black py-3">{{ title }}</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>
