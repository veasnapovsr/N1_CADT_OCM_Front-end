<template>
  <div class="doc-view-card">
    <!-- Card title: ទិដ្ឋភាពឯកសារ -->
    <h3 class="doc-title">ទិដ្ឋភាពឯកសារ</h3>

    <!-- COMPACT Document dropdown -->
    <div class="dropdown-section compact-select">
      <InputSelect
        :model-value="selectedDocId"
        :options="formattedDocuments"
        track-by="id"
        label="displayTitle"
        :multiple="false"
        :clearable="false"
        :clear-on-select="false"
        @update:model-value="onSelectDocument"
      />
    </div>

    <!-- Document info (BIGGER title) -->
    <div class="doc-info-row">
      <div class="ocm_docfw">
        <div class="ocm_docf">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="4 2 16 20">
            <path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor" />
          </svg>
          <span class="pdf-text">PDF</span>
        </div>
      </div>

      <p class="doc-selected-title" :title="selectedDocument?.title">
        {{ selectedDocument?.title }}
      </p>
    </div>

    <!-- Chart Section -->
    <div class="chart-container">
      <div class="donut-wrap">
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" stroke="#F1F5F9" stroke-width="10" fill="none" />
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="var(--ocm-sec-color, #6366f1)"
            stroke-width="12"
            fill="none"
            stroke-linecap="round"
            class="donut-fill"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="dashOffset"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div class="donut-center">
          <span class="count">{{ totalViews }}</span>
          <span class="label">ការចូលមើល</span>
        </div>
      </div>
    </div>

    <!-- Viewers list with Status Indicators -->
    <div class="viewer-section">
      <p class="viewer-title">អ្នកចូលមើល</p>
      <div class="viewer-scroll custom-scrollbar">
        <div v-for="user in viewers" :key="user.value" class="viewer-item">
          <div class="viewer-left">
            <img :src="user.img" @error="onImgError" />
            <span class="viewer-name">{{ user.name }}</span>
          </div>
          
          <!-- Status Indicator (Khmer) -->
          <div :class="['status-badge', `status-${user.status}`]">
            {{ khmerStatus[user.status] || user.status }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { InputSelect } from '@/components/ui/inputselect'
import { documents } from '@/data/documents'
import { leaders } from '@/data/leader'

const selectedDocId = ref(documents[0]?.id)

// Status Translation Map
const khmerStatus = {
  comment: 'ផ្តល់មតិយោបល់',
  reject: 'បដិសេធ',
  approve: 'បានអនុម័តឯកសារ',
  sent: 'បានបញ្ជូនឯកសារ',
  created: 'បានបង្កើតឯកសារ'
}

const formattedDocuments = computed(() => 
  documents.map(doc => ({
    ...doc,
    displayTitle: doc.title.length > 25 ? doc.title.substring(0, 25) + '...' : doc.title
  }))
)

const selectedDocument = computed(() => documents.find(d => d.id === selectedDocId.value))

function onSelectDocument(value) { if (value) selectedDocId.value = value }

const viewers = computed(() => {
  const statuses = ['approve', 'reject', 'comment', 'sent', 'created'];
  return leaders.slice(0, 8).map((user, index) => ({
    ...user,
    status: statuses[index % statuses.length]
  }));
})

const totalViews = computed(() => viewers.value.length)
const radius = 50
const circumference = 2 * Math.PI * radius
const dashOffset = computed(() => {
  const max = 10;
  return circumference * (1 - Math.min(totalViews.value / max, 1));
})

const onImgError = (e) => {
  e.target.src = 'https://ui-avatars.com/api/?background=E5E7EB&color=374151&name=U'
}
</script>

<style scoped>
/* Added Khmer font support and improved line-heights */
.doc-view-card {
  border-radius: 16px;
  padding: 18px;
  border: 1px solid var(--ocm-app-border, #e2e8f0);
  display: flex;
  flex-direction: column;
}

.doc-title {
  font-size: 17px;
  font-weight: 700;
  line-height: 1.6;
}

.dropdown-section { margin-bottom: 14px; }
.compact-select :deep(.multiselect__single) { 
  font-size: 13px; 
  line-height: 1.5;
}

.doc-info-row {
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 10px;
  margin-bottom: 16px;
}

.ocm_docf {
  color: #ef4444;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.doc-selected-title {
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.chart-container { display: flex; justify-content: center; margin-bottom: 16px; }
.donut-wrap { position: relative; width: 120px; height: 120px; }
.donut-fill { transition: stroke-dashoffset 0.5s ease; }
.donut-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.count { font-size: 26px; font-weight: 800; ; line-height: 1; }
.label { font-size: 11px; font-weight: 700; ; margin-top: 4px; }

.viewer-title {
  font-weight: 700;
  margin-bottom: 5px;
  line-height: 1.5;
}

.viewer-scroll {
  max-height: 110px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.viewer-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.viewer-left {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
}

.viewer-left img {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
}

.viewer-name {
  font-size: 13px;
  opacity: 0.7;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Status Badges */
.status-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 6px;
  flex-shrink: 0;
  line-height: 1.2;
}

.status-approve { background: #dcfce7; color: #166534; }
.status-reject { background: #fee2e2; color: #991b1b; }
.status-comment { background: #fef9c3; color: #854d0e; }
.status-sent { background: #dbeafe; color: #1e40af; }
.status-created { background: #f1f5f9; color: #475569; }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
:deep(.multiselect__clear) { display: none !important; }
</style>