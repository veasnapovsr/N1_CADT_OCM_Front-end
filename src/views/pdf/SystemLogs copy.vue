<template>
  <Header title="លំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
  <section class="appppw">
  <Aside />
  <div class="sw">
    <div class="app_content">
      <div class="ocm_cwr">
        <h2 class="h wttt t-lspace">Logs ប្រព័ន្ធគ្រប់គ្រង</h2>
      </div>
      
      <!-- card content -->
       <!-- Card Content -->
       
				<div class="ocm_dashboard_splits">
					<div>
						<div class="ocm_bfw ocm_stat">
					<div class="ocm_caw noneh status_wait">
						<div class="ocm_card_body">
							<div class="ocm_icardw">
							<h5 class="ocm_card_value">{{ formatKhmerNumber(pendingCount) }}</h5>
							<div class="ocm_icard">
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
							</div>			
							</div>
							<p class="ocm_card_title">Log ឯកសារទាំងអស់</p>
						</div>
					</div>
					<div class="ocm_caw noneh status_accept">
						<div class="ocm_card_body">
						<div class="ocm_icardw">	
						<h5 class="ocm_card_value">{{ formatKhmerNumber(approvedCount) }}</h5>
						<div class="ocm_icard">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
						</div>			
						</div>
							<p class="ocm_card_title">ឯកសារបានបង្កើត</p>
						</div>
					</div>
					<div class="ocm_caw noneh status_all">
						<div class="ocm_card_body">
							<div class="ocm_icardw">
							<h5 class="ocm_card_value">{{ formatKhmerNumber(totalCount) }}</h5>
							<div class="ocm_icard">
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
							</div>			
							</div>
							<p class="ocm_card_title">ឯកសារមិនយល់ព្រម</p>
						</div>
					</div>
					<div class="ocm_caw noneh status_draft">
						<div class="ocm_card_body">
							<div class="ocm_icardw">
							<h5 class="ocm_card_value">{{ formatKhmerNumber(draftCount) }}</h5>
							<div class="ocm_icard">
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
							</div>			
							</div>
							<p class="ocm_card_title">មតិយោបល់</p>
						</div>
					</div>
					<div class="ocm_caw noneh status_decline">
						<div class="ocm_card_body">
						<div class="ocm_icardw">
						<h5 class="ocm_card_value">{{ formatKhmerNumber(rejectedCount) }}</h5>
							<div class="ocm_icard">
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
							</div>			
							</div>
							<p class="ocm_card_title">ឯកសារបានអនុម័ត</p>
						</div>
					</div>
						</div>
						</div>
						</div>
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
          <select v-model="filters.actionType" class="form-control">
            <option value="">ទាំងអស់ - Action Type</option>
            <option value="comment">Comment</option>
            <option value="reject">Reject</option>
            <option value="approve">Approve</option>
            <option value="sent">Sent</option>
            <option value="created">Created</option>
          </select>
        </div>
        <div class="items">
          <input 
            type="date" 
            v-model="filters.date" 
            class="form-control" 
            placeholder="ថ្ងៃ"
          />
        </div>
        <button @click="applyFilters" class="button ocm_btn_ac button-primary t-lspace">
          ស្វែងរក
        </button>
      </div>
 
      <!-- Logs Timeline -->
      <!-- Most Active Users: Top 10 -->
      <div class="ocm_cwr mb-8">
        <h3 class="h wttt t-lspace mb-4">អ្នកប្រើប្រាស់សកម្មបំផុត៖ ចំណាត់ថ្នាក់កំពូលទាំង ១០</h3>
      
      </div>
       <div class="ocm_tb_wrap shadow-right" style="width: 100%;">
          <table class="wp-list-table widefat striped" style="width: 100%;">
            <thead>
              <tr>
                <th class="t-lspace" style="width: 40px;">#</th>
                <th class="t-lspace" style="width: 60px;">Avatar</th>
                <th class="t-lspace">Name</th>
                <th class="t-lspace" style="width: 80px;">Count</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, idx) in topActiveUsers" :key="user.name">
                <td>{{ idx + 1 }}</td>
                <td>
                  <span class="jl_tbl_img">
                    <img :src="user.img || 'https://ui-avatars.com/api/?name=' + user.name" :alt="user.name" style="width:32px;height:32px;border-radius:50%;" />
                  </span>
                </td>
                <td>
                  <span class="jl_tbl_c">
                    <span class="tb_n1 bold fs-95">{{ user.name }}</span>
                    <span class="tb_n1 fs-90">អនុរដ្ឋលេខាធិការ</span>
                  </span>
                </td>
                <td>
                  <span class="fw-bold">{{ user.count }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      
      <!-- Timeline of Logs -->

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
              <div class="timeline_time">{{ formatTime(log.timestamp) }}</div>
              <div class="timeline_dot" :class="getActionBadgeClass(log.actionType)"></div>
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
                <span class="timeline_date">{{ formatKhmerDate(log.timestamp) }}</span>
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
                <div class="doc_title">{{ log.documentDescription }}</div>
                <div class="doc_ref">លិខិតលេខ: {{ log.documentReference }}</div>
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
      </div>
  
  <Footer />
</section>
</template>

<script setup>

///To compute the top 10 Users
import { ref, computed, onMounted } from 'vue'

import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
import { formatKhmerNumber } from '@/lib/utils.js'
import { leaders } from '@/data/leader.js'
import { documents } from '@/data/documents'

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

// Mock logs data
const logs = ref([])

// Router
const router = useRouter()

// Computed stats from logs
const pendingCount = computed(() => {
  // All logs
  return logs.value.length
})

const approvedCount = computed(() => {
  // Created logs
  return logs.value.filter(log => log.actionType === 'created').length
})

const totalCount = computed(() => {
  // Rejected logs
  return logs.value.filter(log => log.actionType === 'reject').length
})

const draftCount = computed(() => {
  // Comment logs
  return logs.value.filter(log => log.actionType === 'comment').length
})

const rejectedCount = computed(() => {
  // Approved logs
  return logs.value.filter(log => log.actionType === 'approve').length
})

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
        description = `បានបដិសេធឯកសារ`
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
    reject: 'បដិសេធ',
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

const formatKhmerDate = (timestamp) => {
  const date = new Date(timestamp)

  const khmerMonths = [
    'មករា',
    'កុម្ភៈ',
    'មិនា',
    'មេសា',
    'ឧសភា',
    'មិថុនា',
    'កក្កដា',
    'សីហា',
    'កញ្ញា',
    'តុលា',
    'វិច្ឆិកា',
    'ធ្នូ'
  ]

  const latinToKhmerDigits = {
    '0': '០',
    '1': '១',
    '2': '២',
    '3': '៣',
    '4': '៤',
    '5': '៥',
    '6': '៦',
    '7': '៧',
    '8': '៨',
    '9': '៩'
  }

  const day = date.getDate().toString()
  const monthName = khmerMonths[date.getMonth()]
  const year = date.getFullYear().toString()

  const base = `${day} ${monthName} ${year}`
  return base.replace(/[0-9]/g, d => latinToKhmerDigits[d] || d)
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)

  const latinToKhmerDigits = {
    '0': '០',
    '1': '១',
    '2': '២',
    '3': '៣',
    '4': '៤',
    '5': '៥',
    '6': '៦',
    '7': '៧',
    '8': '៨',
    '9': '៩'
  }

  const raw = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })

  return raw.replace(/[0-9]/g, d => latinToKhmerDigits[d] || d)
}

const applyFilters = () => {
  currentPage.value = 1 // Reset to first page when filtering
}

// Lifecycle
onMounted(() => {
  logs.value = generateMockLogs()
})

// To view the Top 10 most active users (by log count)
const topActiveUsers = computed(() => {
  // Count logs per user
  const userMap = new Map()
  logs.value.forEach(log => {
    if (!userMap.has(log.userName)) {
      userMap.set(log.userName, { name: log.userName, img: log.userAvatar, count: 0 })
    }
    userMap.get(log.userName).count++
  })
  // Convert to array and sort by count desc
  return Array.from(userMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
})
</script>

<style scoped>
.ocm_status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.ocm_status.status-sent {
  background-color: #10b981;
  color: white;
}

.ocm_status.status-reject {
  background-color: #ef4444;
  color: white;
}

.ocm_status.status-comment {
  background-color: #6b7280;
  color: white;
}

.ocm_status.status-approve {
  background-color: #10b981;
  color: white;
}

.ocm_status.status-created {
  background-color: #3b82f6;
  color: white;
}

.pagination_w {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.logs_pagination_bar {
  position: sticky;
  bottom: 0;
  padding-top: 5px;
  padding-bottom: 20px;
  background-color: var(--ocm-bg);
  z-index: 5;
  
}

.bold {
  font-weight: bold;
}

.log_time {
  font-weight: bold;
  color: #2563eb; /* blue-600 */
  margin-left: 4px;
}

/* Timeline */
.timeline_wrap {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.04);
  margin-bottom: 12px;
}

.timeline_list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.timeline_item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 12px;
  position: relative;
}

.timeline_left {
  position: relative;
  text-align: right;
  padding-right: 28px;
  color: #6b7280;
  font-weight: 600;
}

.timeline_time {
  font-size: 14px;
  color: #1f2937;
}

.timeline_dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  position: absolute;
  right: 5px;
  top: 6px;
  background: #d1d5db;
  box-shadow: 0 0 0 4px #f3f4f6;
}

.timeline_line {
  position: absolute;
  right: 11px;
  top: 24px;
  width: 2px;
  height: calc(100% - 20px);
  background: linear-gradient(to bottom, #e5e7eb 0%, #d1d5db 100%);
}

.timeline_body {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.timeline_meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-weight: 600;
}

.timeline_date {
  color: #6b7280;
}

.timeline_counter {
  margin-left: auto;
  color: #9ca3af;
}

.timeline_user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.timeline_user .jl_tbl_img img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
}

.timeline_doc {
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.timeline_doc .doc_title {
  font-weight: 700;
  color: #1f2937;
}

.timeline_doc .doc_ref {
  font-size: 13px;
  color: #4b5563;
}

.timeline_comment_box {
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 12px;
  color: #111827;
  line-height: 1.5;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04);
}

.timeline_action_line {
  color: #111827;
  font-weight: 600;
}

.timeline_empty {
  border: 1px dashed #e5e7eb;
  border-radius: 12px;
  padding: 24px;
}

/* Use action classes for dot color */
.timeline_dot.status-comment { background: #6b7280; }
.timeline_dot.status-reject { background: #ef4444; }
.timeline_dot.status-approve { background: #10b981; }
.timeline_dot.status-sent { background: #0ea5e9; }
.timeline_dot.status-created { background: #3b82f6; }

@media (max-width: 768px) {
  .timeline_item {
    grid-template-columns: 1fr;
  }
  .timeline_left {
    text-align: left;
    padding-right: 0;
    padding-left: 24px;
  }
  .timeline_dot {
    right: auto;
    left: 0;
  }
  .timeline_line {
    right: auto;
    left: 6px;
  }
}

</style>