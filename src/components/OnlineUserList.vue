<template>
  <div
    class="w-full bg-[var(--ocm-app-bg,#ffffff)] rounded-2xl
           border border-(--ocm-app-border,#e2e8f0) shadow-sm"
  >
    <!-- Header -->
    <div
      class="px-5 py-4 border-b border-(--ocm-app-border,#e2e8f0)"
    >
      <h2
        class="text-base font-semibold
               tracking-wide flex items-center justify-between"
      >
        <span>អ្នកអនឡាញ</span>
        <span
          class="text-xs font-medium
                 text-[var(--ocm-app-success,#16a34a)]"
        >
          ({{ onlineUsers.length }})
        </span>
      </h2>
    </div>

    <!-- List -->
    <div class="max-h-170 overflow-y-auto">
      <div
        v-for="user in onlineUsers"
        :key="user.value"
        class="flex items-center justify-between px-5 py-4
               hover:bg-[var(--ocm-app-hover,#f8fafc)]
               transition group"
      >
        <div class="flex items-center gap-4">

          <!-- Avatar -->
          <div class="relative">
            <img
              :src="user.img"
              :alt="user.name"
              class="w-11 h-11 rounded-full object-cover
                     ring-2 ring-(--ocm-app-border,#e2e8f0)"
              loading="lazy"
              referrerpolicy="no-referrer"
              @error="onImgError($event, user.name)"
            />

            <!-- Online Pulse -->
            <span
              class="absolute bottom-0 right-0 w-3 h-3
                     bg-[var(--ocm-app-success,#22c55e)]
                     rounded-full ring-2
                     ring-[var(--ocm-app-bg,#ffffff)]
                     animate-pulse"
            />
          </div>

          <!-- Info -->
          <div class="leading-tight">
            <p
              class="text-sm font-medium
                     group-hover:text-[var(--ocm-app-text-strong,#111827)]"
            >
              {{ user.name }}
            </p>
            <p
              class="text-xs"
            >
              Active now
            </p>
          </div>

        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!onlineUsers.length"
        class="px-5 py-8 text-center text-sm
               text-[var(--ocm-app-muted,#9ca3af)]"
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
