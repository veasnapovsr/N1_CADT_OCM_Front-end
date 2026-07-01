<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
import SystemStatusCards from '@/components/dashboard/SystemStatusCards.vue'
import PerformancePieChart from '@/components/dashboard/PerformancePieChart.vue'
import LogActivityLineChart from '@/components/LogActivityLineChart.vue'
import DocumentViewDonut from '@/components/DocumentViewDonut.vue'
import OnlineUsers from '@/components/OnlineUserList.vue'
import TopActiveUsers from '@/components/TopActiveUsers.vue'
import FlowDashboardChart from '@/components/FlowDashboardChart.vue'

import { leaders } from '@/data/leader'
import { documents } from '@/data/documents'
import { getAuthorization } from '@/plugins/authentication'

const store = useStore()

const apiBaseUrl = (import.meta.env.VITE_API_SERVER || '').replace(/\/$/, '')
const officersUrl = `${apiBaseUrl}/officers`

const statusStats = ref({})
const officers = ref([])
const loading = ref(true)

const sumDocumentStatuses = (records = {}) => (
  (Number(records.draft) || 0)
  + (Number(records.pending) || 0)
  + (Number(records.approved) || 0)
  + (Number(records.rejected) || 0)
)

const statusCards = computed(() => ({
  activeUsers: 1453,
  totalDocuments: sumDocumentStatuses(statusStats.value),
  pendingDocuments: Number(statusStats.value.pending) || 0,
  completedDocuments: Number(statusStats.value.approved) || 0,
  totalOfficers: officers.value.length || 0,
  onlineUsers: 12
}))

const userActivityItems = computed(() => [
  { label: 'ចូលប្រើប្រាស់', value: 1453, color: '#3b82f6' },
  { label: 'មើលឯកសារ', value: 3245, color: '#22c55e' },
  { label: 'មតិយោបល់', value: 1892, color: '#f59e0b' },
  { label: 'ទាញយកឯកសារ', value: 876, color: '#8b5cf6' }
])

const documentFlowItems = computed(() => [
  { label: 'ឯកសារចូល', value: Number(statusStats.value.draft) || 0, color: '#6366f1' },
  { label: 'ឯកសារចេញ', value: Number(statusStats.value.rejected) || 0, color: '#ef4444' },
  { label: 'បានបញ្ចប់', value: Number(statusStats.value.approved) || 0, color: '#22c55e' },
  { label: 'កំពុងរង់ចាំ', value: Number(statusStats.value.pending) || 0, color: '#f59e0b' }
])

const officerGenderItems = computed(() => {
  const male = officers.value.filter((officer) => {
    const gender = String(officer.people?.gender || officer.gender || '').toLowerCase()
    return gender === 'male' || gender === 'm' || gender === 'ប្រុស' || gender === '1'
  }).length

  const female = officers.value.filter((officer) => {
    const gender = String(officer.people?.gender || officer.gender || '').toLowerCase()
    return gender === 'female' || gender === 'f' || gender === 'ស្រី' || gender === '2'
  }).length

  const unknown = Math.max(officers.value.length - male - female, 0)

  return [
    { label: 'ប្រុស', value: male, color: '#3b82f6' },
    { label: 'ស្រី', value: female, color: '#ec4899' },
    { label: 'មិនបញ្ជាក់', value: unknown, color: '#94a3b8' }
  ]
})

const officerRankItems = computed(() => {
  const rankMap = new Map()

  officers.value.forEach((officer) => {
    const rankName = officer.rank?.name
      || officer.rank?.thnak
      || officer.current_position
      || 'មិនបញ្ជាក់'

    rankMap.set(rankName, (rankMap.get(rankName) || 0) + 1)
  })

  const palette = ['#0031c3', '#2563eb', '#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6']

  return Array.from(rankMap.entries())
    .sort((left, right) => right[1] - left[1])
    .slice(0, 6)
    .map(([label, value], index) => ({
      label,
      value,
      color: palette[index % palette.length]
    }))
})

const userRoleItems = computed(() => [
  { label: 'អ្នកគ្រប់គ្រង', value: 24, color: '#0031c3' },
  { label: 'ប្រធានផ្នែក', value: 56, color: '#2563eb' },
  { label: 'មន្ត្រី', value: 312, color: '#22c55e' },
  { label: 'ផ្សេងៗ', value: 48, color: '#94a3b8' }
])

const topActiveUsers = computed(() => {
  const userMap = new Map()

  documents.forEach((doc) => {
    const leader = leaders[Math.floor(Math.random() * leaders.length)]
    const userName = doc.creator || leader.name

    if (!userMap.has(userName)) {
      userMap.set(userName, {
        name: userName,
        img: doc.creatorAvatar || leader.img,
        count: 0
      })
    }

    userMap.get(userName).count += 1
  })

  return Array.from(userMap.values())
    .sort((left, right) => right.count - left.count)
    .slice(0, 10)
})

const fetchDocumentStats = async () => {
  try {
    const res = await store.dispatch('transaction/getTotalByStatus')
    if (res?.data?.ok && res?.data?.records) {
      statusStats.value = res.data.records
    }
  } catch (error) {
    console.error('Failed to load document stats:', error)
  }
}

const fetchOfficers = async () => {
  try {
    const res = await axios.get(officersUrl, {
      params: { page: 1, perPage: 500 },
      headers: { Authorization: getAuthorization() }
    })

    const records = res?.data?.records
    officers.value = Array.isArray(records) ? records : []
  } catch (error) {
    console.error('Failed to load officers:', error)
    officers.value = []
  }
}

onMounted(async () => {
  loading.value = true
  await Promise.all([fetchDocumentStats(), fetchOfficers()])
  loading.value = false
})
</script>

<template>
  <Header title="រំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />

  <section class="appppw">
    <Aside />

    <div class="sw">
      <div class="app_content">
        <div class="ocm_cwr">
          <h2 class="h wttt ocm_ptitle t-lspace">Logs ប្រព័ន្ធគ្រប់គ្រង</h2>
        </div>

        <p v-if="loading" class="perf-loading t-lspace">កំពុងផ្ទុកទិន្នន័យ...</p>

        <SystemStatusCards :stats="statusCards" />

        <div class="perf-section">
          <h3 class="perf-section__title t-lspace">ស្ថានភាពសកម្មភាពប្រចាំថ្ងៃ</h3>
          <div class="perf-chart-card">
            <LogActivityLineChart />
          </div>
        </div>

        <div class="perf-section">
          <h3 class="perf-section__title t-lspace">ស្ថិតិ និងគំនូសតាង Pie Chart</h3>
          <div class="perf-pie-grid">
            <PerformancePieChart title="សកម្មភាពអ្នកប្រើប្រាស់" :items="userActivityItems" />
            <PerformancePieChart title="ប្រវត្តិឯកសារ (ចូល/ចេញ/បញ្ចប់/រង់ចាំ)" :items="documentFlowItems" />
            <PerformancePieChart title="មន្ត្រីតាមភេទ" :items="officerGenderItems" />
            <PerformancePieChart title="មន្ត្រីតាមឋានន្តរស័ក្តិ" :items="officerRankItems" />
            <PerformancePieChart title="អ្នកប្រើប្រាស់តាមតួនាទី" :items="userRoleItems" />
          </div>
        </div>

        <div class="perf-section">
          <h3 class="perf-section__title t-lspace">គំនូសតាងលំហូរឯកសារតាមខែ</h3>
          <FlowDashboardChart />
        </div>

        <div class="perf-dashboard-grid">
          <div class="perf-dashboard-left">
            <div class="perf-dashboard-row">
              <div class="perf-dashboard-card chart-card">
                <DocumentViewDonut />
              </div>
            </div>

            <div>
              <h3 class="perf-section__title t-lspace">អ្នកប្រើប្រាស់សកម្មបំផុតទាំង ១០</h3>
              <TopActiveUsers :users="topActiveUsers" />
            </div>
          </div>

          <div class="perf-dashboard-right">
            <OnlineUsers />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  </section>
</template>

<style scoped>
.perf-loading {
  margin: 0 0 16px;
  font-size: 14px;
  opacity: 0.7;
}

.perf-section {
  margin-top: 24px;
}

.perf-section__title {
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 14px;
}

.perf-chart-card {
  background: var(--ocm-app-bg, #f8fafc);
  border: 1px solid var(--ocm-app-border, #e2e8f0);
  border-radius: 16px;
  padding: 18px;
  min-height: 280px;
}

.perf-pie-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.perf-dashboard-grid {
  display: grid;
  grid-template-columns: 1fr minmax(260px, 320px);
  gap: 20px;
  margin-top: 24px;
  margin-bottom: 20px;
}

.perf-dashboard-left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.perf-dashboard-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.perf-dashboard-card {
  background: var(--ocm-app-bg, #f8fafc);
  border-radius: 16px;
  padding: 14px;
  border: 1px solid var(--ocm-app-border, #e2e8f0);
}

.perf-dashboard-right {
  position: sticky;
  top: 20px;
  height: fit-content;
}

@media (max-width: 1024px) {
  .perf-pie-grid {
    grid-template-columns: 1fr;
  }

  .perf-dashboard-grid {
    grid-template-columns: 1fr;
  }

  .perf-dashboard-right {
    position: static;
  }
}
</style>
