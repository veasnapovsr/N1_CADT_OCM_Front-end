<template>
  <div class="w-full bg-white rounded-2xl border border-gray-100 shadow-sm">

    <!-- Header -->
    <div class="px-5 py-4 border-b border-gray-100">
      <h2 class="text-base font-semibold text-gray-800 tracking-wide flex items-center justify-between">
        <span>អ្នកអនឡាញ</span>
        <span class="text-xs text-green-600 font-medium">
          ({{ onlineUsers.length }})
        </span>
      </h2>
    </div>

    <!-- List -->
    <div class="max-h-170 overflow-y-auto">
      <div
        v-for="user in onlineUsers"
        :key="user.value"
        class="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition group"
      >
        <div class="flex items-center gap-4">

          <!-- Avatar -->
          <div class="relative">
            <img
              :src="user.img"
              :alt="user.name"
              class="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100"
              loading="lazy"
              referrerpolicy="no-referrer"
              @error="onImgError($event, user.name)"
            />

            <!-- Online Pulse -->
            <span
              class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white animate-pulse"
            />
          </div>

          <!-- Info -->
          <div class="leading-tight">
            <p class="text-sm font-medium text-gray-800 group-hover:text-gray-900">
              {{ user.name }}
            </p>
            <p class="text-xs text-gray-500">
              Active now
            </p>
          </div>

        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!onlineUsers.length"
        class="px-5 py-8 text-center text-sm text-gray-400"
      >
        មិនមានអ្នកអនឡាញ
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { leaders } from '@/data/leader'

// Fallback avatar generator
const avatarFallback = (name) =>
  `https://ui-avatars.com/api/?background=E5E7EB&color=374151&name=${encodeURIComponent(name)}`

// Handle broken image
const onImgError = (e, name) => {
  e.target.src = avatarFallback(name)
}

// Online users state
const onlineUsers = ref([])

onMounted(() => {
  onlineUsers.value = leaders
    .filter(() => Math.random() > 0.65)
    .slice(0, 10)
    .map(l => ({
      value: l.value,
      name: l.name,
      img: l.img || avatarFallback(l.name),
    }))
})
</script>
