<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
import FlowDashboardChart from '@/components/FlowDashboardChart.vue'
import FlowStats from '@/components/flow/FlowStatus.vue'
import { flowStats } from '@/data/Flowstatuscheck'
import { formatKhmerNumber } from '@/lib/utils'
import {
  applyDocumentFlowListOverride,
  canUserAccessFlowRecord,
  getStoredDocumentFlowState
} from '@/lib/documentFlow'

import { FlatPickr } from '@/components/ui/flat-pickr'
import { InputSelect } from '@/components/ui/inputselect'
import { getUser, isAdmin } from '@/plugins/authentication'

const store = useStore()
const pendingList = ref([])
const currentUser = getUser() || {}
const userIsAdmin = isAdmin()

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
  title: '',
  uid: '',
  department: '',
  documentType: '',
  ministry: '',
  signature: null
})

const startDate = ref(null)
const previewImages = ref([])
const selectedFiles = ref([])
const fileInput = ref(null)
const isSubmitting = ref(false)

// ---------------- File upload handlers ----------------
const selectFiles = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const files = event.target.files
  processFiles(files)
}

const handleDrop = (event) => {
  event.preventDefault()
  const files = event.dataTransfer.files
  processFiles(files)
}

const processFiles = (files) => {
  for (const file of files) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        previewImages.value.push(e.target.result)
      }
      reader.readAsDataURL(file)
      selectedFiles.value.push(file)
    }
  }
}

// Fake submit (you can plug your API later)
const submitForm = async () => {
  isSubmitting.value = true
  console.log('Submitting form:', form)
  console.log('Files:', selectedFiles.value)
  isSubmitting.value = false
}

// ---------------- Select options ----------------
const departments = [
  { value: '2', label: 'អគ្គនាយកដ្ឋានសម្របសម្រួលកិច្ចការទូទៅ' },
  { value: '3', label: 'ក្រុមប្រឹក្សាអ្នកច្បាប់' },
  { value: '4', label: 'អង្គភាពព័ត៌មាននិងប្រតិកម្មរហ័ស' }
  // (you can paste your full list back here)
]

const documentTypes = [
{ value: "1", label: "របាយការណ៍" },
        { value: "2", label: "សំណើរ" },
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
      pendingList.value = res.data.records
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
        .filter((record) => canUserAccessFlowRecord(currentUser, record, { isAdmin: userIsAdmin }))
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
  <Header title="លំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
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

  <div class="ocm_card ocm_doc_fr">
  <div class="ocm_card_body">

    <h2 class="h card_tt t-lspace mb-10">បង្កើតឯកសារ</h2>

    <form @submit.prevent="submitForm">

      <!-- Subject -->
      <div class="ocmopt-col cols1 mb-15">
        <div class="ocmopt-meta">
          <div class="ocmopt-meta-title">
            <label class="ocmopt-meta-label t-lspace">កម្មវត្ថុ</label>
          </div>
          <div class="ocmopt-meta-content ocm_meta_check">
            <textarea
              v-model="form.title"
              class="form-control"
              cols="60"
              rows="3"
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
              v-model="form.uid"
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
              v-model="startDate"
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
        <p>អូសនិងទម្លាក់ឯកសារនៅទីនេះ ឬចុចទីនេះ</p>
        <input
          type="file"
          multiple
          ref="fileInput"
          @change="handleFileUpload"
          hidden
        />
      </div>

      <!-- Image previews -->
      <div class="img_preview mb-15">
        <div v-for="(image, index) in previewImages" :key="index">
          <img :src="image" />
        </div>
      </div>

      <!-- Save button -->
      <div class="text-right">
        <button
          class="button ocm_btn_ac button-primary"
          type="submit"
          :disabled="isSubmitting"
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