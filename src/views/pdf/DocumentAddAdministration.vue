<template>
  <Header title="លំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី"/>
  <section class="appppw">
  <Aside/>
  <div class="sw">
				<div class="app_content">
				<div class="ocm_cwr">
					<h2 class="h wttt ocm_ptitle t-lspace">ខុទ្ទកាល័យ បង្កើតឯកសារ</h2>
				</div>
    <div class="ocm_card_wr">    
    <div v-if="!submitted">
    <form @submit.prevent="submitForm">
      <div class="ocm_card_content">
      <div class="ocmopt-col cols1 mb-15">
							<div class="ocmopt-meta">
								<div class="ocmopt-meta-title"><label class="ocmopt-meta-label t-lspace">កម្មវត្ថុ</label></div>
								<div class="ocmopt-meta-content ocm_meta_check">
									<textarea name="ocm_name" id="ocm_name" class="form-control" cols="60" rows="5"></textarea>
								</div>
							</div>
						</div>
						<div class="ocmopt-col cols3 mb-20">
							<div class="ocmopt-meta">
								<div class="ocmopt-meta-title"><label class="ocmopt-meta-label t-lspace">លិខិតលេខ</label></div>
								<div class="ocmopt-meta-content">
								<input id="dob" type="text" name="dob" autocomplete="off" class="form-control">
								</div>
							</div>

							<div class="ocmopt-meta">
								<div class="ocmopt-meta-title"><label class="ocmopt-meta-label t-lspace">កាលបរិច្ឆេទ</label></div>
								<div class="ocmopt-meta-content input-wrapper inpdate">
                  <FlatPickr
                  v-model="form.startDate"
                  placeholder="កាលបរិច្ឆេទ"
                  @input="handleInput"
                  :config="{
                    dateFormat: 'd-m-Y',
                    altInput: true,
                    altFormat: 'd-m-Y',
                    allowInput: true
                  }"
                />
                <div class="prefix pre_end"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="3 2 18 20"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" fill="currentColor"></path></svg></div>
                </div>
							</div>										

              <div class="ocmopt-meta">
								<div class="ocmopt-meta-title"><label class="ocmopt-meta-label t-lspace">ប្រភេទឯកសារ</label></div>
								<div class="ocmopt-meta-content formsel">
									<InputSelect
										v-model="form.documentType"
										:options="documentTypes"
										track-by="value"
										label="label"
										placeholder="ប្រភេទឯកសារ"
										:multiple="false"
										:clear-on-select="false"
									/>
								</div>
							</div>

              <div class="ocmopt-meta">
								<div class="ocmopt-meta-title"><label class="ocmopt-meta-label t-lspace">អង្គភាពជំនាញ</label></div>
								<div class="ocmopt-meta-content formsel">
									<InputSelect
										v-model="form.department"
										:options="departments"
										track-by="value"
										label="label"
										placeholder="អង្គភាពជំនាញ"
										:multiple="false"
										:clear-on-select="false"
									/>
								</div>
							</div>	

              <div class="ocmopt-meta">
								<div class="ocmopt-meta-title"><label class="ocmopt-meta-label t-lspace">ក្រសួង-ស្ថាប័ន</label></div>
								<div class="ocmopt-meta-content formsel">
									<InputSelect
										v-model="form.ministry"
										:options="ministries"
										track-by="value"
										label="label"
										placeholder="ក្រសួង-ស្ថាប័ន"
										:multiple="false"
										:clear-on-select="false"
									/>
								</div>
							</div>

              <div class="ocmopt-meta">
								<div class="ocmopt-meta-title"><label class="ocmopt-meta-label t-lspace">ហត្ថលេខា</label></div>
								<div class="ocmopt-meta-content formsel">
									<InputSelect
										v-model="form.signature"
										:options="leaders"
										track-by="value"
										label="name"
										placeholder="ហត្ថលេខា"
										:multiple="false"
										:clear-on-select="false"
									>
										<template #singleLabel="{ option }">
											<div class="ocm_cus_opt">
												<img v-if="option.img" class="option__image" :src="option.img" />
												<span>{{ option.name }}</span>
											</div>
										</template>
										
										<template #option="{ option }">
											<div class="ocm_cus_opt">
												<img v-if="option.img" :src="option.img" />
												<span>{{ option.name }}</span>
											</div>
										</template>
									</InputSelect>
								</div>
							</div>	
              

						</div>      
      
      <div 
        class="drop-zone mb-20"
        @dragover.prevent
        @drop="handleDrop"
        @click="selectFiles"
      >
      <svg stroke="currentColor" fill="none" viewBox="0 0 48 48" class="w-12 h-12 mx-auto text-gray-400"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0
            01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4
            4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        <p>អូសនិងទម្លាក់ឯកសារនៅទីនេះ ឬចុចទីនេះ</p>
        <input type="file" multiple ref="fileInput" @change="handleFileUpload" hidden />
        <!-- <input type="file" multiple ref="fileInput" @change="fileChange" hidden /> -->
        
      </div>

      <div class="img_preview mb-20">
        <div v-for="(image, index) in previewImages" :key="index">
          <img :src="image" />
        </div>
      </div>
    </div>
      
      <div class="ocm_card_foot foot_stick">
					<div class="ocm_btn_wr">
						<router-link class="button ocm_btn_ac btn_cancel button-primary" to="/pdf/flow"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="2 2 20 20"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z" fill="currentColor"></path></svg>បោះបង់</router-link>
            <!-- <button class="button ocm_btn_ac button-primary" type="submit" :disabled="isSubmitting"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 32 448 448"><path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88s88-39.477 88-88s-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40s40 17.944 40 40s-17.944 40-40 40z" fill="currentColor"></path></svg>រក្សារទុក</button> -->
            <router-link to="/pdf/documents-success" class="button ocm_btn_ac button-primary" type="submit" :disabled="isSubmitting"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 32 448 448"><path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88s88-39.477 88-88s-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40s40 17.944 40 40s-17.944 40-40 40z" fill="currentColor"></path></svg>រក្សារទុក</router-link>
						</div>
				</div>
      
    </form>
  </div>

  <div v-if="submitted" class="ocm_sucs_w ocm_fit_h">
    <div class="ico_w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 154 154" fill="none" class="stroke-current"> <path d="M77 141C112.346 141 141 112.346 141 77C141 41.6538 112.346 13 77 13C41.6538 13 13 41.6538 13 77C13 112.346 41.6538 141 77 141Z" stroke-width="15" class="checkmark-circle"></path> <path d="M46 80.2444L63.9556 98.1111L107.067 55" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" class="checkmark-tick"></path> </svg></div>
			<h2>បានដាក់ស្នើមតិកែលម្អដោយជោគជ័យ!</h2>
			<p>សូមអរគុណចំពោះមតិកែលម្អរបស់អ្នក</p>
			<router-link class="button ocm_back_btn button-primary ocm_base_btn" to="/dashboard"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 32 512 448"><path d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm-6 400H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v340a6 6 0 0 1-6 6zm-42-92v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12zm0-96v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12zm0-96v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12zm-252 12c0 19.882-16.118 36-36 36s-36-16.118-36-36s16.118-36 36-36s36 16.118 36 36zm0 96c0 19.882-16.118 36-36 36s-36-16.118-36-36s16.118-36 36-36s36 16.118 36 36zm0 96c0 19.882-16.118 36-36 36s-36-16.118-36-36s16.118-36 36-36s36 16.118 36 36z" fill="currentColor"></path></svg>ត្រឡប់ទៅផ្ទាំងគ្រប់គ្រងវិញ</router-link>
  </div>


    
    </div>
  </div>
  <Footer/>
</div>
</section>
</template>
<script>
// import { API_BASE_URL, formatKhmerNumber, formatDateKhmer  } from '@/utils.js'
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
import { InputSelect } from '@/components/ui/inputselect'
// import { leaders } from '@/data/leader.js'
import { FlatPickr } from '@/components/ui/flat-pickr'
import { onMounted , reactive ,ref } from 'vue'
import { useStore } from 'vuex'
import { getUser } from './../../plugins/authentication'
export default {
  components: {
    InputSelect ,
    Header ,
    Footer ,
    Aside ,
    FlatPickr
  },
  setup(){

    if( getUser() === undefined || getUser() === null ){
      router.push('/login')  
    }
  
    /**
     * ប្រកាសអថេរ - Declaration Variables
     */
    const store = useStore()
    const form = reactive({
        title: "",
        uid: null,
        description: "",
        gallery: [],
        department: null,
        documentType: "",
        ministry: null,
        signature: null,
        startDate : new Date()
      })
      
    const leaders = ref([])
    const selectedLeader = ref(null) 
    const departments = ref([
      { value: "2", label: "អគ្គនាយកដ្ឋានសម្របសម្រួលកិច្ចការទូទៅ" },
      { value: "3", label: "ក្រុមប្រឹក្សាអ្នកច្បាប់" },
      { value: "4", label: "អង្គភាពព័ត៌មាននិងប្រតិកម្មរហ័ស" },
      { value: "5", label: "យេនឌ័រ​នៃទីស្តីការគណៈរដ្ឋមន្រ្តី" },
      { value: "6", label: "អជ្ញាធរកម្ពុជា គ្រប់គ្រងសកម្មភាពកំចាត់មីន និងសង្គ្រោះជនពិការដោយសារមីន" },
      { value: "7", label: "គណៈកម្មាធិការជាតិគ្រប់គ្រងគ្រោះមហន្តរាយ" },
      { value: "8", label: "អគ្គលេខាធិការដ្ឋាននៃវេទិកាសម្ព័ន្ធសង្គមស៊ីវិល" },
      { value: "9", label: "ក្រុមប្រឹក្សាសេដ្ឋកិច្ច សង្គមកិច្ច និងវប្បធម៌ (ក.ស.វ.)" },
      { value: "10", label: "រាជបណ្ឌិត្យសភាកម្ពុជា" },
      { value: "11", label: "គណៈកម្មាធិការជាតិជំរុញចលនា ភូមិ១ ផលិតផល១ (គ.ជ.ភ១.ផ១.)" },
      { value: "12", label: "គណៈកម្មាធិការសិទ្ធិមនុស្សកម្ពុជា" },
      { value: "13", label: "អាជ្ញាធរជាតិទទួលបន្ទុកកិច្ចការព្រំដែន" },
    ])
    
    const selectedDeparetment = ref(null)
    // const documentTypes = ref([
    //   { value: "2", label: "ព្រះរាជក្រម" },
    //   { value: "3", label: "ព្រះរាជក្រឹត្យ.បក" },
    //   { value: "4", label: "អនុក្រឹត្យ.បក" },
    //   { value: "5", label: "ស.ជ.ណ" },
    //   { value: "6", label: "សេចក្ដីសម្រេច" },
    //   { value: "7", label: "សារាចរ និង សារាចរណែនាំ" },
    //   { value: "8", label: "ប្រកាស" },
    //   { value: "9", label: "គោលនយោបាយជាតិ" },
    //   { value: "10", label: "ផែនការយុទ្ធសាស្ត្រ" },
    //   { value: "11", label: "បទបញ្ជារាជរដ្ឋាភិបាល" },
    //   { value: "12", label: "ផែនការសកម្មភាពក្រសួងនានា" },
    //   { value: "13", label: "អនុក្រឹត្យ.តត" },
    //   { value: "14", label: "ព្រះរាជក្រឹត្យ.តត" },
    // ])

    const documentTypes = ref([       
      { value: "1", label: "របាយការណ៍" },
      { value: "2", label: "សំណើរ" },
    ])


    const ministries = ref([
      { value: "2", label: "ទីស្តីការគណៈរដ្ឋមន្ត្រី" },
      { value: "3", label: "ក្រសួង មហាផ្ទៃ" },
      { value: "4", label: "ក្រសួង គមនាគមន៏" },
      { value: "5", label: "ក្រសួង ពាណិជ្ជកម្ម" },
      { value: "6", label: "ក្រសួង​ កសិកម្ម​ ​​រុក្ខាប្រមាញ់​និងនេសាទ" },
      { value: "7", label: "ក្រសួង ព័ត៌មាន" },
      { value: "8", label: "ក្រសួង អភិវឌ្ឍន៏ជនបទ" },
      { value: "9", label: "ក្រសួង ទេសចរណ៍" },
      { value: "10", label: "ក្រសួង ការពារជាតិ" },
      { value: "11", label: "ក្រសួង បរិស្ថាន" },
      { value: "12", label: "ក្រសួង អប់រំយុវជន​និងកីឡា" },
      { value: "13", label: "ក្រសួង ការបរទេស និងសហប្រតិបត្តិការអន្តរជាតិ" },
      { value: "15", label: "រដ្ឋលេខាធិការដ្ឋានអាកាសចរណ៏ស៊ីវីល" },
      { value: "16", label: "សមាគម កាកបាទក្រហមកម្ពុជា" },
      { value: "17", label: "ក្រុមហ៊ុន អគ្គីសនីកម្ពុជា" },
      { value: "18", label: "គ្រប់​ បណ្តា អង្គការ-សមាគម ស្រុក និងក្រៅប្រទេស" },
      { value: "19", label: "អាជ្ញាធរជាតិ ទទួលបន្ទុកកិច្ចការ ICT" },
      { value: "20", label: "អាជ្ញាធរ អប្សារា" },
      { value: "21", label: "អាជ្ញាធរ មីន" },
      { value: "22", label: "អាជ្ញាធរ ទេសចរណ៍" },
      { value: "23", label: "អាជ្ញាធរ សវនកម្មជាតិ" },
      { value: "24", label: "អាជ្ញាធរជាតិប្រយុទ្ធនឹងជំងឺអេដស៍" },
      { value: "25", label: "អាជ្ញាធរ ព្រំដែន" },
      { value: "26", label: "អាជ្ញាធរ ប្រឆាំងគ្រឿងញៀន" },
      { value: "27", label: "ធនាគារជាតិ កម្ពុជា" },
      { value: "28", label: "ធនាគារ អភិវឌ្ឍន៍ជនបទ" },
      { value: "29", label: "រដ្ឋលេខាធិការ មុខងារសាធារណៈ" },
      { value: "30", label: "រាជបណ្ឌិតសភា កម្ពុជា" },
      { value: "31", label: "សាលា ភូមិន្ទរដ្ឋបាល" },
      { value: "32", label: "ស្ថានទូត" },
      { value: "33", label: "គ្រប់បណ្តា ខេត្ត-ក្រុង នៅទូទាំងប្រទេស" },
      { value: "34", label: "ក្រសួង សេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ" },
      { value: "35", label: "ក្រសួង​ វប្បធម៌ និងវិចិត្រសិល្បៈ" },
      { value: "36", label: "ក្រសួង សុខាភិបាល" },
      { value: "37", label: "ក្រសួង ឧស្សាហកម្ម រ៉ែ និងថាមពល" },
      { value: "38", label: "ក្រសួង​ យុត្តិធម៌" },
      { value: "39", label: "ក្រសួង ការងារ និងបណ្តុះបណ្តាលវិជ្ជាជីវៈ" },
      { value: "40", label: "ក្រសួង រៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់" },
      { value: "41", label: "ក្រសួង ទំនាក់ទំនងសភា ព្រឹទ្ធសភា និងអធិការកិច្ច" },
      { value: "42", label: "ក្រសួង ផែនការ" },
      { value: "43", label: "ក្រសួង ប្រៃណីយ៍ និងទូរគមនាគមន៍" },
      { value: "44", label: "ក្រសួង សាធារណៈការ និងដឹកជញ្ជូន" },
      { value: "45", label: "ក្រសួង ធម្មការ និងសាសនា" },
      { value: "46", label: "ក្រសួង សង្គមកិច្ច អតីតយុទ្ធជន និងយុវនីតិសម្បទា" },
      { value: "47", label: "ក្រសួង ធនធានទឹក និងឧតុនិយម" },
      { value: "48", label: "ក្រសួង កិច្ចការនារី" },
      { value: "49", label: "ក្រសួង ព្រះបរមរាជវាំង" },
      { value: "50", label: "គ្រប់បណ្តា ក្រសួង-ស្ថាបន័ ពាក់ព័ន្ធ" },
      { value: "51", label: "ក្រុមប្រឹក្សាជាតិ ដើម្បីកុមារ" },
      { value: "52", label: "ក្រុមប្រឹក្សា អភិវឌ្ឍន៍កម្ពុជា" },
      { value: "53", label: "ក្រុមប្រឹក្សាកំណែរទម្រង់រដ្ឋបាល" },
      { value: "54", label: "ក្រុមប្រឹក្សា អ្នកច្បាប់" },
      { value: "55", label: "ក្រុមប្រឹក្សា ស្តារ អភិវឌ្ឍន៍វិស័យកសិកម្ម និងជនបទ" },
      { value: "56", label: "ក្រុមប្រឹក្សា ធម្មនុញ្ញ" },
      { value: "57", label: "ក្រុមប្រឹក្សា កំណែទម្រង់ច្បាប់ និងប្រពន័្ធយុត្តិធម៌" },
      { value: "58", label: "គណៈកម្មការជាតិ គ្រប់គ្រង គ្រោះមហន្តរាយ" },
      { value: "59", label: "គណៈកម្មការជាតិ ទន្លេមេគង្គ កម្ពុជា" },
      { value: "60", label: "គណៈកម្មការជាតិ យូណេស្កូ" },
      { value: "61", label: "គណៈកម្មការ​ រៀបចំបុណ្យជាតិ-អន្តរជាតិ" },
      { value: "62", label: "គណៈកម្មការ​ សិទ្ធិមនុស្ស កម្ពុជា" },
      { value: "63", label: "ព្រឹទ្ធសភា" },
      { value: "64", label: "រដ្ឋសភា​​​​​​​​​​​​ជាតិ" },
    ])

    /**
     * Check authentication
     */
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      form.uid = user.id;
    } else {
      console.error("User not found in localStorage");
    }


    /**
     * ប្រកាស់មុខងារ - Declaration of functions
     */
    function readChildsOrganization(){
      store.dispatch('organization/listByParent',{
        search: '' ,
        perPage: 1000 ,
        page: 1 ,
        id: 2 // Parent Organization ID
      }).then( res => {
        departments.value = res.data.records.map( (r) => { return { value: r.id , label: r.name }; } )
      }).catch( error => {
        console.error( 'កំហុស៖ ', error)
      })
    }
    function readMinistries(){
      store.dispatch('organization/listByParent',{
        search: '' ,
        perPage: 1000 ,
        page: 1 ,
        id: 1 // Parent Organization ID
      }).then( res => {
        ministries.value = res.data.records.map( (r) => { return { value: r.id , label: r.name }; } )
      }).catch( error => {
        console.error( 'កំហុស៖ ', error)
      })
    }
    function getLeaders(){
      store.dispatch('officer/signatures').then(res => {
        console.log( res.data.records)
        leaders.value = res.data.records.map( (r) => { return { value: r.id , label: r.name , name: r.name , img : r.image } })
      }).catch( error => {
        console.log( 'កំហុស៖' , error )
      })
    }
    function handleInput(){

    }
    function handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      processFiles(files);
    }
    function handleFileUpload(event) {
      const files = event.target.files;
      processFiles(files);
    }
    function selectFiles() {
      this.$refs.fileInput.click();
    }
    function processFiles(files) {
      for (const file of files) {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.previewImages.push(e.target.result);
          };
          reader.readAsDataURL(file);
          this.selectedFiles.push(file);
        }
      }
    }

    function submitForm() {
      isSubmitting = true; // Disable the button

      // // Save the data 
      // this.$store.dispatch('document/create',{
      //   subject: '' ,
      //   object: '' ,
      //   number : '' ,
      //   date: '' ,
      //   /**
      //    * Optional fields to be added
      //    */
      //   document_type: null ,
      //   departments : [] ,
      //   ministries: [] ,
      //   signatures: []
      // }).then( res => {
      //   // If save success, then upload files
      //   if( res.status == 200 ){
      //     uploadPdf()
      //   }
        
      //   // upload word
      // }).catch( error => {
      //   console.error( 'Error: ' , error )
      // })

      // Upload file of PDF and Word

      const formData = new FormData();
      for (const file of this.selectedFiles) {
        formData.append("files[]", file);
      }

      // // Upload images via API
      // const uploadResponse = await fetch(`${API_BASE_URL}/upload-gallery`, {
      //   method: "POST",
      //   body: formData,
      // });

      // const uploadResult = await uploadResponse.json();
      // this.form.gallery = uploadResult.urls; // Store returned URLs

      // Submit feedback
      // const feedbackResponse = await fetch(`${API_BASE_URL}/feedback`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(this.form),
      // });

      if (feedbackResponse.ok) {
        this.submitted = true; // Hide form and show success message
      }

      this.isSubmitting = false; // Re-enable button (if needed)
    }

    /**
     * Upload functions
     */
    /**
     * File upload
     */
    const pdfs = ref([])
    /**
      * On change
      */
    function fileChange(event){
      console.log( 'changed' )
        for(const file of event.target.files ){
            // if( index == 'item' || index == 'length' ) continue;

            // allowed types
            let allowed_mime_types = [ 
            /**
              * Image mime type
              */
            // 'image/jpeg', 'image/png' 
            /**
              * Application file mime type
              */
            "application/pdf"
            ];
            
            // allowed max size in MB
            let allowed_size_mb = 25;

            // Validate file type
            if(allowed_mime_types.indexOf(file.type) == -1) {
                notify.error({
                    title: "ឯកសារយោង" ,
                    description: "ឯកសារនេះជាប្រភេទ៖ "+ file.type +"។ អនុញ្ញាតតែឯកសារដែលមានប្រភេទជា PDF។" ,
                    duration: 3000
                })
                return;
            }

            // Validate file size
            if(file.size > allowed_size_mb*1024*1024) {
                notify.error({
                    title: "ឯកសារយោង" ,
                    description: "ទំហំនៃឯកសារគឺ៖ " + (file.size/1024/1024).toFixed(2) + " មេកាបៃ (MB) លើលទំហំដែលកំណត់គឺ ៥ មេកាបៃ។" ,
                    duration: 3000
                })
            return;
            }


            let reader = new FileReader();
            reader.onerror = function(e) {
                console.log('On error');
            };
            reader.onprogress = function(e) {
                console.log('On progress');
            };
            reader.onabort = function(e) {
                console.log('On abort');
            };
            reader.onloadstart = function(e) {
                console.log( "On load start" )
            };
            reader.onload = function(e) {
            // Ensure that the progress bar displays 100% at the end.
            console.log( 'On load' )
            /**
              * Read binary string from 'e.target.result' and convert to base64
              */
            pdfs.value.push( btoa( e.target.result ) );
            // formData.append('files', btoa( e.target.result ) )
            }
            // // // Read in the image file as base64 type
            // // reader.readAsDataURL(file);
            reader.readAsBinaryString(file);

            // // Read in the image file as base64 type
            // props.record.pdfs.push( window.URL.createObjectURL( file ) )
            pdfs.value.push( file )
        }
    }
    /**
      * On click file upload
      */
    function clickUpload(){
        document.getElementById('referenceDocument').click()
    }
    function uploadFiles(){
        let formData = new FormData();
        formData.append('id', selectedCertificate.value.id )
        formData.append('file', pdfs.value[0] )
        notify.info({
            title: 'រក្សារទុកព័ត៌មាន' ,
            description: 'កំពុងបញ្ចូលឯកសារយោង។' ,
            duration: 3000
        })
        store.dispatch(model.name + '/upload', formData ).then( res => {
            notify.success({
                title: 'រក្សារទុកព័ត៌មាន' ,
                description: 'បានបញ្ចូលឯកសារយោងរួចរាល់។' ,
                duration: 3000
            })
            pdfs.value = []
            getCertificates()
        }).catch( err => {
            console.log( err )
            notify.error({
                title: 'រក្សារទុកព័ត៌មាន' ,
                description: 'មានបញ្ហាពេលបញ្ចូលឯកសារយោង។' ,
                duration: 3000
            })
        })
        uploadHelper.value = false
    }
    // End Upload

    /**
     * ការហៅមុខងារ ដែលគួរត្រូវដំណើរការពេលទំព័របានផ្ទុករួចរាល់​ - Call functions on mounted
     */
    onMounted( () => {
      readChildsOrganization(2)
      readMinistries(1)
      getLeaders()
    })
    
    /**
     * ការបោះត្រឡប់ អថេរ និងមុខងារ ទៅកាន់ Template
     */
    return {
      form ,
      departments , 
      ministries , 
      documentTypes ,
      leaders ,
      selectedDepepartment : 0 ,
      selectedMinistry: 0 ,
      previewImages: [],
      selectedFiles: [],
      isSubmitting: false,
      submitted: false,
      clickUpload ,
      fileChange ,
      uploadFiles
    }
  }
};
</script>

<style>
.drop-zone {
  width: 100%;
  padding: 20px;
  background: #e5e5e566;
  border: 2px dashed var(--ocm-input-border);
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
  font-size: 15px;
}
.drop-zone:hover{
  background: #e5e5e566;
}
.drop-zone svg{
  width: 50px;
}
.img_preview{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.img_preview img {
  width: 150px;
  border-radius: 5px;
}
</style>