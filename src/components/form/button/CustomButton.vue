<template>
  <div>
    <button class="btn" type="button">{{ buttonText }}</button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ buttonText: string }>()
</script>
