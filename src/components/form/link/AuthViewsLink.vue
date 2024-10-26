<template>
  <div>
    <p class="Text-Style" v-if="questionText">
      {{ questionText }}
      <router-link :to="questionLink" class="link">{{ questionLinkText }}</router-link>
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  questionText?: string
  questionLink?: string
  questionLinkText?: string
}>()
</script>

<style>
.link {
  color: var(--dark-color);
  font-weight: bold;
  text-decoration: none;
  padding-left: 5px;
}
</style>
