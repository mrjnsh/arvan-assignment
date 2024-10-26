<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar collapse">
    <p class="Text-Style pb-1 d-md-none text-white text-center">
      Welcome {{ user?.user.username }}
    </p>
    <div class="position-sticky">
      <p class="Text-Style-2 p-2">Posts</p>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link
            class="nav-link"
            aria-current="page"
            to="/dashboard/articles"
            @click="closeSidebar"
          >
            <span data-feather="home"></span>
            All Articles
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard/articles/create" @click="closeSidebar">
            <span data-feather="file"></span>
            New Article
          </router-link>
        </li>
      </ul>
    </div>
    <div class="logout-button d-md-none">
      <router-link class="nav-link" aria-current="page" to="/login">
        <button type="button" class="btn btn-info">Logout</button>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import './SidebarStyle.css'
import { useAuth } from '@/modules/useAuth'

const { user } = useAuth()

const closeSidebar = () => {
  const sidebar = document.getElementById('sidebarMenu')//emit
  if (sidebar && sidebar.classList.contains('show')) {
    sidebar.classList.remove('show')
  }
}
</script>

<style>
.logout-button {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: left;
  margin: 20px;
}
</style>
