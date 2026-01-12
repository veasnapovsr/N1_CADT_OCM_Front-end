import { createRouter, createWebHistory } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import SidebarLayout from '../components/SidebarLayout.vue'

import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Attendance from '../views/Attendance.vue'

// PDF views
import PdfDashboard from '../views/pdf/PdfDashboard.vue'
import Flow from '../views/pdf/Flow.vue'
import MyDocuments from '../views/pdf/MyDocuments.vue'
import History from '../views/pdf/History.vue'
import SystemLogs from '../views/pdf/SystemLogs.vue'
import Profile from '../views/pdf/Profile.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 🔐 AUTH (no sidebar)
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

    // 📊 DASHBOARD (no sidebar)
    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard
        }
      ]
    },

    // 🧱 APP PAGES (OLD SIDEBAR - KEEP)
    {
      path: '/app',
      component: SidebarLayout,
      children: [
        {
          path: 'attendance',
          name: 'attendance',
          component: Attendance
        }
        // future app pages go here
      ]
    },

    // 📄 PDF DOCUMENT (NEW SIDEBAR)
    {
  path: '/pdf',
  component: SidebarLayout,
  children: [
    {
      path: '',
      redirect: '/pdf/flow'
    },
    {
      path: 'flow',
      name: 'pdf-flow',
      component: Flow
    },
    {
      path: 'my-documents',
      name: 'pdf-my-documents',
      component: MyDocuments
    },
    {
      path: 'history',
      name: 'pdf-history',
      component: History
    },
    {
      path: 'logs',
      name: 'pdf-logs',
      component: SystemLogs
    },
    {
      path: 'profile',
      name: 'pdf-profile',
      component: Profile
    }
  ]
},


    // Default
    {
      path: '/',
      redirect: '/login'
    }
  ]
})

export default router
