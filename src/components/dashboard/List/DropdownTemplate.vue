<template>
  <div class="dropdown">
    <a
      class="btn btn-secondary dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      ...
    </a>

    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Edit</a></li>
      <li><a class="dropdown-item" href="#">Delete</a></li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  border: none;
}
.btn {
  background-color: var(--info-color);
}
</style>
