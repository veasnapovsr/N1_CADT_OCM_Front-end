<template>
  <div class="items ocm-tooltip">
    <span class="tip_txt">ស្វែងរកតាម ឯកសារបញ្ជូនដល់</span>

    <InputSelect
      :model-value="modelValue || 'all'"
      :options="options"
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
    default: 'ឯកសារបញ្ជូនដល់'
  },
  options: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

function handleUpdate(value) {
  // normalize "all" → empty string
  emit('update:modelValue', value === 'all' ? '' : value)
}
</script>
