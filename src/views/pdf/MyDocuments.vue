<script setup>
import { ref, computed } from 'vue'

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

/* =======================
   FILTER COMPONENTS
======================= */
import DateSelect from '@/components/flow/DateSelect.vue'
import AuthorNameFilter from '@/components/flow/AuthorNameFilter.vue'
import DocumentNameFilter from '@/components/flow/DocumentNameFilter.vue'
import DocumentStatusFilter from '@/components/flow/DocumentStatusFilter.vue'
import DocumentSentToFilter from '@/components/flow/DocumentSentToFilter.vue'

/* =======================
   DATAT
======================= */
import { flowStats } from '@/data/Flowstatuscheck'
import { documents } from '@/data/documents'

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
const selectedStatus = ref('')
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
  // Get unique creators from documents
  const uniqueCreators = Array.from(
    new Set(
      documents
        .map(d => d.creator)
        .filter(v => v && v.trim() !== '')
    )
  )
  
  // Map to the format expected by InputSelect
  return [
    { value: '', name: 'ទាំងអស់', img: null },
    ...uniqueCreators.map(creator => {
      // Find the document to get the avatar
      const doc = documents.find(d => d.creator === creator)
      return {
        value: creator,
        name: creator,
        img: doc?.creatorAvatar || '/female.jpeg'
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
      documents
        .map(d => d.sentTo)
        .filter(v => v && v !== 'N/A')
    )
  ).map(v => ({
    value: v,
    label: v
  }))
])
/* =======================
   FILTER + SORT LOGIC
======================= */
const filteredDocuments = computed(() => {
  let data = documents.filter(doc => {
    const matchName =
      !selectedName.value ||
      doc.title.includes(selectedName.value)

    const matchAuthor =
      !selectedAuthor.value ||
      doc.creator.includes(selectedAuthor.value)

    const matchStatus =
      !selectedStatus.value ||
      doc.status === selectedStatus.value

    const matchDate =
      !selectedDate.value ||
      doc.date === selectedDate.value

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
    data = [...data].sort((a, b) => {
      const A = a[sortKey.value]
      const B = b[sortKey.value]

      if (A < B) return sortOrder.value === 'asc' ? -1 : 1
      if (A > B) return sortOrder.value === 'asc' ? 1 : -1
      return 0
    })
  }

  return data
})

/* =======================
   SEARCH HANDLER
======================= */
const handleSearch = () => {
  // Filtering is handled automatically by computed property
  // This handler is for consistency and potential future enhancements
  // (e.g., scroll to results, show loading state, etc.)
}
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
            ឯកសាររបស់ខ្ញុំ
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

        
        <!-- FILTER BAR -->
        <FlowFilters>
          <div class="ocm_filter_w d-flex align-items-center gap-3 flex-wrap">

            <DocumentNameFilter
              @change="selectedName = $event"
            />

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
              @click="handleSearch"
            >
              ស្វែងរក
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
            :sort-key="sortKey"
            :sort-order="sortOrder"
            @sort="onSort"
          />

          <!-- GRID VIEW -->
          <FlowGrid
            v-else
            :documents="filteredDocuments"
          />

        </div>

      </div>

      <Footer />
    </div>
  </section>
</template>
