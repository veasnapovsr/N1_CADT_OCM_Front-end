<template>
  <div class="w-full">
    <!-- Main button -->
    <button
      class="group w-full flex items-center justify-between gap-3 px-4 py-2 text-sm
             transition-all duration-300 ease-out
             hover:bg-yellow-200 hover:pl-5 hover:text-black"
      :class="isActive
        ? 'bg-yellow-400 text-black font-medium'
        : 'text-white'"
      @click="onClick"
    >
      <div class="flex items-center gap-3">
        <!-- Icon -->
        <component
          :is="item.icon"
          class="w-5 h-5 flex-shrink-0
                 transition-colors duration-300"
          :class="isActive
            ? 'text-black'
            : 'text-white group-hover:text-black'"
        />

        <!-- Label -->
        <span v-if="!collapsed" class="truncate">
          {{ item.label }}
        </span>
      </div>

      <!-- Arrow -->
      <span
        v-if="item.children && !collapsed"
        class="text-xs transition-all duration-300"
        :class="[
          expanded ? 'rotate-90 text-black' : '',
          !isActive && 'text-white group-hover:text-black'
        ]"
      >
        ▶
      </span>
    </button>

    <!-- Submenu -->
    <div
      v-if="expanded && item.children && !collapsed"
      class="ml-8 mt-1 flex flex-col space-y-1"
    >
      <button
        v-for="child in item.children"
        :key="child.key"
        class="group w-full px-4 py-1.5 text-sm text-gray-200 text-left
               transition-all duration-300 ease-out
               hover:bg-yellow-200 hover:text-black hover:pl-5"
        @click.stop="$emit('select', child)"
      >
        {{ child.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
  collapsed: Boolean,
  active: Boolean
})

const emit = defineEmits(['select'])
const expanded = ref(false)

const isActive = computed(() => props.active)

function onClick() {
  if (props.item.children) {
    expanded.value = !expanded.value
  } else {
    emit('select', props.item)
  }
}
</script>
