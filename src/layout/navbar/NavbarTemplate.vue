<template>
  <header class="navbar navbar-dark sticky-top flex-md-nowrap py-md-0 shadow px-3">
    <div class="d-flex justify-content-between align-items-center">
      <a class="navbar-brand Text-Style-2 col-md-3 col-lg-2 me-0 font" href="#">Arvan Challenge</a>
      <p class="Text-Style p-4 pb-1 d-none d-md-block text-white">
        Welcome {{ user?.user.username }}
      </p>
    </div>
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-nav d-none d-md-block">
      <div class="nav-item text-nowrap">
        <router-link class="nav-link" aria-current="page" to="/login">
          <button type="button" class="btn btn-outline-info">Logout</button>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import './NavigationStyle.css'
import { useAuth } from '@/modules/useAuth'

const { user } = useAuth()
</script>
