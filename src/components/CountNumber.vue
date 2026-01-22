<template>
  <section class="count-section ">
    <div class="ocm_dashboard_splits">
      <div>
        <div class="ocm_bfw ocm_stat">

          <!-- Views -->
          <div class="ocm_caw noneh status_wait">
            <div class="ocm_card_body">
              <div class="ocm_icardw">
                <h5 class="ocm_card_value">
                  {{ formatKhmerNumber(formatNumber(views)) }}
                </h5>
                <div class="ocm_icard">
                  <svg xmlns="http://www.w3.org/2000/svg"
                       viewBox="4 2 16 20">
                    <g fill="none">
                      <path fill="currentColor"
                        d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z"/>
                    </g>
                  </svg>
                </div>
              </div>
              <p class="ocm_card_title">
                ចំនួននាក់ចូលប្រើប្រាស់ប្រព័ន្ធ
              </p>
            </div>
          </div>

          <!-- Downloads -->
          <div class="ocm_caw noneh status_accept">
            <div class="ocm_card_body">
              <div class="ocm_icardw">
                <h5 class="ocm_card_value">
                  {{ formatKhmerNumber(formatNumber(downloads)) }}
                </h5>
                <div class="ocm_icard">
                  <svg xmlns="http://www.w3.org/2000/svg"
                       viewBox="4 2 16 20">
                    <g fill="none">
                      <path fill="currentColor"
                        d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z"/>
                    </g>
                  </svg>
                </div>
              </div>
              <p class="ocm_card_title">
                ចំនួននាក់ចូលមើលឯកសារ
              </p>
            </div>
          </div>

          <!-- Edits -->
          <div class="ocm_caw noneh status_all">
            <div class="ocm_card_body">
              <div class="ocm_icardw">
                <h5 class="ocm_card_value">
                  {{ formatKhmerNumber(formatNumber(edits)) }}
                </h5>
                <div class="ocm_icard">
                  <svg xmlns="http://www.w3.org/2000/svg"
                       viewBox="4 2 16 20">
                    <g fill="none">
                      <path fill="currentColor"
                        d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z"/>
                    </g>
                  </svg>
                </div>
              </div>
              <p class="ocm_card_title">
                ចំនួនមតិយោបល់
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { formatKhmerNumber } from '@/lib/utils.js'

const views = ref(0)
const downloads = ref(0)
const edits = ref(0)

const animateCount = (state, target, duration = 1200) => {
  const startTime = performance.now()

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1)
    state.value = Math.floor(progress * target)

    if (progress < 1) requestAnimationFrame(tick)
    else state.value = target
  }

  requestAnimationFrame(tick)
}

const formatNumber = (value) =>
  new Intl.NumberFormat().format(value ?? 0)

onMounted(() => {
  animateCount(views, 1453)
  animateCount(downloads, 3245)
  animateCount(edits, 1892)
})
</script>

<style scoped> 
.ocm_stat {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
}

.ocm_caw {
  width: 100%;
}
</style>
