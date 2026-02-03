<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  /** Document to show in message (title, code) */
  document: {
    type: Object,
    default: null
  },
  /** Whether delete request is in progress (disable confirm button) */
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const displayTitle = () => {
  if (!props.document) return 'ឯកសារ'
  return props.document.title || props.document.code || 'ឯកសារ'
}

const close = () => {
  if (props.loading) return
  emit('update:modelValue', false)
}

const onConfirm = () => {
  if (props.loading) return
  emit('confirm')
}

const onBackdropClick = (e) => {
  if (e.target === e.currentTarget) close()
}
</script>

<template>
  <div
    v-if="modelValue"
    class="ocm-modal-overlay"
    role="dialog"
    aria-modal="true"
    @click="onBackdropClick"
  >
    <div class="ocm-delete-card" @click.stop>
      <!-- Icon Header -->
      <div class="ocm-delete-card__header">
        <div class="ocm-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
          </svg>
        </div>
      </div>

      <!-- Content -->
      <div class="ocm-delete-card__body">
        <h3 class="ocm-title">លុបឯកសារ</h3>
        <p class="ocm-message">តើអ្នកពិតជាចង់លុបឯកសារនេះមែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់ក្រោយបានឡើយ។</p>
        
        <div v-if="document" class="ocm-doc-preview">
          <span class="ocm-doc-label">ឯកសារ៖</span>
          <span class="ocm-doc-name">{{ displayTitle() }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="ocm-delete-card__footer">
        <button
          type="button"
          class="ocm-btn ocm-btn--secondary"
          :disabled="loading"
          @click="close"
        >
          បោះបង់
        </button>
        <button
          type="button"
          class="ocm-btn ocm-btn--danger"
          :disabled="loading"
          @click="onConfirm"
        >
          {{ loading ? 'កំពុងលុប...' : 'យល់ព្រមលុប' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Layout */
.ocm-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 9999;
}

.ocm-delete-card {
  background: #ffffff;
  width: 100%;
  max-width: 400px;
  border-radius: 4px; /* Less rounded */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #e2e8f0;
}

/* Header & Icon */
.ocm-icon-wrapper {
  width: 48px;
  height: 48px;
  background: #fef2f2;
  color: #dc2626;
  border-radius: 4px; /* Less rounded */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.ocm-icon-wrapper svg {
  width: 20px;
  height: 20px;
}

/* Typography */
.ocm-title {
  font-family: 'Kantumruy Pro', 'Hanuman', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem;
}

.ocm-message {
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.5;
  margin: 0 0 1.25rem;
}

/* Document Preview Box */
.ocm-doc-preview {
  background: #f1f5f9;
  border-left: 3px solid #cbd5e1;
  border-radius: 2px; /* Very sharp */
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  margin-bottom: 1.5rem;
}

.ocm-doc-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #64748b;
}

.ocm-doc-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

/* Actions */
.ocm-delete-card__footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.ocm-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 4px; /* Less rounded */
  cursor: pointer;
  border: 1px solid transparent;
}

.ocm-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ocm-btn--secondary {
  background: #ffffff;
  border-color: #cbd5e1;
  color: #334155;
}

.ocm-btn--secondary:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #94a3b8;
}

.ocm-btn--danger {
  background: #dc2626;
  color: #ffffff;
}

.ocm-btn--danger:hover:not(:disabled) {
  background: #b91c1c;
}
</style>