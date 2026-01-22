<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'


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
        <FlowStats :stats="flowStats" />

        <!-- FILTER BAR -->
        <FlowFilters>
          <div class="ocm_filter_w d-flex align-items-center gap-3 flex-wrap">

            <DocumentNameFilter
              @change="selectedName = $event"
            />

            <DateSelect v-model="selectedDate" />

            <AuthorNameFilter v-model="selectedAuthor" />

            <DocumentStatusFilter v-model="selectedStatus" />

            <!-- SENT TO FILTER (CORRECT) -->
            <DocumentSentToFilter
              v-model="selectedSentTo"
              :options="sentToOptions"
            />

            <button class="button ocm_btn_ac button-primary t-lspace">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="85.36 85.33 815.27 815.3"> <g id="icomoon-ignore"> </g> <path d="M447.998 85.331c-57.831 0.005-114.822 13.839-166.219 40.349s-95.708 64.927-129.238 112.046c-33.53 47.118-55.306 101.572-63.511 158.818s-2.601 115.625 16.345 170.26c18.945 54.641 50.682 103.956 92.563 143.836s92.692 69.166 148.193 85.417c55.501 16.246 114.083 18.985 170.86 7.992 56.776-10.998 110.095-35.415 155.52-71.209l155.817 155.817c8.049 7.772 18.826 12.073 30.013 11.976s21.888-4.582 29.798-12.493c7.91-7.91 12.396-18.611 12.493-29.798s-4.204-21.965-11.976-30.013l-155.817-155.817c42.153-53.478 68.403-117.745 75.74-185.443 7.332-67.698-4.536-136.094-34.258-197.36s-76.088-112.927-133.801-149.071c-57.708-36.144-124.431-55.31-192.524-55.306zM170.665 447.998c0-73.553 29.219-144.094 81.229-196.104s122.551-81.229 196.104-81.229c73.555 0 144.094 29.219 196.103 81.229 52.014 52.010 81.229 122.551 81.229 196.104 0 73.551-29.215 144.094-81.229 196.103-52.009 52.009-122.547 81.229-196.103 81.229-73.553 0-144.094-29.22-196.104-81.229s-81.229-122.552-81.229-196.103z"></path> </svg>
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
