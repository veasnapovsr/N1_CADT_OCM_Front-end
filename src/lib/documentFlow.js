import { getUser } from '@/plugins/authentication'

const STORAGE_KEY = 'document-flow-state-v2'

export const FLOW_STEP_TITLES = [
  'នាយកដ្ឋានរដ្ឋបាល',
  'ប្រធាននាយកដ្ឋាន',
  'នាយកខុទ្ទកាល័យ',
  'ខុទ្ទកាល័យឯកឧត្តមឧបនាយករដ្ឋមន្ត្រីប្រចាំការ',
  'អង្គភាពជំនាញ',
  'ខុទ្ទកាល័យឯកឧត្តមឧបនាយករដ្ឋមន្ត្រីប្រចាំការ',
  'នាយកខុទ្ទកាល័យ'
]

export const FLOW_APPROVAL_STEP_ID = 7
export const FLOW_BRANCH_STEP_ID = 4
const FLOW_SPECIALIST_STEP_ID = 5
const FLOW_RETURN_REVIEW_STEP_ID = 6

const WORKFLOW_CHAIN_STEP_IDS = FLOW_STEP_TITLES.map((_, index) => index + 1)

const FLOW_STEP_MATCHERS = {
  1: [
    'នាយកដ្ឋានរដ្ឋបាល',
    'administration department',
    'department of administration',
    'administration_department',
    'administration.department'
  ],
  2: [
    'ប្រធាននាយកដ្ឋាន',
    'head of department',
    'department head',
    'director of department',
    'department_head',
    'department.head',
    'head_of_department',
    'head.department'
  ],
  3: [
    'នាយកខុទ្ទកាល័យ',
    'ខុទ្ទកាល័យ',
    'cabinet director',
    'director of cabinet',
    'cabinet chief',
    'chief of cabinet',
    'cabinet office',
    'cabinet',
    'cabinet_director',
    'cabinet.director',
    'director_cabinet',
    'director.cabinet',
    'chief_cabinet',
    'chief.cabinet'
  ],
  4: [
    'ខុទ្ទកាល័យឯកឧត្តមឧបនាយករដ្ឋមន្ត្រីប្រចាំការ',
    'ខុទ្ទកាល័យឯកឧត្តមឧបនាយករដ្ឋមន្រ្តីប្រចាំការ',
    'office dpm',
    'office of dpm',
    'office of deputy prime minister',
    'deputy prime minister office',
    'deputy prime minister office in charge',
    'office_dpm',
    'office.dpm',
    'dpm office',
    'ឧបនាយករដ្ឋមន្ត្រីប្រចាំការ',
    'ឧបនាយករដ្ឋមន្រ្តីប្រចាំការ'
  ],
  5: [
    'អង្គភាពជំនាញ',
    'specialist unit',
    'specialized unit',
    'technical unit',
    'expert unit',
    'specialist_unit',
    'specialist.unit',
    'specialized_unit',
    'specialized.unit'
  ],
  6: [
    'ខុទ្ទកាល័យឯកឧត្តមឧបនាយករដ្ឋមន្ត្រីប្រចាំការ',
    'ខុទ្ទកាល័យឯកឧត្តមឧបនាយករដ្ឋមន្រ្តីប្រចាំការ',
    'office dpm',
    'office of dpm',
    'office of deputy prime minister',
    'deputy prime minister office',
    'deputy prime minister office in charge',
    'office_dpm',
    'office.dpm',
    'dpm office',
    'ឧបនាយករដ្ឋមន្ត្រីប្រចាំការ',
    'ឧបនាយករដ្ឋមន្រ្តីប្រចាំការ'
  ],
  7: [
    'នាយកខុទ្ទកាល័យ',
    'ខុទ្ទកាល័យ',
    'cabinet director',
    'director of cabinet',
    'cabinet chief',
    'chief of cabinet',
    'cabinet office',
    'cabinet',
    'cabinet_director',
    'cabinet.director',
    'director_cabinet',
    'director.cabinet',
    'chief_cabinet',
    'chief.cabinet'
  ]
}

const canUseStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

const normalizeText = (value) => (typeof value === 'string' ? value.trim() : '')

const normalizeSearchText = (value) => normalizeText(value)
  .toLowerCase()
  .replace(/[._-]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const cloneDeep = (value) => JSON.parse(JSON.stringify(value))

const getStorageScope = () => {
  const user = getUser() || {}
  const identity = [
    user.id,
    user.user_id,
    user.email,
    user.username
  ].map((value) => normalizeSearchText(value)).find(Boolean)

  return identity || 'anonymous'
}

const createCommentSignature = (comment = {}) => [
  normalizeText(comment.type),
  normalizeText(comment.message),
  normalizeText(comment.actorName),
  normalizeText(comment.createdAt)
].join('|')

const getCommentTimestamp = (comment = {}) => {
  const timestamp = new Date(comment?.createdAt || 0).getTime()
  return Number.isNaN(timestamp) ? 0 : timestamp
}

const mergeStepComments = (baseComments = [], storedComments = []) => {
  const seen = new Set(baseComments.map((comment) => createCommentSignature(comment)))
  const merged = [...baseComments]

  storedComments.forEach((comment) => {
    const signature = createCommentSignature(comment)
    if (!signature || seen.has(signature)) {
      return
    }

    seen.add(signature)
    merged.push(comment)
  })

  return merged
    .map((comment, index) => ({ comment, index }))
    .sort((left, right) => {
      const timestampDiff = getCommentTimestamp(left.comment) - getCommentTimestamp(right.comment)
      return timestampDiff !== 0 ? timestampDiff : left.index - right.index
    })
    .map(({ comment }) => comment)
}

const mergeStoredCommentsIntoFlowState = (baseFlowState, storedFlowState) => {
  if (!storedFlowState?.steps?.length) {
    return baseFlowState
  }

  const nextState = cloneDeep(baseFlowState)

  nextState.steps = nextState.steps.map((step, index) => ({
    ...step,
    comments: mergeStepComments(step.comments, storedFlowState.steps[index]?.comments || [])
  }))

  return nextState
}

const getFlowUpdatedAtTimestamp = (flowState = {}) => {
  const timestamp = new Date(flowState?.updatedAt || 0).getTime()
  return Number.isNaN(timestamp) ? 0 : timestamp
}

const getFlowCommentCount = (flowState = {}) => {
  const steps = Array.isArray(flowState?.steps) ? flowState.steps : []
  return steps.reduce((total, step) => total + (Array.isArray(step?.comments) ? step.comments.length : 0), 0)
}

const shouldPreferStoredFlowState = (storedFlowState, backendFlowState) => {
  if (!storedFlowState || !backendFlowState) {
    return false
  }

  const storedStatus = normalizeText(storedFlowState?.overallStatus).toLowerCase()
  const backendStatus = normalizeText(backendFlowState?.overallStatus).toLowerCase()
  const storedUpdatedAt = getFlowUpdatedAtTimestamp(storedFlowState)
  const backendUpdatedAt = getFlowUpdatedAtTimestamp(backendFlowState)

  if (storedUpdatedAt > 0 && backendUpdatedAt > 0 && storedUpdatedAt < backendUpdatedAt) {
    return false
  }

  if (storedStatus === 'approved' && backendStatus !== 'approved') {
    return false
  }

  if (storedStatus === 'rejected' && backendStatus === 'pending') {
    return false
  }

  return getFlowProgressSignature(storedFlowState) > getFlowProgressSignature(backendFlowState)
}

export const getFlowProgressSignature = (flowState = {}) => {
  const steps = Array.isArray(flowState?.steps) ? flowState.steps : []
  const completedCount = steps.filter((step) => step.status === 'completed').length
  const returnedCount = steps.filter((step) => step.status === 'returned').length
  const activeStepId = Number(flowState?.activeStepId) || 0
  const statusWeight = flowState?.overallStatus === 'approved' ? 1000 : flowState?.overallStatus === 'rejected' ? 500 : 0

  return statusWeight + (completedCount * 10) + (returnedCount * 5) + activeStepId
}

const mergeStoredProgressIntoFlowState = (baseFlowState, storedFlowState) => {
  if ((storedFlowState?.steps?.length || 0) !== (baseFlowState?.steps?.length || 0)) {
    return mergeStoredCommentsIntoFlowState(baseFlowState, storedFlowState)
  }

  const nextState = cloneDeep(baseFlowState)

  nextState.steps = nextState.steps.map((step, index) => {
    const storedStep = storedFlowState?.steps?.[index]
    if (!storedStep) {
      return step
    }

    return {
      ...step,
      status: storedStep.status || step.status,
      assigneeName: step.assigneeName || storedStep.assigneeName,
      actedBy: storedStep.actedBy || step.actedBy,
      actedAt: storedStep.actedAt || step.actedAt,
      comments: mergeStepComments(step.comments, storedStep.comments || [])
    }
  })

  nextState.activeStepId = storedFlowState?.activeStepId ?? nextState.activeStepId
  nextState.currentRecipient = storedFlowState?.currentRecipient || nextState.currentRecipient
  nextState.overallStatus = storedFlowState?.overallStatus || nextState.overallStatus
  nextState.updatedAt = storedFlowState?.updatedAt || nextState.updatedAt

  return finalizeFlowState(nextState, nextState.overallStatus)
}

const collectNestedTexts = (value, depth = 0) => {
  if (depth > 3 || value == null) {
    return []
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return [String(value)]
  }

  if (Array.isArray(value)) {
    return value.flatMap((entry) => collectNestedTexts(entry, depth + 1))
  }

  if (typeof value === 'object') {
    return Object.values(value).flatMap((entry) => collectNestedTexts(entry, depth + 1))
  }

  return []
}

const readStore = () => {
  if (!canUseStorage()) {
    return {}
  }

  try {
    const rawValue = window.localStorage.getItem(`${STORAGE_KEY}:${getStorageScope()}`)
    const parsed = rawValue ? JSON.parse(rawValue) : {}
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

const writeStore = (nextValue) => {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(`${STORAGE_KEY}:${getStorageScope()}`, JSON.stringify(nextValue))
}

const extractDisplayName = (source) => {
  if (!source || typeof source !== 'object') {
    return ''
  }

  const parts = [
    normalizeText(source.countesy_name || source.countesy?.name),
    normalizeText(
      source.lastname && source.firstname
        ? `${source.lastname} ${source.firstname}`
        : source.fullname || source.name || source.username || ''
    )
  ].filter(Boolean)

  return parts.join(' ').trim()
}

const hasSameDisplayIdentity = (left = '', right = '') => {
  return normalizeSearchText(left) !== '' && normalizeSearchText(left) === normalizeSearchText(right)
}

const attachCommentsToWorkflowSteps = ({
  steps = [],
  comments = [],
  senderName = '',
  senderStepId = 0,
  receiverName = '',
  receiverStepId = 0,
  fallbackStepId = 0
} = {}) => {
  comments.forEach((comment) => {
    const actorName = normalizeText(comment?.actorName)

    let targetStepId = fallbackStepId
    if (actorName && hasSameDisplayIdentity(actorName, senderName) && senderStepId > 0) {
      targetStepId = senderStepId
    } else if (actorName && hasSameDisplayIdentity(actorName, receiverName) && receiverStepId > 0) {
      targetStepId = receiverStepId
    }

    const targetStep = steps[targetStepId - 1]
    if (!targetStep) {
      return
    }

    targetStep.comments = mergeStepComments(targetStep.comments, [comment])
  })
}

const toIsoString = (value) => {
  const dateValue = value ? new Date(value) : new Date()
  return Number.isNaN(dateValue.getTime()) ? new Date().toISOString() : dateValue.toISOString()
}

const createCommentEntry = ({ type = 'comment', message = '', actorName = '', createdAt = '' } = {}) => ({
  id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
  type,
  message: normalizeText(message),
  actorName: normalizeText(actorName),
  createdAt: toIsoString(createdAt)
})

const statusToHistoryActionType = (status) => {
  const normalizedStatus = String(status || '').trim().toLowerCase()

  if (!normalizedStatus || ['draft', 'progress'].includes(normalizedStatus)) {
    return 'created'
  }

  if (['pending', 'sent'].includes(normalizedStatus)) {
    return 'sent'
  }

  if (['approved', 'finished', 'finish', 'done', 'completed'].includes(normalizedStatus)) {
    return 'approve'
  }

  if (['rejected', 'reject', 'cancelled'].includes(normalizedStatus)) {
    return 'reject'
  }

  return 'comment'
}

const getHistoryEntryTimestamp = (value) => {
  const parsed = value ? new Date(value).getTime() : 0
  return Number.isFinite(parsed) ? parsed : 0
}

const getLatestHistoryActionType = (record = {}, flowState = null) => {
  const transactionEntries = []
  const transactions = Array.isArray(record?.transactions) && record.transactions.length > 0
    ? record.transactions
    : [record]

  transactions.forEach((transaction) => {
    if (!transaction) {
      return
    }

    transactionEntries.push({
      actionType: statusToHistoryActionType(transaction?.status),
      timestamp: getHistoryEntryTimestamp(
        transaction?.sent_at || transaction?.updated_at || transaction?.created_at || transaction?.date_in
      )
    })
  })

  const briefingEntries = Array.isArray(record?.document?.briefings)
    ? record.document.briefings.map((briefing) => ({
      actionType: 'comment',
      timestamp: getHistoryEntryTimestamp(briefing?.created_at || briefing?.updated_at)
    }))
    : []

  const latestEntry = [...transactionEntries, ...briefingEntries]
    .sort((left, right) => right.timestamp - left.timestamp)[0]

  if (latestEntry?.actionType) {
    return latestEntry.actionType
  }

  return statusToHistoryActionType(flowState?.overallStatus || record?.status)
}

const normalizeReceiverStatus = (value) => {
  const status = normalizeText(value).toLowerCase()

  if (!status) {
    return 'pending'
  }

  if (['approved', 'approve', 'sent', 'done', 'completed', 'complete', 'accepted', 'finished', 'finish'].includes(status)) {
    return 'completed'
  }

  if (['rejected', 'reject', 'returned', 'return', 'send_back', 'sent_back', 'declined'].includes(status)) {
    return 'returned'
  }

  if (['pending', 'waiting', 'progressing', 'in_progress', 'processing', 'current'].includes(status)) {
    return 'current'
  }

  return 'pending'
}

const extractComments = (source) => {
  const rawComments = source?.comments || source?.histories || source?.history || source?.notes || source?.note || source?.remark || source?.comment

  if (Array.isArray(rawComments)) {
    return rawComments
      .map((entry) => {
        if (typeof entry === 'string') {
          return createCommentEntry({ message: entry })
        }

        if (!entry || typeof entry !== 'object') {
          return null
        }

        return createCommentEntry({
          type: entry.type || entry.action || 'comment',
          message: entry.message || entry.comment || entry.note || entry.remark || '',
          actorName: extractDisplayName(entry.user || entry.actor || entry) || entry.actor_name || '',
          createdAt: entry.created_at || entry.updated_at || entry.at || ''
        })
      })
      .filter((entry) => entry?.message)
  }

  if (typeof rawComments === 'string' && rawComments.trim()) {
    return [createCommentEntry({ message: rawComments })]
  }

  return []
}

const buildStepRecord = (index, title) => ({
  id: index + 1,
  title,
  assigneeName: '',
  actedBy: '',
  actedAt: '',
  status: index === 0 ? 'current' : 'pending',
  comments: []
})

const getStepTimestamp = (step = {}) => {
  const timestamp = new Date(step?.actedAt || 0).getTime()
  return Number.isNaN(timestamp) ? 0 : timestamp
}

const getTransactionTimestamp = (transaction = {}) => {
  const timestamp = new Date(
    transaction?.sent_at
    || transaction?.created_at
    || transaction?.updated_at
    || transaction?.date_in
    || 0
  ).getTime()

  return Number.isNaN(timestamp) ? 0 : timestamp
}

const resolveBriefingStepIndexByTransactionWindow = (briefing = {}, transactions = [], steps = []) => {
  const briefingTimestamp = new Date(briefing?.created_at || briefing?.updated_at || 0).getTime()
  const normalizedBriefingTimestamp = Number.isNaN(briefingTimestamp) ? 0 : briefingTimestamp

  if (!normalizedBriefingTimestamp || !Array.isArray(transactions) || !transactions.length) {
    return -1
  }

  for (let index = 0; index < transactions.length; index += 1) {
    const transaction = transactions[index]
    const currentTimestamp = getTransactionTimestamp(transaction)
    const nextTimestamp = getTransactionTimestamp(transactions[index + 1])
    const stepId = resolveWorkflowChainStepId(index + 1)
    const stepIndex = steps.findIndex((step) => step.id === stepId)

    if (stepIndex < 0 || currentTimestamp <= 0) {
      continue
    }

    const isInWindow = normalizedBriefingTimestamp >= currentTimestamp
      && (nextTimestamp <= 0 || normalizedBriefingTimestamp < nextTimestamp)

    if (isInWindow) {
      return stepIndex
    }
  }

  return -1
}

const resolveBriefingStepIndex = (briefing = {}, briefer = {}, steps = [], transactions = []) => {
  const transactionWindowIndex = resolveBriefingStepIndexByTransactionWindow(briefing, transactions, steps)
  if (transactionWindowIndex >= 0) {
    return transactionWindowIndex
  }

  const matchedStepIds = getAllowedFlowStepIds(briefer, { isAdmin: false })
  const brieferName = extractDisplayName(briefer)
  const briefingTimestamp = new Date(briefing?.created_at || briefing?.updated_at || 0).getTime()
  const normalizedBriefingTimestamp = Number.isNaN(briefingTimestamp) ? 0 : briefingTimestamp

  const candidateIndexes = matchedStepIds
    .map((stepId) => steps.findIndex((step) => step.id === stepId))
    .filter((index) => index >= 0)

  if (!candidateIndexes.length) {
    const currentStepIndex = steps.findIndex((step) => step.status === 'current')
    return currentStepIndex >= 0 ? currentStepIndex : 0
  }

  const matchingCurrentIndex = candidateIndexes.find((index) => {
    const step = steps[index]
    return step?.status === 'current' && hasSameDisplayIdentity(step?.assigneeName, brieferName)
  })

  if (matchingCurrentIndex != null) {
    return matchingCurrentIndex
  }

  const matchingActorIndex = candidateIndexes.find((index) => {
    const step = steps[index]
    return hasSameDisplayIdentity(step?.actedBy, brieferName) || hasSameDisplayIdentity(step?.assigneeName, brieferName)
  })

  if (matchingActorIndex != null && normalizedBriefingTimestamp <= 0) {
    return matchingActorIndex
  }

  const timedCandidate = candidateIndexes
    .map((index) => ({ index, timestamp: getStepTimestamp(steps[index]) }))
    .filter((candidate) => candidate.timestamp > 0 && candidate.timestamp <= normalizedBriefingTimestamp)
    .sort((left, right) => right.timestamp - left.timestamp)[0]

  if (timedCandidate) {
    return timedCandidate.index
  }

  return candidateIndexes[candidateIndexes.length - 1]
}

const applyDocumentBriefingsToSteps = (transaction = {}, steps = [], transactions = []) => {
  const briefings = Array.isArray(transaction?.document?.briefings) ? transaction.document.briefings : []

  briefings.forEach((briefing) => {
    const commentMessage = briefing?.briefing || briefing?.message || briefing?.comment || ''
    if (!normalizeText(commentMessage)) {
      return
    }

    const briefer = briefing?.briefer || briefing?.user || {}
  const targetIndex = resolveBriefingStepIndex(briefing, briefer, steps, transactions)
    const targetStep = steps[targetIndex]

    if (!targetStep) {
      return
    }

    targetStep.comments = mergeStepComments(targetStep.comments, [createCommentEntry({
      type: 'comment',
      message: commentMessage,
      actorName: extractDisplayName(briefer),
      createdAt: briefing?.created_at || briefing?.updated_at || ''
    })])
  })

  return steps
}

const getPreferredWorkflowStepId = (source = {}) => {
  const matchedStepIds = getAllowedFlowStepIds(source)
  if (!matchedStepIds.length) {
    return 0
  }

  const roleTexts = [
    source?.role_name,
    source?.sub_role,
    source?.position?.name,
    source?.current_position,
    ...collectNestedTexts(source?.position),
    ...collectNestedTexts(source?.roles),
    ...collectNestedTexts(source?.organization_structure_position)
  ]
    .map((value) => normalizeSearchText(value))
    .filter(Boolean)

  const isCabinetDirector = roleTexts.some((text) => (
    text.includes('នាយកខុទ្ទកាល័យ')
    || text.includes('cabinet director')
    || text.includes('director of cabinet')
    || text.includes('cabinet chief')
    || text.includes('chief of cabinet')
    || text.includes('director cabinet')
    || text.includes('cabinet.director')
    || text.includes('cabinet_director')
  ))

  if (isCabinetDirector && matchedStepIds.includes(3)) {
    return 3
  }

  return Math.min(...matchedStepIds)
}

const resolveWorkflowChainStepId = (index = 0) => {
  const normalizedIndex = Number.parseInt(index, 10)
  if (Number.isNaN(normalizedIndex) || normalizedIndex < 0) {
    return 0
  }

  return WORKFLOW_CHAIN_STEP_IDS[Math.min(normalizedIndex, WORKFLOW_CHAIN_STEP_IDS.length - 1)] || 0
}

const applyWorkflowIdentityProgress = ({ transaction = {}, transactionStatus = '', steps = [], senderName = '', createdAt = '' } = {}) => {
  const receivers = Array.isArray(transaction?.receivers) ? transaction.receivers : []
  const senderStepId = getPreferredWorkflowStepId(transaction?.sender || {})
  let hasIdentityProgress = false

  if (senderStepId > 0) {
    hasIdentityProgress = true

    for (let index = 0; index < senderStepId - 1; index += 1) {
      steps[index].status = 'completed'
    }

    const senderStep = steps[senderStepId - 1]
    if (senderStep) {
      senderStep.assigneeName = senderName
      senderStep.actedBy = senderName
      senderStep.actedAt = createdAt
      senderStep.status = transactionStatus === 'draft' && !receivers.length ? 'current' : 'completed'
    }
  }

  receivers.forEach((receiver) => {
    const receiverSource = receiver?.user || receiver || {}
    const receiverStepId = getPreferredWorkflowStepId(receiverSource)
    if (receiverStepId <= 0) {
      return
    }

    const step = steps[receiverStepId - 1]
    if (!step) {
      return
    }

    hasIdentityProgress = true

    const receiverName = extractDisplayName(receiverSource)
    const comments = extractComments(receiver)
    const status = normalizeReceiverStatus(receiver?.status || receiver?.action || receiver?.state)

    step.assigneeName = receiverName
    attachCommentsToWorkflowSteps({
      steps,
      comments,
      senderName,
      senderStepId,
      receiverName,
      receiverStepId,
      fallbackStepId: receiverStepId
    })
    step.actedAt = receiver?.updated_at || receiver?.acted_at || receiver?.created_at || ''

    if (status === 'completed' || status === 'returned') {
      step.actedBy = receiverName
    }

    step.status = status
  })

  return hasIdentityProgress
}

const reconcileOrderedStepStatuses = (steps = []) => {
  let furthestProgressIndex = -1

  steps.forEach((step, index) => {
    if (index === 0) {
      return
    }

    const hasReceiverData = Boolean(step.assigneeName || step.actedAt || step.comments.length)
    if (hasReceiverData && ['current', 'completed', 'returned'].includes(step.status)) {
      furthestProgressIndex = Math.max(furthestProgressIndex, index)
    }
  })

  if (furthestProgressIndex <= 1) {
    return steps
  }

  for (let index = 1; index < furthestProgressIndex; index += 1) {
    const step = steps[index]
    const hasReceiverData = Boolean(step.assigneeName || step.actedAt || step.comments.length)
    if (hasReceiverData && step.status === 'pending') {
      step.status = 'completed'
    }
  }

  return steps
}

const isApprovedFlowStatus = (value = '') => ['approved', 'approve', 'finished', 'finish', 'done', 'completed', 'complete', 'accepted']
  .includes(normalizeText(value).toLowerCase())

const getStepActedTimestamp = (step = {}) => {
  const timestamp = new Date(step?.actedAt || step?.updatedAt || step?.createdAt || 0).getTime()
  return Number.isNaN(timestamp) ? 0 : timestamp
}

const resolveOfficeDpmSourceStepId = (flowState = {}) => {
  const steps = Array.isArray(flowState?.steps) ? flowState.steps : []
  const cabinetDirectorStep = steps.find((step) => step.id === FLOW_APPROVAL_STEP_ID)
  const specialistUnitStep = steps.find((step) => step.id === 5)
  const cabinetDirectorTimestamp = getStepActedTimestamp(cabinetDirectorStep)
  const specialistUnitTimestamp = getStepActedTimestamp(specialistUnitStep)

  if (specialistUnitTimestamp > cabinetDirectorTimestamp) {
    return 5
  }

  if (cabinetDirectorTimestamp > 0) {
    return FLOW_APPROVAL_STEP_ID
  }

  return FLOW_APPROVAL_STEP_ID
}

const resolveForwardTargetStepId = (flowState = {}, action = 'send') => {
  const activeStepId = Number(flowState?.activeStepId) || 0
  const normalizedAction = normalizeText(action).toLowerCase()

  if (!activeStepId || normalizedAction === 'approve') {
    return 0
  }

  switch (activeStepId) {
    case 1:
      return 2
    case 2:
      return 3
    case 3:
      return FLOW_BRANCH_STEP_ID
    case FLOW_BRANCH_STEP_ID:
      return FLOW_SPECIALIST_STEP_ID
    case FLOW_SPECIALIST_STEP_ID:
      return FLOW_RETURN_REVIEW_STEP_ID
    case FLOW_RETURN_REVIEW_STEP_ID:
      return FLOW_APPROVAL_STEP_ID
    case FLOW_APPROVAL_STEP_ID:
      return FLOW_RETURN_REVIEW_STEP_ID
    default:
      return 0
  }
}

const finalizeFlowState = (flowState, baseStatus = '') => {
  const nextState = cloneDeep(flowState)
  const approved = isApprovedFlowStatus(baseStatus)

  if (approved) {
    nextState.steps.forEach((step) => {
      if (step.status !== 'returned') {
        step.status = 'completed'
      }
    })
    nextState.activeStepId = null
    nextState.currentRecipient = ''
    nextState.overallStatus = 'approved'
    return nextState
  }

  const activeStep = nextState.steps.find((step) => step.status === 'current')
  if (activeStep) {
    nextState.activeStepId = activeStep.id
    nextState.currentRecipient = activeStep.title
    nextState.overallStatus = nextState.overallStatus === 'rejected' ? 'rejected' : 'pending'
    return nextState
  }

  const returnedIndex = [...nextState.steps].reverse().find((step) => step.status === 'returned')
  if (returnedIndex) {
    const targetIndex = Math.max(nextState.steps.findIndex((step) => step.id === returnedIndex.id) - 1, 0)
    nextState.steps[targetIndex].status = 'current'
    nextState.activeStepId = nextState.steps[targetIndex].id
    nextState.currentRecipient = nextState.steps[targetIndex].title
    nextState.overallStatus = 'rejected'
    return nextState
  }

  const pendingStep = nextState.steps.find((step) => step.status === 'pending')
  if (pendingStep) {
    pendingStep.status = 'current'
    nextState.activeStepId = pendingStep.id
    nextState.currentRecipient = pendingStep.title
    nextState.overallStatus = baseStatus === 'draft' ? 'draft' : 'pending'
    return nextState
  }

  nextState.activeStepId = null
  nextState.currentRecipient = ''
  nextState.overallStatus = 'approved'
  return nextState
}

const getWorkflowTransactionChain = (transaction = {}) => {
  const transactions = Array.isArray(transaction?.transactions) ? transaction.transactions : []
  const chain = [...transactions]

  if (transaction && typeof transaction === 'object') {
    const transactionId = Number.parseInt(transaction?.id, 10)
    if (transactionId > 0 && !chain.some((entry) => Number.parseInt(entry?.id, 10) === transactionId)) {
      chain.push(transaction)
    }
  }

  return chain
    .filter((entry) => entry && typeof entry === 'object')
    .sort((left, right) => (Number.parseInt(left?.id, 10) || 0) - (Number.parseInt(right?.id, 10) || 0))
}

const applyWorkflowTransactionChainProgress = ({ transactions = [], steps = [] } = {}) => {
  if (!transactions.length) {
    return { latestTransaction: null, hasProgress: false }
  }

  let hasProgress = false

  transactions.forEach((entry, index) => {
    const isLatestTransaction = index === transactions.length - 1
    const transactionStatus = normalizeText(entry?.status).toLowerCase()
    const sender = entry?.sender || {}
    const senderName = extractDisplayName(sender)
    const senderStepId = resolveWorkflowChainStepId(index) || getPreferredWorkflowStepId(sender)
    const receivers = Array.isArray(entry?.receivers) ? entry.receivers : []
    const actedAt = entry?.sent_at || entry?.updated_at || entry?.created_at || entry?.date_in || ''

    if (senderStepId > 0) {
      hasProgress = true

      for (let stepIndex = 0; stepIndex < senderStepId - 1; stepIndex += 1) {
        if (steps[stepIndex]?.status === 'pending') {
          steps[stepIndex].status = 'completed'
        }
      }

      const senderStep = steps[senderStepId - 1]
      if (senderStep) {
        senderStep.assigneeName = senderName || senderStep.assigneeName
        senderStep.actedBy = senderName || senderStep.actedBy
        senderStep.actedAt = actedAt || senderStep.actedAt
        senderStep.status = isLatestTransaction && ['draft', 'progress'].includes(transactionStatus) && !receivers.length
          ? 'current'
          : 'completed'
      }
    }

    receivers.forEach((receiver) => {
      const receiverSource = receiver?.user || receiver || {}
      const receiverStepId = resolveWorkflowChainStepId(index + 1) || getPreferredWorkflowStepId(receiverSource)
      if (receiverStepId <= 0) {
        return
      }

      hasProgress = true

      const receiverStep = steps[receiverStepId - 1]
      if (!receiverStep) {
        return
      }

      const receiverName = extractDisplayName(receiverSource)
      const receiverActedAt = receiver?.accepted_at || receiver?.updated_at || receiver?.created_at || actedAt || ''
      const receiverComments = extractComments(receiver)

      receiverStep.assigneeName = receiverName || receiverStep.assigneeName
      attachCommentsToWorkflowSteps({
        steps,
        comments: receiverComments,
        senderName,
        senderStepId,
        receiverName,
        receiverStepId,
        fallbackStepId: receiverStepId
      })

      if (isLatestTransaction && transactionStatus === 'pending' && !receiver?.accepted_at) {
        receiverStep.status = 'current'
        receiverStep.actedAt = receiver?.updated_at || receiver?.created_at || receiverStep.actedAt
        return
      }

      receiverStep.status = 'completed'
      receiverStep.actedBy = receiverName || receiverStep.actedBy
      receiverStep.actedAt = receiverActedAt || receiverStep.actedAt
    })
  })

  return {
    latestTransaction: transactions[transactions.length - 1],
    hasProgress
  }
}

export const buildDocumentFlowState = (transaction = {}) => {
  const transactionChain = getWorkflowTransactionChain(transaction)
  const latestTransaction = transactionChain[transactionChain.length - 1] || transaction
  const transactionStatus = normalizeText(latestTransaction?.status).toLowerCase()
  const receivers = Array.isArray(latestTransaction?.receivers) ? latestTransaction.receivers : []
  const steps = FLOW_STEP_TITLES.map((title, index) => buildStepRecord(index, title))
  const senderName = extractDisplayName(latestTransaction?.sender)
  const createdAt = latestTransaction?.created_at || latestTransaction?.sent_at || latestTransaction?.date_in || ''
  const chainProgress = applyWorkflowTransactionChainProgress({
    transactions: transactionChain,
    steps
  })
  const hasIdentityProgress = chainProgress.hasProgress || applyWorkflowIdentityProgress({
    transaction: latestTransaction,
    transactionStatus,
    steps,
    senderName,
    createdAt
  })

  if (!hasIdentityProgress && transactionStatus === 'draft' && !receivers.length) {
    steps[0].assigneeName = senderName
    steps[0].status = 'current'
  } else if (!hasIdentityProgress) {
    steps[0].assigneeName = senderName
    steps[0].actedBy = senderName
    steps[0].actedAt = createdAt
    steps[0].status = 'completed'
    receivers.slice(0, Math.max(steps.length - 1, 0)).forEach((receiver, index) => {
      const step = steps[index + 1]
      if (!step) {
        return
      }

      const receiverName = extractDisplayName(receiver?.user || receiver)
      const comments = extractComments(receiver)
      const status = normalizeReceiverStatus(receiver?.status || receiver?.action || receiver?.state)

      step.assigneeName = receiverName
      step.comments = comments
      step.actedAt = receiver?.updated_at || receiver?.acted_at || receiver?.created_at || ''

      if (status === 'completed' || status === 'returned') {
        step.actedBy = receiverName
      }

      step.status = status
    })
  }

  applyDocumentBriefingsToSteps(
    latestTransaction?.document?.briefings ? latestTransaction : transaction,
    steps,
    transactionChain
  )

  reconcileOrderedStepStatuses(steps)

  return finalizeFlowState({
    documentId: Number.parseInt(latestTransaction?.document?.id ?? transaction?.document?.id ?? latestTransaction?.id ?? transaction?.id, 10) || 0,
    activeStepId: null,
    currentRecipient: '',
    overallStatus: transactionStatus || 'pending',
    updatedAt: toIsoString(latestTransaction?.updated_at || createdAt || ''),
    steps
  }, transactionStatus)
}

export const getStoredDocumentFlowState = (documentId, transaction = null) => {
  const normalizedId = String(Number.parseInt(documentId, 10) || '')
  const store = readStore()
  const storedValue = normalizedId ? store[normalizedId] : null

  if (transaction && typeof transaction === 'object') {
    const backendState = buildDocumentFlowState(transaction)
    if (storedValue && typeof storedValue === 'object') {
      const preferStoredState = shouldPreferStoredFlowState(storedValue, backendState)
      if (preferStoredState) {
        return mergeStoredProgressIntoFlowState(backendState, storedValue)
      }

      if (getFlowCommentCount(backendState) === 0 && getFlowCommentCount(storedValue) > 0) {
        return mergeStoredCommentsIntoFlowState(backendState, storedValue)
      }

      return mergeStoredCommentsIntoFlowState(backendState, storedValue)
    }

    return backendState
  }

  if (storedValue && typeof storedValue === 'object') {
    return finalizeFlowState(storedValue, storedValue.overallStatus)
  }

  return buildDocumentFlowState(transaction || { id: documentId })
}

export const saveStoredDocumentFlowState = (documentId, flowState) => {
  const normalizedId = String(Number.parseInt(documentId, 10) || '')
  if (!normalizedId) {
    return flowState
  }

  const store = readStore()
  store[normalizedId] = finalizeFlowState({
    ...cloneDeep(flowState),
    documentId: Number.parseInt(normalizedId, 10),
    updatedAt: toIsoString(flowState?.updatedAt || '')
  }, flowState?.overallStatus)
  writeStore(store)
  return store[normalizedId]
}

export const clearStoredDocumentFlowState = (documentId) => {
  const normalizedId = String(Number.parseInt(documentId, 10) || '')
  if (!normalizedId) {
    return
  }

  const store = readStore()
  if (!(normalizedId in store)) {
    return
  }

  delete store[normalizedId]
  writeStore(store)
}

export const addCommentToCurrentFlowStep = (flowState, { actorName = '', message = '' } = {}) => {
  const normalizedMessage = normalizeText(message)
  if (!normalizedMessage) {
    return flowState
  }

  const nextState = cloneDeep(flowState)
  const activeIndex = nextState.steps.findIndex((step) => step.id === nextState.activeStepId)
  if (activeIndex < 0) {
    return flowState
  }

  nextState.steps[activeIndex].comments.push(createCommentEntry({
    type: 'comment',
    message: normalizedMessage,
    actorName
  }))
  nextState.updatedAt = toIsoString()
  return nextState
}

export const forwardCurrentFlowStep = (flowState, { actorName = '', message = '', action = 'send' } = {}) => {
  const nextState = cloneDeep(flowState)
  const activeIndex = nextState.steps.findIndex((step) => step.id === nextState.activeStepId)
  if (activeIndex < 0) {
    return flowState
  }

  const now = toIsoString()
  const currentStep = nextState.steps[activeIndex]
  const normalizedAction = normalizeText(action).toLowerCase() || 'send'
  if (normalizeText(message)) {
    currentStep.comments.push(createCommentEntry({
      type: normalizedAction === 'approve' ? 'approve' : 'forward',
      message,
      actorName,
      createdAt: now
    }))
  }

  if (normalizedAction === 'diy') {
    currentStep.actedBy = normalizeText(actorName) || currentStep.actedBy
    currentStep.actedAt = now
    nextState.activeStepId = currentStep.id
    nextState.currentRecipient = currentStep.title
    nextState.overallStatus = 'pending'
    nextState.updatedAt = now
    return nextState
  }

  currentStep.status = 'completed'
  currentStep.actedBy = normalizeText(actorName) || currentStep.actedBy
  currentStep.actedAt = now

  if (normalizedAction === 'approve') {
    nextState.activeStepId = null
    nextState.currentRecipient = ''
    nextState.overallStatus = 'approved'
    nextState.updatedAt = now
    return nextState
  }

  const nextStepId = resolveForwardTargetStepId(nextState, normalizedAction)
  const nextStep = nextState.steps.find((step) => step.id === nextStepId)
  if (!nextStep) {
    nextState.activeStepId = null
    nextState.currentRecipient = ''
    nextState.overallStatus = 'approved'
    nextState.updatedAt = now
    return nextState
  }

  nextStep.status = 'current'
  nextState.activeStepId = nextStep.id
  nextState.currentRecipient = nextStep.title
  nextState.overallStatus = 'pending'
  nextState.updatedAt = now
  return nextState
}

export const sendBackCurrentFlowStep = (flowState, { actorName = '', message = '' } = {}) => {
  const nextState = cloneDeep(flowState)
  const activeIndex = nextState.steps.findIndex((step) => step.id === nextState.activeStepId)
  if (activeIndex <= 0) {
    return flowState
  }

  const now = toIsoString()
  const currentStep = nextState.steps[activeIndex]
  const previousStep = nextState.steps[activeIndex - 1]

  currentStep.comments.push(createCommentEntry({
    type: 'return',
    message: normalizeText(message) || 'សូមពិនិត្យ និងកែសម្រួលម្តងទៀត។',
    actorName,
    createdAt: now
  }))

  currentStep.status = 'returned'
  currentStep.actedBy = normalizeText(actorName) || currentStep.actedBy
  currentStep.actedAt = now
  previousStep.status = 'current'

  nextState.activeStepId = previousStep.id
  nextState.currentRecipient = previousStep.title
  nextState.overallStatus = 'rejected'
  nextState.updatedAt = now
  return nextState
}

export const applyDocumentFlowListOverride = (documentRecord) => {
  const documentId = Number.parseInt(documentRecord?.id, 10)
  if (!documentId) {
    return documentRecord
  }

  const sourceTransaction = documentRecord?.transaction || documentRecord?.raw || null
  const flowState = documentRecord?.flowState
    ? finalizeFlowState(documentRecord.flowState, documentRecord.flowState.overallStatus)
    : sourceTransaction
      ? buildDocumentFlowState(sourceTransaction)
      : readStore()[String(documentId)]

  if (!flowState) {
    return documentRecord
  }

  const normalizedState = finalizeFlowState(flowState, flowState.overallStatus)
  const normalizedRecordStatus = normalizeText(sourceTransaction?.status || documentRecord?.status).toLowerCase()
  return {
    ...documentRecord,
    flowState: normalizedState,
    status: normalizedRecordStatus || normalizedState.overallStatus || documentRecord.status,
    displayStatusAction: getLatestHistoryActionType(sourceTransaction || documentRecord, normalizedState),
    sentTo: normalizedState.currentRecipient || documentRecord.sentTo
  }
}

const getWorkflowRecordDedupKey = (record = {}) => {
  const transaction = record?.transaction || record?.raw || record
  const documentId = transaction?.document?.id
  const documentNumber = normalizeText(transaction?.document?.number)
  const subject = normalizeText(transaction?.subject || transaction?.document?.objective || transaction?.title)

  if (documentId != null && documentId !== '') {
    return `document:${documentId}`
  }

  if (documentNumber) {
    return `number:${documentNumber.toLowerCase()}`
  }

  if (subject) {
    return `subject:${subject.toLowerCase()}`
  }

  return `transaction:${transaction?.id ?? record?.id ?? Math.random().toString(16).slice(2)}`
}

const getWorkflowRecordPriority = (record = {}) => {
  const transaction = record?.transaction || record?.raw || record
  const normalizedStatus = normalizeText(record?.flowState?.overallStatus || transaction?.status || record?.status).toLowerCase()

  if (['pending', 'current', 'processing', 'progressing', 'in_progress'].includes(normalizedStatus)) {
    return 4
  }

  if (normalizedStatus === 'draft') {
    return 3
  }

  if (normalizedStatus === 'rejected') {
    return 2
  }

  if (normalizedStatus === 'approved') {
    return 1
  }

  return 0
}

const getWorkflowRecordUpdatedAt = (record = {}) => {
  const transaction = record?.transaction || record?.raw || record
  return record?.updatedAt || record?.flowState?.updatedAt || transaction?.updated_at || transaction?.sent_at || transaction?.created_at || ''
}

export const dedupeWorkflowRecords = (records = []) => {
  const groupedRecords = new Map()

  records.forEach((record) => {
    const dedupKey = getWorkflowRecordDedupKey(record)
    const existingRecord = groupedRecords.get(dedupKey)

    if (!existingRecord) {
      groupedRecords.set(dedupKey, record)
      return
    }

    const candidatePriority = getWorkflowRecordPriority(record)
    const existingPriority = getWorkflowRecordPriority(existingRecord)

    if (candidatePriority !== existingPriority) {
      if (candidatePriority > existingPriority) {
        groupedRecords.set(dedupKey, record)
      }
      return
    }

    const candidateUpdatedAt = new Date(getWorkflowRecordUpdatedAt(record) || 0).getTime()
    const existingUpdatedAt = new Date(getWorkflowRecordUpdatedAt(existingRecord) || 0).getTime()
    if (candidateUpdatedAt >= existingUpdatedAt) {
      groupedRecords.set(dedupKey, record)
    }
  })

  return Array.from(groupedRecords.values())
}

const extractIdentityTexts = (source = {}) => {
  if (!source || typeof source !== 'object') {
    return []
  }

  const fullName = source.lastname && source.firstname
    ? `${source.lastname} ${source.firstname}`
    : source.fullname || ''

  return [
    source?.id != null ? String(source.id) : '',
    source?.username,
    source?.email,
    source?.name,
    fullName,
    source?.people?.email,
    source?.user?.id != null ? String(source.user.id) : '',
    source?.user?.username,
    source?.user?.email,
    source?.user?.name,
    source?.user?.fullname,
    source?.user?.lastname && source?.user?.firstname
      ? `${source.user.lastname} ${source.user.firstname}`
      : ''
  ]
    .map((value) => normalizeSearchText(value))
    .filter(Boolean)
}

const hasSharedIdentity = (left = {}, right = {}) => {
  const leftIdentities = extractIdentityTexts(left)
  const rightIdentities = extractIdentityTexts(right)

  if (!leftIdentities.length || !rightIdentities.length) {
    return false
  }

  return leftIdentities.some((value) => rightIdentities.includes(value))
}

export const canUserUseExplicitFlowActions = (user = {}) => {
  const roleTexts = [
    user?.role_name,
    user?.sub_role,
    user?.position?.name,
    user?.current_position,
    ...collectNestedTexts(user?.roles),
    ...collectNestedTexts(user?.position),
    ...collectNestedTexts(user?.organization_structure_position)
  ]
    .map((value) => normalizeSearchText(value))
    .filter(Boolean)

  const sourceTexts = [
    user?.role_name,
    user?.sub_role,
    user?.position?.name,
    user?.organization?.name,
    user?.current_position,
    user?.current_organization,
    ...collectNestedTexts(user?.roles),
    ...collectNestedTexts(user?.position),
    ...collectNestedTexts(user?.organization),
    ...collectNestedTexts(user?.organization_structure_position),
    ...collectNestedTexts(user?.organization_structure)
  ]
    .map((value) => normalizeSearchText(value))
    .filter(Boolean)

  const isCabinetDirector = roleTexts.some((text) => (
    text.includes('នាយកខុទ្ទកាល័យ')
    || text.includes('cabinet director')
    || text.includes('director of cabinet')
    || text.includes('cabinet chief')
    || text.includes('chief of cabinet')
    || text.includes('director cabinet')
    || text.includes('cabinet.director')
    || text.includes('cabinet_director')
  ))

  if (isCabinetDirector) {
    return false
  }

  return sourceTexts.some((text) => (
    text.includes('office dpm')
    || text.includes('office of dpm')
    || text.includes('office of deputy prime minister')
    || text.includes('deputy prime minister office')
    || text.includes('ខុទ្ទកាល័យឯកឧត្តមឧបនាយករដ្ឋមន្ត្រីប្រចាំការ')
    || text.includes('ខុទ្ទកាល័យឯកឧត្តមឧបនាយករដ្ឋមន្រ្តីប្រចាំការ')
    || text.includes('ឧបនាយករដ្ឋមន្ត្រីប្រចាំការ')
    || text.includes('ឧបនាយករដ្ឋមន្រ្តីប្រចាំការ')
  ))
}

const getFlowStepIdByTitle = (title = '') => FLOW_STEP_TITLES.findIndex((stepTitle) => stepTitle === normalizeText(title)) + 1

export const canUserAccessFlowRecord = (user = {}, documentRecord = {}, { isAdmin = false } = {}) => {
  if (isAdmin) {
    return true
  }

  const allowedStepIds = getAllowedFlowStepIds(user, { isAdmin })
  if (!allowedStepIds.length) {
    return true
  }

  const currentStepId = getFlowStepIdByTitle(documentRecord?.flowState?.currentRecipient || documentRecord?.sentTo)
  if (currentStepId > 0 && allowedStepIds.includes(currentStepId)) {
    return true
  }

  const transaction = documentRecord?.transaction || documentRecord?.raw || documentRecord
  const receivers = Array.isArray(transaction?.receivers) ? transaction.receivers : []
  const currentReceivers = receivers.filter((receiver) => normalizeReceiverStatus(receiver?.status || receiver?.action || receiver?.state) === 'current')

  if (currentReceivers.some((receiver) => hasSharedIdentity(user, receiver?.user || receiver))) {
    return true
  }

  return false
}

export const getAllowedFlowStepIds = (user = {}, { isAdmin = false } = {}) => {
  if (isAdmin) {
    return FLOW_STEP_TITLES.map((_, index) => index + 1)
  }

  const sourceTexts = [
    user?.username,
    user?.email,
    user?.role_name,
    user?.sub_role,
    user?.position?.name,
    user?.organization?.name,
    user?.people?.position,
    user?.people?.email,
    user?.current_position,
    user?.current_organization,
    ...collectNestedTexts(user?.position),
    ...collectNestedTexts(user?.organization),
    ...collectNestedTexts(user?.people),
    ...collectNestedTexts(user?.roles),
    ...collectNestedTexts(user?.organization_structure_position),
    ...collectNestedTexts(user?.organization_structure)
  ]
    .map((value) => normalizeSearchText(value))
    .filter(Boolean)

  const matchedSteps = Object.entries(FLOW_STEP_MATCHERS)
    .filter(([, keywords]) => keywords.some((keyword) => {
      const normalizedKeyword = normalizeSearchText(keyword)
      return sourceTexts.some((text) => text.includes(normalizedKeyword))
    }))
    .map(([stepId]) => Number.parseInt(stepId, 10))

  return Array.from(new Set(matchedSteps)).sort((left, right) => left - right)
}

export const getAllowedFlowStepTitles = (user = {}, options = {}) => {
  return getAllowedFlowStepIds(user, options)
    .map((stepId) => FLOW_STEP_TITLES[stepId - 1])
    .filter(Boolean)
}