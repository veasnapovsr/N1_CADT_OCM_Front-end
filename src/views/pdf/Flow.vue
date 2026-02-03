<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'


/* =======================
   LAYOUT COMPONENTS
======================= */
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'

/* =======================
   FLOW COMPONENTS
======================= */
import FlowStats from '@/components/flow/FlowStatus.vue'
import FlowFilters from '@/components/flow/FlowFilters.vue'
import FlowTable from '@/components/flow/FlowTable.vue'
import FlowGrid from '@/components/flow/FlowGrid.vue'
import RowToGrid from '@/components/flow/RowToGrid.vue'
import DeleteConfirmPopup from '@/components/flow/DeleteConfirmPopup.vue'

/* =======================
   FILTER COMPONENTS
======================= */
import DateSelect from '@/components/flow/DateSelect.vue'
import AuthorNameFilter from '@/components/flow/AuthorNameFilter.vue'
import DocumentNameFilter from '@/components/flow/DocumentNameFilter.vue'
import DocumentStatusFilter from '@/components/flow/DocumentStatusFilter.vue'
import DocumentSentToFilter from '@/components/flow/DocumentSentToFilter.vue'

/* =======================
   DATA
======================= */
import { flowStats } from '@/data/Flowstatuscheck'
import { documents } from '@/data/documents'
import { formatKhmerNumber } from '@/lib/utils'

const store = useStore()
const route = useRoute()


/* =======================
   VIEW MODE
======================= */
const viewMode = ref('row') // row | grid

/* =======================
   FILTER STATE
======================= */
const selectedDate = ref('')
const selectedAuthor = ref('')
const selectedName = ref('')
const selectedStatus = ref(route.query.status || '')
watch(
  () => route.query.status,
  (status) => {
    selectedStatus.value = status || ''
  }
)
const selectedSentTo = ref('')

/* =======================
   SORT STATE
======================= */
const sortKey = ref('')
const sortOrder = ref('asc')

const onSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

/* =======================
   AUTHOR OPTIONS (AUTO)
======================= */
const authorOptions = computed(() => {
  // Get unique creators from fetched records
  const uniqueCreators = Array.from(
    new Set(
      records.value
        .map(d => d.creator)
        .filter(v => v && v.trim() !== '')
    )
  )
  
  // Map to the format expected by InputSelect
  return [
    { value: '', name: 'ទាំងអស់', img: null },
    ...uniqueCreators.map(creator => {
      // Find the record to get the avatar
      const record = records.value.find(r => r.creator === creator)
      return {
        value: creator,
        name: creator,
        img: record?.creatorAvatar || '/female.jpeg'
      }
    })
  ]
})

/* =======================
   SENT TO OPTIONS (AUTO)
======================= */
const sentToOptions = computed(() => [
  { value: '', label: 'ទាំងអស់' },
  ...Array.from(
    new Set(
      records.value
        .map(d => d.sentTo)
        .filter(v => v && v !== 'N/A')
    )
  ).map(v => ({
    value: v,
    label: v
  }))
])
/* =======================
   PAGINATION STATE
======================= */
const currentPage = ref(1)
const pagination = ref({
  totalRecords: 0,
  totalPages: 1,
  perPage: 20,
  page: 1,
  // Navigation fields
  first: null,
  firstUrl: null,
  previous: null,
  previousUrl: null,
  next: null,
  nextUrl: null,
  last: null,
  lastUrl: null,
  search: ''
})
const isLoading = ref(false)

/* =======================
   STATS BY STATUS (backend getTotalByStatus)
======================= */
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

/** Cards synced with backend; value from getTotalByStatus or 0 while loading. */
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

/* =======================
   FILTER + SORT LOGIC
======================= */
const records = ref([])

/* =======================
   DATE NORMALIZE (for calendar filter)
======================= */
/** Normalize date to YYYY-MM-DD for comparison (handles API YYYY-MM-DD, FlatPickr d-m-Y, and Date) */
const normalizeDate = (dateVal) => {
  if (dateVal == null || dateVal === '') return ''
  if (dateVal instanceof Date) {
    const y = dateVal.getFullYear()
    const m = String(dateVal.getMonth() + 1).padStart(2, '0')
    const d = String(dateVal.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }
  const str = String(dateVal).trim()
  if (!str) return ''
  // Already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) return str.slice(0, 10)
  // d-m-Y (e.g. 03-02-2025) -> YYYY-MM-DD
  const dmy = str.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/)
  if (dmy) {
    const [, day, month, year] = dmy
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }
  return str
}

/* =======================
   BUILD SEARCH QUERY
======================= */
const buildSearchQuery = () => {
  const searchParts = []
  
  if (selectedName.value) {
    searchParts.push(selectedName.value)
  }
  if (selectedAuthor.value) {
    searchParts.push(selectedAuthor.value)
  }
  if (selectedDate.value) {
    searchParts.push(selectedDate.value)
  }
  if (selectedSentTo.value) {
    searchParts.push(selectedSentTo.value)
  }
  
  return searchParts.join(' ')
}

/* =======================
   FETCH DATA FUNCTION
======================= */
const fetchDocuments = async (page = 1) => {
  isLoading.value = true
  try {
    const searchQuery = buildSearchQuery()
    const params = {
      page: page,
      perPage: pagination.value.perPage,
      search: searchQuery || pagination.value.search,
      status: selectedStatus.value || ''
    }
    
    const res = await store.dispatch('transaction/list', params)
    
    if (res.data && res.data.records) {
      records.value = res.data.records.map((r) => {
        return {
          id: r.id,
          title: r.subject,
          code: r.document.number,
          date: r.date_in,
          creator: r.sender.lastname + ' ' + r.sender.firstname,
          creatorAvatar: r.sender?.avatar_url || '/female.jpeg',
          size: r.document.pdf_file_size || '2MB',  
          status: r.status != null && r.status != '' ? r.status : 'draft',
          sentAt: r.sent_at,
          sentTo: r.receivers.length <= 0 ? 'គ្មានអ្នកទទួល' : r.receivers[0].lastname + ' ' + r.receivers[0].firstname,
          position: r.sender.officer.jobs.length <= 0 ? '' : r.sender.officer.jobs[0].organization_structure_position.position.name
        }
      })
    }
    
    if (res.data && res.data.pagination) {
      // Map backend pagination response to component pagination object
      pagination.value = {
        totalRecords: res.data.pagination.totalRecords || 0,
        totalPages: res.data.pagination.totalPages || 1,
        perPage: res.data.pagination.perPage || 20,
        page: res.data.pagination.page || 1,
        // Navigation fields
        first: res.data.pagination.first,
        firstUrl: res.data.pagination.firstUrl,
        previous: res.data.pagination.previous,
        previousUrl: res.data.pagination.previousUrl,
        next: res.data.pagination.next,
        nextUrl: res.data.pagination.nextUrl,
        last: res.data.pagination.last,
        lastUrl: res.data.pagination.lastUrl,
        search: res.data.pagination.search || ''
      }
      currentPage.value = pagination.value.page
    }
  } catch (err) {
    // console.error('Error fetching documents:', err)
  } finally {
    isLoading.value = false
  }
}

/* =======================
   PAGE CHANGE HANDLER
======================= */
const handlePageChange = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    fetchDocuments(page)
  }
}

/* =======================
   DELETE DOCUMENT (destroy API)
======================= */
const isDeletingId = ref(null)
const showDeletePopup = ref(false)
const docToDelete = ref(null)

const onDeleteRequest = (doc) => {
  if (doc?.status === 'approved') return
  docToDelete.value = doc
  showDeletePopup.value = true
}

const handleDelete = async () => {
  const doc = docToDelete.value
  if (!doc) return
  isDeletingId.value = doc.id
  try {
    await store.dispatch('transaction/destroy', { id: doc.id })
    const idx = records.value.findIndex((r) => r.id === doc.id)
    if (idx !== -1) records.value.splice(idx, 1)
    if (pagination.value.totalRecords > 0) {
      pagination.value = { ...pagination.value, totalRecords: pagination.value.totalRecords - 1 }
    }
    showDeletePopup.value = false
    docToDelete.value = null
    await fetchStats()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error deleting document:', err)
  } finally {
    isDeletingId.value = null
  }
}

const closeDeletePopup = () => {
  if (!isDeletingId.value) {
    showDeletePopup.value = false
    docToDelete.value = null
  }
}

/* =======================
   HAS ACTIVE FILTERS
======================= */
const hasActiveFilters = computed(() => {
  return !!(
    (selectedName.value || '').trim() ||
    selectedAuthor.value ||
    selectedDate.value ||
    selectedStatus.value ||
    selectedSentTo.value
  )
})

/* =======================
   CLEAR FILTER HANDLER
======================= */
const handleClearFilters = () => {
  selectedName.value = ''
  selectedAuthor.value = ''
  selectedDate.value = ''
  selectedStatus.value = route.query.status || ''
  selectedSentTo.value = ''
  currentPage.value = 1
  pagination.value.page = 1
  fetchDocuments(1)
}

/* =======================
   INITIAL DATA LOAD
======================= */
onMounted(() => {
  fetchDocuments(1)
  fetchStats()
}) 

const filteredDocuments = computed(() => {
  let filtered = [...records.value]
  
  // Apply filters
  filtered = filtered.filter(doc => {
    // Search bar: match document title, number (code), or creator
    const searchTerm = (selectedName.value || '').trim().toLowerCase()
    const matchName =
      !searchTerm ||
      (doc.title && doc.title.toLowerCase().includes(searchTerm)) ||
      (doc.code && doc.code.toLowerCase().includes(searchTerm)) ||
      (doc.creator && doc.creator.toLowerCase().includes(searchTerm))

    const matchAuthor =
      !selectedAuthor.value ||
      (doc.creator && doc.creator.includes(selectedAuthor.value))

    const matchStatus =
      !selectedStatus.value ||
      doc.status === selectedStatus.value

    const matchDate =
      !selectedDate.value ||
      normalizeDate(doc.date) === normalizeDate(selectedDate.value)

    const matchSentTo =
      !selectedSentTo.value ||
      doc.sentTo === selectedSentTo.value

    return (
      matchName &&
      matchAuthor &&
      matchStatus &&
      matchDate &&
      matchSentTo
    )
  })

  // SORT (row view)
  if (sortKey.value) {
    filtered = [...filtered].sort((a, b) => {
      const A = a[sortKey.value]
      const B = b[sortKey.value]

      if (A < B) return sortOrder.value === 'asc' ? -1 : 1
      if (A > B) return sortOrder.value === 'asc' ? 1 : -1
      return 0
    })
  }

  return filtered
})
</script>

<template>
  <Header title="លំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />

  <section class="appppw">
    <Aside />

    <div class="sw">
      <div class="app_content">

        <!-- PAGE TITLE -->
        <div class="ocm_cwr flex items-center justify-between">
          <h2 class="h wttt t-lspace">
            ផ្ទាំងគ្រប់គ្រងលំហូរឯកសារ
          </h2>

          <router-link
            to="/pdf/documents-add"
            class="oc_nbtn t-lspace"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 5 14 14">
              <path d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
            </svg>
            បង្កើតឯកសារ
          </router-link>
        </div>

        <!-- STATS -->
        <FlowStats :stats="flowStatsSynced" />

        <!-- FILTER BAR -->
        <FlowFilters>
          <div class="ocm_filter_w d-flex align-items-center gap-3 flex-wrap">

            <DocumentNameFilter v-model="selectedName" />

            <DateSelect v-model="selectedDate" />

            <AuthorNameFilter 
              v-model="selectedAuthor"
              :author-options="authorOptions"
            />

            <DocumentStatusFilter v-model="selectedStatus" />

            <!-- SENT TO FILTER (CORRECT) -->
            <DocumentSentToFilter
              v-model="selectedSentTo"
              :options="sentToOptions"
            />

            <button 
              class="button ocm_btn_ac button-primary t-lspace"
              @click="hasActiveFilters ? handleClearFilters() : fetchDocuments(1)"
              :disabled="isLoading"
            >
              <template v-if="hasActiveFilters">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
                លុប
              </template>
              <template v-else>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="85.36 85.33 815.27 815.3"><g id="icomoon-ignore"></g><path d="M447.998 85.331c-57.831 0.005-114.822 13.839-166.219 40.349s-95.708 64.927-129.238 112.046c-33.53 47.118-55.306 101.572-63.511 158.818s-2.601 115.625 16.345 170.26c18.945 54.641 50.682 103.956 92.563 143.836s92.692 69.166 148.193 85.417c55.501 16.246 114.083 18.985 170.86 7.992 56.776-10.998 110.095-35.415 155.52-71.209l155.817 155.817c8.049 7.772 18.826 12.073 30.013 11.976s21.888-4.582 29.798-12.493c7.91-7.91 12.396-18.611 12.493-29.798s-4.204-21.965-11.976-30.013l-155.817-155.817c42.153-53.478 68.403-117.745 75.74-185.443 7.332-67.698-4.536-136.094-34.258-197.36s-76.088-112.927-133.801-149.071c-57.708-36.144-124.431-55.31-192.524-55.306zM170.665 447.998c0-73.553 29.219-144.094 81.229-196.104s122.551-81.229 196.104-81.229c73.555 0 144.094 29.219 196.103 81.229 52.014 52.010 81.229 122.551 81.229 196.104 0 73.551-29.215 144.094-81.229 196.103-52.009 52.009-122.547 81.229-196.103 81.229-73.553 0-144.094-29.22-196.104-81.229s-81.229-122.552-81.229-196.103z"></path></svg>
                ស្វែងរក
              </template>
            </button>
          </div>

          <RowToGrid v-model="viewMode" />
        </FlowFilters>

        <!-- CONTENT -->
        <div class="mt-6 ocm_dtwr">

          <!-- ROW VIEW -->
          <FlowTable
            v-if="viewMode === 'row'"
            :documents="filteredDocuments"
            :pagination="pagination"
            :is-loading="isLoading"
            :sort-key="sortKey"
            :sort-order="sortOrder"
            :deleting-id="isDeletingId"
            @sort="onSort"
            @page-change="handlePageChange"
            @delete="onDeleteRequest"
          />

          <!-- GRID VIEW -->
          <FlowGrid
            v-else
            :documents="filteredDocuments"
            :deleting-id="isDeletingId"
            @delete="onDeleteRequest"
          />

        <DeleteConfirmPopup
          v-model="showDeletePopup"
          :document="docToDelete"
          :loading="!!isDeletingId"
          @confirm="handleDelete"
          @update:model-value="closeDeletePopup"
        />

        </div>

      </div>

      <Footer />
    </div>
  </section>
</template>
