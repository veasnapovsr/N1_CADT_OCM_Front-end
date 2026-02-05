<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const open = ref(false)
const value = ref('')
const searchQuery = ref('')
const dropdownRef = ref(null)
const buttonRef = ref(null)

const options = [
  { value: 'report', label: 'Report' },
  { value: 'letter', label: 'Letter' },
  { value: 'memo', label: 'Memo' }
]

const filteredOptions = computed(() => {
  if (!searchQuery.value) return options
  const query = searchQuery.value.toLowerCase()
  return options.filter(opt => opt.label.toLowerCase().includes(query))
})

function onSelect(selectedValue) {
  value.value = selectedValue
  open.value = false
  searchQuery.value = ''
}

function toggleOpen() {
  open.value = !open.value
}

function getDisplayText() {
  const option = options.find(opt => opt.value === value.value)
  return option ? option.label : 'Select document type'
}

function handleClickOutside(event) {
  if (
    open.value &&
    dropdownRef.value &&
    buttonRef.value &&
    !dropdownRef.value.contains(event.target) &&
    !buttonRef.value.contains(event.target)
  ) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative w-[260px]">
    <button
      ref="buttonRef"
      type="button"
      role="combobox"
      :aria-expanded="open"
      @click="toggleOpen"
      class="w-full h-9 px-3 py-2 text-sm border border-input bg-background rounded-md shadow-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-between text-left"
    >
      <span class="truncate">{{ getDisplayText() }}</span>
      <svg
        class="h-4 w-4 opacity-50 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <div
      v-if="open"
      ref="dropdownRef"
      class="absolute z-[9999] w-[260px] mt-1 rounded-xl border bg-white shadow-md overflow-hidden"
    >
      <div class="p-2 border-b">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search document type…"
          class="w-full h-9 px-3 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <ul class="max-h-60 overflow-y-auto">
        <li
          v-if="filteredOptions.length === 0"
          class="px-4 py-2 text-sm text-gray-500"
        >
          No result found
        </li>
        <li
          v-for="option in filteredOptions"
          :key="option.value"
          @click="onSelect(option.value)"
          class="px-4 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>
