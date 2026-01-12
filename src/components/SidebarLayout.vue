<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-blue-900 flex flex-col transition-all duration-200',
        collapsed ? 'w-14' : 'w-64'
      ]"
    >
      <!-- Header -->
      <div
        class="h-28 flex flex-col items-center justify-center
               border-b border-blue-800 text-white font-semibold"
      >
        <img
          v-if="!collapsed"
          :src="logoimg"
          class="h-16 mb-2"
          alt="Logo"
        />
        <span v-if="!collapsed">ប្រព័ន្ធគ្រប់គ្រង</span>
        <Menu v-else class="w-6 h-6" />
      </div>

      <!-- Menu -->
      <nav class="flex-1 py-4 space-y-2">
        <SidebarItem
          v-for="item in menuOptions"
          :key="item.key"
          :item="item"
          :collapsed="collapsed"
          :active="activeKey === item.key"
          @select="onSelect"
        />
      </nav>

      <!-- Collapse toggle -->
      <button
        class="h-12 flex items-center justify-center text-white
               border-t border-blue-800 hover:bg-white/10"
        @click="collapsed = !collapsed"
      >
        <Menu class="w-5 h-5" />
      </button>
    </aside>

    <!-- Content -->
    <main class="flex-1 p-6 overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SidebarItem from '@/components/SidebarItem.vue'
import logoimg from '@/assets/logo.png'

import {
  Home,
  CalendarCheck,
  Briefcase,
  Users,
  FileText,
  CalendarDays,
  Menu,
  Folder,
  History,
  ClipboardList,
  User
} from 'lucide-vue-next'

/* ===============================
   BASIC STATE
================================ */
const router = useRouter()
const route = useRoute()
const collapsed = ref(false)

/* ===============================
   OLD APP SIDEBAR (UNCHANGED)
================================ */
const appMenuOptions = [
  {
    key: 'dashboard',
    label: 'ទំព័រដើម',
    icon: Home,
    path: '/dashboard'
  },
  {
    key: 'attendance',
    label: 'វត្តមាន',
    icon: CalendarCheck,
    path: '/app/attendance'
  },
  {
    key: 'cabinet',
    label: 'លេខទីស្តីការគណៈរដ្ឋមន្ត្រី',
    icon: Briefcase,
    path: '/app/cabinet'
  },
  {
    key: 'officials',
    label: 'មន្ត្រីរាជការមុខងារសាធារណៈ',
    icon: Users,
    path: '/app/officials'
  },
  {
    key: 'documents',
    label: 'ឯកសារច្បាប់និងលិខិតបទដ្ឋាន',
    icon: FileText,
    path: '/app/documents'
  },
  {
    key: 'meetings',
    label: 'កិច្ចប្រជុំគណៈរដ្ឋមន្ត្រី',
    icon: CalendarDays,
    path: '/app/meetings'
  }
]

/* ===============================
   PDF DOCUMENT SIDEBAR
================================ */
const pdfMenuOptions = [
  {
    key: 'pdf-dashboard',
    label: 'ទំព័រដើម',
    icon: Home,
    path: '/dashboard'
  },
  {
    key: 'flow',
    label: 'លំហូរឯកសារ',
    icon: FileText,
    path: '/pdf/flow'
  },
  {
    key: 'my-documents',
    label: 'ឯកសាររបស់ខ្ញុំ',
    icon: Folder,
    path: '/pdf/my-documents'
  },
  {
    key: 'history',
    label: 'ប្រវត្តិឯកសារ',
    icon: History,
    path: '/pdf/history'
  },
  {
    key: 'logs',
    label: 'Logs ប្រព័ន្ធគ្រប់គ្រង',
    icon: ClipboardList,
    path: '/pdf/logs'
  },
  {
    key: 'profile',
    label: 'ព័ត៌មានផ្ទាល់ខ្លួន',
    icon: User,
    path: '/pdf/profile'
  }
]

/* ===============================
   SIDEBAR SWITCH (BY ROUTE)
================================ */
const menuOptions = computed(() => {
  return route.path.startsWith('/pdf')
    ? pdfMenuOptions
    : appMenuOptions
})

/* ===============================
   ACTIVE MENU (FIXED & STABLE)
================================ */
const activeKey = computed(() => {
  const currentPath = route.path

  // 1️⃣ Exact match (highest priority)
  const exact = menuOptions.value.find(
    item => item.path === currentPath
  )
  if (exact) return exact.key

  // 2️⃣ Child route match (stable fallback)
  const prefix = menuOptions.value.find(
    item =>
      currentPath.startsWith(item.path + '/') ||
      currentPath === item.path
  )

  return prefix?.key
})

/* ===============================
   NAVIGATION
================================ */
function onSelect(item) {
  if (item.path !== route.path) {
    router.push(item.path)
  }
}
</script>
