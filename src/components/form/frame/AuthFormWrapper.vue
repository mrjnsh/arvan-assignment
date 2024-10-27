<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="form-container w-100">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.form-container {
  background-color: var(--silver-color);
  max-width: 450px;
  padding: 0 20px;
}
</style>
