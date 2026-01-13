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
  <p>គោត្តនាម: {{ user.lastname }}</p>
  <p>នាម: {{ user.firstname }}</p>
  <p>គោរមងារ: {{ user.countesy.name }}</p>

  <p>តួនាទី: {{ user.position.name }}</p>
  <p>អង្គភាព: {{ user.organization.name }}</p>

  <p>អ៊ីមែល: {{ user.people.email }}</p>
  <p>ទូរស័ព្ទ: {{ user.people.mobile_phone }}</p>
  <p>អាសយដ្ឋាន: {{ user.people.address }}</p>
</div>

<p v-else>កំពុងផ្ទុកព័ត៌មាន...</p>
    </div>
  </div>
  <Footer />
</div>
</section>
</template>

<script setup>

import { ref, onMounted } from 'vue'
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
    mobile_phone: '',
    address: ''
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
</script>