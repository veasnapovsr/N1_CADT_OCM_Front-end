<template>
  <Header title="លំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
  <section class="appppw">
    <div class="flex h-[calc(100vh-64px)] overflow-hidden">
      <Aside />
      <div class="sw flex flex-col flex-1 overflow-hidden">
        <div class="app_content flex flex-col flex-1 overflow-hidden">
          <div class="flex flex-1 overflow-hidden doc_details">
            <div class="flex-1 overflow-hidden">
              <div class="ocm_cwr doc-title-row">
                <h2 class="h doc-heading t-lspace">
                  {{ documentTransaction?.document?.objective || documentTransaction?.document?.title || 'ឯកសារយោង' }}
                </h2>
                <a
                  v-if="wordFileUrl"
                  :href="wordFileUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="doc-word-dl"
                  title="ទាញយកឯកសារ Word"
                  download
                >
                  <span class="doc-word-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <span class="doc-word-w">W</span>
                  </span>
                  <span class="doc-word-label">ទាញយក Word</span>
                </a>
              </div>

              <div class="pdf-container h-full">
                <PdfViewer
                  v-if="pdfSrc"
                  :key="pdfSrc"
                  :src="pdfSrc"
                  class="doc_preview"
                />
                <div v-else class="p-10 text-center flex flex-col items-center">
                  <span class="mb-2">កំពុងទាញយកឯកសារ...</span>
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
import { ref, computed, onMounted } from 'vue'
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

const wordFileUrl = computed(() => {
  const url = documentTransaction.value?.document?.word_file
  return url && typeof url === 'string' && url.trim() ? url.trim() : null
})

const loadData = async () => {
  if (documentTransactionId.value <= 0) return

  try {
    const res = await store.dispatch('transaction/read', {
      id: documentTransactionId.value
    })

    const data = res?.data
    const record = data?.record ?? data
    const doc = record?.document

    documentTransaction.value = record || null

    if (doc?.pdf_file && typeof doc.pdf_file === 'string' && doc.pdf_file.trim()) {
      pdfSrc.value = doc.pdf_file.trim()
    } else {
      pdfSrc.value = '/docs/report2.pdf'
    }
  } catch (err) {
    console.error(err)
    documentTransaction.value = null
    pdfSrc.value = '/docs/report2.pdf'
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.doc-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 0;
}
.doc-title-row .doc-heading {
  margin: 0;
  flex: 1;
  min-width: 0;
}

.doc-word-dl {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: #2b579a;
  color: #fff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  flex-shrink: 0;
}
.doc-word-dl:hover {
  background: #1e3a6b;
  color: #fff;
}

.doc-word-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #fff;
  border-radius: 4px;
  position: relative;
}
.doc-word-icon svg {
  width: 20px;
  height: 20px;
  color: #2b579a;
  position: absolute;
  inset: 0;
  margin: auto;
}
.doc-word-w {
  position: absolute;
  font-size: 14px;
  font-weight: 700;
  color: #2b579a;
  font-family: "Times New Roman", serif;
  line-height: 1;
}
.doc-word-label {
  white-space: nowrap;
}
</style>