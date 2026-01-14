<template>
  <div class="items ocm-tooltip">
    <span class="tip_txt">ស្វែងរកតាម ឯកសារ លិខិតលេខ<br> ឈ្មោះអ្នកបង្កើតឯកសារ</span>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-control honor_search_text"
      :placeholder="placeholder"
    />
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
    default: 'ឯកសារ លិខិតលេខ'
  }
})

defineEmits(['update:modelValue'])
</script>
