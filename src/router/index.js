import { createRouter, createWebHistory } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'

import Login from '../views/login.vue'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 1️⃣ App always starts at /login
    {
      path: '/',
      redirect: '/login'
    },

    // 2️⃣ Login page (NO sidebar)
    {
      path: '/login',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: Login
        }
      ]
    },

    // 3️⃣ Dashboard (WITH sidebar)
    {
      path: '/dashboard',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard
        }
      ]
    }
  ]
})

export default router
