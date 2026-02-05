<template>
  <div class=" h-full" style=" justify-content: space-between; display: flex; flex-direction: column; ">
    <div class="timeline_top">
    <!-- TITLE -->
    <h3 class="text-lg font-khmer font-bold mb-10 t-lspace">
      ស្ថានភាពដំណើរការឯកសារ
    </h3>

    <!-- TIMELINE -->
    <div class="space-y-6 dc_time_wr">

      <div
        v-for="(step, index) in steps"
        :key="step.id"
        class="flex gap-2 dc_time_items"
      >
        <!-- LEFT ICON + LINE -->
        <div class="dc_time_l relative flex flex-col items-center">
          <!-- ICON -->
          <div
            class="w-6 h-6 rounded-full flex items-center justify-center dc_time_ic"
            :class="circleClass(index)"
          >
            <!-- GREEN -->
            <svg
              v-if="stepStatus(index) === 'green'"
              viewBox="0 0 24 24"
              class="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>

            <!-- YELLOW -->
            <!-- <svg
              v-else-if="stepStatus(index) === 'yellow'"
              viewBox="0 0 24 24"
              class="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <circle cx="12" cy="12" r="9" />
            </svg> -->

            <svg v-else-if="stepStatus(index) === 'yellow'" viewBox="0 0 192 512"><path d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72s72-32.235 72-72S135.764 0 96 0z" fill="currentColor"></path></svg>
            
            
            
            <!-- RED -->
            <svg
              v-else
              viewBox="0 0 24 24"
              class="w-4 h-4 text-red-600"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <!-- LINE -->
          <div
            v-if="index < steps.length - 1"
            class="w-px flex-1 mt-1 border-dashed"
            :class="lineClass(index)"
          ></div>
        </div>

        <!-- CONTENT -->
        <div class="flex-1 dc_time_con">
          <div class="flex justify-between items-start">
            <div>
              <p class="font-semibold t-lspace" :class="textClass(index)">
                {{ step.title }}
              </p>
              <p class="text-sm text-gray-600">
              <img class="dc_cmmim" src="https://www.ocm.gov.kh/wp-content/uploads/2024/02/%E1%9E%AF.%E1%9E%A7_%E1%9E%9B%E1%9E%B9%E1%9E%98_%E1%9E%96%E1%9E%BB%E1%9E%91%E1%9F%92%E1%9E%92%E1%9E%B7%E1%9E%87%E1%9E%B6%E1%9E%8F%E1%9E%B7_%E1%9E%A2%E1%9E%93%E1%9E%BB%E1%9E%9A%E1%9E%8A%E1%9F%92%E1%9E%8B%E1%9E%9B%E1%9F%81%E1%9E%81%E1%9E%B6%E1%9E%92%E1%9E%B7%E1%9E%80%E1%9E%B6%E1%9E%9A.jpeg">
                {{ step.subtitle }}
              </p>
            </div>

            <!-- SEND BACK BUTTON -->
            <button
              class="text-sm text-red-500 hover:underline"
              @click="replyingIndex = index"
            >
              ↩ បញ្ជូនទៅវិញ
            </button>
          </div>

          <span class="text-xs text-gray-500 block mt-1">
            {{ step.time }}
          </span>
          <span class="dc_comment">
            សូមកែអក្ខរាវិរុទ្ធ <b>ខ្លឹមសា → ខ្លឹមសារ</b> និងសំអាតចន្លោះអក្សរ របៀបរបបនៃការរៀបចំកំណត់បង្ហាញរបស់ទីស្តីការគណៈរដ្ឋមន្ត្រី
          </span>

          <div
            v-if="replyingIndex === index"
            class="mt-4"
          >
            <textarea
              v-model="comment"
              rows="3"
              placeholder="បញ្ចូលមតិយោបល់..."
              class="w-full rounded-lg border p-3 text-sm focus:ring-2 focus:ring-blue-500"
            />

            <div class="text-right mt-3">
              <button
                class="inline-flex items-center btn_dc gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-sm text-sm"
                @click="sendComment(index)"
              >
              បញ្ជូនទៅវិញ
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>


    <div class="mt-10">
    <div            
            class="mt-4"
          >
            <textarea
              v-model="comment"
              rows="3"
              placeholder="បញ្ចូលមតិយោបល់..."
              class="w-full rounded-sm border p-3 text-sm focus:ring-2 focus:ring-blue-500"
            />

            <div class="text-right mt-3">              
              <button style="    background: var(--ocm-btn-bg);"
                class="inline-flex items-center btn_dc gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-sm text-sm"
                @click="sendComment(index)"
              >              
                បញ្ជូនមតិយោបល់
              </button>
            </div>
          </div>
</div>


    <div class="mt-10" style="display: none;">

  <!-- TITLE -->
  <h3 class="font-khmer font-semibold t-lspace mb-10">
    បញ្ជូនឯកសារឱ្យ
  </h3>

 <!-- SEARCH + FILTER -->
<div class="flex gap-4 mb-10 dc_time_items">
  <!-- SEARCH (LONGER, SOFT BORDER) -->
  <div class="flex-[2]">
    <input
      v-model="search"
      type="text"
      placeholder="ស្វែងរក"
      class="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm
             focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
    />
  </div>
  <div class="flex-[1]" style="display: none;">
   <select
  v-model="filter"
  class="w-full rounded-lg border border-gray-200
         px-4 py-2
         text-sm leading-relaxed
         focus:border-blue-400 focus:ring-1 focus:ring-blue-400
         appearance-none"
>
  <option value="" disabled hidden>
    ជ្រើសរើសប្រភេទ
  </option>
  <option value="department">department1</option>
  <option value="officer">department2</option>
</select>

  </div>
</div>

  <!-- PEOPLE LIST -->
  <div class="space-y-4 ">
    <div
      v-for="person in filteredPeople"
      :key="person.id"
      class="flex items-center justify-between mb-10"
    >
      <!-- LEFT INFO -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gray-300"></div>

        <div>
          <p class="text-sm font-medium text-blue-700">
            {{ person.name }}
          </p>
          <p class="text-xs text-gray-500 flex items-center gap-1">
            {{ person.unit }}
          </p>
        </div>
      </div>

      <!-- SEND BUTTON -->
      <button
        class="inline-flex items-center btn_dc gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm" style=" background: var(--ocm-btn-bg); "
        @click="sendTo(person)"
      >
      បញ្ជូនឯកសារ
      </button>
    </div>
  </div>

</div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { documents } from '@/data/documents'

/* ================= STATUS FROM API =================
  1  = approved (green)
  0  = pending (yellow)
 -1  = rejected (red)
==================================================== */
const stepsStatus = ref([1, 1, 0, 0])

/* ================= TIMELINE DATA ================= */
const steps = [
  {
    id: 1,
    title: 'នាយកដ្ឋានរដ្ឋបាល',
    subtitle: 'បានពិនិត្យដោយ • នាយកដ្ឋានរដ្ឋបាល ',
    time: '06-មករា-2024 05:49'
  },
  {
    id: 2,
    title: 'ខុទ្ទកាល័យឯកឧត្តមឧបនាយករដ្ឋមន្ត្រីប្រចាំការ',
    subtitle: 'បានពិនិត្យដោយ • ឯកឧត្តម លឹម ពុទ្ធិជាតិ',
    time: '06-មករា-2024 05:57'
  },
  {
    id: 3,
    title: 'អង្គភាពជំនាញ',
    subtitle: 'កំពុងរង់ចាំ',
    time: ''
  },
  {
    id: 4,
    title: 'លើកកំណត់បង្ហាញ',
    subtitle: 'កំពុងរង់ចាំ',
    time: ''
  }
]

/* ================= REPLY LOGIC ================= */
const replyingIndex = ref(null)
const comment = ref('')

const sendComment = (index) => {
  console.log('Send comment for step:', steps[index])
  console.log('Comment:', comment.value)

  comment.value = ''
  replyingIndex.value = null
}

/* ================= SEND DOCUMENT ================= */
const search = ref('')
const filter = ref('')

const people = ref(
  Array.from(
    new Map(
      documents
        .flatMap(doc => [
          
          doc.sentTo
            ? { name: doc.sentTo, unit: 'អ្នកទទួលឯកសារ', type: 'department' }
            : null
        ])
        .filter(Boolean)
        .map(p => [p.name, p])
    ).values()
  ).map((p, i) => ({ id: i + 1, ...p }))
)

const filteredPeople = computed(() => {
  return people.value.filter(person => {
    const matchSearch =
      person.name.includes(search.value) ||
      person.unit.includes(search.value)

    const matchFilter = filter.value
      ? person.type === filter.value
      : true

    return matchSearch && matchFilter
  })
})

const sendTo = (person) => {
  console.log('Send document to:', person.name)
}

/* ================= STATUS HELPERS ================= */
const stepStatus = (index) => {
  const value = stepsStatus.value[index]
  if (value === 1) return 'green'
  if (value === -1) return 'red'
  return 'yellow'
}

const circleClass = (index) => {
  const s = stepStatus(index)
  if (s === 'green') return 'bg-green-100'
  if (s === 'red') return 'bg-red-100'
  return 'bg-yellow-100'
}

const lineClass = (index) => {
  const s = stepStatus(index)
  if (s === 'green') return 'border-green-300'
  if (s === 'red') return 'border-red-300'
  return 'border-yellow-300'
}

const textClass = (index) => {
  const s = stepStatus(index)
  if (s === 'green') return 'text-green-600 tt-step'
  if (s === 'red') return 'text-red-600'
  return 'text-gray-500'
}
</script>

<style scoped>
.dc_time_wr{
  display: flex;
  flex-direction: column;    
}
.dc_time_items, .dc_time_ic{
  position: relative;   
  z-index: 2;
}
.dc_time_con{
  padding-bottom: 20px;
}
.dc_time_l:before{
  content: '';
  z-index: 1;
  position: absolute;
  width: 1px;
  height: 100%;
  background: #ccc;
}
.dc_time_wr > .dc_time_items:nth-child(2) .text-sm.text-red-500, .dc_time_wr > .dc_time_items:nth-child(4) .text-sm.text-red-500{
  display: none;
}
.dc_time_wr > .dc_time_items:nth-child(4) .dc_time_l:before{
  display: none;
}
.btn_dc{
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
    font-size: 17px;
}
.doc_details textarea{
  border-color: #ccc;
}
.dc_time_wr > .dc_time_items .dc_time_ic{
  position: relative;
  background-color: #00b377;
    color: #fff;
}
.dc_time_wr > .dc_time_items .dc_time_ic svg{
  color: currentColor;
}
.dc_time_wr > .dc_time_items:nth-child(2) .dc_time_ic:before{
  content: '';
  --com-pulse: #00b377;
    width: 24px;
    height: 24px;
    display: block;
    border-radius: 100px;
    position: absolute;
    top: px;
    right: 0px;
  animation: pulse-animation 1.3s infinite;
}
.dc_time_wr > .dc_time_items:nth-child(3) .dc_time_ic, .dc_time_wr > .dc_time_items:nth-child(4) .dc_time_ic{
  background-color: #708090;
    color: #fff;
}
.dc_time_wr > .dc_time_items:nth-child(3) .dc_time_ic svg, .dc_time_wr > .dc_time_items:nth-child(4) .dc_time_ic svg{
  color: currentColor;
  width: .26em;
}
.dc_time_wr > .dc_time_items:nth-child(2) .dc_comment{
  display: block !important;
}
.dc_comment{
  display: none;
  position: relative;
  background-color: #eee;
    border-radius: 5px;
    padding: 10px;
    font-size: 14px;
    margin-top: 10px;
}
.dc_comment:before{
  content: "";
  position: absolute;
  top: -5px;
  left: 10px;  
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #eee;
}
.text-green-600.tt-step{
  /* color: #00b377; */
}
.dc_cmmim{
  display: none;
    -webkit-flex: 0 0 30px;
    -ms-flex: 0 0 30px;
    flex: 0 0 30px;
    width: 30px;
    height: 30px;
    border-radius: 100px;
    position: relative;
    overflow: hidden;
    margin-right: 3px;
    float: left;
    margin-top: 5px;
}
.dc_cmmim img{
  width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    object-position: top;
}
.dc_time_wr > .dc_time_items:nth-child(2) .dc_cmmim{
  display: flex;
}

.dc_time_wr > .dc_time_items:nth-child(2) .text-gray-500.block.mt-1{
  position: absolute;
    margin-left: 36px;
    margin-top: -11px;
    display: block;
}
</style>