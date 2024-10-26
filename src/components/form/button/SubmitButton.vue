<template>
  <div class="d-grid my-2">
    <button class="btn btn-primary" type="submit" :disabled="disabled">{{ buttonText }}</button>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ disabled: boolean; buttonText: string }>(), {
  disabled: false
})
</script>
