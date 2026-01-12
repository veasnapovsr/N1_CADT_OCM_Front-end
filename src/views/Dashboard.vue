<template>
  <main class="relative min-h-screen overflow-hidden">
    <!-- Background image -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${realbackground})` }"
    ></div>

    <!-- White overlay -->
    <div class="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

    <!-- Content -->
    <div class="relative z-10 min-h-screen p-6">
      <DashboardGrid />
    </div>
  </main>
</template>

<script setup>
import DashboardGrid from "../components/DashboardGrid.vue"
</script>
