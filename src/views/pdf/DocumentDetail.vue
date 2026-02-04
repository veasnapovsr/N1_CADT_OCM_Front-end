<template>
  <Header title="លំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
  <section class="appppw">
    <div class="flex h-[calc(100vh-64px)] overflow-hidden">
      <Aside />
      <div class="sw flex flex-col flex-1 overflow-hidden">
        <div class="app_content flex flex-col flex-1 overflow-hidden">
          <div class="flex flex-1 overflow-hidden doc_details">
            <div class="flex-1 overflow-hidden">
              <div class="ocm_cwr">
                <h2 class="h doc-heading t-lspace">
                  {{ documentTransaction?.document?.objective || documentTransaction?.document?.title || 'ឯកសារយោង' }}                  
                  <button class="button ocm_btn_ac button-primary" type="submit">
                    <svg fill="#000000" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="1 1.32 12 11.36"><path d="m 12.999992,2.866331 0,8.273839 c 0,0.0705 -0.025,0.127505 -0.0745,0.173007 -0.0505,0.047 -0.110505,0.069 -0.180008,0.069 l -4.2796751,0 0,-1.147547 3.4911431,0 0,-0.522522 -3.4941432,0 0,-0.639526 3.4911432,0 0,-0.522021 -3.4886431,0 0,-0.645027 3.4901431,0 0,-0.516021 -3.4901431,0 0,-0.646526 3.4901431,0 0,-0.522022 -3.4901431,0 0,-0.639526 3.4901431,0 0,-0.521521 -3.4901431,0 0,-0.652527 3.4901431,0 0,-0.497021 -3.4901431,0 0,-1.296553 4.2811751,0 c 0.0745,0 0.135006,0.024 0.179008,0.0745 0.0525,0.0495 0.075,0.110005 0.0745,0.178008 z m -5.1747123,-1.546064 0,11.361466 -6.82527977,-1.181048 0,-8.967368 6.82527977,-1.21505 0,0.002 z m -1.0300423,3.354138 -0.854535,0.0525 -0.5480225,3.392639 -0.012501,0 C 5.3531783,7.959039 5.2526742,7.397016 5.0726668,6.435977 L 4.7531537,4.80441 3.9511209,4.84441 3.6301077,6.435975 C 3.4426,7.363013 3.3380957,7.902535 3.3105946,8.054041 l -0.0075,0 -0.48752,-3.125128 -0.7350301,0.039 0.7875323,3.941661 0.8170335,0.0525 0.3075126,-1.534063 C 4.1726299,6.527981 4.2776342,6.004959 4.3001352,5.861953 l 0.022501,0 c 0.030501,0.152507 0.1280052,0.687029 0.3075126,1.605066 l 0.3075126,1.579065 0.8850363,0.0525 0.9900406,-4.425181 -0.017501,0 z"></path></svg> 
                    ទាញយក Document Word
                  </button>
                </h2>
              </div>

              <div class="pdf-container h-full">
                <PdfViewer
                  v-if="pdfSrc"
                  :src="pdfSrc"
                  class="doc_preview"
                />
                <div v-else class="p-10 text-center flex flex-col items-center">
                  <span class="mb-2">កំពុងទាញយកឯកសារ... (Loading)</span>
                </div>
              </div>
            </div>

            <div class="w-90 overflow-y-auto doc_sidebar">
              <DocumentTimeline />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import PdfViewer from '@/components/PdfViewer.vue'
import DocumentTimeline from '@/components/DocumentTimeline.vue'

const store = useStore()
const route = useRoute()

const pdfSrc = ref(null)
const documentTransaction = ref(null)
const documentTransactionId = ref(Number(route.params.id) || 0)

const loadData = async () => {
  if (documentTransactionId.value > 0) {
    try {
      const res = await store.dispatch('transaction/read', { 
        id: documentTransactionId.value 
      })
      
      const record = res?.data?.record
      documentTransaction.value = record

      if (record?.document?.pdf_file) {
        pdfSrc.value = record.document.pdf_file
      } else {
        pdfSrc.value = '/docs/report2.pdf'
      }
      
    } catch (err) {
      console.error('API Error:', err.message)
      pdfSrc.value = '/docs/report2.pdf'
    }
  }
}

onMounted(() => {
  loadData()
})
</script>