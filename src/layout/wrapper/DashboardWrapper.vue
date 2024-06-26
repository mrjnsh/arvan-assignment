<script setup>
import { useAuth } from '@/modules/useAuth'
import NavbarTemplate from '../navbar/NavbarTemplate.vue'
import SidebarTemplate from '../sidebar/SidebarTemplate.vue'
import LoadingTemplate from '@/components/Loading/LoadingTemplate.vue'

const { authenticating } = useAuth()
</script>

<template>
  <div>
    <NavbarTemplate />
  </div>
  <div class="container-fluid">
    <LoadingTemplate v-if="authenticating" />
    <div class="row" v-else>
      <SidebarTemplate />
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
