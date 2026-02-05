<template>
  <Header title="លំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
  <section class="appppw">
  <Aside />
  <div class="sw">
				<div class="app_content">
				<div class="ocm_cwr">
					<h2 class="h wttt t-lspace">ព័ត៌មានផ្ទាល់ខ្លួន</h2>
				</div>
    <div class="ocm_card_wr">
      <div v-if="user">
          <div class="ocm_card_content flex items-center gap-6 w-full">
  <!-- Avatar -->
  <div class="relative shrink-0 w-20 h-20">
    <img
      :src="user.avatar_url || 'https://ui-avatars.com/api/?name=' + user.firstname + '+' + user.lastname"
      class="w-20 h-20 object-cover rounded-full border-4 border-white shadow"
      alt="Profile"
    />

    <!-- Edit Photo Icon -->
    <button
      class="absolute -bottom-1 -right-1
            w-7 h-7 rounded-full
            bg-blue-600 text-white
            flex items-center justify-center
            shadow hover:bg-blue-700 transition"
    >
      <!-- Camera icon -->
      <svg xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 7h4l2-3h6l2 3h4v12H3z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    </button>
  </div>

    <!-- Info -->
    <div class="space-y-3 flex-1">
      <span class="text-sm text-blue-600 font-khmer">
        {{ user.countesy.name }}
      </span>
      <br>

      <span class="text-lg font-khmer font-bold">
        {{ user.lastname }} {{ user.firstname }}
      </span>
      <br>


      <span class="text-lg font-khmer font-bold">
        {{ user.people.enlastname }} {{ user.people.enfirstname }}
      </span>
      <br>
      <span div class="text-sm 0">
        {{ user.position.name }} • {{ user.organization.name }}
      </span>
      <br>
      
    </div>
    <button
  type="button"
  class="button ocm_btn_ac button-primary t-lspace ml-auto"
  @click="isEditing = !isEditing"
>
  {{ isEditing ? 'រក្សាទុក' : 'កែប្រែព័ត៌មាន' }}
</button>

  </div>


  <div class="ocm_card_content">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-base h t-lspace h-10 text-blue-600">
        ប្រវត្តិរូប
      </h3>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-10 text-sm">
      <!-- Row 1 -->
      <div>
        <p class="font-khmer font-bold">ត្រកូល</p>
        <p v-if="!isEditing" class="font-khmer">{{ user.lastname }}</p>
        <input v-else v-model="user.lastname" 
          type="text"
        class="border rounded px-4 py-3 w-full text-lg"/>
      </div>
      
      <div>
        <p class="font-khmer font-bold">ឈ្មោះ</p>
       <p v-if="!isEditing" 
       class="font-khmer">{{ user.firstname }}</p>
<input
  v-else
  v-model="user.firstname"
       type="text"
  class="border rounded px-4 py-3 w-full text-lg"
/>

      </div>

      <div>
        <p class="font-khmer font-bold">តួនាទី</p>
       <p v-if="!isEditing" 
       class="font-khmer">{{ user.position.name }}</p>
<input
  v-else
  v-model="user.position.name"
       type="text"
  class="border rounded px-4 py-3 w-full text-lg"
/>
</div>
      <div>
        <p class="font-khmer font-bold">ត្រកូល (អង់គ្លេស)</p>
        <p v-if="!isEditing" class="font-khmer">{{ user.people.enlastname }}</p>
        <input
          v-else
          v-model="user.people.enlastname"
          type="text"
          class="border rounded px-4 py-3 w-full text-lg"
          />
        </div>

      <div>
        <p class="font-khmer font-bold">ឈ្មោះ (អង់គ្លេស)</p>
        <p v-if="!isEditing" class="font-khmer">{{ user.people.enfirstname }}</p>
        <input
          v-else
          v-model="user.people.enfirstname"
          type="text"
          class="border rounded w-full text-lg"
        />
      </div>


      <!-- Row 2 -->
      <div>
        <p class="font-khmer font-bold">អ៊ីមែល</p>
        <p v-if="!isEditing" 
        class="font-khmer">{{ user.people.email }}</p>
<input
  v-else
  v-model="user.people.email"
  type="email"
  class="border rounded px-4 py-3 w-full text-lg"
/>
      </div>
      <div>
        <p class="font-khmer font-bold">ទូរស័ព្ទដៃ</p>
        <p v-if="!isEditing" class="font-khmer">{{ user.people.office_phone }}</p>
        <input
          v-else
          v-model="user.people.office_phone"
          type="tel"
          class="border rounded px-4 py-3 w-full text-lg"
        />
      </div>

    </div>
  </div>

</div>
<p v-else>កំពុងផ្ទុកព័ត៌មាន...</p>
    </div>
  </div>
    <div class="ocm_card_wr relative -top-5">
      <div class="ocm_card_content">
         <div class="flex items-center justify-between mb-6">
    <h3 class="text-base h t-lspace h-10 text-blue-600">
      ប្រវត្តិរូបផ្ទាល់ខ្លួន
    </h3>
  </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-10 text-sm">
        <div>
          <p class="font-khmer font-bold">នៅលីវ ឬ រៀបការរួច</p>
         <p v-if="!isEditing" class="font-khmer">
  {{ user.people.address || 'មិនមានទិន្នន័យ' }}
</p>
<input
  v-else
  v-model="user.people.address"
  type="text"
  class="border border-gray-300 rounded px-4 py-3 w-full text-lg
         focus:outline-none focus:ring-2 focus:ring-blue-500
         focus:border-blue-500 transition"
/>

        </div>
        <div>
          <p class="font-khmer font-bold">ទូរស័ព្ទនៅផ្ទះ</p>
          <p v-if="!isEditing" class="font-khmer">
  {{ user.people.mobile_phone || 'មិនមានទិន្នន័យ' }}
</p>
<input
  v-else
  v-model="user.people.mobile_phone"
  type="tel"
  class="border border-gray-300 rounded px-4 py-3 w-full text-lg
         focus:outline-none focus:ring-2 focus:ring-blue-500
         focus:border-blue-500 transition"
/>

        </div>

           <div>
      <p class="font-khmer font-bold">ថ្ងៃ ខែ ឆ្នាំ កំណើត</p>
     <p v-if="!isEditing" class="font-khmer">{{ user.people.dob }}</p>
<input
  v-else
  v-model="user.people.dob"
  type="date"
  class="border border-gray-300 rounded px-4 py-3 w-full text-lg
         focus:outline-none focus:ring-2 focus:ring-blue-500
         focus:border-blue-500 transition"
/>

      </div>
      <!-- Row 2 -->
        <div>
  <p class="font-khmer font-bold mb-2">ស្ថានភាពគ្រួសារ</p>

 <div class="flex items-center gap-8 text-sm font-khmer">

  <!-- Single -->
  <label class="flex items-center gap-2">
    <div
      class="w-4 h-4 rounded-full border flex items-center justify-center"
      :class="user.people.marry_status === 'single'
        ? 'border-blue-600'
        : 'border-gray-400'"
    >
      <div
        v-if="user.people.marry_status === 'single'"
        class="w-2.5 h-2.5 rounded-full bg-blue-600"
      ></div>
    </div>
    <span
      :class="user.people.marry_status === 'single'
        ? 'text-blue-600 font-bold'
        : ''"
    >
      នៅលីវ
    </span>
  </label>

  <!-- Married -->
  <label class="flex items-center gap-2">
    <div
      class="w-4 h-4 rounded-full border flex items-center justify-center"
      :class="user.people.marry_status === 'married'
        ? 'border-blue-600'
        : 'border-gray-400'"
    >
      <div
        v-if="user.people.marry_status === 'married'"
        class="w-2.5 h-2.5 rounded-full bg-blue-600"
      ></div>
    </div>
    <span
      :class="user.people.marry_status === 'married'
        ? 'text-blue-600 font-bold'
        : ''"
    >
      រៀបការរួច
    </span>
  </label>

  <!-- Other -->
  <label class="flex items-center gap-2">
    <div
      class="w-4 h-4 rounded-full border flex items-center justify-center"
      :class="user.people.marry_status === 'other'
        ? 'border-blue-600'
        : 'border-gray-400'"
    >
      <div
        v-if="user.people.marry_status === 'other'"
        class="w-2.5 h-2.5 rounded-full bg-blue-600"
      ></div>
    </div>
    <span
      :class="user.people.marry_status === 'other'
        ? 'text-blue-600 font-bold'
        : ''"
    >
      ផ្សេងៗ
    </span>
  </label>

</div>
</div>

      
      </div>
      </div>
    </div>
  <Footer />
</div>
</section>
</template>

<script setup>

import { ref, onMounted, watch } from 'vue'
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'


const user = ref({
  avatar_url: '',
  firstname: '',
  lastname: '',
  countesy: { name: '' },
  people: {
    enfirstname: '',
    enlastname: '',
    gender: '',
    dob: '',
    email: '',
    office_phone: '',
    mobile_phone: '',
    address: '',
    marry_status: ''
  },
  position: { name: '' },
  organization: { name: '' }
})

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
})
const isEditing = ref(false)

watch(isEditing, (val) => {
  if (!val) {
    localStorage.setItem('user', JSON.stringify(user.value))
  }
})

</script>
