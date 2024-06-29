<template>
  <div>
    <p class="Text-Style" v-if="questionText">
      {{ questionText }}
      <router-link :to="questionLink" class="link">{{ questionLinkText }}</router-link>
    </p>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    questionText: {
      type: String,
      required: false
    },
    questionLink: {
      type: String,
      required: false
    },
    questionLinkText: {
      type: String,
      required: false
    }
  }
})
</script>

<style>
.link {
  color: var(--dark-color);
  font-weight: bold;
  text-decoration: none;
  padding-left: 5px;
}
</style>
