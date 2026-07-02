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

            </div>

            <span v-if="step.actedAt" class="text-xs text-slate-500 block mt-1">
              {{ formatActionTime(step.actedAt) }}
            </span>

            <div v-if="getVisibleStepComments(step).length" class="dc_comments mt-3 space-y-2">
              <div
                v-for="entry in getVisibleStepComments(step)"
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
          {{ composerTitle }}
        </h4>
        <span v-if="flowState?.currentRecipient" class="dc_recipient_badge">
          កំពុងរង់ចាំ: {{ flowState.currentRecipient }}
        </span>
      </div>

      <p v-if="!canActOnCurrentStep && permissionHint" class="dc_permission_hint">
        {{ permissionHint }}
      </p>

      <textarea
        v-model="commentDraft"
        rows="4"
        :disabled="!canActOnCurrentStep || isSubmittingWorkflow"
        :placeholder="commentPlaceholder"
        class="w-full rounded-sm border p-3 text-sm focus:ring-2 focus:ring-blue-500"
      />
      <p v-if="canActOnCurrentStep" class="dc_comment_hint">
        មតិយោបល់ជាជម្រើស — អាចទុកទទេ ឬបញ្ចូលមុនពេលបញ្ជូន / បដិសេធ
      </p>

      <div v-if="showStandardDecisionChoice" class="dc_flow_choice">
        <p class="dc_flow_choice_label">ជ្រើសរើសសេចក្តីសម្រេចចិត្ត</p>

        <label
          class="dc_flow_option"
          :class="{
            'dc_flow_option--active': selectedWorkflowDecision === 'forward',
            'dc_flow_option--primary': selectedWorkflowDecision === 'forward'
          }"
        >
          <input
            v-model="selectedWorkflowDecision"
            type="radio"
            value="forward"
            :disabled="isSubmittingWorkflow"
          />
          <span>
            <strong>{{ forwardDecisionTitle }}</strong>
            <small>{{ forwardDecisionDescription }}</small>
          </span>
        </label>

        <label
          v-if="canRejectDocument"
          class="dc_flow_option"
          :class="{
            'dc_flow_option--active': selectedWorkflowDecision === 'reject',
            'dc_flow_option--danger': selectedWorkflowDecision === 'reject'
          }"
        >
          <input
            v-model="selectedWorkflowDecision"
            type="radio"
            value="reject"
            :disabled="isSubmittingWorkflow"
          />
          <span>
            <strong>បដិសេធ និងបញ្ជូនត្រឡប់</strong>
            <small>{{ rejectDecisionDescription }}</small>
          </span>
        </label>
      </div>

      <div v-if="canActOnCurrentStep && canChooseFlowBranch" class="dc_flow_choice">
        <p class="dc_flow_choice_label">ជ្រើសរើសសកម្មភាពលំហូរ</p>

        <label class="dc_flow_option" :class="{ 'dc_flow_option--active': selectedFlowAction === 'send' }">
          <input
            v-model="selectedFlowAction"
            type="radio"
            value="send"
            :disabled="!canActOnCurrentStep || isSubmittingWorkflow"
          />
          <span>
            <strong>បញ្ជូនបន្ត</strong>
            <small>ផ្ញើឯកសារទៅអ្នកទទួលបន្ទាប់</small>
          </span>
        </label>

        <label class="dc_flow_option" :class="{ 'dc_flow_option--active': selectedFlowAction === 'diy' }">
          <input
            v-model="selectedFlowAction"
            type="radio"
            value="diy"
            :disabled="!canActOnCurrentStep || isSubmittingWorkflow"
          />
          <span>
            <strong>ដំណើរការដោយខ្លួនឯង</strong>
            <small>រក្សាទុកជាការងារកំពុងដំណើរការសម្រាប់អ្នកកាន់កាប់បច្ចុប្បន្ន</small>
          </span>
        </label>
      </div>

      <div v-if="canActOnCurrentStep && canChooseFinalDecision" class="dc_flow_choice">
        <p class="dc_flow_choice_label">សកម្មភាពចុងក្រោយសម្រាប់នាយកខុទ្ទកាល័យ</p>
        <p class="dc_flow_choice_hint">អនុម័តបញ្ចប់ ដើម្បីបញ្ចប់លំហូរឯកសារនេះជាស្ថាពរ (មិនបញ្ជូនត្រឡប់ទៅខុទ្ទកាល័យឧបនាយករដ្ឋមន្ត្រី)។</p>
      </div>

      <button
        v-if="canActOnCurrentStep"
        type="button"
        class="btn_dc dc_composer_submit"
        :class="submitDecisionButtonClass"
        :disabled="submitDecisionDisabled"
        @click="handleSubmitDecision"
      >
        {{ submitDecisionLabel }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { toast } from 'vue-sonner'
import { formatDateKhmer, formatKhmerNumber } from '@/lib/utils'
import {
  FLOW_APPROVAL_STEP_ID,
  FLOW_BRANCH_STEP_ID,
  buildDocumentFlowState,
  canUserUseExplicitFlowActions,
  clearStoredDocumentFlowState,
  forwardCurrentFlowStep,
  sendBackCurrentFlowStep,
  getFlowProgressSignature,
  getPreferredWorkflowStepId,
  getStoredDocumentFlowState,
  saveStoredDocumentFlowState,
  canUserActOnWorkflowTransaction,
  canUserRejectWorkflowTransaction,
  getActingStepTitleForUser,
  getActingWorkflowStepIdForUser,
  getRejectActionLabelForTransaction
} from '@/lib/documentFlow'
import { getUser, isAdmin } from '@/plugins/authentication'

const store = useStore()

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

const commentDraft = ref('')
const isSubmittingWorkflow = ref(false)
const selectedFlowAction = ref('')
const selectedWorkflowDecision = ref('')
const documentFlowStorageKey = computed(() => (
  props.transaction?.document?.id
  ?? props.transaction?.document_id
  ?? props.documentId
))
const flowState = ref(getStoredDocumentFlowState(documentFlowStorageKey.value, props.transaction))

const syncFlowState = () => {
  flowState.value = getStoredDocumentFlowState(documentFlowStorageKey.value, props.transaction)
}

const getInitialSelectedFlowAction = (stepId) => {
  if (stepId === FLOW_APPROVAL_STEP_ID) {
    return 'approve'
  }

  return 'send'
}

const getInitialWorkflowDecision = () => ''

watch(
  () => [props.documentId, documentFlowStorageKey.value, props.transaction?.id, props.transaction?.updated_at],
  () => {
    syncFlowState()
    commentDraft.value = ''
    selectedFlowAction.value = getInitialSelectedFlowAction(flowState.value?.activeStepId)
    selectedWorkflowDecision.value = getInitialWorkflowDecision()
  },
  { immediate: true }
)

const flowSteps = computed(() => flowState.value?.steps || [])
const currentStep = computed(() => flowSteps.value.find((step) => step.id === flowState.value?.activeStepId) || null)
const currentUser = computed(() => getUser() || {})
const userIsAdmin = computed(() => isAdmin())
const canUseExplicitFlowActions = computed(() => canUserUseExplicitFlowActions(currentUser.value))
const userActingStepId = computed(() => (
  getActingWorkflowStepIdForUser(currentUser.value, props.transaction) || 0
))
const canActOnCurrentStep = computed(() => Boolean(
  props.transaction
  && canUserActOnWorkflowTransaction(currentUser.value, props.transaction)
))
const composerTitle = computed(() => {
  if (canActOnCurrentStep.value) {
    const actingTitle = getActingStepTitleForUser(currentUser.value, props.transaction)
    if (actingTitle) {
      return `មតិយោបល់សម្រាប់ ${actingTitle}`
    }
  }

  if (currentStep.value?.title) {
    return `មតិយោបល់សម្រាប់ ${currentStep.value.title}`
  }

  if (flowState.value?.currentRecipient) {
    return `មតិយោបល់សម្រាប់ ${flowState.value.currentRecipient}`
  }

  return 'លំហូរបានបញ្ចប់'
})
const canChooseFlowBranch = computed(() => Boolean(
  canActOnCurrentStep.value
  && canUseExplicitFlowActions.value
  && userActingStepId.value === FLOW_BRANCH_STEP_ID
))
const canChooseFinalDecision = computed(() => Boolean(
  canActOnCurrentStep.value
  && userActingStepId.value === FLOW_APPROVAL_STEP_ID
))
const showStandardDecisionChoice = computed(() => Boolean(
  canActOnCurrentStep.value
  && !canChooseFlowBranch.value
  && !canChooseFinalDecision.value
))
const forwardDecisionTitle = computed(() => {
  if (userActingStepId.value === 5) {
    return 'បញ្ជូនបន្ត'
  }

  return 'បញ្ជូនបន្ត'
})
const forwardDecisionDescription = computed(() => (
  flowState.value?.currentRecipient
    ? `ផ្ញើឯកសារទៅ${flowState.value.currentRecipient}`
    : 'ផ្ញើឯកសារទៅអ្នកទទួលបន្ទាប់'
))
const rejectDecisionDescription = computed(() => {
  const labelParts = rejectActionLabel.value.split('ទៅ')
  if (labelParts.length > 1) {
    return `បញ្ជូនត្រឡប់ទៅ${labelParts.slice(1).join('ទៅ').trim()}`
  }

  return 'បញ្ជូនត្រឡប់ទៅអ្នកបញ្ជូនមុន'
})
const commentPlaceholder = computed(() => {
  if (selectedWorkflowDecision.value === 'reject') {
    return 'មតិយោបល់ (ជម្រើស) សម្រាប់ការបដិសេធ...'
  }

  if (canChooseFinalDecision.value || canChooseFlowBranch.value) {
    return 'មតិយោបល់ (ជម្រើស) សម្រាប់សកម្មភាពនេះ...'
  }

  return 'មតិយោបល់ (ជម្រើស) សម្រាប់ការបញ្ជូន...'
})
const normalizedSelectedFlowAction = computed(() => {
  if (canChooseFinalDecision.value) {
    if (selectedFlowAction.value === 'approve') {
      return 'approve'
    }

    if (selectedFlowAction.value === 'send') {
      return 'send'
    }

    return ''
  }

  if (!canChooseFlowBranch.value) {
    return 'send'
  }

  return selectedFlowAction.value === 'diy' ? 'diy' : 'send'
})
const requiresExplicitFlowChoice = computed(() => userActingStepId.value === FLOW_APPROVAL_STEP_ID)
const canRejectDocument = computed(() => Boolean(
  props.transaction
  && canUserRejectWorkflowTransaction(currentUser.value, props.transaction)
))
const rejectActionLabel = computed(() => getRejectActionLabelForTransaction(props.transaction))
const primaryActionLabel = computed(() => {
  if (canChooseFinalDecision.value) {
    if (!normalizedSelectedFlowAction.value) {
      return 'សូមជ្រើសរើសសកម្មភាព'
    }

    return normalizedSelectedFlowAction.value === 'approve'
      ? 'អនុម័តបញ្ចប់'
      : 'បញ្ជូនបន្ត'
  }

  if (!canChooseFlowBranch.value) {
    return userActingStepId.value === 5
      ? 'បញ្ជូនបន្ត'
      : 'បញ្ជូនបន្ត'
  }

  return normalizedSelectedFlowAction.value === 'diy'
    ? 'ដំណើរការដោយខ្លួនឯង'
    : 'បញ្ជូនបន្ត'
})
const submitDecisionLabel = computed(() => {
  if (canChooseFinalDecision.value) {
    if (!normalizedSelectedFlowAction.value) {
      return 'បញ្ធការសម្រេចចិត្ត'
    }

    return normalizedSelectedFlowAction.value === 'approve'
      ? 'អនុម័តបញ្ចប់'
      : 'បញ្ជូនបន្ត'
  }

  if (canChooseFlowBranch.value) {
    return normalizedSelectedFlowAction.value === 'diy'
      ? 'ដំណើរការដោយខ្លួនឯង'
      : 'បញ្ជូនបន្ត'
  }

  switch (selectedWorkflowDecision.value) {
    case 'reject':
      return 'បដិសេដ'
    case 'forward':
      return primaryActionLabel.value
    default:
      return 'បញ្ធការសម្រេចចិត្ត'
  }
})
const submitDecisionDisabled = computed(() => {
  if (!canActOnCurrentStep.value || isSubmittingWorkflow.value) {
    return true
  }

  if (canChooseFinalDecision.value) {
    return !normalizedSelectedFlowAction.value
  }

  if (canChooseFlowBranch.value) {
    return !selectedFlowAction.value
  }

  if (!selectedWorkflowDecision.value) {
    return true
  }

  if (selectedWorkflowDecision.value === 'reject' && !canRejectDocument.value) {
    return true
  }

  return false
})
const submitDecisionButtonClass = computed(() => {
  if (canChooseFinalDecision.value || canChooseFlowBranch.value) {
    return 'btn_dc--primary'
  }

  if (selectedWorkflowDecision.value === 'reject') {
    return 'btn_dc--danger'
  }

  if (selectedWorkflowDecision.value === 'forward') {
    return 'btn_dc--primary'
  }

  return 'btn_dc--primary'
})
const permissionHint = computed(() => {
  if (canActOnCurrentStep.value) {
    return ''
  }

  if (flowState.value?.overallStatus === 'approved') {
    return 'ឯកសារនេះបានអនុម័ត និងបញ្ចប់លំហូរដំណើរការជាស្ថាពរ។'
  }

  if (flowState.value?.currentRecipient) {
    return `ឯកសារនេះកំពុងរង់ចាំ ${flowState.value.currentRecipient} ដើម្បីពិនិត្យ និងដំណើរការ។`
  }

  if (currentStep.value?.title) {
    return `ជំហាន ${currentStep.value.title} កំពុងរង់ចាំអ្នកទទួលផ្សេង។`
  }

  return 'អ្នកមិនមានសិទ្ធិដំណើរការឯកសារនេះក្នុងដំណាក់កាលបច្ចុប្បន្នទេ។'
})

const currentActorName = computed(() => {
  const user = getUser() || {}
  const parts = [
    user.countesy?.name || user.countesy_name || '',
    user.lastname && user.firstname ? `${user.lastname} ${user.firstname}` : user.fullname || ''
  ].filter(Boolean)

  return parts.join(' ').trim() || 'អ្នកប្រើប្រាស់បច្ចុប្បន្ន'
})

const buildWorkflowPayload = () => {
  const actionTransactionId = props.transaction?.id ?? props.documentId
  const trimmedComment = commentDraft.value.trim()
  const payload = {
    id: actionTransactionId,
    transaction_id: actionTransactionId,
    document_transaction_id: actionTransactionId,
    current_transaction_id: actionTransactionId,
    document_transaction_id: props.transaction?.id ?? props.documentId,
    source_transaction_id: props.transaction?.id ?? props.documentId,
    flow_action: normalizedSelectedFlowAction.value,
    action: normalizedSelectedFlowAction.value,
    comment: trimmedComment,
    note: trimmedComment,
    remark: trimmedComment,
    briefing: trimmedComment
  }

  return payload
}

const resolveDocumentId = () => (
  props.transaction?.document?.id
  ?? props.transaction?.document_id
  ?? null
)

const persistWorkflowComment = async () => {
  const trimmedComment = commentDraft.value.trim()
  const documentId = resolveDocumentId()
  const transactionId = props.transaction?.id ?? props.documentId

  if (!trimmedComment || !documentId) {
    return
  }

  await store.dispatch('transaction/addBriefing', {
    document_id: documentId,
    document_transaction_id: transactionId,
    transaction_id: transactionId,
    briefing: trimmedComment,
    comment: trimmedComment,
    note: trimmedComment
  })
}

const getRequestErrorMessage = (error, fallbackMessage) => {
  const responseData = error?.response?.data
  const validationErrors = responseData?.errors

  if (validationErrors && typeof validationErrors === 'object') {
    const firstEntry = Object.values(validationErrors).find((entry) => Array.isArray(entry) && entry.length > 0)
    if (firstEntry?.[0]) {
      return String(firstEntry[0])
    }
  }

  if (typeof responseData?.message === 'string' && responseData.message.trim()) {
    return responseData.message.trim()
  }

  return fallbackMessage
}

const persistState = (nextState, successMessage) => {
  const savedState = saveStoredDocumentFlowState(documentFlowStorageKey.value, nextState)
  flowState.value = savedState
  commentDraft.value = ''
  emit('updated', savedState)
  if (successMessage) {
    toast.success(successMessage)
  }
}

const reloadTransaction = async () => {
  if (!props.documentId) {
    return null
  }

  const res = await store.dispatch('transaction/read', { id: props.documentId })
  return res?.data?.record ?? res?.data ?? null
}

const syncWithBackend = async (successMessage, fallbackFlowState = null) => {
  const refreshedTransaction = await reloadTransaction()
  const backendTransaction = refreshedTransaction || props.transaction
  const backendFlowState = backendTransaction ? buildDocumentFlowState(backendTransaction) : null
  const shouldKeepOptimisticState = Boolean(
    fallbackFlowState
    && backendFlowState
    && getFlowProgressSignature(backendFlowState) < getFlowProgressSignature(fallbackFlowState)
  )

  if (shouldKeepOptimisticState) {
    flowState.value = saveStoredDocumentFlowState(documentFlowStorageKey.value, fallbackFlowState)
  } else {
    clearStoredDocumentFlowState(documentFlowStorageKey.value)
    flowState.value = getStoredDocumentFlowState(documentFlowStorageKey.value, backendTransaction)
  }

  commentDraft.value = ''
  emit('updated', backendTransaction)
  if (successMessage) {
    toast.success(successMessage)
  }
}

const handleSubmitDecision = async () => {
  if (submitDecisionDisabled.value) {
    if (showStandardDecisionChoice.value && !selectedWorkflowDecision.value) {
      toast.error('សូមជ្រើសរើសសេចក្តីសម្រេចចិត្តមុនបញ្ធការ')
    }
    return
  }

  if (canChooseFinalDecision.value) {
    selectedFlowAction.value = 'approve'
    return handleForward()
  }

  if (canChooseFlowBranch.value) {
    return handleForward()
  }

  if (selectedWorkflowDecision.value === 'reject') {
    return handleReject()
  }

  if (selectedWorkflowDecision.value === 'forward') {
    return handleForward()
  }
}

const handleReject = async () => {
  if (!canRejectDocument.value || isSubmittingWorkflow.value) {
    return
  }

  isSubmittingWorkflow.value = true

  try {
    const workflowPayload = buildWorkflowPayload()
    workflowPayload.flow_action = 'reject'
    workflowPayload.action = 'reject'

    clearStoredDocumentFlowState(documentFlowStorageKey.value)

    await store.dispatch('transaction/reject', workflowPayload)

    const optimisticFlowState = sendBackCurrentFlowStep(flowState.value, {
      actorName: currentActorName.value,
      message: commentDraft.value.trim()
    })

    await syncWithBackend('បានបដិសេធ និងបញ្ជូនត្រឡប់ទៅអ្នកបញ្ជូនមុន', optimisticFlowState)
  } catch (error) {
    console.error(error)
    console.error('workflow reject response', error?.response?.data)

    try {
      const refreshed = await reloadTransaction()
      if (refreshed) {
        clearStoredDocumentFlowState(documentFlowStorageKey.value)
        const backendState = getStoredDocumentFlowState(documentFlowStorageKey.value, refreshed)
        const previousStepId = flowState.value?.activeStepId
        if (backendState?.activeStepId && backendState.activeStepId !== previousStepId) {
          flowState.value = backendState
          commentDraft.value = ''
          emit('updated', refreshed)
          toast.success('បានបដិសេធ និងបញ្ជូនត្រឡប់ទៅអ្នកបញ្ជូនមុន')
          return
        }
      }
    } catch (_syncError) {
      // ignore sync error, show original error below
    }

    toast.error(getRequestErrorMessage(error, 'មិនអាចបដិសេធ និងបញ្ជូនត្រឡប់ឯកសារបានទេ'))
  } finally {
    isSubmittingWorkflow.value = false
  }
}

const handleForward = async () => {
  if (!canActOnCurrentStep.value || isSubmittingWorkflow.value) {
    return
  }

  isSubmittingWorkflow.value = true

  try {
    const workflowPayload = buildWorkflowPayload()
    console.log('workflow send payload', workflowPayload)

    await store.dispatch('transaction/send', workflowPayload)

    const optimisticFlowState = forwardCurrentFlowStep(flowState.value, {
      actorName: currentActorName.value,
      message: commentDraft.value.trim(),
      action: normalizedSelectedFlowAction.value
    })
    flowState.value = saveStoredDocumentFlowState(documentFlowStorageKey.value, optimisticFlowState)

    await syncWithBackend(
      normalizedSelectedFlowAction.value === 'approve'
        ? 'បានអនុម័ត និងបញ្ចប់លំហូរឯកសារជាស្ថាពរ'
        : normalizedSelectedFlowAction.value === 'diy'
        ? 'បានរក្សាទុកឯកសារសម្រាប់ដំណើរការដោយខ្លួនឯង'
        : canChooseFinalDecision.value
          ? 'បានបញ្ជូនឯកសារត្រឡប់ទៅវដ្តពិនិត្យ'
          : 'បានបញ្ជូនឯកសារទៅជំហានបន្ទាប់',
      optimisticFlowState
    )
  } catch (error) {
    console.error(error)
    console.error('workflow send response', error?.response?.data)

    // Sync with backend — if the server already advanced the step (e.g. a previous
    // attempt succeeded but the UI didn't update), recover gracefully.
    try {
      const refreshed = await reloadTransaction()
      if (refreshed) {
        clearStoredDocumentFlowState(documentFlowStorageKey.value)
        const backendState = getStoredDocumentFlowState(documentFlowStorageKey.value, refreshed)
        const previousStepId = flowState.value?.activeStepId
        if (backendState?.activeStepId && backendState.activeStepId !== previousStepId) {
          flowState.value = backendState
          commentDraft.value = ''
          emit('updated', refreshed)
          toast.success(normalizedSelectedFlowAction.value === 'approve'
            ? 'បានអនុម័ត និងបញ្ចប់លំហូរឯកសារជាស្ថាពរ'
            : 'បានបញ្ជូនឯកសារទៅជំហានបន្ទាប់')
          return
        }
      }
    } catch (_syncError) {
      // ignore sync error, show original error below
    }

    toast.error(getRequestErrorMessage(error, 'មិនអាចបញ្ជូនលំហូរឯកសារបានទេ'))
  } finally {
    isSubmittingWorkflow.value = false
  }
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

const normalizeActorIdentity = (value) => String(value ?? '').trim().toLowerCase()

const getStepActorName = (step) => {
  return step.actedBy || step.assigneeName || ''
}

const getVisibleStepComments = (step) => (
  Array.isArray(step?.comments) ? step.comments : []
)

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

.dc_comment_hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
}

.dc_recipient_badge {
  background: #eff6ff;
  color: #1d4ed8;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
}

.dc_composer_submit {
  width: 100%;
  margin-top: 14px;
}

.dc_flow_choice {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.dc_flow_choice_label {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
}

.dc_flow_option {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 10px 12px;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.dc_flow_option input {
  margin-top: 3px;
}

.dc_flow_option span {
  display: grid;
  gap: 2px;
}

.dc_flow_option small {
  color: #64748b;
  font-size: 12px;
}

.dc_flow_option--active {
  border-color: #2563eb;
  background: #eff6ff;
}

.dc_flow_option--active.dc_flow_option--danger {
  border-color: #dc2626;
  background: #fef2f2;
}

.dc_flow_option--active.dc_flow_option--secondary {
  border-color: #64748b;
  background: #f8fafc;
}

.dc_flow_option--active.dc_flow_option--primary {
  border-color: var(--ocm-btn-bg, #2563eb);
  background: #eff6ff;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 44px;
  border: 0;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
  text-align: center;
  white-space: normal;
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

.btn_dc--danger {
  background: #dc2626;
  color: #fff;
}
</style>