<template>
  <div>
    <p class="question" v-if="questionText">
      {{ questionText }}
      <a :href="questionLink" class="link">{{ questionLinkText }}</a>
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
.question {
  color: var(--dark-color);
  font-size: 16px;
}
.link {
  color: var(--dark-color);
  font-weight: bold;
  text-decoration: none;
  padding-left: 5px;
}
</style>
