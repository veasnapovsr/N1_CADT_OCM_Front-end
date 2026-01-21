<template>
  <section class="count-section">
    <header class="section-heading">
      <h2>ចំនួនប្រតិបត្តិការ​សរុប</h2>
    </header>

    <div class="card-grid">
      <article class="stat-card">
        <div class="stat-top">
          <span class="stat-icon icon-blue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </span>
          <span class="stat-label">ចំនួននាក់ចូលមើល</span>
        </div>
        <p class="stat-value">{{ formatNumber(views) }}</p>
      </article>

      <article class="stat-card">
        <div class="stat-top">
          <span class="stat-icon icon-green">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 3v12" />
              <path d="m7 12 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
          </span>
          <span class="stat-label">ចំនួននាក់ទាញយកចេញ</span>
        </div>
        <p class="stat-value">{{ formatNumber(downloads) }}</p>
      </article>

      <article class="stat-card">
        <div class="stat-top">
          <span class="stat-icon icon-purple">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M13 20h8" />
              <path d="m13 4 7 7-7 7-7-7 7-7Z" />
              <path d="m5 12 7 7" />
            </svg>
          </span>
          <span class="stat-label">ចំនួននាក់កែប្រែ</span>
        </div>
        <p class="stat-value">{{ formatNumber(edits) }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

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
.count-section {
  background: var(--ocm-bg);
  color: var(--ocm-color);
  border-radius: 16px;
  border: 1px solid var(--ocm-app-border);
  padding: 20px 22px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

.section-heading {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.section-heading h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.eyebrow {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ocm-prim-color);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.stat-card {
  background: var(--ocm-app-bg);
  border: 1px solid var(--ocm-app-border);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: var(--ocm-sec-color);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}

.stat-top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-label {
  font-size: 14px;
  color: var(--ocm-color);
  opacity: 0.85;
}

.stat-value {
  margin: 0;
  font-size: 34px;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--ocm-prim-color);
}

.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
  background: rgba(0, 0, 0, 0.04);
}

.stat-icon svg {
  width: 20px;
  height: 20px;
}

.icon-blue {
  background: rgba(71, 85, 255, 0.14);
  color: #4755ff;
}

.icon-green {
  background: rgba(16, 185, 129, 0.14);
  color: #10b981;
}

.icon-purple {
  background: rgba(168, 85, 247, 0.16);
  color: #a855f7;
}

body.ocm_dark_skin .stat-icon {
  background: rgba(255, 255, 255, 0.06);
}
</style>