<template>
  <div class="ocm_bfw ocm_barw">
    <div class="ocm_caw noneh">
      <div class="ocm_card_body">
        <h2 class="h card_tt t-center t-lspace">ចំនួនលំហូរឯកសារតាមខែក្នុងឆ្នាំនេះ</h2>
        <div class="ocm_chart">
          <canvas ref="chartCanvas" id="myChart" style="display: block; box-sizing: border-box;"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';
import { formatKhmerNumber } from '@/lib/utils.js';

Chart.register(...registerables);

const chartCanvas = ref(null);
let chartInstance = null;
let resizeObserver = null;

function generateSampleData() {
  const khmerMonths = [
    'ខែមករា', 'ខែកុម្ភៈ', 'ខែមីនា', 'ខែមេសា',
    'ខែឧសភា', 'ខែមិថុនា', 'ខែកក្កដា', 'ខែសីហា',
    'ខែកញ្ញា', 'ខែតុលា', 'ខែវិច្ឆិកា', 'ខែធ្នូ'
  ];

  const weights = [8, 17, 19, 20, 18, 16, 17, 19, 22, 18, 19, 13];
  const labels = khmerMonths;
  const data = weights;

  return { labels, data };
}

function toKhmerNumber(num) {
  return formatKhmerNumber(num);
}

function renderMonthlyChart(labels, data) {
  if (!chartCanvas.value) {
    console.error('Chart canvas not found');
    return;
  }

  const ctx = chartCanvas.value.getContext('2d');

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          type: 'line',
          label: 'ចំនួនសរុប',
          data: data,
          borderColor: '#2463eb',
          backgroundColor: '#0031c3',
          borderWidth: 1,
          pointRadius: 5,
          pointBackgroundColor: 'white',
          yAxisID: 'y'
        },
        {
          label: 'ចំនួនសរុប',
          data: data,
          backgroundColor: '#2463eb',
          maxBarThickness: 40,
          borderRadius: 5
        }
      ]
    },
    options: {
      layout: { padding: 0 },
      indexAxis: 'x',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: false,
          ticks: {
            color: '#000',
            font: {
              family: 'Noto Sans Khmer',
              size: 14
            }
          }
        },
        y: {
          stacked: false,
          ticks: {
            color: '#000',
            callback: function (value) {
              return toKhmerNumber(value);
            },
            font: {
              family: 'Noto Sans Khmer',
              size: 16
            },
            padding: 5
          },
          suggestedMax: Math.max(...data) > 0 ? Math.max(...data) + 5 : 28
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          titleFont: {
            family: 'Noto Sans Khmer',
            size: 16
          },
          bodyFont: {
            family: 'Noto Sans Khmer',
            size: 16
          },
          titleMarginBottom: 10,
          padding: 15,
          callbacks: {
            label: function (context) {
              return `${context.dataset.label}: ${toKhmerNumber(context.raw)}`;
            }
          }
        }
      }
    }
  });
}

function handleResize() {
  if (chartInstance) {
    chartInstance.resize();
  }
}

onMounted(async () => {
  await nextTick();  
  const { labels, data } = generateSampleData();  
  renderMonthlyChart(labels, data);  
  window.addEventListener('resize', handleResize);  
  if (chartCanvas.value && window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => {
      if (chartInstance) {
        chartInstance.resize();
      }
    });
    resizeObserver.observe(chartCanvas.value.parentElement);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);  
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }  
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
});
</script>