<script setup>
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
import { km } from 'date-fns/locale';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const todayKhmer = new Intl.DateTimeFormat('km-KH', { 
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
}).format(new Date());

// ទិន្នន័យសកម្មភាពម្នាក់ៗ (ម្នាក់ ចំណុចមួយ)
// y តំណាងឱ្យកម្ពស់នៃបន្ទាត់ដើម្បីឱ្យមើលទៅឃើញឡើងចុះ (Pointer style)
const loginData = [
  { x: new Date().setHours(8, 10), y: 2, user: 'សុខ សាន', action: 'បានចូល Website' },
  { x: new Date().setHours(8, 30), y: 5, user: 'ចាន់ ណា', action: 'បានចូល Website' },
  { x: new Date().setHours(9, 15), y: 3, user: 'មករា វុទ្ធី', action: 'បានចូល Website' },
  { x: new Date().setHours(10, 0), y: 7, user: 'លីដា ហេង', action: 'បានចូល Website' },
  { x: new Date().setHours(10, 45), y: 4, user: 'ស៊ីណា រ៉េត', action: 'បានចូល Website' },
  { x: new Date().setHours(12, 10), y: 2, user: 'បូរ៉ា វី', action: 'បានចូល Website' },
  { x: new Date().setHours(13, 30), y: 6, user: 'ស្រីមុំ ពេជ្រ', action: 'បានចូល Website' },
  { x: new Date().setHours(15, 20), y: 8, user: 'ដេវីត ឡុង', action: 'បានចូល Website' },
  { x: new Date().setHours(16, 40), y: 3, user: 'សីហា វ៉ាន់', action: 'បានចូល Website' },
];

const viewData = [
  { x: new Date().setHours(8, 45), y: 1, user: 'ដានី ទេវី', action: 'បានចូលមើលឯកសារ' },
  { x: new Date().setHours(9, 30), y: 4, user: 'សុវណ្ណ រិទ្ធ', action: 'បានចូលមើលឯកសារ' },
  { x: new Date().setHours(11, 20), y: 6, user: 'គឹមហ៊ាង', action: 'បានចូលមើលឯកសារ' },
  { x: new Date().setHours(12, 45), y: 3, user: 'ពិសិដ្ឋ ម៉ៅ', action: 'បានចូលមើលឯកសារ' },
  { x: new Date().setHours(14, 15), y: 7, user: 'រតនា ម៉ារី', action: 'បានចូលមើលឯកសារ' },
  { x: new Date().setHours(15, 50), y: 2, user: 'ចិន្តា ប៊ុន', action: 'បានចូលមើលឯកសារ' },
  { x: new Date().setHours(17, 10), y: 5, user: 'វិច្ឆិកា នីត', action: 'បានចូលមើលឯកសារ' },
];

const chartData = {
  datasets: [
    {
      label: 'ចូលប្រើប្រាស់ប្រព័ន្ធ',
      data: loginData,
      borderColor: '#ef4444', // ពណ៌ក្រហម (Red-500)
      backgroundColor: '#ef4444',
      tension: 0, 
      pointRadius: 6,
      pointHoverRadius: 9,
      borderWidth: 2,
    },
    {
      label: 'ចូលមើលឯកសារ',
      data: viewData,
      borderColor: '#3b82f6', // ពណ៌ខៀវ (Blue-500)
      backgroundColor: '#3b82f6',
      tension: 0,
      pointRadius: 6,
      pointHoverRadius: 9,
      borderWidth: 2,
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'time',
      time: { unit: 'hour', displayFormats: { hour: 'HH:mm' } },
      adapters: { date: { locale: km } },
      grid: { display: true, color: '#f3f4f6' },
      ticks: { font: { family: 'Kantumruy Pro', size: 11 } }
    },
    y: {
      beginAtZero: true,
      grid: { color: '#f3f4f6' },
      ticks: { display: false } 
    }
  },
  plugins: {
    legend: {
      position: 'top',
      align: 'end',
      labels: { font: { family: 'Kantumruy Pro', size: 12 }, usePointStyle: true }
    },
    tooltip: {
      enabled: false,
      external: function(context) {
        let tooltipEl = document.getElementById('chartjs-tooltip-red');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip-red';
          tooltipEl.className = 'absolute   p-3 rounded-xl shadow-2xl pointer-events-none transition-opacity duration-200 z-50 border border-gray-700';
          document.body.appendChild(tooltipEl);
        }

        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        if (tooltipModel.body) {
          const dataPoint = tooltipModel.dataPoints[0].raw;
          const color = tooltipModel.dataPoints[0].dataset.borderColor;

          tooltipEl.innerHTML = `
            <div class="flex items-center gap-3 font-khmer min-w-[160px]">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-2" style="background-color: ${color}; border-color: white;">
                ${dataPoint.user.charAt(0)}
              </div>
              <div style="font-family: 'Kantumruy Pro', sans-serif">
                <div class="font-bold text-sm" style="color: ${color}">${dataPoint.user}</div>
                <div class="text-xs ">${dataPoint.action}</div>
                <div class="text-[10px] mt-1 ">
                  ម៉ោង ${new Date(dataPoint.x).toLocaleTimeString('km-KH', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          `;
        }

        const position = context.chart.canvas.getBoundingClientRect();
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - 100 + 'px';
      }
    }
  }
};
</script>

<template>
  <div>
    <h3 class="text-xl font-bold " >តារាងសកម្មភាព</h3>
    <p class="text-sm  mt-2 mb-10">{{ todayKhmer }}</p>
  </div>
  <div class=" border border-gray-200 rounded-md p-6 mb-30 font-khmer">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
      
      
    </div>

    <!-- Chart Body -->
    <div class="w-full h-80 relative  rounded-md border border-slate-100 p-4">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style>

#chartjs-tooltip-red {
  transform: translate(-50%, -100%);
  margin-top: -10px;
}
</style>