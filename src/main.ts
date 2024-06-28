import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'vue3-toastify/dist/index.css';

const app = createApp(App)

app.use(router)
app.use(Vue3Toastify, {
  autoClose: 3000,
  clearOnUrlChange: false
} as ToastContainerOptions)

app.mount('#app')
