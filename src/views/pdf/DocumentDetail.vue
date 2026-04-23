<template>
  <Header title="រំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
  <section class="appppw">
    <div class="flex h-[calc(100vh-64px)] overflow-hidden">
      <Aside />
      <div class="sw flex flex-col flex-1 overflow-hidden">
        <div class="app_content flex flex-col flex-1 overflow-hidden">
          <div class="flex flex-1 overflow-hidden doc_details">
            
            <!-- PDF SECTION -->
            <div 
              class="flex-1 overflow-hidden relative flex flex-col"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleDrop"
            >
              <!-- Heading Area -->
              <div class="ocm_cwr">
                <h2 class="h doc-heading t-lspace flex justify-between items-start gap-4">
                  <div class="flex-1 min-w-0">
                    <!-- Title allowed to wrap to 2 lines -->
                    <span class="block leading-snug wrap-break-word line-clamp-2">
                      {{ documentTransaction?.document?.objective || documentTransaction?.document?.title || 'ឯកសារយោង' }}
                      <span v-if="comparePdfSrc" class="text-red-500 text-sm block md:inline font-bold"> (ប្រៀបធៀបឯកសារ)</span>
                    </span>
                    <!-- Creator and date/time under title (same line) -->
                    <div v-if="documentTransaction && (creatorName || documentDateTime)" class="font-khmer text-sm text-gray-600 mt-1">
                      <span v-if="creatorName">
                        អ្នកបង្កើតឯកសារ :
                        <span class="font-khmer font-bold text-gray-900">{{ creatorName }}</span>
                      </span>
                      <span v-if="creatorName && documentDateTime"> · </span>
                      <span v-if="documentDateTime" class="font-light text-blue-600">{{ documentDateTime }}</span>
                    </div>
                  </div>

                  <div class="flex gap-2 shrink-0">
                    <!-- Manual Upload / Close Toggle Button -->
                    <input type="file" ref="fileInput" class="hidden" accept="application/pdf" @change="handleFileSelect" />
                    
                    <button 
                      v-if="!comparePdfSrc" 
                      @click="$refs.fileInput.click()" 
                      class="button ocm_btn_ac button-primary"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                      </svg>
                      បង្ហោះឯកសារថ្មី
                    </button>

                    <button 
                      v-else 
                      @click="comparePdfSrc = null" 
                      class="button ocm_btn_ac"
                      style="background-color: #dc2626; color: white; border: none;"
                    >
                     
                      បិទការប្រៀបធៀប
                    </button>

                    <a v-if="wordFileUrl" :href="wordFileUrl" class="button ocm_btn_ac button-primary">
                      <svg fill="#000000" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="1 1.32 12 11.36"><path d="m 12.999992,2.866331 0,8.273839 c 0,0.0705 -0.025,0.127505 -0.0745,0.173007 -0.0505,0.047 -0.110505,0.069 -0.180008,0.069 l -4.2796751,0 0,-1.147547 3.4911431,0 0,-0.522522 -3.4941432,0 0,-0.639526 3.4911432,0 0,-0.522021 -3.4886431,0 0,-0.645027 3.4901431,0 0,-0.516021 -3.4901431,0 0,-0.646526 3.4901431,0 0,-0.522022 -3.4901431,0 0,-0.639526 3.4901431,0 0,-0.521521 -3.4901431,0 0,-0.652527 3.4901431,0 0,-0.497021 -3.4901431,0 0,-1.296553 4.2811751,0 c 0.0745,0 0.135006,0.024 0.179008,0.0745 0.0525,0.0495 0.075,0.110005 0.0745,0.178008 z m -5.1747123,-1.546064 0,11.361466 -6.82527977,-1.181048 0,-8.967368 6.82527977,-1.21505 0,0.002 z m -1.0300423,3.354138 -0.854535,0.0525 -0.5480225,3.392639 -0.012501,0 C 5.3531783,7.959039 5.2526742,7.397016 5.0726668,6.435977 L 4.7531537,4.80441 3.9511209,4.84441 3.6301077,6.435975 C 3.4426,7.363013 3.3380957,7.902535 3.3105946,8.054041 l -0.0075,0 -0.48752,-3.125128 -0.7350301,0.039 0.7875323,3.941661 0.8170335,0.0525 0.3075126,-1.534063 C 4.1726299,6.527981 4.2776342,6.004959 4.3001352,5.861953 l 0.022501,0 c 0.030501,0.152507 0.1280052,0.687029 0.3075126,1.605066 l 0.3075126,1.579065 0.8850363,0.0525 0.9900406,-4.425181 -0.017501,0 z"></path></svg>
                      ទាញយក Document Word
                    </a>
                  </div>
                </h2>
              </div>

              <!-- PDF Viewers Container -->
              <div class="pdf-container h-full flex" :class="comparePdfSrc ? 'flex-row' : 'flex-col'">
                
                <div :class="comparePdfSrc ? 'w-1/2 border-r-2 border-blue-500' : 'w-full h-full'">
                  <div v-if="comparePdfSrc" class="bg-blue-100 text-blue-800 text-center text-[10px] uppercase py-1 font-bold">ឯកសារចាស់ (Original)</div>
                  <PdfViewer v-if="pdfSrc" :key="'original-' + pdfSrc" :src="pdfSrc" class="doc_preview h-full" />
                </div>

                <div v-if="comparePdfSrc" class="w-1/2 h-full">
                  <div class="bg-green-100 text-green-800 text-center text-[10px] uppercase py-1 font-bold">ឯកសារថ្មី (New Upload)</div>
                  <PdfViewer :key="'compare-' + comparePdfSrc" :src="comparePdfSrc" class="doc_preview h-full" />
                </div>

                <div v-if="!pdfSrc && !comparePdfSrc" class="p-10 text-center flex-1">
                  <span>កំពុងទាញយកឯកសារ...</span>
                </div>
              </div>

              <!-- Drag and Drop Overlay -->
              <div v-if="isDragging" class="absolute inset-0 bg-blue-500/20 border-4 border-dashed border-blue-600 z-50 flex items-center justify-center pointer-events-none">
                <div class="bg-white p-6 rounded-lg shadow-xl text-center">
                  <p class="text-xl font-bold text-blue-600 font-moul">ទម្លាក់ឯកសារ PDF នៅទីនេះ</p>
                  <p>ដើម្បីធ្វើការប្រៀបធៀប</p>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="w-90 overflow-y-auto doc_sidebar">
              <DocumentTimeline
                :document-id="documentTransactionId"
                :transaction="documentTransaction"
                @updated="handleTimelineUpdated"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  <Header title="រំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { formatKhmerNumber, formatDateKhmer } from '@/lib/utils'

import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import PdfViewer from '@/components/PdfViewer.vue'
import DocumentTimeline from '@/components/DocumentTimeline.vue'

const RAW_API_SERVER = import.meta.env.VITE_API_SERVER || ''
const API_SERVER = /^https?:\/\//i.test(RAW_API_SERVER)
  ? RAW_API_SERVER.replace(/\/$/, '')
  : new URL(RAW_API_SERVER, import.meta.env.VITE_API_PROXY_TARGET || window.location.origin).toString().replace(/\/$/, '')
const API_BASE_URL = API_SERVER.replace(/\/api\/authcenter$/i, '')

const store = useStore()
const route = useRoute()

const pdfSrc = ref(null)
const comparePdfSrc = ref(null)
const isDragging = ref(false)
const fileInput = ref(null)
const documentTransaction = ref(null)
const documentTransactionId = ref(Number(route.params.id) || 0)

const resolveDocumentAssetUrl = (value) => {
  const source = typeof value === 'string' ? value.trim() : ''

  if (!source) {
    return ''
  }

  if (
    source.startsWith('http://') ||
    source.startsWith('https://') ||
    source.startsWith('data:') ||
    source.startsWith('blob:')
  ) {
    if (source.startsWith('data:') || source.startsWith('blob:')) {
      return source
    }

    try {
      const url = new URL(source)

      if (url.origin === API_BASE_URL && url.pathname.startsWith('/storage/')) {
        return `${url.pathname}${url.search}${url.hash}`
      }

      return source
    } catch {
      return source
    }
  }

  if (source.startsWith('/storage/')) {
    return source
  }

  if (source.startsWith('storage/')) {
    return `/${source}`
  }

  if (source.startsWith('/')) {
    return `${API_BASE_URL}${source}`
  }

  return `/storage/${source.replace(/^storage\//, '')}`
}

const wordFileUrl = computed(() => {
  const url = documentTransaction.value?.document?.word_file
  return url && typeof url === 'string' && url.trim() ? resolveDocumentAssetUrl(url) : null
})

const creatorName = computed(() => {
  const s = documentTransaction.value?.sender
  if (!s) return ''
  const parts = [
    s.countesy_name,
    s.lastname && s.firstname ? `${s.lastname} ${s.firstname}` : s.fullname || ''
  ].filter(Boolean)
  return parts.join(' ')
})

const documentDateTime = computed(() => {
  const dateSource =
    documentTransaction.value?.date_in ||
    documentTransaction.value?.created_at ||
    documentTransaction.value?.sent_at

  if (!dateSource) return ''

  // Date part (match Flow: "០៥ កុម្ភៈ ២០២៦")
  const dateObj = new Date(dateSource)
  const dateStr = Number.isNaN(dateObj.getTime())
    ? formatKhmerNumber(String(dateSource).trim())
    : formatDateKhmer(dateSource)

  // Time part (match Flow: "ម៉ោង: ១០:៣០ AM")
  const timeSource =
    documentTransaction.value?.created_at || documentTransaction.value?.sent_at
  if (!timeSource) return dateStr

  const timeObj = new Date(timeSource)
  if (Number.isNaN(timeObj.getTime())) return dateStr

  const timeStr = timeObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })

  const timeKh = timeStr ? formatKhmerNumber(timeStr) : ''
  return timeKh ? `${dateStr} ${timeKh}` : dateStr
})

// Process shared logic for file handling
const processFile = (file) => {
  if (file && file.type === 'application/pdf') {
    comparePdfSrc.value = URL.createObjectURL(file)
  } else {
    alert("សូមជ្រើសរើសតែឯកសារ PDF ប៉ុណ្ណោះ")
  }
}

const handleDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  processFile(file)
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  processFile(file)
}

const loadData = async () => {
  if (documentTransactionId.value <= 0) return
  try {
    const res = await store.dispatch('transaction/read', { id: documentTransactionId.value })
    const data = res?.data
    const record = data?.record ?? data
    const doc = record?.document
    documentTransaction.value = record || null

    if (doc?.pdf_file?.trim()) {
      pdfSrc.value = resolveDocumentAssetUrl(doc.pdf_file)
    } else {
      pdfSrc.value = '/docs/report2.pdf'
    }
  } catch (err) {
    console.error(err)
    pdfSrc.value = '/docs/report2.pdf'
  }
}

const handleTimelineUpdated = async (nextTransaction) => {
  if (nextTransaction && typeof nextTransaction === 'object') {
    documentTransaction.value = nextTransaction
    return
  }

  await loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.pdf-container {
  min-height: calc(100vh - 80px);
}

/* Allow title to take two lines before adding ellipsis */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>  