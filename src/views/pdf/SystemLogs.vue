<template>
  <Header title="លំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />

  <section class="appppw">
    <Aside />

    <div class="sw">
      <div class="flex flex-col">

        <!-- Page title -->
        <div class="ocm_cwr flex items-center justify-between">
          <h2 class="h wttt t-lspace">Logs ប្រព័ន្ធគ្រប់គ្រង</h2>
        </div>

        <CountNumber />

        <!-- MAIN GRID -->
        <div class="dashboard-grid">

          <!-- LEFT COLUMN -->
          <div class="dashboard-left">

            <!-- CHART + DOCUMENT VIEW -->
            <div class="dashboard-row">

              <!-- Chart -->
              <div class="dashboard-card chart-card">
                <LogActivityLineChart />
              </div>

              <!-- Document Views -->
              <div class="dashboard-card view-card">
                <DocumentViewDonut />
              </div>

            </div>

            <!-- TOP 10 USERS -->
            <div>
              <div class="ocm_cwr mb-4">
                <h3 class="h wttt t-lspace">
                  អ្នកប្រើប្រាស់សកម្មបំផុតចំណាត់ថ្នាក់កំពូលទាំង ១០
                </h3>
              </div>

              <TopActiveUsers :users="topActiveUsers" />
            </div>

          </div>

          <!-- RIGHT COLUMN -->
          <div class="dashboard-right">
            <OnlineUsers />
          </div>

        </div>

      </div>

      <Footer />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
import CountNumber from '@/components/CountNumber.vue'
import LogActivityLineChart from '@/components/LogActivityLineChart.vue'
import OnlineUsers from '@/components/OnlineUserList.vue'
import TopActiveUsers from '@/components/TopActiveUsers.vue'
import DocumentViewDonut from '@/components/DocumentViewDonut.vue'

import { leaders } from '@/data/leader'
import { documents } from '@/data/documents'

/* ================================
   LOGS
================================ */
const logs = ref([])

const generateMockLogs = () => {
  const mockLogs = []

  documents.forEach((doc) => {
    const leader = leaders[Math.floor(Math.random() * leaders.length)]

    mockLogs.push({
      userName: doc.creator || leader.name,
      userAvatar:
        doc.creatorAvatar ||
        leader.img ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          doc.creator || leader.name
        )}&background=0031c3&color=fff`
    })
  })

  return mockLogs
}

const topActiveUsers = computed(() => {
  const userMap = new Map()

  logs.value.forEach((log) => {
    if (!userMap.has(log.userName)) {
      userMap.set(log.userName, {
        name: log.userName,
        img: log.userAvatar,
        count: 0
      })
    }
    userMap.get(log.userName).count++
  })

  return Array.from(userMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
})

/* ================================
   VIEWPORT / DPI FIX
================================ */
let resizeTimer = null

const forceReflow = () => {
  // Force browser to recompute grid, dvh, clamp, sticky
  document.body.style.display = 'none'
  // eslint-disable-next-line no-unused-expressions
  document.body.offsetHeight
  document.body.style.display = ''
}

const handleResize = () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    forceReflow()
  }, 150)
}

onMounted(() => {
  logs.value = generateMockLogs()

  window.addEventListener('resize', handleResize)
  window.addEventListener('orientationchange', handleResize)

  // Run once after mount (important)
  setTimeout(forceReflow, 60)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('orientationchange', handleResize)
})
</script>

<style scoped>
/* ================================
   MAIN GRID
================================ */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr minmax(260px, 320px);
  gap: clamp(12px, 2vw, 20px);
  margin-bottom: clamp(12px, 2vw, 20px);
}

/* ================================
   LEFT COLUMN
================================ */
.dashboard-left {
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2.5vw, 24px);
}

/* ================================
   CHART + VIEW ROW
================================ */
.dashboard-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: clamp(12px, 2vw, 20px);
}

/* ================================
   CARD
================================ */
.dashboard-card {
  background: var(--ocm-app-bg, #f8fafc);
  border-radius: 16px;
  padding: clamp(14px, 2vw, 20px);
  border: 1px solid var(--ocm-app-border, #e2e8f0);
}

/* ================================
   CHART CARD
================================ */
.chart-card {
  min-height: clamp(240px, 35dvh, 320px);
}

/* ================================
   VIEW CARD
================================ */
.view-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

/* ================================
   RIGHT COLUMN
================================ */
.dashboard-right {
  position: sticky;
  top: clamp(12px, 2vh, 20px);
  height: fit-content;
}

/* ================================
   LAPTOP (≤1280px)
================================ */
@media (max-width: 1280px) {
  .dashboard-grid {
    grid-template-columns: 1fr 280px;
  }
}

/* ================================
   TABLET (≤1024px)
================================ */
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-row {
    grid-template-columns: 1fr;
  }

  .dashboard-right {
    position: static;
  }
}

/* ================================
   MOBILE (≤640px)
================================ */
@media (max-width: 640px) {
  .chart-card {
    min-height: 220px;
  }
}
</style>
