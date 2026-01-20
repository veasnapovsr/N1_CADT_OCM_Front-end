<script setup>
import { folders } from '@/data/folder'
import { Folder } from 'lucide-vue-next'
</script>

<template>
  <div
    class="grid justify-start gap-6
           grid-cols-[repeat(auto-fill,minmax(240px,260px))]"
  >
    <div
      v-for="folder in folders"
      :key="folder.id"
      class="bg-gray-200 rounded-2xl p-5
             hover:bg-gray-300 transition cursor-pointer
             flex flex-col gap-1"
    >
      <div class="w-14 h-14 bg-yellow-300 rounded-xl flex items-center justify-center">
        <Folder class="w-7 h-7 text-gray-600" />
      </div>

      <div class="text-base text-gray-900">
        {{ folder.title }}
      </div>

      <div class="text-sm text-gray-500">
        {{ folder.total }}
      </div>
    </div>
  </div>
</template>
