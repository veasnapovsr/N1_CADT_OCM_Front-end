<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { toast } from 'vue-sonner'

import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
import FlowDashboardChart from '@/components/FlowDashboardChart.vue'
import FlowStats from '@/components/flow/FlowStatus.vue'
import { flowStats } from '@/data/Flowstatuscheck'
import { formatKhmerNumber } from '@/lib/utils'
import {
  applyDocumentFlowListOverride,
  dedupeWorkflowRecords,
  getStoredDocumentFlowState
} from '@/lib/documentFlow'

import { FlatPickr } from '@/components/ui/flat-pickr'
import { InputSelect } from '@/components/ui/inputselect'
import { getUser, isAdmin } from '@/plugins/authentication'

const store = useStore()
const pendingList = ref([])
const currentUser = getUser() || {}
const userIsAdmin = isAdmin()

const normalizeRoleText = (value) => String(value || '').trim().toLowerCase()
const currentUserRoleTexts = [
  currentUser?.username,
  currentUser?.email,
  currentUser?.current_position,
  currentUser?.current_organization,
  currentUser?.position?.name,
  currentUser?.organization?.name,
  currentUser?.role_name
].map(normalizeRoleText).filter(Boolean)

const FRONT_TRANSACTION_ALLOWED_ROLE_KEYWORDS = [
  'docflow.admin.department@ocm.gov.kh',
  'docflow.office.dpm@ocm.gov.kh',
  'docflow.specialist.unit@ocm.gov.kh',
  'នាយកដ្ឋានរដ្ឋបាល',
  'administration department',
  'department of administration',
  'office dpm',
  'office of dpm',
  'docflow office dpm',
  'office of deputy prime minister',
  'deputy prime minister office',
  'ខុទ្ទកាល័យឯកឧត្តមឧបនាយករដ្ឋមន្ត្រីប្រចាំការ',
  'ខុទ្ទកាល័យឯកឧត្តមឧបនាយករដ្ឋមន្រ្តីប្រចាំការ',
  'ឧបនាយករដ្ឋមន្ត្រីប្រចាំការ',
  'ឧបនាយករដ្ឋមន្រ្តីប្រចាំការ',
  'អង្គភាពជំនាញ',
  'docflow specialist unit',
  'specialist unit',
  'specialized unit',
  'technical unit',
  'expert unit'
]

const isBlockedFrontTransactionUser = computed(() => {
  return currentUserRoleTexts.some((text) => (
    text.includes('docflow.department.head@ocm.gov.kh')
    || text.includes('ប្រធាននាយកដ្ឋាន')
  ))
})

const canCreateFrontTransaction = computed(() => {
  if (isBlockedFrontTransactionUser.value) {
    return false
  }

  if (userIsAdmin) {
    return true
  }

  return currentUserRoleTexts.some((text) => (
    FRONT_TRANSACTION_ALLOWED_ROLE_KEYWORDS.some((keyword) => text.includes(keyword))
  ))
})

// ---------------- Router ----------------
const router = useRouter()

const goToDetail = () => {
  router.push({ name: 'pdf-documents-detail' })
}
const goToAll = () => {
  router.push({ name: 'pdf-flow' })
}

const goToPendingDetail = (doc) => {
  if (doc?.id) {
    router.push({ name: 'pdf-documents-detail', params: { id: doc.id } })
    return
  }

  goToDetail()
}

// ---------------- Pending files logic ----------------
const timeAgo = (isoString) => {
  if (!isoString) return 'N/A'

  const now = new Date()
  const past = new Date(isoString)
  const diffMs = now - past
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'ថ្ងៃនេះ'
  if (diffDays === 1) return '1 ថ្ងៃមុន'
  return `${diffDays} ថ្ងៃមុន`
}

const pendingFiles = computed(() => {
  return pendingList.value.slice(0, 4)
})

// ---------------- Form state (RIGHT CARD) ----------------
const form = reactive({
  objective: '',
  number: '',
  startDate: new Date(),
  documentType: null
})

const previewImages = ref([])
const files = ref([])
const fileInput = ref(null)
const isSubmitting = ref(false)
const isUploading = ref(false)

// ---------------- File upload handlers ----------------
const selectFiles = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event) => {
  const input = event.target
  addFiles(input.files || [])
  input.value = ''
}

const handleDrop = (event) => {
  event.preventDefault()
  addFiles(event.dataTransfer?.files || [])
}

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

const isPdf = (file) => file?.type === 'application/pdf'

const isWord = (file) => file && (
  file.type === 'application/msword'
  || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
)

const addFiles = (newFiles) => {
  if (!newFiles || !newFiles.length) {
    return
  }

  const incomingFiles = Array.from(newFiles)
  const currentFiles = [...files.value]
  let hasPdf = currentFiles.some(isPdf)
  let hasWord = currentFiles.some(isWord)

  for (const file of incomingFiles) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('អនុញ្ញាតតែឯកសារ PDF និង Word ប៉ុណ្ណោះ')
      return
    }

    if (file.size > 25 * 1024 * 1024) {
      toast.error('ឯកសារមិនអាចលើស 25MB បានទេ')
      return
    }

    if (isPdf(file)) {
      if (hasPdf) {
        currentFiles.splice(currentFiles.findIndex(isPdf), 1)
      }
      currentFiles.push(file)
      hasPdf = true
      continue
    }

    if (isWord(file)) {
      if (hasWord) {
        currentFiles.splice(currentFiles.findIndex(isWord), 1)
      }
      currentFiles.push(file)
      hasWord = true
    }
  }

  files.value = currentFiles
}

const removeFile = (index) => {
  files.value = files.value.filter((_, fileIndex) => fileIndex !== index)
}

const uploadFiles = async (record) => {
  if (isUploading.value || !record?.document_id) {
    return false
  }

  const pdfFile = files.value.find(isPdf)
  const wordFile = files.value.find(isWord)

  if (!pdfFile && !wordFile) {
    return false
  }

  isUploading.value = true

  try {
    toast.info('កំពុងភ្ជាប់ឯកសារយោង...')

    const handleUploadError = (error) => {
      const message = error?.response?.data?.message || error?.response?.data?.error || error?.message || 'មានបញ្ហាភ្ជាប់ឯកសារយោង'
      const isFlysystemError = message.includes('Flysystem')
        || message.includes('Filesystem::has()')
        || message.includes('must be of type string, null given')

      return { message, isFlysystemError }
    }

    let pdfOk = false
    let wordOk = false

    if (pdfFile) {
      try {
        const pdfFormData = new FormData()
        pdfFormData.append('pdf_file', pdfFile)
        pdfFormData.append('document_id', String(record.document_id))
        await store.dispatch('transaction/uploadPdf', pdfFormData)
        pdfOk = true
      } catch (error) {
        const { message, isFlysystemError } = handleUploadError(error)
        if (isFlysystemError) {
          pdfOk = true
        } else {
          toast.error(message)
        }
      }
    }

    if (wordFile) {
      try {
        const wordFormData = new FormData()
        wordFormData.append('word_file', wordFile)
        wordFormData.append('document_id', String(record.document_id))
        await store.dispatch('transaction/uploadWord', wordFormData)
        wordOk = true
      } catch (error) {
        const { message, isFlysystemError } = handleUploadError(error)
        if (isFlysystemError) {
          wordOk = true
        } else {
          toast.error(message)
        }
      }
    }

    if (pdfOk || wordOk) {
      toast.success('បានភ្ជាប់ឯកសារយោងរួចរាល់')
      files.value = []
      previewImages.value = []
    }

    return pdfOk || wordOk
  } finally {
    isUploading.value = false
  }
}

const submitForm = async () => {
  if (isSubmitting.value) {
    return
  }

  if (!canCreateFrontTransaction.value) {
    toast.error('អ្នកមិនមានសិទ្ធិបង្កើតប្រតិបត្តិការឯកសារនៅផ្ទាំងនេះទេ')
    return
  }

  if (!String(form.objective || '').trim() || !String(form.number || '').trim() || !form.startDate || !form.documentType) {
    toast.error('សូមបំពេញព័ត៌មានដែលបានគូសពណ៌ក្រហម')
    return
  }

  if (!files.value.some((file) => isPdf(file) || isWord(file))) {
    toast.error('សូមភ្ជាប់ឯកសារ PDF ឬ Word មុនពេលបញ្ជូន')
    return
  }

  isSubmitting.value = true

  try {
    const res = await store.dispatch('transaction/create', {
      objective: String(form.objective || '').trim(),
      number: String(form.number || '').trim(),
      date_in: form.startDate,
      document_type: form.documentType?.value ?? form.documentType
    })

    if (!res?.data?.ok) {
      throw new Error(res?.data?.message || 'មិនអាចបង្កើតប្រតិបត្តិការឯកសារបានទេ')
    }

    toast.success('រក្សារទុកព័ត៌មានប្រតិបត្តិការឯកសាររួចរាល់')

    const uploaded = await uploadFiles(res.data.record)
    if (!uploaded) {
      throw new Error('មិនអាចភ្ជាប់ឯកសារយោងបានទេ')
    }

    const transactionId = res.data.record?.id
    await store.dispatch('transaction/send', {
      id: transactionId,
      transaction_id: transactionId,
      document_transaction_id: transactionId,
      flow_action: 'send',
      action: 'send'
    })

    toast.success('បានបញ្ជូនឯកសារទៅតាមលំហូរការងាររួចរាល់')

    form.objective = ''
    form.number = ''
    form.startDate = new Date()
    form.documentType = null
    previewImages.value = []
    files.value = []

    await Promise.all([fetchStats(), fetchPendingList()])

    if (res?.data?.record?.id) {
      router.push({ name: 'pdf-documents-detail', params: { id: res.data.record.id } })
    }
  } catch (error) {
    console.error(error)
    toast.error(error?.response?.data?.message || error?.message || 'មិនអាចបង្កើតប្រតិបត្តិការឯកសារបានទេ')
  } finally {
    isSubmitting.value = false
  }
}

// ---------------- Select options ----------------
const departments = [
  { value: '2', label: 'អគ្គនាយកដ្ឋានសម្របសម្រួលកិច្ចការទូទៅ' },
  { value: '3', label: 'ក្រុមប្រឹក្សាអ្នកច្បាប់' },
  { value: '4', label: 'អង្គភាពព័ត៌មាននិងប្រតិកម្មរហ័ស' }
  // (you can paste your full list back here)
]

const documentTypes = [
  { value: '1', label: 'របាយការណ៍' },
  { value: '2', label: 'សំណើរ' },
]


const ministries = [
  { value: '2', label: 'ទីស្តីការគណៈរដ្ឋមន្ត្រី' },
  { value: '5', label: 'ក្រសួង ពាណិជ្ជកម្ម' }
]

const statsByStatus = ref(null)

const fetchStats = async () => {
  try {
    const res = await store.dispatch('transaction/getTotalByStatus')
    if (res?.data?.ok && res?.data?.records) {
      statsByStatus.value = res.data.records
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching stats by status:', err)
  }
}

const fetchPendingList = async () => {
  try {
    const res = await store.dispatch('transaction/list', {
      status: 'pending',
      perPage: 100,
      page: 1
    })

    if (res?.data?.records) {
      pendingList.value = dedupeWorkflowRecords(res.data.records)
        .map((r) => {
          const flowState = getStoredDocumentFlowState(r.id, r)
          return applyDocumentFlowListOverride({
            id: r.id,
            title: r.subject,
            code: r.document?.number,
            size: r.document?.pdf_file_size || '3 MB',
            sentTo: !r.receivers?.length ? 'គ្មានអ្នកទទួល' : r.receivers.map((rev) => rev.user?.fullname).filter(Boolean).join(', '),
            flowState,
            transaction: r,
            updatedAt: flowState?.updatedAt || r.updated_at || r.sent_at || r.created_at || ''
          })
        })
        .sort((left, right) => new Date(right.updatedAt || 0) - new Date(left.updatedAt || 0))
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching pending documents:', err)
  }
}

const flowStatsSynced = computed(() => {
  const records = statsByStatus.value || {}
  const total =
    (Number(records.draft) || 0) +
    (Number(records.pending) || 0) +
    (Number(records.approved) || 0) +
    (Number(records.rejected) || 0)
  return flowStats.map((item) => {
    const count =
      item.statusKey === 'all'
        ? total
        : Number(records[item.statusKey]) || 0
    return {
      value: formatKhmerNumber(count),
      label: item.label,
      class: item.class
    }
  })
})

onMounted(() => {
  fetchStats()
  fetchPendingList()
})
</script>


<template>
  <Header title="រំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
  <section class="appppw">
  <Aside />
  <div class="sw">
    <div class="app_content">				

				<div class="ocm_cwr">					
					<h2 class="h wttt ocm_ptitle t-lspace">ផ្ទាំងគ្រប់គ្រងលំហូរឯកសារសង្ខេប</h2>						
				</div>
				<div class="ocm_dashboard_splits">
					<div>
						<FlowStats :stats="flowStatsSynced" />

            <div class="ocmopt-col cols2 mb-30">
  <div class="ocm_card ocm_doc_fr">
  <div class="ocm_card_body">
    <h2 class="h card_tt t-lspace w-full flex justify-between items-center">
      <span>ឯកសារត្រូវពិនិត្យ ({{ formatKhmerNumber(pendingFiles.length) }})</span>
      <span class="ocm_lbl" @click="goToAll">បង្ហាញទាំងអស់</span>
    </h2>

    <span
      v-for="doc in pendingFiles"
      :key="doc.id"
      class="jl_tbl_w cursor-pointer ocm_dcwait"
      @click="goToPendingDetail(doc)"
    >
              <span class="ocm_docfw">
                <span class="ocm_docf d-flex flex-column align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
                PDF
                </span>
                {{ doc.size }}
              </span>
              <span class="jl_tbl_c gap-1">
                <span class="tb_n1 ellip-2 bold">{{ doc.title }}</span>
                <span class="tb_n1 fs-90 w-full flex justify-between"><span>លិខិតលេខ: {{ doc.code || 'នស/រកម / ០០៣៤' }}</span><span class="pri-color">ឯកសារដល់: <b>{{ doc.sentTo }}</b></span></span>
              </span>
            </span>

    <p v-if="!pendingFiles.length" class="text-sm text-slate-500 py-4">
      មិនមានឯកសារសម្រាប់ជំហាននេះទេ។
    </p>



</div>
  </div>

  <div v-if="canCreateFrontTransaction" class="ocm_card ocm_doc_fr">
  <div class="ocm_card_body">

    <h2 class="h card_tt t-lspace mb-10">បង្កើតប្រតិបត្តិការ</h2>

    <form @submit.prevent="submitForm">

      <!-- Subject -->
      <div class="ocmopt-col cols1 mb-15">
        <div class="ocmopt-meta">
          <div class="ocmopt-meta-title">
            <label class="ocmopt-meta-label t-lspace">កម្មវត្ថុ</label>
          </div>
          <div class="ocmopt-meta-content ocm_meta_check">
            <textarea
              v-model="form.objective"
              class="form-control"
              cols="60"
              rows="5"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Letter No + Date (2 columns) -->
      <div class="ocmopt-col cols3 mb-15">

        <div class="ocmopt-meta">
          <div class="ocmopt-meta-title">
            <label class="ocmopt-meta-label t-lspace">លិខិតលេខ</label>
          </div>
          <div class="ocmopt-meta-content">
            <input
              v-model="form.number"
              type="text"
              class="form-control"
            />
          </div>
        </div>

        <div class="ocmopt-meta">
          <div class="ocmopt-meta-title">
            <label class="ocmopt-meta-label t-lspace">កាលបរិច្ឆេទ</label>
          </div>
          <div class="ocmopt-meta-content">
            <FlatPickr
              v-model="form.startDate"
              placeholder="កាលបរិច្ឆេទ"
              :config="{
                dateFormat: 'd-m-Y',
                altInput: true,
                altFormat: 'd-m-Y',
                allowInput: true
              }"
            />
          </div>
        </div>

        <div class="ocmopt-meta">
								<div class="ocmopt-meta-title"><label class="ocmopt-meta-label t-lspace">ប្រភេទឯកសារ</label></div>
								<div class="ocmopt-meta-content formsel">
									<InputSelect
										v-model="form.documentType"
										:options="documentTypes"
										track-by="value"
										label="label"
										placeholder="ប្រភេទឯកសារ"
										:multiple="false"
										:clear-on-select="false"
									/>
								</div>
							</div>

      </div>
      

      <!-- Upload zone -->
      <div
        class="drop-zone mb-15"
        @dragover.prevent
        @drop="handleDrop"
        @click="selectFiles"
      >
        <svg stroke="currentColor" fill="none" viewBox="0 0 48 48" class="w-12 h-12 mx-auto text-gray-400"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        <p class="drop-zone-hint">អូសនិងទម្លាក់ ឬចុចទីនេះ — អាចភ្ជាប់ទាំង PDF និង Word (១ PDF + ១ Word)</p>
        <input
          type="file"
          multiple
          ref="fileInput"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          @change="handleFileUpload"
          hidden
        />

        <div class="list-files-upload w-full p-4">
          <div v-for="(file, index) in files" :key="index" class="selectedFiles w-full m-2 flex items-center gap-2 flex-wrap">
            <span>{{ index + 1 }}. {{ file.name }} , ទំហំ៖ {{ (file.size / 1024 / 1024).toFixed(2) }} មេកាបៃ (MB)</span>
            <button type="button" class="file-remove-btn" :title="'យកចេញ ' + file.name" @click.stop="removeFile(index)">×</button>
          </div>
        </div>
      </div>

      <!-- Save button -->
      <div class="text-right">
        <button
          class="button ocm_btn_ac button-primary"
          type="submit"
          :disabled="isSubmitting || isUploading"
        >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 32 448 448"><path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88s88-39.477 88-88s-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40s40 17.944 40 40s-17.944 40-40 40z" fill="currentColor"></path></svg>
        រក្សារទុក
        </button>
      </div>

    </form>
  </div>
</div>

</div>
											
						
						
					</div>
					<div class="ocm_chart_card">
						<FlowDashboardChart />
					</div>
				</div>
			</div>
			<Footer />
		</div>  
</section>
</template>
  <Header title="រំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
<style scoped>
.drop-zone {
  width: 100%;
  padding: 20px;
  background: #e5e5e566;
  border: 2px dashed var(--ocm-input-border);
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  font-size: 15px;
}

.drop-zone:hover {
  background: #e5e5e566;
}

.drop-zone svg {
  width: 50px;
}

.drop-zone-hint {
  margin: 0;
  font-size: 14px;
}

.list-files-upload .selectedFiles {
  min-height: 2rem;
}

.file-remove-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: #e5e7eb;
  color: #374151;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
}

.file-remove-btn:hover {
  background: #fca5a5;
  color: #b91c1c;
}
</style>