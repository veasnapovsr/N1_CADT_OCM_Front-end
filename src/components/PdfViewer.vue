<script setup>
import { ref, computed } from 'vue'
import { PDFViewer } from '@embedpdf/vue-pdf-viewer'

/* =========================
   PROPS
========================= */
const props = defineProps({
  src: { type: String, required: true }
})

/* =========================
   STATE
========================= */
const currentPage = ref(1)
const totalPages = ref(0)
const pageInput = ref('1')
const zoomLevel = ref(100)

// PDF Viewer config
const pdfConfig = computed(() => ({
  src: props.src,
  theme: { preference: 'light' }
}))

/* =========================
   METHODS
========================= */
function goToPage() {
  const page = Number(pageInput.value)
  if (!Number.isFinite(page) || page < 1) {
    pageInput.value = String(currentPage.value)
    return
  }
  if (page > totalPages.value) {
    pageInput.value = String(totalPages.value)
    return
  }
  currentPage.value = page
  // TODO: Implement page navigation when PDFViewer API is available
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    pageInput.value = String(currentPage.value)
    // TODO: Implement page navigation when PDFViewer API is available
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
    pageInput.value = String(currentPage.value)
    // TODO: Implement page navigation when PDFViewer API is available
  }
}

function zoomIn() {
  zoomLevel.value = Math.min(zoomLevel.value + 10, 200)
  // TODO: Implement zoom when PDFViewer API is available
}

function zoomOut() {
  zoomLevel.value = Math.max(zoomLevel.value - 10, 50)
  // TODO: Implement zoom when PDFViewer API is available
}
</script>

<template>
  <div class="pdf-root">
    <!-- Custom Toolbar -->
    <!-- <div class="pdf-toolbar">
      <div class="tb-left">
        <div class="page-navigation">
          <button class="tb-btn" @click="prevPage" :disabled="currentPage <= 1" title="Previous page">‹</button>
          <div class="page-input">
            <input v-model="pageInput" @keyup.enter="goToPage" />
            <span>/ {{ totalPages || '?' }}</span>
          </div>
          <button class="tb-btn" @click="nextPage" :disabled="currentPage >= totalPages" title="Next page">›</button>
        </div>
      </div>

      <div class="tb-mid">
        <div class="zoom-controls">
          <button class="tb-btn" @click="zoomOut" title="Zoom out">−</button>
          <span class="zoom-text">{{ zoomLevel }}%</span>
          <button class="tb-btn" @click="zoomIn" title="Zoom in">+</button>
        </div>
      </div>

      <div class="tb-right">        
      </div>
    </div> -->

    <!-- PDF Viewer -->
    <div class="pdf-body">
      <PDFViewer
        :config="pdfConfig"
        :style="{ width: '100%', height: '100%' }"
      />
    </div>
  </div>
</template>

<style scoped>
.pdf-root {
  height: 100%;
  width: 100%;
  background: #c8c8c8;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.pdf-toolbar {
  height: 52px;
  background: #747474;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  gap: 12px;
  position: relative;
  z-index: 10;
  flex-shrink: 0;
}

.tb-left, .tb-mid, .tb-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tb-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: none;
  background: rgba(255,255,255,.06);
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  display: grid;
  place-items: center;
}
.tb-btn:hover { background: rgba(255,255,255,.12); }
.tb-btn:disabled { opacity: .35; cursor: not-allowed; }

.zoom-text {
  width: 62px;
  text-align: center;
  font-size: 13px;
  opacity: .9;
}

.page-input {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  opacity: .95;
}
.page-input input {
  width: 56px;
  padding: 6px 8px;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 8px;
  text-align: center;
  outline: none;
}

.page-navigation {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pdf-body {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.zoom-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
