<template>
  <div class="flow-table-wrapper">
    <div class="ocm_tb_wrap mb-10 shadow-right" v-bind="$attrs">
      <table class="wp-list-table widefat striped">
        <thead>
          <tr>
            <th class="t-lspace" style=" width: 40px; ">#</th>
            <th class="t-lspace">ឯកសារ</th>
            <th class="t-lspace" style=" width: 230px; ">អ្នកបង្កើតឯកសារ</th>
            <th class="t-lspace" style=" width: 130px; ">កាលបរិច្ឆេទ</th>
            <th class="t-lspace" style=" width: 180px; ">ឯកសារបញ្ជូនដល់​</th>             
            <th class="t-lspace" style=" width: 110px; ">ស្ថានភាព</th>
            <th class="t-lspace">សកម្មភាព</th>
          </tr>
        </thead>

        <tbody>
          <DocumentRow
            v-for="(doc, index) in documents"
            :key="doc.id"
            :doc="doc"
            :index="getRowIndex(index)"
            :deleting="deletingId === doc.id"
            @delete="(d) => $emit('delete', d)"
          />
        </tbody>
      </table>
    </div>

    <div class="pagination_w">
      <div class="pagination">
        <button 
          v-if="pagination?.page > 1"
          class="prev nav_i"
          @click="handlePageChange(pagination?.previous || (pagination?.page - 1))"
          :disabled="isLoading"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 37.65 448.05 436.7" style="transform: rotate(180deg); display: inline-block; vertical-align: middle;">
            <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" fill="currentColor"></path>
          </svg>
          មុន
        </button>
        
        <template v-for="pageNum in pageNumbers" :key="pageNum">
          <span 
            v-if="pageNum === pagination?.page"
            class="current nav_i"
          >
            {{ formatKhmerNumber(pageNum) }}
          </span>
          <button 
            v-else-if="pageNum !== '...'"
            class="page nav_i"
            @click="handlePageChange(pageNum)"
            :disabled="isLoading"
          >
            {{ formatKhmerNumber(pageNum) }}
          </button>
          <span v-else class="nav_i">...</span>
        </template>
        
        <button 
          v-if="pagination?.next !== null && pagination?.next !== undefined"
          class="next nav_i"
          @click="handlePageChange(pagination.next)"
          :disabled="isLoading"
        >
          បន្ទាប់
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 37.65 448.05 436.7">
            <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" fill="currentColor"></path>
          </svg>
        </button>
      </div>
      <span class="ocm_count t-lspace">ចំនួនឯកសារ៖ {{ formatKhmerNumber(pagination?.totalRecords || 0) }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DocumentRow from '@/components/DocumentRow.vue'
import { formatKhmerNumber } from '@/lib/utils'


const props = defineProps({
  documents: {
    type: Array,
    required: true
  },
  pagination: {
    type: Object,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  sortKey: {
    type: String,
    default: ''
  },
  sortOrder: {
    type: String,
    default: 'asc'
  },
  deletingId: {
    type: [Number, String],
    default: null
  }
})

const emit = defineEmits(['page-change', 'delete'])

// Calculate row index based on current page
const getRowIndex = (index) => {
  const currentPage = props.pagination?.page || 1
  const perPage = props.pagination?.perPage || 20
  return (currentPage - 1) * perPage + index + 1
}

// Generate page numbers array for pagination display
const pageNumbers = computed(() => {
  const current = props.pagination?.page || 1
  const total = props.pagination?.totalPages || 1
  const pages = []
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    if (current <= 3) {
      for (let i = 2; i <= 4; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 2) {
      pages.push('...')
      for (let i = total - 3; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  return pages
})

const handlePageChange = (page) => {
  if (!props.isLoading && page >= 1 && page <= (props.pagination?.totalPages || 1)) {
    emit('page-change', page)
  }
}
</script>