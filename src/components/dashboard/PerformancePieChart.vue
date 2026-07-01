<template>
  <div class="perf-pie-card">
    <h3 class="perf-pie-card__title t-lspace">{{ title }}</h3>
    <div class="perf-pie-card__body">
      <div class="perf-pie-card__chart">
        <canvas ref="canvasRef"></canvas>
        <div v-if="total > 0" class="perf-pie-card__center">
          <span class="perf-pie-card__total">{{ formatKhmerNumber(total) }}</span>
          <span class="perf-pie-card__label">សរុប</span>
        </div>
      </div>
      <ul class="perf-pie-card__legend">
        <li v-for="item in visibleItems" :key="item.label">
          <span class="perf-pie-card__dot" :style="{ background: item.color }"></span>
          <span class="perf-pie-card__name">{{ item.label }}</span>
          <span class="perf-pie-card__value">{{ formatKhmerNumber(item.value) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js'
import { formatKhmerNumber } from '@/lib/utils'

Chart.register(ArcElement, Tooltip, Legend, DoughnutController)

const props = defineProps({
  title: { type: String, required: true },
  items: {
    type: Array,
    default: () => []
  }
})

const canvasRef = ref(null)
let chartInstance = null

const visibleItems = computed(() => (
  (props.items || []).filter((item) => Number(item.value) > 0)
))

const total = computed(() => (
  visibleItems.value.reduce((sum, item) => sum + Number(item.value || 0), 0)
))

const renderChart = async () => {
  await nextTick()
  if (!canvasRef.value) return

  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }

  if (!visibleItems.value.length) return

  chartInstance = new Chart(canvasRef.value, {
    type: 'doughnut',
    data: {
      labels: visibleItems.value.map((item) => item.label),
      datasets: [{
        data: visibleItems.value.map((item) => item.value),
        backgroundColor: visibleItems.value.map((item) => item.color),
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.raw || 0
              return `${context.label}: ${formatKhmerNumber(value)}`
            }
          }
        }
      }
    }
  })
}

watch(() => props.items, renderChart, { deep: true })

onMounted(renderChart)

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})
</script>

<style scoped>
.perf-pie-card {
  background: var(--ocm-app-bg, #f8fafc);
  border: 1px solid var(--ocm-app-border, #e2e8f0);
  border-radius: 16px;
  padding: 18px;
  height: 100%;
}

.perf-pie-card__title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 14px;
}

.perf-pie-card__body {
  display: grid;
  grid-template-columns: minmax(120px, 150px) 1fr;
  gap: 16px;
  align-items: center;
}

.perf-pie-card__chart {
  position: relative;
  width: 150px;
  height: 150px;
}

.perf-pie-card__center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.perf-pie-card__total {
  font-size: 22px;
  font-weight: 800;
  line-height: 1;
}

.perf-pie-card__label {
  font-size: 11px;
  font-weight: 600;
  opacity: 0.7;
  margin-top: 4px;
}

.perf-pie-card__legend {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.perf-pie-card__legend li {
  display: grid;
  grid-template-columns: 10px 1fr auto;
  gap: 8px;
  align-items: center;
  font-size: 13px;
}

.perf-pie-card__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.perf-pie-card__name {
  font-weight: 500;
}

.perf-pie-card__value {
  font-weight: 700;
}

@media (max-width: 640px) {
  .perf-pie-card__body {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}
</style>
