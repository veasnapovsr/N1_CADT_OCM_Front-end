sd<template>
  <div class="items">
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      autocomplete="off"
      class="form-control"
    >
      <option value="">{{ placeholder }}</option>
      <option
        v-for="status in statuses"
        :key="status.value"
        :value="status.value"
      >
        {{ status.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
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
      { value: 'approved', label: 'អនុម័តរួច' },
      { value: 'pending', label: 'មិនទាន់អនុម័ត' },
      { value: 'rejected', label: 'មិនយល់ព្រម' }
    ]
  }
})

defineEmits(['update:modelValue'])
</script>
