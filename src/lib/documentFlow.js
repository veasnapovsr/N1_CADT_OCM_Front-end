const STORAGE_KEY = 'document-flow-state-v1'

export const FLOW_STEP_TITLES = [
  'នាយកដ្ឋានរដ្ឋបាល',
  'ប្រធាននាយកដ្ឋាន',
  'ខុទ្ទកាល័យឯកឧត្តមឧបនាយករដ្ឋមន្ត្រីប្រចាំការ',
  'អង្គភាពជំនាញ'
]

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
    'ខុទ្ទកាល័យឯកឧត្តមឧបនាយករដ្ឋមន្ត្រីប្រចាំការ',
    'ខុទ្ទកាល័យ',
    'ឧបនាយករដ្ឋមន្ត្រី',
    'deputy prime minister',
    'cabinet office',
    'cabinet_office',
    'cabinet.office',
    'office_dpm',
    'office.dpm',
    'dpm office',
    'deputy_pm_office',
    'deputy.pm.office'
  ],
  4: [
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

  if (transactionStatus === 'draft' && !receivers.length) {
    steps[0].assigneeName = senderName
    steps[0].status = 'current'
  } else {
    steps[0].assigneeName = senderName
    steps[0].actedBy = senderName
    steps[0].actedAt = createdAt
    steps[0].status = 'completed'
  }

  receivers.slice(0, 3).forEach((receiver, index) => {
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
    return [1, 2, 3, 4]
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