<script setup>
import { ref, onMounted } from 'vue';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'vue-chartjs';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// --- DUMMY DATA FOR TODAY ---
// Each object represents one specific event (one dot)
const loginEvents = [
  { x: new Date().setHours(8, 30), y: 1, user: 'Sarah Connor', action: 'Logged in' },
  { x: new Date().setHours(10, 15), y: 2, user: 'John Doe', action: 'Logged in' },
  { x: new Date().setHours(13, 0), y: 1.5, user: 'Kyle Reese', action: 'Logged in' },
  { x: new Date().setHours(16, 45), y: 3, user: 'Ellen Ripley', action: 'Logged in' },
];

const viewEvents = [
  { x: new Date().setHours(9, 0), y: 0.5, user: 'Tony Stark', action: 'Viewed Document' },
  { x: new Date().setHours(11, 30), y: 2.5, user: 'Steve Rogers', action: 'Viewed Document' },
  { x: new Date().setHours(14, 20), y: 1, user: 'Bruce Banner', action: 'Viewed Document' },
  { x: new Date().setHours(17, 10), y: 2, user: 'Thor Odinson', action: 'Viewed Document' },
];

const chartData = {
  datasets: [
    {
      label: 'Logins',
      data: loginEvents,
      borderColor: '#f472b6',
      backgroundColor: '#f472b6',
      tension: 0.4,
      pointRadius: 6,
      pointHoverRadius: 8,
    },
    {
      label: 'Views',
      data: viewEvents,
      borderColor: '#60a5fa',
      backgroundColor: '#60a5fa',
      tension: 0.4,
      pointRadius: 6,
      pointHoverRadius: 8,
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'time',
      time: { unit: 'hour' },
      adapters: { date: { locale: enUS } },
      grid: { display: false },
      title: { display: true, text: 'Time Today', font: { size: 10 } }
    },
    y: {
      beginAtZero: true,
      display: false, // Hiding Y axis as we care about the timeline sequence
    }
  },
  plugins: {
    legend: { position: 'top', align: 'end' },
    tooltip: {
      enabled: false, // We disable standard tooltip to use our custom HTML one
      external: function(context) {
        // Custom Tooltip element logic
        let tooltipEl = document.getElementById('chartjs-tooltip');

        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.className = 'absolute bg-gray-900 text-white p-3 rounded-lg shadow-xl pointer-events-none transition-opacity duration-200 text-xs z-50';
          document.body.appendChild(tooltipEl);
        }

        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        if (tooltipModel.body) {
          const dataPoint = tooltipModel.dataPoints[0].raw;
          tooltipEl.innerHTML = `
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center font-bold">
                ${dataPoint.user.charAt(0)}
              </div>
              <div>
                <div class="font-bold text-sm">${dataPoint.user}</div>
                <div class="text-gray-400">${dataPoint.action}</div>
                <div class="text-[10px] mt-1 text-pink-400">
                  ${new Date(dataPoint.x).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          `;
        }

        const position = context.chart.canvas.getBoundingClientRect();
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - 80 + 'px';
      }
    }
  }
};
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <!-- Header -->
    <div class="flex justify-between items-start mb-6">
      <div>
        <h3 class="text-base font-bold text-gray-800">Activity Timeline</h3>
        <p class="text-xs text-gray-500">Real-time user actions for today</p>
      </div>
      <div class="flex gap-4 text-xs font-medium">
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-pink-400"></span> Logins
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-blue-400"></span> Views
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div class="w-full h-72 relative">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style>
/* Ensure the tooltip doesn't cause scrollbars */
#chartjs-tooltip {
  min-width: 150px;
}
</style>