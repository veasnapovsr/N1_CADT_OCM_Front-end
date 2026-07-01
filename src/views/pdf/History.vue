<template>
  <Header title="រំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
  <section class="appppw">
  <Aside />
  <div class="sw">
    <div class="app_content">
      <div class="ocm_cwr">
        <h2 class="h wttt t-lspace">ប្រវត្តិឯកសារ</h2>
      </div>
      
      <!-- card content -->
            <!-- Filter Section -->
      <div class="ocm_filter_w d-flex align-items-center gap-3 flex-wrap mb-10">
        <div class="items">
          <input 
            type="text" 
            v-model="filters.user" 
            class="form-control" 
            placeholder="ស្វែងរកតាមអ្នកប្រើប្រាស់"
          />
        </div>
        <div class="items">
          <input 
            type="text" 
            v-model="filters.document" 
            class="form-control" 
            placeholder="ស្វែងរកតាមឯកសារ"
          />
        </div>
        <div class="items">
          <div class="compact-select items">
  <InputSelect
    :model-value="filters.actionType"
    :options="actionTypeOptions"
    label="label"
    track-by="value"
    :clearable="false"
    :multiple="false"
    @update:model-value="filters.actionType = $event"
  />
</div>

        </div>
        <div class="items">
         <DateSelect v-model="filters.date" />
        </div>
        <button @click="applyFilters" class="button ocm_btn_ac button-primary t-lspace">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="85.36 85.33 815.27 815.3"> <g id="icomoon-ignore"> </g> <path d="M447.998 85.331c-57.831 0.005-114.822 13.839-166.219 40.349s-95.708 64.927-129.238 112.046c-33.53 47.118-55.306 101.572-63.511 158.818s-2.601 115.625 16.345 170.26c18.945 54.641 50.682 103.956 92.563 143.836s92.692 69.166 148.193 85.417c55.501 16.246 114.083 18.985 170.86 7.992 56.776-10.998 110.095-35.415 155.52-71.209l155.817 155.817c8.049 7.772 18.826 12.073 30.013 11.976s21.888-4.582 29.798-12.493c7.91-7.91 12.396-18.611 12.493-29.798s-4.204-21.965-11.976-30.013l-155.817-155.817c42.153-53.478 68.403-117.745 75.74-185.443 7.332-67.698-4.536-136.094-34.258-197.36s-76.088-112.927-133.801-149.071c-57.708-36.144-124.431-55.31-192.524-55.306zM170.665 447.998c0-73.553 29.219-144.094 81.229-196.104s122.551-81.229 196.104-81.229c73.555 0 144.094 29.219 196.103 81.229 52.014 52.010 81.229 122.551 81.229 196.104 0 73.551-29.215 144.094-81.229 196.103-52.009 52.009-122.547 81.229-196.103 81.229-73.553 0-144.094-29.22-196.104-81.229s-81.229-122.552-81.229-196.103z"></path> </svg>
          ស្វែងរក
        </button>
      </div>

      <!-- Logs Timeline -->
      <div class="timeline_wrap">
        <div v-if="isLoading" class="ocm_dt_empt timeline_empty">
          <div class="ocm_dti">...</div>
          <div>កំពុងផ្ទុក</div>
        </div>
        <div v-else-if="filteredLogs.length === 0" class="ocm_dt_empt timeline_empty">
          <div class="ocm_dti">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>មិនមាន Logs</div>
        </div>

        <div v-else class="timeline_list">
          <div
            class="timeline_item"
            v-for="(log, index) in paginatedLogs"
            :key="log.id"
          >
            <div class="timeline_left">
  <!-- Date label (show only when date changes) -->
  <div
    v-if="isNewDate(index)"
    class="timeline_date_label"
  >
    {{ formatDateKhmer(log.timestamp) }}
  </div>

  <!-- Dot -->
  <div
    class="timeline_dot"
    :class="getActionBadgeClass(log.actionType)"
  ></div>

  <!-- Vertical line -->
  <div
    class="timeline_line"
    v-if="index !== paginatedLogs.length - 1"
  ></div>
</div>


            <div class="timeline_body">
              <div class="timeline_meta">
  <span class="ocm_status" :class="getActionBadgeClass(log.actionType)">
    {{ getActionLabel(log.actionType) }}
  </span>

  <!-- TIME goes here -->
  <span class="timeline_time_right">
    {{ formatTimeKhmer(log.timestamp) }}
  </span>
  <span class="timeline_counter">
    {{ formatKhmerNumber((currentPage - 1) * itemsPerPage + index + 1) }}
  </span>
</div>
              <div class="timeline_user">
                <span class="jl_tbl_img">
                  <img :src="log.userAvatar" :alt="log.userName" />
                </span>
                <div class="jl_tbl_c">
                  <span class="tb_n1 bold fs-95">{{ log.userName }}</span>
                  <span class="tb_n1 fs-90" v-html="log.userSubtitle"></span>
                </div>
              </div>

              <div class="timeline_doc cursor-pointer" @click="goToDocumentDetail(log)">
  <div class="doc_row">
    <!-- PDF badge -->
    <span class="ocm_docfw">
      <span class="ocm_docf d-flex flex-column align-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="4 2 16 20"
        >
          <path
            d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0zm0 3a.75.75 0 1 1 1.5 0zm0 3a.75.75 0 1 1 1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z"
            fill="currentColor"
          />
        </svg>
        PDF
      </span>
    </span>

    <!-- Title & reference -->
    <div class="doc_text">
      <div class="doc_title">{{ log.documentDescription }}</div>
      <div class="doc_ref">លិខិតលេខ: {{ log.documentReference }}</div>
    </div>
  </div>
</div>
              <div class="timeline_action_line">
                {{ log.description }}
              </div>
              <div v-if="log.comments?.length" class="timeline_comment_list">
                <div
                  v-for="comment in log.comments"
                  :key="comment.id"
                  class="timeline_comment_box"
                >
                  {{ comment.message }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        </div>
        <!-- Pagination -->
        <div class="pagination_w logs_pagination_bar" v-if="totalPages > 1">
          <div class="pagination">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="['nav_i', 'page', { current: currentPage === page }]"
            >
              {{ formatKhmerNumber(page) }}
            </button>
            <button
              class="next nav_i"
              :disabled="currentPage === totalPages"
              @click="currentPage < totalPages && (currentPage = currentPage + 1)"
            >
              បន្ទាប់
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 37.65 448.05 436.7"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" fill="currentColor"></path></svg>
            </button>
          </div>
          <span class="ocm_count t-lspace">
            ចំនួន Logs៖ {{ formatKhmerNumber(filteredLogs.length) }}
          </span>
        </div>
        <Footer />
      </div>
  
  
</section>
</template>

<script setup>
import { ref, computed, onMounted, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
import DateSelect from '@/components/flow/DateSelect.vue'
import { InputSelect } from '@/components/ui/inputselect'
import {
  formatKhmerNumber,
  formatDateKhmer,
  resolveWorkflowAvatarUrl,
  getWorkflowAvatarFallback
} from '@/lib/utils.js'
import { getPreferredWorkflowStepId, getWorkflowForwardTargetStepId } from '@/lib/documentFlow'

const store = useStore()
const router = useRouter()

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(20)
const isLoading = ref(false)

// Filters
const filters = ref({
  user: '',
  document: '',
  actionType: '',
  date: ''
})

const actionTypeOptions = [
  { label: 'ទាំងអស់', value: '' },
  { label: 'មតិយោបល់', value: 'comment' },
  { label: 'មិនយល់ព្រម', value: 'reject' },
  { label: 'បញ្ជូនឡើងវិញ', value: 'resent' },
  { label: 'ឯកសារបានអនុម័ត', value: 'approve' },
  { label: 'ឯកសារបញ្ជូន', value: 'sent' },
  { label: 'បង្កើតឯកសារ', value: 'created' }
]

const getWorkflowUserName = (user = {}) => {
  return [user.countesy_name || user.Countesy || '', user.fullname || ''].filter(Boolean).join(' ') || user.email || 'មិនបានបញ្ជាក់'
}

const getWorkflowUserSubtitle = (user = {}) => {
  return [user.current_position || user.position?.name || '', user.current_organization || user.organization?.name || '']
    .filter(Boolean)
    .join(' • ')
}

const getWorkflowUserAvatar = (user = {}) => {
  const displayName = getWorkflowUserName(user)

  return resolveWorkflowAvatarUrl(user)
    || getWorkflowAvatarFallback(displayName)
}

const statusToActionType = (status) => {
  const normalizedStatus = String(status || '').trim().toLowerCase()
  if (!normalizedStatus || ['draft', 'progress'].includes(normalizedStatus)) return 'created'
  if (['pending', 'sent'].includes(normalizedStatus)) return 'sent'
  if (['approved', 'finished', 'finish', 'done', 'completed'].includes(normalizedStatus)) return 'approve'
  if (['rejected', 'reject', 'cancelled'].includes(normalizedStatus)) return 'reject'
  return 'comment'
}

const getReceiverNames = (receivers = []) => receivers
  .map((receiver) => getWorkflowUserName(receiver?.user || receiver))
  .filter(Boolean)

const getReceiverWorkflowStepId = (transaction = {}, senderStepId = 0) => {
  const receivers = Array.isArray(transaction?.receivers) ? transaction.receivers : []
  if (!receivers.length) {
    return 0
  }

  const normalizedSenderStepId = Number.parseInt(senderStepId, 10)
    || getPreferredWorkflowStepId(transaction?.sender || {})

  return getPreferredWorkflowStepId(receivers[0]?.user || receivers[0] || {}, {
    senderStepId: normalizedSenderStepId
  })
}

const isReturnTransaction = (transaction = {}) => {
  const senderStepId = getPreferredWorkflowStepId(transaction?.sender || {})
  const receiverStepId = getReceiverWorkflowStepId(transaction, senderStepId)
  const forwardTargetStepId = getWorkflowForwardTargetStepId(senderStepId)

  if (
    forwardTargetStepId > 0
    && receiverStepId > 0
    && receiverStepId === forwardTargetStepId
  ) {
    return false
  }

  return senderStepId > 0
    && receiverStepId > 0
    && receiverStepId < senderStepId
}

const findPreviousTransaction = (transaction = {}, transactions = []) => {
  const previousTransactionId = Number.parseInt(transaction?.previous_transaction_id, 10)
  if (previousTransactionId <= 0) {
    return null
  }

  return transactions.find((entry) => Number.parseInt(entry?.id, 10) === previousTransactionId) || null
}

const isResendAfterReturn = (transaction = {}, transactions = []) => {
  const previousTransaction = findPreviousTransaction(transaction, transactions)
  return previousTransaction != null && isReturnTransaction(previousTransaction)
}

const resolveTransactionActionType = (transaction = {}, transactions = []) => {
  if (isReturnTransaction(transaction)) {
    return 'reject'
  }

  if (isResendAfterReturn(transaction, transactions)) {
    return 'resent'
  }

  return statusToActionType(transaction?.status)
}

const getTransactionDescription = (transaction, actionType) => {
  const receiverNames = getReceiverNames(transaction?.receivers || [])
  switch (actionType) {
    case 'created':
      return 'បានបង្កើតឯកសារ'
    case 'sent':
      return receiverNames.length > 0
        ? `បានផ្ញើឯកសារទៅ ${receiverNames.join(', ')}`
        : 'បានផ្ញើឯកសារ'
    case 'resent':
      return receiverNames.length > 0
        ? `បានបញ្ជូនឯកសារឡើងវិញទៅ ${receiverNames.join(', ')}`
        : 'បានបញ្ជូនឯកសារឡើងវិញបន្ទាប់ពីត្រូវបានបដិសេធ'
    case 'approve':
      return 'បានអនុម័តឯកសារ'
    case 'reject':
      return receiverNames.length > 0
        ? `បានបដិសេធ និងបញ្ជូនត្រឡប់ទៅ ${receiverNames.join(', ')}`
        : 'បានបដិសេធ និងបញ្ជូនត្រឡប់ទៅអ្នកបញ្ជូនមុន'
    default:
      return 'មតិយោបល់'
  }
}

const resolveDocumentId = (record, transaction) => {
  return (
    record?.document?.id
    ?? transaction?.document_id
    ?? record?.document_id
    ?? null
  )
}

const resolveTransactionId = (record, transaction) => {
  return transaction?.id ?? record?.id ?? null
}

const signatureStatusToActionType = (status) => {
  const normalizedStatus = String(status || '').trim().toLowerCase()
  if (['rejected', 'reject', 'returned', 'return', 'send_back', 'declined'].includes(normalizedStatus)) {
    return 'reject'
  }
  if (['approved', 'approve', 'finished', 'done', 'completed'].includes(normalizedStatus)) {
    return 'approve'
  }
  if (['sent', 'forward', 'submitted'].includes(normalizedStatus)) {
    return 'sent'
  }
  return 'comment'
}

const normalizeHistoryIdentity = (value = '') => String(value || '').trim().toLowerCase()

const getHistoryTimestamp = (value) => {
  const timestamp = new Date(value || 0).getTime()
  return Number.isNaN(timestamp) ? 0 : timestamp
}

const getTransactionTimestamp = (transaction = {}) => (
  getHistoryTimestamp(
    transaction?.sent_at
    || transaction?.updated_at
    || transaction?.created_at
    || transaction?.date_in
  )
)

const extractHistoryComments = (source = {}) => {
  const rawComments = source?.comments
    || source?.histories
    || source?.history
    || source?.notes
    || source?.note
    || source?.remark
    || source?.comment

  if (Array.isArray(rawComments)) {
    return rawComments
      .map((entry, index) => {
        if (typeof entry === 'string') {
          const message = entry.trim()
          return message ? { id: `inline-comment-${index}`, message } : null
        }

        if (!entry || typeof entry !== 'object') {
          return null
        }

        const message = String(
          entry.message || entry.comment || entry.note || entry.remark || ''
        ).trim()

        if (!message) {
          return null
        }

        return {
          id: entry.id ? `inline-comment-${entry.id}` : `inline-comment-${index}`,
          message,
          createdAt: entry.created_at || entry.updated_at || entry.at || ''
        }
      })
      .filter(Boolean)
  }

  if (typeof rawComments === 'string' && rawComments.trim()) {
    return [{ id: 'inline-comment-0', message: rawComments.trim() }]
  }

  return []
}

const collectTransactionComments = (transaction = {}) => {
  const comments = []
  const seen = new Set()

  const pushComment = (comment) => {
    const message = String(comment?.message || '').trim()
    if (!message) {
      return
    }

    const signature = `${message}|${comment?.createdAt || ''}`
    if (seen.has(signature)) {
      return
    }

    seen.add(signature)
    comments.push({
      id: comment.id || `transaction-comment-${comments.length}`,
      message,
      createdAt: comment.createdAt || ''
    })
  }

  extractHistoryComments(transaction?.sender).forEach(pushComment)
  extractHistoryComments(transaction).forEach(pushComment)

  const receivers = Array.isArray(transaction?.receivers) ? transaction.receivers : []
  receivers.forEach((receiver) => {
    extractHistoryComments(receiver?.user || receiver).forEach(pushComment)
    extractHistoryComments(receiver).forEach(pushComment)
  })

  return comments
}

const getBriefingBrieferName = (briefing = {}) => {
  const briefer = briefing?.briefer || {}
  return [briefer.lastname, briefer.firstname].filter(Boolean).join(' ')
    || briefer.email
    || ''
}

const appendLogComment = (log, comment) => {
  if (!log || !comment?.message) {
    return
  }

  log.comments = Array.isArray(log.comments) ? log.comments : []

  const alreadyExists = log.comments.some((entry) => (
    entry.id === comment.id
    || entry.message === comment.message
  ))

  if (!alreadyExists) {
    log.comments.push(comment)
  }
}

const findActionLogForBriefing = (briefing, actionLogs, transactions = []) => {
  const message = String(briefing?.briefing || '').trim()
  if (!message || !actionLogs.length) {
    return null
  }

  const briefingTime = getHistoryTimestamp(briefing?.created_at || briefing?.updated_at)
  const brieferName = getBriefingBrieferName(briefing)
  const sortedTransactions = [...transactions].sort(
    (left, right) => getTransactionTimestamp(left) - getTransactionTimestamp(right)
  )

  for (let index = 0; index < sortedTransactions.length; index += 1) {
    const transaction = sortedTransactions[index]
    const currentTimestamp = getTransactionTimestamp(transaction)
    const nextTimestamp = index < sortedTransactions.length - 1
      ? getTransactionTimestamp(sortedTransactions[index + 1])
      : Number.POSITIVE_INFINITY

    if (briefingTime >= currentTimestamp && briefingTime < nextTimestamp) {
      const actionType = resolveTransactionActionType(transaction, transactions)
      const matchedLog = actionLogs.find((log) => log.id === `transaction-${transaction?.id}-${actionType}`)

      if (matchedLog) {
        return matchedLog
      }
    }
  }

  const nearbyLogs = actionLogs
    .filter((log) => Math.abs(getHistoryTimestamp(log.timestamp) - briefingTime) <= 5 * 60 * 1000)
    .sort((left, right) => (
      Math.abs(getHistoryTimestamp(left.timestamp) - briefingTime)
      - Math.abs(getHistoryTimestamp(right.timestamp) - briefingTime)
    ))

  const sameActorLog = nearbyLogs.find((log) => (
    normalizeHistoryIdentity(log.userName) === normalizeHistoryIdentity(brieferName)
    || (briefing?.briefer?.email && String(log.userSubtitle || '').includes(briefing.briefer.email))
  ))

  if (sameActorLog) {
    return sameActorLog
  }

  return nearbyLogs[0]
    || actionLogs
      .slice()
      .sort((left, right) => (
        Math.abs(getHistoryTimestamp(left.timestamp) - briefingTime)
        - Math.abs(getHistoryTimestamp(right.timestamp) - briefingTime)
      ))[0]
    || null
}

const attachBriefingsToLogs = (logs, briefings = [], transactions = []) => {
  const actionLogs = logs.filter((log) => log.actionType !== 'comment')

  briefings.forEach((briefing) => {
    const message = String(briefing?.briefing || '').trim()
    if (!message) {
      return
    }

    const targetLog = findActionLogForBriefing(briefing, actionLogs, transactions)
    if (!targetLog) {
      return
    }

    appendLogComment(targetLog, {
      id: `briefing-${briefing?.id}`,
      message,
      createdAt: briefing?.created_at || briefing?.updated_at || ''
    })
  })
}

const consolidateCommentLogs = (logs = []) => {
  const actionLogs = []
  const commentOnlyLogs = []

  logs.forEach((log) => {
    if (log.actionType === 'comment') {
      commentOnlyLogs.push(log)
      return
    }

    actionLogs.push({
      ...log,
      comments: Array.isArray(log.comments) ? [...log.comments] : []
    })
  })

  commentOnlyLogs.forEach((commentLog) => {
    const message = String(commentLog.description || '').trim()
    if (!message) {
      return
    }

    const commentTime = getHistoryTimestamp(commentLog.timestamp)
    const targetLog = actionLogs
      .filter((log) => normalizeHistoryIdentity(log.userName) === normalizeHistoryIdentity(commentLog.userName))
      .sort((left, right) => (
        Math.abs(getHistoryTimestamp(left.timestamp) - commentTime)
        - Math.abs(getHistoryTimestamp(right.timestamp) - commentTime)
      ))[0]
      || actionLogs
        .slice()
        .sort((left, right) => (
          Math.abs(getHistoryTimestamp(left.timestamp) - commentTime)
          - Math.abs(getHistoryTimestamp(right.timestamp) - commentTime)
        ))[0]

    if (!targetLog) {
      return
    }

    appendLogComment(targetLog, {
      id: commentLog.id,
      message,
      createdAt: commentLog.timestamp
    })
  })

  return actionLogs
}

const createTransactionLog = (record, transaction, allTransactions = []) => {
  const actionType = resolveTransactionActionType(transaction, allTransactions)
  const sender = transaction?.sender || record?.sender || {}
  const timestamp = transaction?.sent_at || transaction?.updated_at || transaction?.created_at || transaction?.date_in
  return {
    id: `transaction-${transaction?.id}-${actionType}`,
    actionType,
    documentId: resolveDocumentId(record, transaction),
    transactionId: resolveTransactionId(record, transaction),
    userName: getWorkflowUserName(sender),
    userSubtitle: getWorkflowUserSubtitle(sender),
    userAvatar: getWorkflowUserAvatar(sender),
    documentDescription: transaction?.subject || record?.subject || record?.document?.objective || '',
    documentReference: record?.document?.number || '',
    description: getTransactionDescription(transaction, actionType),
    comments: collectTransactionComments(transaction),
    timestamp: timestamp ? String(timestamp) : new Date().toISOString()
  }
}

const createSignatureLog = (record, signature, transactions = []) => {
  const signer = signature?.signer || {}
  const actionType = signatureStatusToActionType(signature?.status)
  const timestamp = signature?.created_at || signature?.updated_at || new Date().toISOString()
  const returnTransaction = transactions.find((transaction) => isReturnTransaction(transaction))
  const receiverNames = returnTransaction ? getReceiverNames(returnTransaction?.receivers || []) : []

  return {
    id: `signature-${signature?.id}`,
    actionType,
    documentId: resolveDocumentId(record, record),
    transactionId: resolveTransactionId(record, record),
    userName: getWorkflowUserName(signer),
    userSubtitle: getWorkflowUserSubtitle(signer),
    userAvatar: getWorkflowUserAvatar(signer),
    documentDescription: record?.subject || record?.document?.objective || '',
    documentReference: record?.document?.number || '',
    description: actionType === 'reject'
      ? (receiverNames.length > 0
        ? `បានបដិសេធ និងបញ្ជូនត្រឡប់ទៅ ${receiverNames.join(', ')}`
        : 'បានបដិសេធ និងបញ្ជូនត្រឡប់ឯកសារ')
      : actionType === 'approve'
        ? 'បានអនុម័តឯកសារ'
        : 'មតិយោបល់',
    comments: [],
    timestamp: String(timestamp)
  }
}

const getHistoryLogDedupeKey = (entry = {}) => {
  const entryId = String(entry?.id || '')

  const transactionMatch = entryId.match(/^transaction-(\d+)-/)
  if (transactionMatch) {
    return `transaction:${transactionMatch[1]}`
  }

  const signatureMatch = entryId.match(/^signature-(\d+)/)
  if (signatureMatch) {
    return `signature:${signatureMatch[1]}`
  }

  const minuteBucket = String(entry?.timestamp || '').slice(0, 16)
  return [
    entry.actionType,
    entry.userName,
    minuteBucket,
    entry.documentReference,
    entry.description
  ].join('|')
}

const dedupeHistoryLogs = (entries = []) => {
  const seen = new Set()

  return entries.filter((entry) => {
    const key = getHistoryLogDedupeKey(entry)

    if (seen.has(key)) {
      return false
    }

    seen.add(key)
    return true
  })
}

const resolveHistoryDocumentId = (record = {}) => (
  record?.document?.id
  || record?.document_id
  || null
)

const selectCanonicalRecordsForHistory = (records = []) => {
  const recordsByDocument = new Map()

  records.forEach((record) => {
    const documentId = resolveHistoryDocumentId(record)
    if (!documentId) {
      return
    }

    const key = String(documentId)
    const existing = recordsByDocument.get(key)
    const recordId = Number.parseInt(record?.id, 10) || 0
    const existingId = Number.parseInt(existing?.id, 10) || 0

    if (!existing || recordId > existingId) {
      recordsByDocument.set(key, record)
    }
  })

  return [...recordsByDocument.values()]
}

const mapRecordToLogs = (record) => {
  const transactions = Array.isArray(record?.transactions) && record.transactions.length > 0
    ? record.transactions
    : [record]

  const transactionLogs = transactions.map((transaction) => createTransactionLog(record, transaction, transactions))
  const signatureLogs = Array.isArray(record?.document?.short_signatures)
    ? record.document.short_signatures
      .filter((signature) => {
        const normalizedStatus = String(signature?.status || '').trim().toLowerCase()
        return ['rejected', 'reject', 'approved', 'approve', 'finished'].includes(normalizedStatus)
      })
      .map((signature) => createSignatureLog(record, signature, transactions))
    : []
  const briefings = Array.isArray(record?.document?.briefings) ? record.document.briefings : []
  const mergedLogs = dedupeHistoryLogs([...transactionLogs, ...signatureLogs])

  attachBriefingsToLogs(mergedLogs, briefings, transactions)

  return consolidateCommentLogs(mergedLogs)
}

const formatTimeKhmer = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const timeStr = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  })
  return formatKhmerNumber(timeStr)
}

// Logs from backend (shallowRef for large lists per .cursorrules)
const logs = shallowRef([])

/** Build search string for API from filters */
const buildSearchQuery = () => {
  const parts = []
  if (filters.value.user && filters.value.user.trim()) parts.push(filters.value.user.trim())
  if (filters.value.document && filters.value.document.trim()) parts.push(filters.value.document.trim())
  return parts.join(' ')
}

/** Map filter actionType to backend status param (only valid transaction statuses) */
const actionTypeToStatus = (actionType) => {
  const map = {
    created: 'draft',
    sent: 'pending',
    approve: 'finished'
  }
  return actionType ? (map[actionType] || '') : ''
}

/** Fetch documents/transactions from backend and set logs */
const fetchLogs = async () => {
  isLoading.value = true
  try {
    const searchQuery = buildSearchQuery()
    const statusParam = actionTypeToStatus(filters.value.actionType)
    const params = {
      page: 1,
      perPage: 500,
      search: searchQuery,
      status: statusParam,
      history: 1
    }
    const res = await store.dispatch('transaction/list', params)
    if (res.data && res.data.records) {
      const canonicalRecords = selectCanonicalRecordsForHistory(res.data.records)
      const detailedRecords = await Promise.all(
        canonicalRecords.map(async (record) => {
          try {
            const detailRes = await store.dispatch('transaction/read', {
              id: record.id,
              history: 1
            })
            return detailRes?.data?.record || record
          } catch {
            return record
          }
        })
      )
      const mapped = dedupeHistoryLogs(detailedRecords.flatMap(mapRecordToLogs))
      mapped.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      logs.value = mapped
    } else {
      logs.value = []
    }
  } catch (err) {
    logs.value = []
  } finally {
    isLoading.value = false
  }
}

const applyFilters = () => {
  currentPage.value = 1
  fetchLogs()
}

// Computed properties
const filteredLogs = computed(() => {
  let result = [...logs.value]

  // Filter by user
  if (filters.value.user) {
    const searchTerm = filters.value.user.toLowerCase()
    result = result.filter(log => 
      log.userName.toLowerCase().includes(searchTerm)
    )
  }

  // Filter by document
  if (filters.value.document) {
    const searchTerm = filters.value.document.toLowerCase()
    result = result.filter(log => 
      log.documentDescription.toLowerCase().includes(searchTerm) ||
      log.documentReference.toLowerCase().includes(searchTerm)
    )
  }

  // Filter by action type
  if (filters.value.actionType) {
    if (filters.value.actionType === 'comment') {
      result = result.filter((log) => Array.isArray(log.comments) && log.comments.length > 0)
    } else {
      result = result.filter((log) => log.actionType === filters.value.actionType)
    }
  }

  // Filter by date (client-side)
  if (filters.value.date) {
    const filterDate = new Date(filters.value.date)
    filterDate.setHours(0, 0, 0, 0)
    result = result.filter(log => {
      const logDate = new Date(log.timestamp)
      logDate.setHours(0, 0, 0, 0)
      return logDate.getTime() === filterDate.getTime()
    })
  }

  return result
})

const totalPages = computed(() => {
  return Math.ceil(filteredLogs.value.length / itemsPerPage.value)
})

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredLogs.value.slice(start, end)
})

// Methods
const goToDocumentDetail = (log) => {
  const routeId = log.transactionId || log.documentId
  if (!routeId) return
  router.push({
    name: 'pdf-documents-detail',
    params: { id: routeId }
  })
}

const getActionLabel = (actionType) => {
  const labels = {
    comment: 'ផ្តល់មតិយោបល់',
    reject: 'មិនយល់ព្រម',
    resent: 'បញ្ជូនឡើងវិញ',
    approve: 'បានអនុម័តឯកសារ',
    sent: 'បានបញ្ជូនឯកសារ',
    created: 'បានបង្កើតឯកសារ'
  }
  return labels[actionType] || actionType
}

const getActionBadgeClass = (actionType) => {
  const classes = {
    comment: 'status-comment',
    reject: 'status-reject',
    resent: 'status-resent',
    approve: 'status-approve',
    sent: 'status-sent',
    created: 'status-created'
  }
  return classes[actionType] || ''
}


/* =========================
   Timeline helpers
========================= */
const isNewDate = (index) => {
  if (index === 0) return true

  const current = new Date(paginatedLogs.value[index].timestamp)
  const prev = new Date(paginatedLogs.value[index - 1].timestamp)

  return (
    current.getFullYear() !== prev.getFullYear() ||
    current.getMonth() !== prev.getMonth() ||
    current.getDate() !== prev.getDate()
  )
}

onMounted(() => {
  fetchLogs()
})
</script>