<script setup>
import { Toaster } from "vue-sonner"
import { NNotificationProvider, NConfigProvider } from 'naive-ui'
</script>

<template>
  <n-config-provider>
    <n-notification-provider>
      <RouterView />
    </n-notification-provider>
  </n-config-provider>
  <Toaster richColors position="top-center" />
</template>
