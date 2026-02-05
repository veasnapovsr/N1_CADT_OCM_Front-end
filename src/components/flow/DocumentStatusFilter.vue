<template>
  <div class="items">
    <InputSelect
      :model-value="modelValue"
      :options="statuses"
      track-by="value"
      label="label"
      :placeholder="placeholder"
      :multiple="false"
      :clear-on-select="false"
      @update:model-value="handleUpdate"
    />
  </div>
</template>

<script setup>
import { InputSelect } from '@/components/ui/inputselect'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'ស្ថានភាព'
  },
  statuses: {
    type: Array,
    default: () => [
      { value: 'all', label: 'ទាំងអស់' },
      { value: 'approved', label: 'អនុម័តរួច' },
      { value: 'pending', label: 'មិនទាន់អនុម័ត' },
      { value: 'rejected', label: 'មិនយល់ព្រម' }
    ]
  }
})

const emit = defineEmits(['update:modelValue'])

function handleUpdate(value) {
  // InputSelect already extracts the value, but ensure we emit it correctly
  emit('update:modelValue', value === 'all' ? '' : value)
}
</script>
