<template>
  <Header title="លំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
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
        <div v-if="filteredLogs.length === 0" class="ocm_dt_empt timeline_empty">
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
    {{ formatKhmerNumber(
      new Date(log.timestamp).toLocaleDateString('en-US', {})
    ) }}
  </span>
  <span class="timeline_counter">
    {{ formatKhmerNumber((currentPage - 1) * itemsPerPage + index + 1) }}
  </span>
</div>
              <div class="timeline_user">
                <span class="jl_tbl_img">
                  <img :src="log.userAvatar || 'https://ui-avatars.com/api/?name=' + log.userName" :alt="log.userName" />
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
              <div v-if="log.actionType === 'comment'" class="timeline_comment_box">
                {{ log.description }}
              </div>
              <div v-else class="timeline_action_line">
                {{ log.description }}
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
import { leaders } from '@/data/leader.js'
import { documents } from '@/data/documents'
import DateSelect from '@/components/flow/DateSelect.vue'
import { InputSelect } from '@/components/ui/inputselect'
import {
  formatKhmerNumber,
  formatDateKhmer
} from '@/lib/utils.js'


// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(20)

// Filters
const filters = ref({
  user: '',
  document: '',
  actionType: '',
  date: ''
})
// Action type dropdown options (for InputSelect)
const actionTypeOptions = [
  { label: 'ទាំងអស់', value: '' },
  { label: 'មតិយោបល់', value: 'comment' },
  { label: 'មិនយល់ព្រម', value: 'reject' },
  { label: 'ឯកសារបានអនុម័ត', value: 'approve' },
  { label: 'ឯកសារបញ្ជូន', value: 'sent' },
  { label: 'បង្កើតឯកសារ', value: 'created' }
]
// Mock logs data
const logs = ref([])

// Router
const router = useRouter()
// Generate mock logs data using imported data
const generateMockLogs = () => {
  const actionTypes = ['comment', 'reject', 'approve', 'sent', 'created']
  const mockLogs = []
  const now = new Date()

  // Create logs for each document with various actions
  documents.forEach((doc, docIndex) => {
    // Get random leader for creator/user
    const leader = leaders[Math.floor(Math.random() * leaders.length)]
    
    // Generate multiple log entries per document to simulate activity
    const numLogsPerDoc = Math.floor(Math.random() * 3) + 1 // 1-3 logs per document
    
    for (let i = 0; i < numLogsPerDoc; i++) {
      let actionType = 'created'
      let description = ''
      let timestamp = new Date(doc.date)
      
      // Determine action type based on document status and position in logs
      if (i === 0) {
        // First log is always creation
        actionType = 'created'
        description = `បានបង្កើតឯកសារ`
        timestamp = new Date(doc.date)
      } else if (i === 1 && doc.sentAt) {
        // Second log could be sent
        actionType = 'sent'
        description = `បានផ្ញើឯកសារទៅ ${doc.sentTo}`
        timestamp = new Date(doc.sentAt)
      } else if (doc.status === 'approved') {
        actionType = 'approve'
        description = `បានអនុម័តឯកសារ`
        timestamp = doc.sentAt ? new Date(doc.sentAt) : new Date(doc.date)
        // Add some hours to make it after sent
        timestamp.setHours(timestamp.getHours() + Math.floor(Math.random() * 24) + 1)
      } else if (doc.status === 'rejected') {
        actionType = 'reject'
        description = `មិនយល់ព្រម`
        timestamp = doc.sentAt ? new Date(doc.sentAt) : new Date(doc.date)
        timestamp.setHours(timestamp.getHours() + Math.floor(Math.random() * 24) + 1)
      } else if (doc.status === 'pending') {
        actionType = doc.sentAt ? 'sent' : 'comment'
        if (doc.sentAt) {
          description = `បានផ្ញើឯកសារទៅ ${doc.sentTo}`
        } else {
          // Generate mock comment
          const mockComments = [
            'ឯកសារមានកំហុសអក្ខរាវិរុទ្ធ។ សូមកែសម្រួលឲ្យបានត្រឹមត្រូវ និងដាក់ស្នើឡើងវិញ។'
          ]
          description = mockComments[Math.floor(Math.random() * mockComments.length)]
        }
        timestamp = doc.sentAt ? new Date(doc.sentAt) : new Date(doc.date)
      } else {
        actionType = 'comment'
        // Generate mock comment
        const mockComments = [
          'ឯកសារមានកំហុសអក្ខរាវិរុទ្ធ។ សូមកែសម្រួលឲ្យបានត្រឹមត្រូវ និងដាក់ស្នើឡើងវិញ។'
        ]
        description = mockComments[Math.floor(Math.random() * mockComments.length)]
        timestamp = new Date(doc.date)
        timestamp.setHours(timestamp.getHours() + Math.floor(Math.random() * 48))
      }

      // Use document creator or random leader
      const user = doc.creator || leader.name
      const userSubtitle = 'អនុរដ្ឋលេខាធិការ'
      
      
      mockLogs.push({
        id: mockLogs.length + 1,
        actionType,
        documentId: doc.id,
        userName: user,
        userSubtitle: userSubtitle,
        userAvatar: doc.creatorAvatar || leader.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(user)}&background=0031c3&color=fff`,
        documentDescription: doc.title,
        documentReference: doc.code,
        description,
        timestamp: timestamp.toISOString()
      })
    }
  })

  // Sort by timestamp (newest first)
  return mockLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
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
    result = result.filter(log => log.actionType === filters.value.actionType)
  }

  // Filter by date
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
  if (!log.documentId) return
  router.push({
    name: 'pdf-documents-detail',
    params: { id: log.documentId }
  })
}

const getActionLabel = (actionType) => {
  const labels = {
    comment: 'ផ្តល់មតិយោបល់',
    reject: 'មិនយល់ព្រម',
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

// Lifecycle
onMounted(() => {
  logs.value = generateMockLogs()
})
</script>