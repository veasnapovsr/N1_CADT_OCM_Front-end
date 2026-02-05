<script setup>
import FlatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

const props = defineProps({
  modelValue: {
    type: [String, Date, Array],
    default: null
  },
  placeholder: {
    type: String,
    default: 'ជ្រើសរើសកាលបរិច្ឆេទ'
  },
  config: {
    type: Object,
    default: () => ({
      dateFormat: 'd-m-Y',
      altInput: true,
      altFormat: 'd-m-Y',
      allowInput: true
    })
  }
})

const emit = defineEmits(['update:modelValue'])

function handleUpdate(value) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="flatpickr-wrapper">
    <FlatPickr
      :model-value="modelValue"
      :placeholder="placeholder"
      :config="config"
      @update:model-value="handleUpdate"
    />
  </div>
</template>