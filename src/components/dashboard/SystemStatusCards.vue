<template>
  <div class="ocm_dashboard_splits">
    <div>
      <div class="ocm_bfw ocm_stat system-status-grid">
        <div
          v-for="card in cards"
          :key="card.key"
          class="ocm_caw noneh"
          :class="card.className"
        >
          <div class="ocm_card_body">
            <div class="ocm_icardw">
              <h5 class="ocm_card_value">{{ formatKhmerNumber(card.value) }}</h5>
              <div class="ocm_icard" v-html="card.icon"></div>
            </div>
            <p class="ocm_card_title">{{ card.label }}</p>
            <p v-if="card.hint" class="ocm_card_hint">{{ card.hint }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatKhmerNumber } from '@/lib/utils'

const props = defineProps({
  stats: {
    type: Object,
    default: () => ({})
  }
})

const docIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="4 2 16 20"><g fill="none"><path fill="currentColor" d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z"/></g></svg>`

const userIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05C15.64 13.37 17 14.28 17 15.5V19h7v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`

const cards = computed(() => [
  {
    key: 'users',
    label: 'អ្នកប្រើប្រាស់សកម្ម',
    hint: 'ចូលប្រើប្រាស់ប្រព័ន្ធ',
    value: props.stats.activeUsers ?? 0,
    className: 'status_wait',
    icon: userIcon
  },
  {
    key: 'documents',
    label: 'ឯកសារទាំងអស់',
    hint: 'លំហូរឯកសារក្នុងប្រព័ន្ធ',
    value: props.stats.totalDocuments ?? 0,
    className: 'status_all',
    icon: docIcon
  },
  {
    key: 'pending',
    label: 'ឯកសារកំពុងរង់ចាំ',
    hint: 'ស្ថានភាព Pending',
    value: props.stats.pendingDocuments ?? 0,
    className: 'status_wait',
    icon: docIcon
  },
  {
    key: 'completed',
    label: 'ឯកសារបានបញ្ចប់',
    hint: 'ស្ថានភាព Approved',
    value: props.stats.completedDocuments ?? 0,
    className: 'status_accept',
    icon: docIcon
  },
  {
    key: 'officers',
    label: 'មន្ត្រីទាំងអស់',
    hint: 'ក្នុងប្រព័ន្ធគ្រប់គ្រង',
    value: props.stats.totalOfficers ?? 0,
    className: 'status_all',
    icon: userIcon
  },
  {
    key: 'online',
    label: 'អ្នកប្រើប្រាស់ Online',
    hint: 'កំពុងភ្ជាប់បច្ចុប្បន្ន',
    value: props.stats.onlineUsers ?? 0,
    className: 'status_accept',
    icon: userIcon
  }
])
</script>

<style scoped>
.system-status-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.ocm_card_hint {
  margin: 6px 0 0;
  font-size: 12px;
  opacity: 0.65;
}

@media (max-width: 1024px) {
  .system-status-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .system-status-grid {
    grid-template-columns: 1fr;
  }
}
</style>
