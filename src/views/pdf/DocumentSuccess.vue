<template>
  <Header title="លំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
  <section class="appppw">
  <Aside />
  <div class="sw">
				<div class="app_content">				
    <div class="ocm_card_wr">
      <div class="ocm_card_content">
        <div class="ocm_sucs_w ocm_fit_h">						
					<div class="ico_w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 154 154" fill="none" class="stroke-current"> <path d="M77 141C112.346 141 141 112.346 141 77C141 41.6538 112.346 13 77 13C41.6538 13 13 41.6538 13 77C13 112.346 41.6538 141 77 141Z" stroke-width="15" class="checkmark-circle"></path> <path d="M46 80.2444L63.9556 98.1111L107.067 55" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" class="checkmark-tick"></path> </svg></div>
					<h2 class="h t-lspace">ការដាក់ស្នើឯកសារបានដោយជោគជ័យ</h2>
					<p>ការដាក់ស្នើឯកសារ <span class="bold">ថ្ងៃទី១៦ ខែមករា ឆ្នាំ២០២៦</span> របស់លោកបានជោគជ័យ និងរង់ចាំការអនុម័តពី <span class="bold">ឯកឧត្តមឧបនាយករដ្ឋមន្រ្តីប្រចាំការ វង្សី វិស្សុត</span></p>
					<router-link to="/pdf/flow" class="button t-lspace ocm_back_btn button-primary ocm_base_btn">បង្ហាញផ្ទាំងគ្រប់គ្រងឯកសារ</router-link>
					</div>
    </div>
    </div>
  </div>
  <Footer />
</div>
</section>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
</script>