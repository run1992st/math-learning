import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/TheDefaultPage.vue'
import Rotator from './pages/TheRotatorPage.vue'
import Shader from './pages/TheShaderPage.vue'

import './assets/main.css'
const routes = [
  { path: '/', component: Home },
  { path: '/rotator/', component: Rotator },
  { path: '/shader', component: Shader },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
