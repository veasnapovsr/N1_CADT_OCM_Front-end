<script setup>
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

import { Bar } from 'vue-chartjs';
import 'chartjs-adapter-date-fns';
import { km } from 'date-fns/locale';

ChartJS.register(TimeScale, LinearScale, BarElement, Tooltip, Legend);

/* ===== Today (Khmer) ===== */
const today = new Date();
const todayKhmer = new Intl.DateTimeFormat('km-KH', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(today);

/* ===== Helper: today at hour ===== */
const atHour = (h) => {
  const d = new Date(today);
  d.setHours(h, 0, 0, 0);
  return d;
};

/* ===== Hourly Data (7AM → 5PM) ===== */
const hourlyStats = [
  { x: atHour(7),  login: 5,  view: 10, comment: 1 },
  { x: atHour(8),  login: 12, view: 25, comment: 4 },
  { x: atHour(9),  login: 20, view: 40, comment: 8 },
  { x: atHour(10), login: 18, view: 35, comment: 6 },
  { x: atHour(11), login: 22, view: 42, comment: 9 },
  { x: atHour(12), login: 15, view: 30, comment: 5 },
  { x: atHour(13), login: 17, view: 33, comment: 6 },
  { x: atHour(14), login: 19, view: 36, comment: 7 },
  { x: atHour(15), login: 21, view: 40, comment: 8 },
  { x: atHour(16), login: 16, view: 28, comment: 5 },
  { x: atHour(17), login: 10, view: 18, comment: 3 },
];

/* ===== Chart Data ===== */
const chartData = {
  datasets: [
    {
      label: 'ចំនួននាក់ចូលប្រើប្រាស់ប្រព័ន្ធ',
      data: hourlyStats.map(d => ({ x: d.x, y: d.login })),
      backgroundColor: '#ef4444', // red
      borderRadius: 6,
      barThickness: 10
    },
    {
      label: 'ចំនួននាក់ចូលមើលឯកសារ',
      data: hourlyStats.map(d => ({ x: d.x, y: d.view })),
      backgroundColor: '#3b82f6', // blue
      borderRadius: 6,
      barThickness: 10
    },
    {
      label: 'ចំនួនមតិយោបល់',
      data: hourlyStats.map(d => ({ x: d.x, y: d.comment })),
      backgroundColor: '#22c55e', // green
      borderRadius: 6,
      barThickness: 10
    }
  ]
};

/* ===== Chart Options ===== */
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      align: 'start',
      labels: {
        usePointStyle: true,
        boxWidth: 8
      }
    },
    tooltip: {
      backgroundColor: '#111827',
      titleColor: '#fff',
      bodyColor: '#e5e7eb',
      padding: 10
    }
  },
  scales: {
    x: {
      type: 'time',
      adapters: {
        date: { locale: km }
      },
      time: {
        unit: 'hour',
        displayFormats: {
          hour: 'ha'   // 7AM, 8AM, 5PM
        }
      },
      min: atHour(7),
      max: atHour(17),
      grid: { display: false }
    },
    y: {
      beginAtZero: true,
      grid: { color: '#f3f4f6' },
      ticks: { stepSize: 5 }
    }
  }
};
</script>

<template>
  <div>
    <h3 class="text-xl font-bold">តារាងសកម្មភាពប្រចាំថ្ងៃ</h3>
    <p class="text-sm mt-2 mb-6">{{ todayKhmer }}</p>
  </div>

  <div class="border border-gray-200 rounded-md p-6 font-khmer">
    <div class="w-full h-80 relative rounded-md border border-slate-100 p-4">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>
/* dashboard-clean */
</style>
