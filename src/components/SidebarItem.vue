<template>
  <div class="w-full">
    <!-- Main button -->
    <button
      class="w-full flex items-center justify-between gap-3 px-4 py-2 text-sm transition
             hover:bg-yellow/200"
      :class="active ? 'text-black font-medium' : 'text-white'"
      @click="onClick"
    >
      <div class="flex items-center gap-3">
        <!-- Icon -->
        <component
          :is="item.icon"
          class="w-5 h-5 flex-shrink-0"
        />

        <!-- Label -->
        <span v-if="!collapsed" class="truncate">
          {{ item.label }}
        </span>
      </div>

      <!-- Arrow for submenu -->
      <span
        v-if="item.children && !collapsed"
        class="text-xs transition-transform"
        :class="expanded ? 'rotate-90' : ''"
      >
        ▶
      </span>
    </button>

    <!-- Submenu -->
    <div
      v-if="expanded && item.children && !collapsed"
      class="ml-8 flex flex-col"
    >
      <button
        v-for="child in item.children"
        :key="child.key"
        class="w-full px-4 py-1 text-sm text-gray-200
               hover:bg-white/10 text-left"
        @click.stop="$emit('select', child)"
      >
        {{ child.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
  collapsed: Boolean,
  active: Boolean
})

const emit = defineEmits(['select'])
const expanded = ref(false)

function onClick() {
  if (props.item.children) {
    expanded.value = !expanded.value
  } else {
    emit('select', props.item)
  }
}
</script>
