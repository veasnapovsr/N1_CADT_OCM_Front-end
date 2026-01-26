<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
import FlowDashboardChart from '@/components/FlowDashboardChart.vue'
import { documents } from '@/data/documents'

import { FlatPickr } from '@/components/ui/flat-pickr'
import { InputSelect } from '@/components/ui/inputselect'
import { leaders } from '@/data/leader'

// ---------------- Router ----------------
const router = useRouter()

const goToDetail = () => {
  router.push({ name: 'pdf-documents-detail' })
}
const goToAll = () => {
  router.push({ name: 'pdf-flow' })
}

// ---------------- Pending files logic ----------------
const timeAgo = (isoString) => {
  if (!isoString) return 'N/A'

  const now = new Date()
  const past = new Date(isoString)
  const diffMs = now - past
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'ថ្ងៃនេះ'
  if (diffDays === 1) return '1 ថ្ងៃមុន'
  return `${diffDays} ថ្ងៃមុន`
}

const pendingFiles = computed(() => {
  return documents
    .filter(d => d.status === 'pending' && d.sentAt)
    .sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
})

// ---------------- Form state (RIGHT CARD) ----------------
const form = reactive({
  title: '',
  uid: '',
  department: '',
  documentType: '',
  ministry: '',
  signature: null
})

const startDate = ref(null)
const previewImages = ref([])
const selectedFiles = ref([])
const fileInput = ref(null)
const isSubmitting = ref(false)

// ---------------- File upload handlers ----------------
const selectFiles = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const files = event.target.files
  processFiles(files)
}

const handleDrop = (event) => {
  event.preventDefault()
  const files = event.dataTransfer.files
  processFiles(files)
}

const processFiles = (files) => {
  for (const file of files) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        previewImages.value.push(e.target.result)
      }
      reader.readAsDataURL(file)
      selectedFiles.value.push(file)
    }
  }
}

// Fake submit (you can plug your API later)
const submitForm = async () => {
  isSubmitting.value = true
  console.log('Submitting form:', form)
  console.log('Files:', selectedFiles.value)
  isSubmitting.value = false
}

// ---------------- Select options ----------------
const departments = [
  { value: '2', label: 'អគ្គនាយកដ្ឋានសម្របសម្រួលកិច្ចការទូទៅ' },
  { value: '3', label: 'ក្រុមប្រឹក្សាអ្នកច្បាប់' },
  { value: '4', label: 'អង្គភាពព័ត៌មាននិងប្រតិកម្មរហ័ស' }
  // (you can paste your full list back here)
]

const documentTypes = [
{ value: "1", label: "របាយការណ៍" },
        { value: "2", label: "សំណើរ" },
]


const ministries = [
  { value: '2', label: 'ទីស្តីការគណៈរដ្ឋមន្ត្រី' },
  { value: '5', label: 'ក្រសួង ពាណិជ្ជកម្ម' }
]
</script>


<template>
  <Header title="លំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
  <section class="appppw">
  <Aside />
  <div class="sw">
    <div class="app_content">				

				<div class="ocm_cwr">					
					<h2 class="h wttt ocm_ptitle t-lspace">ផ្ទាំងគ្រប់គ្រងលំហូរឯកសារសង្ខេប</h2>						
				</div>
				<div class="ocm_dashboard_splits">
					<div>
						<div class="ocm_bfw ocm_stat">
					<div class="ocm_caw noneh status_wait">
						<div class="ocm_card_body">
							<div class="ocm_icardw">
							<h5 class="ocm_card_value">១១</h5>
							<div class="ocm_icard">
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
							</div>			
							</div>
							<p class="ocm_card_title">លំហូរឯកសារមិនទាន់អនុម័ត</p>
						</div>
					</div>
					<div class="ocm_caw noneh status_accept">
						<div class="ocm_card_body">
						<div class="ocm_icardw">	
						<h5 class="ocm_card_value">៤</h5>
						<div class="ocm_icard">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
						</div>			
						</div>
							<p class="ocm_card_title">លំហូរឯកសារអនុម័តរួច</p>
						</div>
					</div>
					<div class="ocm_caw noneh status_all">
						<div class="ocm_card_body">
							<div class="ocm_icardw">
							<h5 class="ocm_card_value">២៧</h5>
							<div class="ocm_icard">
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
							</div>			
							</div>
							<p class="ocm_card_title">លំហូរឯកសារទាំងអស់</p>
						</div>
					</div>
					<div class="ocm_caw noneh status_draft">
						<div class="ocm_card_body">
							<div class="ocm_icardw">
							<h5 class="ocm_card_value">២</h5>
							<div class="ocm_icard">
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
							</div>			
							</div>
							<p class="ocm_card_title">លំហូរឯកសារព្រាង</p>
						</div>
					</div>
					<div class="ocm_caw noneh status_decline">
						<div class="ocm_card_body">
						<div class="ocm_icardw">
						<h5 class="ocm_card_value">២</h5>
							<div class="ocm_icard">
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
							</div>			
							</div>
							<p class="ocm_card_title">លំហូរឯកសារមិនយល់ព្រម</p>
						</div>
					</div>
						</div>



            <div class="ocmopt-col cols2 mb-30">
  <div class="ocm_card ocm_doc_fr">
  <div class="ocm_card_body">
    <h2 class="h card_tt t-lspace w-full flex justify-between items-center">
      <span>ឯកសារត្រូវពិនិត្យ (១០)</span>
      <span class="ocm_lbl" @click="goToAll">បង្ហាញទាំងអស់</span>
    </h2>

    <span class="jl_tbl_w cursor-pointer ocm_dcreject" @click="goToDetail">
								<span class="ocm_docfw">
									<span class="ocm_docf d-flex flex-column align-items-center">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
									PDF
									</span>
									3 MB
								</span>
								<span class="jl_tbl_c gap-1">
									<span class="tb_n1 bold ellip-2">អនុម័តយល់ព្រមលើកិច្ចព្រមព្រៀងបន្ថែមទៅលើសន្ធិសញ្ញាស្តីពីតំបន់អាស៊ី-អាគ្នេយ៍គ្មានអាវុធ នុយក្លេអ៊ែរ ដែលត្រូវបានអនុម័តដោយរដ្ឋភាគីនៃសន្ធិសញ្ញាស្តីពីតំបន់អាស៊ី-អាគ្នេយ៍គ្មានអាវុធនុយក្លេអ៊ែរ នៅទីក្រុងគូឡាឡាំពួនៃប្រទេសម៉ាឡេស៊ី នាថ្ងៃទី២៥ ខែឧសភា ឆ្នាំ២០២៥ ហើយដែលមានអត្ថបទ ទាំងស្រុងភ្ជាប់មកជាមួយនេះ។</span>
									<span class="tb_n1 fs-90 w-full flex justify-between"><span>លិខិតលេខ: នស/រកម / ០០៣៤</span><span class="pri-color">ឯកសារបានបដិសេធពី: <b>ខុទ្ទកាល័យ</b></span></span>
								</span>
							</span>
							<span class="jl_tbl_w cursor-pointer ocm_dcwait" @click="goToDetail">
								<span class="ocm_docfw">
									<span class="ocm_docf d-flex flex-column align-items-center">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
									PDF
									</span>
									4 MB
								</span>
								<span class="jl_tbl_c gap-1"><span class="tb_n1 ellip-2 bold">ផែនការសកម្មភាព ២០២៤-២០២៨ ដើម្បីអនុវត្ដវិធានការគន្លឹះក្នុងការកែទម្រង់រដ្ឋបាលសាធារណៈរបស់រាជរដ្ឋាភិបាលនីតិកាលទី៧ នៃរដ្ឋសភា</span>
								<span class="tb_n1 fs-90 w-full flex justify-between"><span>លិខិតលេខ: នស/រកម / ០០៣៤</span><span class="pri-color">ឯកសារដល់: <b>នាយកដ្ឋានហិរញ្ញវត្ថុ</b></span></span>
								</span>
							</span>
							<span class="jl_tbl_w cursor-pointer ocm_dcwait" @click="goToDetail">
								<span class="ocm_docfw">
									<span class="ocm_docf d-flex flex-column align-items-center">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
									PDF
									</span>
									2 MB
								</span>
								<span class="jl_tbl_c gap-1"><span class="tb_n1 ellip-2 bold">ច្បាប់ស្តីពីការអនុម័តយល់ព្រមលើកិច្ចព្រមព្រៀងស្តីពីការអភិរក្ស និងការប្រើប្រាស់ជីវៈចម្រុះសមុទ្រប្រកបដោយចីរភាព នៅក្រៅដែនយុត្តាធិការជាតិក្រោមអនុសញ្ញា សហប្រជាជាតិស្តីពីច្បាប់សមុទ្រ</span>
								<span class="tb_n1 fs-90 w-full flex justify-between"><span>លិខិតលេខ: នស/រកម / ០០៣៤</span><span class="pri-color">ឯកសារដល់: <b>ខុទ្ទកាល័យ</b></span></span>
								</span>
							</span>

							<span class="jl_tbl_w cursor-pointer ocm_dcwait" @click="goToDetail">
								<span class="ocm_docfw">
									<span class="ocm_docf d-flex flex-column align-items-center">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
									PDF
									</span>
									3 MB
								</span>
								<span class="jl_tbl_c gap-1"><span class="tb_n1 ellip-2 bold">សេចក្តីសម្រេចស្ដីពីការផ្ទេរនិងសមាហរណកម្មក្រុមការងារកម្ពុជាប្រឆាំងអំពើជួញដូរមនុស្ស នៅមហាអនុតំបន់មេគង្គ ទៅក្នុងក្រុមការងារសហប្រតិបត្តិការអន្តរជាតិ នៃគណៈកម្មាធិការជាតិប្រយុទ្ធប្រឆាំងអំពើជួញដូរមនុស្ស</span>
								<span class="tb_n1 fs-90 w-full flex justify-between"><span>លិខិតលេខ: នស/រកម / ០០៣៤</span><span class="pri-color">ឯកសារដល់: <b>ខុទ្ទកាល័យ</b></span></span>
								</span>
							</span>



</div>
  </div>

  <div class="ocm_card ocm_doc_fr">
  <div class="ocm_card_body">

    <h2 class="h card_tt t-lspace mb-10">បង្កើតឯកសារ</h2>

    <form @submit.prevent="submitForm">

      <!-- Subject -->
      <div class="ocmopt-col cols1 mb-15">
        <div class="ocmopt-meta">
          <div class="ocmopt-meta-title">
            <label class="ocmopt-meta-label t-lspace">កម្មវត្ថុ</label>
          </div>
          <div class="ocmopt-meta-content ocm_meta_check">
            <textarea
              v-model="form.title"
              class="form-control"
              cols="60"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Letter No + Date (2 columns) -->
      <div class="ocmopt-col cols3 mb-15">

        <div class="ocmopt-meta">
          <div class="ocmopt-meta-title">
            <label class="ocmopt-meta-label t-lspace">លិខិតលេខ</label>
          </div>
          <div class="ocmopt-meta-content">
            <input
              v-model="form.uid"
              type="text"
              class="form-control"
            />
          </div>
        </div>

        <div class="ocmopt-meta">
          <div class="ocmopt-meta-title">
            <label class="ocmopt-meta-label t-lspace">កាលបរិច្ឆេទ</label>
          </div>
          <div class="ocmopt-meta-content">
            <FlatPickr
              v-model="startDate"
              placeholder="កាលបរិច្ឆេទ"
              :config="{
                dateFormat: 'd-m-Y',
                altInput: true,
                altFormat: 'd-m-Y',
                allowInput: true,
                minDate: new Date()
              }"
            />
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

      </div>
      

      <!-- Upload zone -->
      <div
        class="drop-zone mb-15"
        @dragover.prevent
        @drop="handleDrop"
        @click="selectFiles"
      >
        <p>អូសនិងទម្លាក់ឯកសារនៅទីនេះ ឬចុចទីនេះ</p>
        <input
          type="file"
          multiple
          ref="fileInput"
          @change="handleFileUpload"
          hidden
        />
      </div>

      <!-- Image previews -->
      <div class="img_preview mb-15">
        <div v-for="(image, index) in previewImages" :key="index">
          <img :src="image" />
        </div>
      </div>

      <!-- Save button -->
      <div class="text-right">
        <button
          class="button ocm_btn_ac button-primary"
          type="submit"
          :disabled="isSubmitting"
        >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 32 448 448"><path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88s88-39.477 88-88s-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40s40 17.944 40 40s-17.944 40-40 40z" fill="currentColor"></path></svg>
        រក្សារទុក
        </button>
      </div>

    </form>
  </div>
</div>

</div>
											
						
						
					</div>
					<div class="ocm_chart_card">
						<FlowDashboardChart />
					</div>
				</div>
			</div>
			<Footer />
		</div>  
</section>
</template>