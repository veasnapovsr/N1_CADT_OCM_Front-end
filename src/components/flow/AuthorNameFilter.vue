<template>
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
        v-for="author in authors"
        :key="author.value"
        :value="author.value"
      >
        {{ author.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'អ្នកបង្កើតឯកសារ'
  },
  authors: {
    type: Array,
    default: () => []
  }
})

defineEmits(['update:modelValue'])
</script>
