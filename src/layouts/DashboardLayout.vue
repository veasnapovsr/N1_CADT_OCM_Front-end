<!-- src/layouts/DashboardLayout.vue -->
<template>
  <main class="relative min-h-screen overflow-hidden">
    <!-- White overlay -->
    <div class="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

    <!-- Foreground content -->
    <div class="relative z-10 min-h-screen flex flex-col">
      <!-- Top Bar -->
      <TopBar />

      <!-- Page Content -->
      <div class="flex-1 p-6">
        <router-view />
      </div>
    </div>
  </main>
</template>

<script setup>
import TopBar from "@/components/topbar.vue";
</script>
