<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar collapse">
    <div class="position-sticky">
      <p class="Text-Style-2 py-2">Posts</p>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" to="/">
            <span data-feather="home"></span>
            All Articles
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard/articles/create">
            <span data-feather="file"></span>
            New Article
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import './SidebarStyle.css'
</script>
