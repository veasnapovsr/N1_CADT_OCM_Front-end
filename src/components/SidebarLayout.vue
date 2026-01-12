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
          :active="active === item.key"
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import logoimg from '../assets/logo.png'

import {
  Home,
  CalendarCheck,
  Briefcase,
  Users,
  FileText,
  CalendarDays,
  Menu
} from 'lucide-vue-next'

const router = useRouter()
const collapsed = ref(false)
const active = ref('dashboard')

const menuOptions = [
  { key: 'dashboard', label: 'ទំព័រដើម', icon: Home, path: '/' },
  { key: 'attendance', label: 'វត្តមាន', icon: CalendarCheck, path: '/attendance' },
  { key: 'cabinet', label: 'លេខទីស្តីការគណៈរដ្ឋមន្ត្រី', icon: Briefcase, path: '/cabinet' },
  { key: 'officials', label: 'មន្ត្រីរាជការមុខងារសាធារណៈ', icon: Users, path: '/officials' },
  { key: 'documents', label: 'ឯកសារច្បាប់និងលិខិតបទដ្ឋាន', icon: FileText, path: '/documents' },
  { key: 'meetings', label: 'កិច្ចប្រជុំគណៈរដ្ឋមន្ត្រី', icon: CalendarDays, path: '/meetings' }
]

function onSelect(item) {
  active.value = item.key
  if (item.path) router.push(item.path)
}
</script>
