<template>
  <!-- TOP HEADER -->
  <Header />

  <section class="appppw">
    <!-- SIDEBAR -->
    <Aside />

    <!-- MAIN CONTENT -->
    <div class="sw">
      <div class="app_content">

        <!-- PAGE TITLE -->
        <div class="ocm_cwr">
          <h2 class="h wttt t-lspace">លំហូរឯកសារ</h2>
        </div>

        <!-- STATS -->
        <FlowStats :stats="flowStats" />

        <!-- FILTER BAR -->
        <FlowFilters>
          <div class="ocm_filter_w d-flex align-items-center">
            <DocumentNameFilter
              @change="selectedName = $event"
            />
            <DateSelect v-model="selectedDate" 
            />
            <AuthorNameFilter
              @change="selectedAuthor = $event"
            />
            <DocumentStatusFilter
              @change="selectedStatus = $event"
            />

            <!-- SEARCH BUTTON -->
            <button class="button-primary">
              ស្វែងរក
            </button>

          </div>
        </FlowFilters>

        <!-- TABLE -->
        <FlowTable :documents="filteredDocuments" />

      </div>

      <!-- FOOTER -->
      <Footer />
    </div>
  </section>
</template>

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

/* =======================
   FILTER COMPONENTS
======================= */
import DateSelect from '@/components/flow/DateSelect.vue'
import AuthorNameFilter from '@/components/flow/AuthorNameFilter.vue'
import DocumentNameFilter from '@/components/flow/DocumentNameFilter.vue'
import DocumentStatusFilter from '@/components/flow/DocumentStatusFilter.vue'

/* =======================
   DATA
======================= */
import { flowStats } from '@/data/Flowstatuscheck'
import { documents } from '@/data/documents'

/* =======================
   FILTER STATE
======================= */
const selectedDate = ref('')
const selectedAuthor = ref('')
const selectedName = ref('')
const selectedStatus = ref('')

/* =======================
   FILTER LOGIC (SAFE)
======================= */
const filteredDocuments = computed(() => {
  return documents
})
</script>
