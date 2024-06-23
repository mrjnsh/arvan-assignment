<script setup lang="ts"></script>

<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="form-container">
      <div class="text-center">
        <h1 class="title">{{ title }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormContainer',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.form-container {
  background-color: var(--silver-color);
  max-width: 450px;
  padding: 0 20px;
}
.title {
  color: var(--light-gray-color);
  font-size: 47px;
  padding: 37px 0;
}
</style>
