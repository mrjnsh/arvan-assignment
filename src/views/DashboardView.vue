<template>welcome {{ user?.user.username }}</template>

<script lang="ts">
import { useAuth } from '@/modules/useAuth'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const { user } = useAuth()
    return {
      user
    }
  }
})
</script>
