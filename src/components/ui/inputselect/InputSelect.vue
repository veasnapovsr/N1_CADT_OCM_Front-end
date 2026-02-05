<script setup>
import { computed } from 'vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'

const props = defineProps({
  modelValue: {
    type: [Object, Array, String, Number],
    default: null
  },
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  trackBy: {
    type: String,
    default: 'value'
  },
  label: {
    type: String,
    default: 'name'
  },
  placeholder: {
    type: String,
    default: 'ជ្រើសរើស'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  clearOnSelect: {
    type: Boolean,
    default: false
  },
  hideSelected: {
    type: Boolean,
    default: true
  },
  closeOnSelect: {
    type: Boolean,
    default: true
  },
  customLabel: {
    type: Function,
    default: null
  },
  noResultText: {
    type: String,
    default: 'មិនមានទេ'
  }
})

const emit = defineEmits(['update:modelValue'])

function formatOption(option) {
  if (props.customLabel) {
    return props.customLabel(option)
  }
  return option[props.label] || option.name || option
}

function handleUpdate(value) {
  // If single select and value is an object, extract the value property
  if (!props.multiple && value && typeof value === 'object' && props.trackBy) {
    emit('update:modelValue', value[props.trackBy])
  } else {
    emit('update:modelValue', value)
  }
}

function clearSelection() {
  emit('update:modelValue', null)
}

// Convert string value to object for vue-multiselect
const getModelValue = computed(() => {
  if (!props.modelValue) return null
  if (props.multiple) return props.modelValue
  // If modelValue is a string/number, find the matching object
  if (typeof props.modelValue !== 'object') {
    return props.options.find(opt => opt[props.trackBy] === props.modelValue) || null
  }
  return props.modelValue
})
</script>

<template>
  <div class="inputselect-wrapper">
    <Multiselect
      :model-value="getModelValue"
      :options="options"
      :track-by="trackBy"
      :label="label"
      :placeholder="placeholder"
      :multiple="multiple"
      :clear-on-select="clearOnSelect"
      :hide-selected="hideSelected"
      :close-on-select="closeOnSelect"
      :custom-label="customLabel || formatOption"
      @update:model-value="handleUpdate"
    >
      <!-- Selected option -->
      <template #singleLabel="{ option }">
        <slot name="singleLabel" :option="option">
          <div class="ocm_cus_opt">
            <img v-if="option.img" class="option__image" :src="option.img" />
            <span>{{ option[label] || option.name || option }}</span>
          </div>
        </slot>
      </template>

      <!-- Clear button -->
      <template #clear>
        <slot name="clear" :clear="clearSelection">
          <div
            v-if="modelValue"
            class="multiselect__clear"
            @click.stop="clearSelection"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="2 2 20 20"
            >
              <path
                d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z"
                fill="currentColor"
              />
            </svg>
          </div>
        </slot>
      </template>

      <!-- Dropdown options -->
      <template #option="{ option }">
        <slot name="option" :option="option">
          <div class="ocm_cus_opt">
            <img v-if="option.img" :src="option.img" />
            <span>{{ option[label] || option.name || option }}</span>
          </div>
        </slot>
      </template>

      <!-- No results -->
      <template #noResult>
        <slot name="noResult">
          <span>{{ noResultText }}</span>
        </slot>
      </template>
    </Multiselect>
  </div>
</template>