<template>
  <div class="items input-wrapper inpdate">
    <FlatPickr
      :model-value="modelValue"
      placeholder="កាលបរិច្ឆេទ"
      :config="flatpickrConfig"
      @update:model-value="onDateChange"
    />
    <div class="prefix pre_end"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="3 2 18 20"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" fill="currentColor"></path></svg></div>
  </div>
</template>

<script setup>
import { FlatPickr } from '@/components/ui/flat-pickr'

defineProps({
  modelValue: {
    type: [String, Date],
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const flatpickrConfig = {
  dateFormat: 'd-m-Y',
  altInput: true,
  altFormat: 'd-m-Y',
  allowInput: true
}

function onDateChange(value) {
  emit('update:modelValue', value)
}
</script>
