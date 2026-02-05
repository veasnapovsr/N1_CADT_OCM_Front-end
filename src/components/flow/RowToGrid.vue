<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: 'row' // row | grid
  }
})

const emit = defineEmits(['update:modelValue'])

const setView = (view) => {
  emit('update:modelValue', view)
}
</script>

<template>
  <div class="ocm_layout_w d-flex">
  <div class="d-flex ocm_ac_view">
    <!-- Row -->
    <span
      @click="setView('row')"
      :class="[
        'acv_it d-flex',
        modelValue === 'row'
          ? 'active'
          : ''
      ]"
      title="Row view"
    >      
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="2 4 20 16"><g fill="none"><path d="M4.25 4A2.25 2.25 0 0 0 2 6.25v2.5A2.25 2.25 0 0 0 4.25 11h2.5A2.25 2.25 0 0 0 9 8.75v-2.5A2.25 2.25 0 0 0 6.75 4h-2.5zm7 1a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5h-10zm0 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7zm-7 5A2.25 2.25 0 0 0 2 15.25v2.5A2.25 2.25 0 0 0 4.25 20h2.5A2.25 2.25 0 0 0 9 17.75v-2.5A2.25 2.25 0 0 0 6.75 13h-2.5zm7 1a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5h-10zm0 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7z" fill="currentColor"></path></g></svg>
    </span>

    <!-- Grid -->
    <span
      @click="setView('grid')"
      :class="[
        'acv_it d-flex',
        modelValue === 'grid'
          ? 'active'
          : ''
      ]"
      title="Grid view"
    >      
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="32 32 448 448"><path d="M204 240H68a36 36 0 0 1-36-36V68a36 36 0 0 1 36-36h136a36 36 0 0 1 36 36v136a36 36 0 0 1-36 36z" fill="currentColor"></path><path d="M444 240H308a36 36 0 0 1-36-36V68a36 36 0 0 1 36-36h136a36 36 0 0 1 36 36v136a36 36 0 0 1-36 36z" fill="currentColor"></path><path d="M204 480H68a36 36 0 0 1-36-36V308a36 36 0 0 1 36-36h136a36 36 0 0 1 36 36v136a36 36 0 0 1-36 36z" fill="currentColor"></path><path d="M444 480H308a36 36 0 0 1-36-36V308a36 36 0 0 1 36-36h136a36 36 0 0 1 36 36v136a36 36 0 0 1-36 36z" fill="currentColor"></path></svg> 
    </span>
  </div>
</div>
</template>
