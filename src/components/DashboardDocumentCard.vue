<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goToDetail = () => {
  router.push({ name: 'pdf-documents-detail' })
}
const goToAll = () => {
  router.push({ name: 'pdf-flow' })
}
</script>
<template>
  <div class="ocmopt-col cols2 mb-20">
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
							<span class="jl_tbl_w cursor-pointer ocm_dcnew" @click="goToDetail">
								<span class="ocm_docfw">
									<span class="ocm_docf d-flex flex-column align-items-center">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
									PDF
									</span>
									3 MB
								</span>
								<span class="jl_tbl_c gap-1">
									<span class="tb_n1 bold ellip-2">ផែនការសកម្មភាព ២០២៤-២០២៨ ដើម្បីអនុវត្ដវិធានការគន្លឹះក្នុងការកែទម្រង់រដ្ឋបាលសាធារណៈរបស់រាជរដ្ឋាភិបាលនីតិកាលទី៧ នៃរដ្ឋសភា</span>
									<span class="tb_n1 fs-90 w-full flex justify-between"><span>លិខិតលេខ: នស/រកម / ០០៣៤</span><span class="pri-color">ឯកសារដល់: <b>នាយកដ្ឋានហិរញ្ញវត្ថុ</b></span></span>
								</span>
							</span>
    </div>
  </div>

  <div class="ocm_card ocm_doc_fr">
  <div class="ocm_card_body">
    <h2 class="h card_tt t-lspace w-full flex justify-between items-center">
      <span>កិច្ចប្រជុំសប្តាហ៍នេះ (១០)</span>
      <span class="ocm_lbl" @click="goToAll">បង្ហាញទាំងអស់</span>
    </h2>

    <span class="jl_tbl_w cursor-pointer ocm_dcreject" @click="goToDetail">								
								<span class="jl_tbl_c gap-1">
									<span class="tb_n1 bold ellip-2">ឯកឧត្តមឧបនាយករដ្ឋមន្ត្រីប្រចាំការ វង្សី វិស្សុត អញ្ជើញបិទសន្និបាតបូកសរុបលទ្ធផលការងារប្រចាំឆ្នាំ២០២៥ និងលើកទិសដៅឆ្នាំ២០២៦ របស់រដ្ឋបាលខេត្តកំពង់ធំ</span>
									<span class="tb_n1 fs-90 w-full flex justify-between"><span>ថ្ងៃសុក្រ ទី២៣ ខែមករា ឆ្នាំ២០២៦</span><span class="pri-color">ដឹកនាំប្រជុំដោយ: <b>ឯកឧត្តមឧបនាយករដ្ឋមន្ត្រីប្រចាំការ វង្សី វិស្សុត</b></span></span>
								</span>
							</span>
							<span class="jl_tbl_w cursor-pointer ocm_dcreject" @click="goToDetail">								
								<span class="jl_tbl_c gap-1">
									<span class="tb_n1 bold ellip-2">កិច្ចប្រជុំជំនាញបច្ចេកទេស ក្រោមអធិបតីភាពឯកឧត្តម លី ច័ន្ទតុលា រដ្ឋលេខាធិការទីស្តីការគណៈរដ្ឋមន្រ្តី អនុប្រធាននិងជាប្រធានក្រុមការងារទី២ នៃក្រុមប្រឹក្សាអ្នកច្បាប់ និងឯកឧត្តម នៅ បោនន័រ អនុប្រធាននិងជាប្រធានក្រុមការងារទី១ នៃក្រុមប្រឹក្សាសេដ្ឋកិច្ច សង្គមកិច្ច និងវប្បធម៌ ដើម្បីពិនិត្យនិងពិភាក្សាបន្តលើ «សេចក្តីព្រាងច្បាប់ស្តីពីចរាចរណ៍ផ្លូវគោក»។</span>
									<span class="tb_n1 fs-90 w-full flex justify-between"><span>ថ្ងៃអង្គារ ទី៦ ខែមករា ឆ្នាំ២០២៦</span><span class="pri-color">ដឹកនាំប្រជុំដោយ: <b>ឯកឧត្តម លី ច័ន្ទតុលា</b></span></span>
								</span>
							</span>
    </div>
  </div>
</div>
</template>