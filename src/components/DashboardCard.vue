<template>
  <button
    class="group relative overflow-hidden
           w-full min-h-[320px]
           p-8 text-white rounded-none
           flex items-center justify-center
           focus:outline-none focus:ring-4 focus:ring-blue-300"
  >
    <!-- 🔵 Base background (always visible) -->
    <div class="absolute inset-0 bg-blue-900"></div>

    <!-- 🌈 Gradient overlay (fade in on hover) -->
    <div
      class="absolute inset-0 opacity-0
             bg-gradient-to-r
             from-blue-500 via-blue-900 to-indigo-500
             bg-[length:180%_180%]
             transition-opacity duration-500
             group-hover:opacity-80
             group-hover:animate-gradient-soft-visible"
    ></div>

    <!-- CONTENT -->
    <div
      class="relative z-10
             flex flex-col items-center justify-center
             text-center"
    >
      <!-- Icon -->
      <component
        :is="iconComponent"
        class="w-20 h-20 text-white opacity-95
               transition-transform duration-300
               group-hover:scale-110"
      />

      <!-- Text -->
      <div class="mt-6">
        <h3 class="text-lg font-semibold mb-2">
          {{ title }}
        </h3>
        <p class="text-sm text-blue-100 leading-relaxed">
          {{ description }}
        </p>
      </div>
    </div>
  </button>
</template>

<script setup>
import {
  Calendar,
  Share2,
  Users,
  FileText,
  Monitor
} from "lucide-vue-next"

const props = defineProps({
  icon: String,
  title: String,
  description: String
})

const icons = {
  calendar: Calendar,
  share: Share2,
  users: Users,
  file: FileText,
  monitor: Monitor
}

const iconComponent = icons[props.icon]
</script>
