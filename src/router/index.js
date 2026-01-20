import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import AuthLayout from '../layouts/AuthLayout.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import SidebarLayout from '../components/SidebarLayout.vue'

// Views
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Attendance from '../views/Attendance.vue'
// shedcn
import "vue-sonner/style.css"

// PDF Views
import Flow from '../views/pdf/Flow.vue'
import FlowDashboard from '../views/pdf/FlowDashboard.vue'
import MyDocuments from '../views/pdf/MyDocuments.vue'
import DocumentAddAdministration from '../views/pdf/DocumentAddAdministration.vue'
import DocumentAdd from '../views/pdf/DocumentAdd.vue'
import DocumentEdit from '../views/pdf/DocumentEdit.vue'
import DocumentSuccess from '../views/pdf/DocumentSuccess.vue'
import DocumentDetail from '../views/pdf/DocumentDetail.vue'
import History from '../views/pdf/History.vue'
import SystemLogs from '../views/pdf/SystemLogs.vue'
import Profile from '../views/pdf/Profile.vue'
import About from '../views/pdf/About.vue'
import AllNotification from '../views/pdf/AllNotification.vue'
import FeedBack from '../views/pdf/FeedBack.vue'
import Help from '../views/pdf/Help.vue'
import NotFound from '../views/pdf/NotFound.vue'



/* ----------------------------------
   ROUTES
----------------------------------- */
const routes = [
  //  AUTH (PUBLIC)
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

  
  //  DASHBOARD (PROTECTED)
  {
    path: '/dashboard',
    // component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: Dashboard
      }
    ]
  },

  //  APP PAGES (PROTECTED)
  {
    path: '/app',
    component: SidebarLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'attendance',
        name: 'attendance',
        component: Attendance
      }
    ]
  },

  //  PDF MODULE (PROTECTED)
  {
    path: '/pdf',
    // component: SidebarLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/pdf/flow'
      },
      {
        path: 'flow-dash',
        name: 'pdf-flow-dash',
        component: FlowDashboard
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
        path: 'documents-add2',
        name: 'pdf-documents-add2',
        component: DocumentAddAdministration
      },
      {
        path: 'documents-add',
        name: 'pdf-documents-add',
        component: DocumentAdd
      },
      {
        path: 'documents-edit',
        name: 'pdf-documents-edit',
        component: DocumentEdit
      },
      {
        path: 'documents-success',
        name: 'pdf-documents-success',
        component: DocumentSuccess
      },      
      {
        path: 'documents-detail',
        name: 'pdf-documents-detail',
        component: DocumentDetail
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
      },
      {
        path: 'about',
        name: 'pdf-about',
        component: About
      },
      {
        path: 'notification',
        name: 'pdf-notification',
        component: AllNotification
      },
      {
        path: 'feedback',
        name: 'pdf-feedback',
        component: FeedBack
      },
      {
        path: 'help',
        name: 'pdf-help',
        component: Help
      },
    ]
  },

  //  DEFAULT
  {
    path: '/',
    redirect: '/login'
  },

  //  NOT FOUND
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/login'
  // },
  { 
    path: '/:pathMatch(.*)*',
    component: NotFound }
]

/* ----------------------------------
   ROUTER
----------------------------------- */
const router = createRouter({
  history: createWebHistory(),
  routes
})

/* ----------------------------------
   AUTH GUARD 
----------------------------------- */
const isTokenValid = () => {
  const token = localStorage.getItem('token')
  return !!token && token !== '[object Object]'
}

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(
    route => route.meta.requiresAuth
  )

  if (requiresAuth && !isTokenValid()) {
    localStorage.removeItem('token')
    next('/login')
    return
  }

  if (to.path === '/login' && isTokenValid()) {
    next('/dashboard')
    return
  }

  next()
})

export default router
