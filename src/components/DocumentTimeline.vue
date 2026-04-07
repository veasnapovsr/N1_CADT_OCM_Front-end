<template>
  <div class="document-flow-panel">
    <div class="timeline_top">
      <h3 class="text-lg font-khmer font-bold mb-6 t-lspace">
        ស្ថានភាពដំណើរការឯកសារ
      </h3>

      <div class="space-y-6 dc_time_wr">
        <div
          v-for="(step, index) in flowSteps"
          :key="step.id"
          class="flex gap-3 dc_time_items"
        >
          <div class="dc_time_l relative flex flex-col items-center">
            <div class="w-7 h-7 rounded-full flex items-center justify-center dc_time_ic" :class="circleClass(step.status)">
              <svg v-if="step.status === 'completed'" viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else-if="step.status === 'current'" viewBox="0 0 192 512" class="w-3 h-3" fill="currentColor">
                <path d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72s72-32.235 72-72S135.764 0 96 0z" />
              </svg>
              <svg v-else-if="step.status === 'returned'" viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span v-else class="text-[11px] font-bold">{{ index + 1 }}</span>
            </div>

            <div
              v-if="index < flowSteps.length - 1"
              class="w-px flex-1 mt-1 border-dashed dc_time_line"
              :class="lineClass(step.status)"
            ></div>
          </div>

          <div class="flex-1 dc_time_con">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="font-semibold t-lspace" :class="textClass(step.status)">
                  {{ step.title }}
                </p>
                <p class="text-sm text-slate-600 leading-6">
                  {{ getStepSubtitle(step) }}
                </p>
              </div>

              <button
                v-if="canSendBack && currentStep?.id === step.id"
                type="button"
                class="dc_action-link"
                @click="handleSendBack"
              >
                ↩ បញ្ជូនទៅវិញ
              </button>
            </div>

            <span v-if="step.actedAt" class="text-xs text-slate-500 block mt-1">
              {{ formatActionTime(step.actedAt) }}
            </span>

            <div v-if="step.comments.length" class="dc_comments mt-3 space-y-2">
              <div
                v-for="entry in step.comments"
                :key="entry.id"
                class="dc_comment"
                :class="commentClass(entry.type)"
              >
                <div class="dc_comment_meta">
                  <strong>{{ entry.actorName || 'មិនបានបញ្ជាក់' }}</strong>
                  <span>{{ formatActionTime(entry.createdAt) }}</span>
                </div>
                <p>{{ entry.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dc_composer">
      <div class="dc_composer_header">
        <h4 class="font-khmer font-semibold t-lspace">
          {{ currentStep ? `មតិយោបល់សម្រាប់ ${currentStep.title}` : 'លំហូរបានបញ្ចប់' }}
        </h4>
        <span v-if="flowState?.currentRecipient" class="dc_recipient_badge">
          កំពុងរង់ចាំ: {{ flowState.currentRecipient }}
        </span>
      </div>

      <p v-if="currentStep && !canActOnCurrentStep" class="dc_permission_hint">
        {{ permissionHint }}
      </p>

      <textarea
        v-model="commentDraft"
        rows="4"
        :disabled="!canActOnCurrentStep"
        placeholder="បញ្ចូលមតិយោបល់មុនបញ្ជូនឯកសារ..."
        class="w-full rounded-sm border p-3 text-sm focus:ring-2 focus:ring-blue-500"
      />

      <div class="dc_composer_actions">
        <button
          type="button"
          class="inline-flex items-center btn_dc btn_dc--secondary"
          :disabled="!canActOnCurrentStep || !commentDraft.trim()"
          @click="handleCommentOnly"
        >
          បញ្ចូលមតិយោបល់
        </button>

        <button
          v-if="currentStep"
          type="button"
          class="inline-flex items-center btn_dc btn_dc--primary"
          :disabled="!canActOnCurrentStep"
          @click="handleForward"
        >
          {{ isFinalStep ? 'អនុម័តឯកសារ' : 'បញ្ជូនបន្ត' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import { formatDateKhmer, formatKhmerNumber } from '@/lib/utils'
import {
  addCommentToCurrentFlowStep,
  forwardCurrentFlowStep,
  getAllowedFlowStepIds,
  getStoredDocumentFlowState,
  saveStoredDocumentFlowState,
  sendBackCurrentFlowStep
} from '@/lib/documentFlow'
import { getUser, isAdmin } from '@/plugins/authentication'

const props = defineProps({
  documentId: {
    type: [Number, String],
    required: true
  },
  transaction: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['updated'])

const flowState = ref(getStoredDocumentFlowState(props.documentId, props.transaction))
const commentDraft = ref('')

const syncFlowState = () => {
  flowState.value = getStoredDocumentFlowState(props.documentId, props.transaction)
}

watch(
  () => [props.documentId, props.transaction?.id, props.transaction?.updated_at],
  () => {
    syncFlowState()
    commentDraft.value = ''
  },
  { immediate: true }
)

const flowSteps = computed(() => flowState.value?.steps || [])
const currentStep = computed(() => flowSteps.value.find((step) => step.id === flowState.value?.activeStepId) || null)
const isFinalStep = computed(() => Boolean(currentStep.value && currentStep.value.id === flowSteps.value.length))
const currentUser = computed(() => getUser() || {})
const userIsAdmin = computed(() => isAdmin())
const allowedStepIds = computed(() => getAllowedFlowStepIds(currentUser.value, { isAdmin: userIsAdmin.value }))
const canActOnCurrentStep = computed(() => Boolean(currentStep.value && allowedStepIds.value.includes(currentStep.value.id)))
const canSendBack = computed(() => Boolean(canActOnCurrentStep.value && currentStep.value && currentStep.value.id > 1))
const permissionHint = computed(() => {
  if (!currentStep.value) {
    return ''
  }

  if (allowedStepIds.value.length === 0) {
    return `អ្នកមិនមានសិទ្ធិដំណើរការជំហាន ${currentStep.value.title} ទេ។`
  }

  return `អ្នកអាចដំណើរការបានតែជំហាន ${allowedStepIds.value.map((stepId) => flowSteps.value.find((step) => step.id === stepId)?.title).filter(Boolean).join(' / ')} ប៉ុណ្ណោះ។`
})

const currentActorName = computed(() => {
  const user = getUser() || {}
  const parts = [
    user.countesy?.name || user.countesy_name || '',
    user.lastname && user.firstname ? `${user.lastname} ${user.firstname}` : user.fullname || ''
  ].filter(Boolean)

  return parts.join(' ').trim() || 'អ្នកប្រើប្រាស់បច្ចុប្បន្ន'
})

const persistState = (nextState, successMessage) => {
  const savedState = saveStoredDocumentFlowState(props.documentId, nextState)
  flowState.value = savedState
  commentDraft.value = ''
  emit('updated', savedState)
  if (successMessage) {
    toast.success(successMessage)
  }
}

const handleCommentOnly = () => {
  if (!canActOnCurrentStep.value || !commentDraft.value.trim()) {
    return
  }

  const nextState = addCommentToCurrentFlowStep(flowState.value, {
    actorName: currentActorName.value,
    message: commentDraft.value
  })

  persistState(nextState, 'បានរក្សាទុកមតិយោបល់')
}

const handleForward = () => {
  if (!canActOnCurrentStep.value) {
    return
  }

  const nextState = forwardCurrentFlowStep(flowState.value, {
    actorName: currentActorName.value,
    message: commentDraft.value
  })

  persistState(nextState, isFinalStep.value ? 'បានអនុម័តឯកសារ' : 'បានបញ្ជូនឯកសារទៅជំហានបន្ទាប់')
}

const handleSendBack = () => {
  if (!canActOnCurrentStep.value) {
    return
  }

  const nextState = sendBackCurrentFlowStep(flowState.value, {
    actorName: currentActorName.value,
    message: commentDraft.value
  })

  persistState(nextState, 'បានបញ្ជូនឯកសារត្រឡប់ទៅជំហានមុន')
}

const formatActionTime = (value) => {
  if (!value) {
    return ''
  }

  const dateValue = new Date(value)
  if (Number.isNaN(dateValue.getTime())) {
    return value
  }

  const datePart = formatDateKhmer(dateValue.toISOString())
  const timePart = formatKhmerNumber(
    dateValue.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  )

  return `${datePart} ${timePart}`
}

const getStepSubtitle = (step) => {
  if (step.status === 'completed') {
    return step.actedBy ? `បានពិនិត្យដោយ • ${step.actedBy}` : 'បានបញ្ចប់ជំហាននេះ'
  }

  if (step.status === 'returned') {
    return step.actedBy ? `បានបញ្ជូនត្រឡប់ដោយ • ${step.actedBy}` : 'បានបញ្ជូនត្រឡប់ទៅជំហានមុន'
  }

  if (step.status === 'current') {
    return step.assigneeName ? `កំពុងពិនិត្យដោយ • ${step.assigneeName}` : 'កំពុងរង់ចាំការពិនិត្យ'
  }

  return step.assigneeName ? `រង់ចាំ • ${step.assigneeName}` : 'កំពុងរង់ចាំ'
}

const circleClass = (status) => {
  if (status === 'completed') return 'dc_time_ic--completed'
  if (status === 'returned') return 'dc_time_ic--returned'
  if (status === 'current') return 'dc_time_ic--current'
  return 'dc_time_ic--pending'
}

const lineClass = (status) => {
  if (status === 'completed') return 'dc_time_line--completed'
  if (status === 'returned') return 'dc_time_line--returned'
  if (status === 'current') return 'dc_time_line--current'
  return 'dc_time_line--pending'
}

const textClass = (status) => {
  if (status === 'completed') return 'text-emerald-600'
  if (status === 'returned') return 'text-red-600'
  if (status === 'current') return 'text-blue-600'
  return 'text-slate-500'
}

const commentClass = (type) => {
  if (type === 'return') return 'dc_comment--returned'
  if (type === 'approve') return 'dc_comment--approved'
  return 'dc_comment--default'
}
</script>

<style scoped>
.document-flow-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  gap: 24px;
}

.dc_time_wr {
  display: flex;
  flex-direction: column;
}

.dc_time_items,
.dc_time_ic {
  position: relative;
  z-index: 2;
}

.dc_time_con {
  padding-bottom: 12px;
}

.dc_time_l::before {
  content: '';
  z-index: 1;
  position: absolute;
  width: 1px;
  height: 100%;
  background: #d9dee7;
}

.dc_time_ic {
  color: #fff;
}

.dc_time_ic--completed {
  background: #10b981;
}

.dc_time_ic--current {
  background: #2563eb;
  box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.12);
}

.dc_time_ic--returned {
  background: #ef4444;
}

.dc_time_ic--pending {
  background: #94a3b8;
}

.dc_time_line--completed {
  border-color: rgba(16, 185, 129, 0.45);
}

.dc_time_line--current {
  border-color: rgba(37, 99, 235, 0.45);
}

.dc_time_line--returned {
  border-color: rgba(239, 68, 68, 0.45);
}

.dc_time_line--pending {
  border-color: rgba(148, 163, 184, 0.45);
}

.dc_action-link {
  border: 0;
  background: transparent;
  color: #dc2626;
  font-size: 13px;
  cursor: pointer;
}

.dc_comments {
  display: flex;
  flex-direction: column;
}

.dc_comment {
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1.6;
}

.dc_comment--default {
  background: #f1f5f9;
  color: #1e293b;
}

.dc_comment--returned {
  background: #fee2e2;
  color: #991b1b;
}

.dc_comment--approved {
  background: #dcfce7;
  color: #166534;
}

.dc_comment_meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 11px;
  margin-bottom: 4px;
}

.dc_composer {
  border-top: 1px solid #e2e8f0;
  padding-top: 20px;
}

.dc_composer_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.dc_recipient_badge {
  background: #eff6ff;
  color: #1d4ed8;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
}

.dc_composer_actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
}

.dc_permission_hint {
  margin-bottom: 12px;
  color: #b45309;
  background: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 13px;
}

.btn_dc {
  border: 0;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
}

.btn_dc:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.btn_dc--primary {
  background: var(--ocm-btn-bg);
  color: #fff;
}

.btn_dc--secondary {
  background: #e2e8f0;
  color: #0f172a;
}
</style>