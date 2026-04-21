const STORAGE_KEY = 'document-flow-state-v1'

export const FLOW_STEP_TITLES = [
  'នាយកដ្ឋានរដ្ឋបាល',
  'ប្រធាននាយកដ្ឋាន',
  'នាយកខុទ្ទកាល័យ',
  'ខុទ្ទកាល័យឯកឧត្តមឧបនាយករដ្ឋមន្ត្រីប្រចាំការ',
  'អង្គភាពជំនាញ'
]

export const FLOW_BRANCH_STEP_ID = 4

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

const createCommentSignature = (comment = {}) => [
  normalizeText(comment.type),
  normalizeText(comment.message),
  normalizeText(comment.actorName),
  normalizeText(comment.createdAt)
].join('|')

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

export const getFlowProgressSignature = (flowState = {}) => {
  const steps = Array.isArray(flowState?.steps) ? flowState.steps : []
  const completedCount = steps.filter((step) => step.status === 'completed').length
  const returnedCount = steps.filter((step) => step.status === 'returned').length
  const activeStepId = Number(flowState?.activeStepId) || 0
  const statusWeight = flowState?.overallStatus === 'approved' ? 1000 : flowState?.overallStatus === 'rejected' ? 500 : 0

  return statusWeight + (completedCount * 10) + (returnedCount * 5) + activeStepId
}

const mergeStoredProgressIntoFlowState = (baseFlowState, storedFlowState) => {
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
    const rawValue = window.localStorage.getItem(STORAGE_KEY)
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

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextValue))
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

const normalizeReceiverStatus = (value) => {
  const status = normalizeText(value).toLowerCase()

  if (!status) {
    return 'pending'
  }

  if (['approved', 'approve', 'sent', 'done', 'completed', 'complete', 'accepted'].includes(status)) {
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

const applyDocumentBriefingsToSteps = (transaction = {}, steps = []) => {
  const briefings = Array.isArray(transaction?.document?.briefings) ? transaction.document.briefings : []

  briefings.forEach((briefing) => {
    const commentMessage = briefing?.briefing || briefing?.message || briefing?.comment || ''
    if (!normalizeText(commentMessage)) {
      return
    }

    const briefer = briefing?.briefer || briefing?.user || {}
    const preferredStepId = getPreferredWorkflowStepId(briefer)
    const currentStepIndex = steps.findIndex((step) => step.status === 'current')
    const targetIndex = preferredStepId > 0
      ? preferredStepId - 1
      : currentStepIndex >= 0
        ? currentStepIndex
        : 0
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
  return matchedStepIds.length ? Math.max(...matchedStepIds) : 0
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
    step.comments = comments
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

const finalizeFlowState = (flowState, baseStatus = '') => {
  const nextState = cloneDeep(flowState)
  const approved = normalizeText(baseStatus).toLowerCase() === 'approved'

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

export const buildDocumentFlowState = (transaction = {}) => {
  const transactionStatus = normalizeText(transaction?.status).toLowerCase()
  const receivers = Array.isArray(transaction?.receivers) ? transaction.receivers : []
  const steps = FLOW_STEP_TITLES.map((title, index) => buildStepRecord(index, title))
  const senderName = extractDisplayName(transaction?.sender)
  const createdAt = transaction?.created_at || transaction?.sent_at || transaction?.date_in || ''
  const hasIdentityProgress = applyWorkflowIdentityProgress({
    transaction,
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

  applyDocumentBriefingsToSteps(transaction, steps)

  reconcileOrderedStepStatuses(steps)

  return finalizeFlowState({
    documentId: Number.parseInt(transaction?.id, 10) || 0,
    activeStepId: null,
    currentRecipient: '',
    overallStatus: transactionStatus || 'pending',
    updatedAt: toIsoString(transaction?.updated_at || createdAt || ''),
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
      return getFlowProgressSignature(storedValue) > getFlowProgressSignature(backendState)
        ? mergeStoredProgressIntoFlowState(backendState, storedValue)
        : mergeStoredCommentsIntoFlowState(backendState, storedValue)
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

export const forwardCurrentFlowStep = (flowState, { actorName = '', message = '' } = {}) => {
  const nextState = cloneDeep(flowState)
  const activeIndex = nextState.steps.findIndex((step) => step.id === nextState.activeStepId)
  if (activeIndex < 0) {
    return flowState
  }

  const now = toIsoString()
  const currentStep = nextState.steps[activeIndex]
  if (normalizeText(message)) {
    currentStep.comments.push(createCommentEntry({
      type: activeIndex === nextState.steps.length - 1 ? 'approve' : 'forward',
      message,
      actorName,
      createdAt: now
    }))
  }

  currentStep.status = 'completed'
  currentStep.actedBy = normalizeText(actorName) || currentStep.actedBy
  currentStep.actedAt = now

  if (activeIndex >= nextState.steps.length - 1) {
    nextState.activeStepId = null
    nextState.currentRecipient = ''
    nextState.overallStatus = 'approved'
    nextState.updatedAt = now
    return nextState
  }

  const nextStep = nextState.steps[activeIndex + 1]
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

  if (documentRecord?.status || documentRecord?.transaction || documentRecord?.raw) {
    return documentRecord
  }

  const store = readStore()
  const flowState = store[String(documentId)]
  if (!flowState) {
    return documentRecord
  }

  const normalizedState = finalizeFlowState(flowState, flowState.overallStatus)
  return {
    ...documentRecord,
    status: normalizedState.overallStatus || documentRecord.status,
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