<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
import FlowDashboardChart from '@/components/FlowDashboardChart.vue'
import FlowStats from '@/components/flow/FlowStatus.vue'
import { flowStats } from '@/data/Flowstatuscheck'
import { formatKhmerNumber } from '@/lib/utils'
import {
	applyDocumentFlowListOverride,
	dedupeWorkflowRecords,
	getStoredDocumentFlowState
} from '@/lib/documentFlow'
import { getUser, isAdmin } from '@/plugins/authentication'

const router = useRouter()
const store = useStore()
const currentUser = getUser() || {}
const userIsAdmin = isAdmin()

const goToDetail = (doc) => {
  if (doc?.id) {
    router.push({ name: 'pdf-documents-detail', params: { id: doc.id } })
  } else {
    router.push({ name: 'pdf-documents-detail' })
  }
}
const statsByStatus = ref(null)
const pendingList = ref([])

const fetchStats = async () => {
  try {
    const res = await store.dispatch('transaction/getTotalByStatus')
    if (res?.data?.ok && res?.data?.records) {
      statsByStatus.value = res.data.records
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching stats by status:', err)
  }
}

const fetchPendingList = async () => {
  try {
    const res = await store.dispatch('transaction/list', {
      status: 'pending',
			perPage: 100,
      page: 1
    })
    if (res?.data?.records) {
			pendingList.value = dedupeWorkflowRecords(res.data.records)
				.map((r) => {
					const flowState = getStoredDocumentFlowState(r.id, r)
					return applyDocumentFlowListOverride({
						id: r.id,
						title: r.subject,
						code: r.document?.number,
						size: r.document?.pdf_file_size || '3 MB',
						sentTo: !r.receivers?.length ? 'គ្មានអ្នកទទួល' : r.receivers.map((rev) => rev.user?.fullname).filter(Boolean).join(', '),
						flowState,
						transaction: r,
						updatedAt: flowState?.updatedAt || r.updated_at || r.sent_at || r.created_at || ''
					})
				})
				.sort((left, right) => new Date(right.updatedAt || 0) - new Date(left.updatedAt || 0))
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching pending documents:', err)
  }
}

const pendingCountFormatted = computed(() => {
  const n = Number(statsByStatus.value?.pending) || 0
  return formatKhmerNumber(n)
})

const pendingDisplayList = computed(() => pendingList.value.slice(0, 4))

const flowStatsSynced = computed(() => {
  const records = statsByStatus.value || {}
  const total =
    (Number(records.draft) || 0) +
    (Number(records.pending) || 0) +
    (Number(records.approved) || 0) +
    (Number(records.rejected) || 0)
  return flowStats.map((item) => {
    const count =
      item.statusKey === 'all'
        ? total
        : Number(records[item.statusKey]) || 0
    return {
      value: formatKhmerNumber(count),
      label: item.label,
      class: item.class
    }
  })
})

onMounted(() => {
  fetchStats()
  fetchPendingList()
})
</script>

<template>
  <Header title="លំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
  <section class="appppw">
  <Aside />
  <div class="sw">
    <div class="app_content">		
				<div class="ocm_cwr">					
					<h2 class="h wttt ocm_ptitle t-lspace">ផ្ទាំងគ្រប់គ្រងលំហូរឯកសារសង្ខេប</h2>		
					<router-link
						to="/pdf/documents-add"
						class="oc_nbtn t-lspace"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="5 5 14 14">
						<path d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
						</svg>
						បង្កើតឯកសារ
					</router-link>
				</div>
							
				<div class="ocm_dashboard_splits">
					<div>
						<FlowStats :stats="flowStatsSynced" />

						<div class="ocmopt-col cols2 mb-30">
							<div class="ocm_card ocm_doc_fr ocm_dcnew">
								<div class="ocm_card_body">
									<h2 class="h card_tt t-lspace w-full flex justify-between items-center"><span>លំហូរឯកសារថ្មី (២០)</span> <router-link
  :to="{ path: '/pdf/flow'}"
  class="ocm_lbl"
>
  បង្ហាញទាំងអស់
</router-link></h2>
									<span class="jl_tbl_w cursor-pointer" @click="goToDetail">
								<span class="ocm_docfw">
									<span class="ocm_docf d-flex flex-column align-items-center">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
									PDF
									</span>
									3 MB
								</span>
								<span class="jl_tbl_c gap-1">
									<span class="tb_n1 bold ellip-2">អនុម័តយល់ព្រមលើកិច្ចព្រមព្រៀងបន្ថែមទៅលើសន្ធិសញ្ញាស្តីពីតំបន់អាស៊ី-អាគ្នេយ៍គ្មានអាវុធ នុយក្លេអ៊ែរ ដែលត្រូវបានអនុម័តដោយរដ្ឋភាគីនៃសន្ធិសញ្ញាស្តីពីតំបន់អាស៊ី-អាគ្នេយ៍គ្មានអាវុធនុយក្លេអ៊ែរ នៅទីក្រុងគូឡាឡាំពួនៃប្រទេសម៉ាឡេស៊ី នាថ្ងៃទី២៥ ខែឧសភា ឆ្នាំ២០២៥ ហើយដែលមានអត្ថបទ ទាំងស្រុងភ្ជាប់មកជាមួយនេះ។</span>
									<span class="tb_n1 fs-90 w-full flex flex-wrap gap-x-3 gap-y-0 items-baseline"><span>លិខិតលេខ: នស/រកម / ០០៣៤</span><span class="pri-color">ឯកសារដល់: <b>ខុទ្ទកាល័យ</b></span></span>
								</span>
							</span>
							<span class="jl_tbl_w cursor-pointer" @click="goToDetail">
								<span class="ocm_docfw">
									<span class="ocm_docf d-flex flex-column align-items-center">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
									PDF
									</span>
									4 MB
								</span>
								<span class="jl_tbl_c gap-1"><span class="tb_n1 ellip-2 bold">ផែនការសកម្មភាព ២០២៤-២០២៨ ដើម្បីអនុវត្ដវិធានការគន្លឹះក្នុងការកែទម្រង់រដ្ឋបាលសាធារណៈរបស់រាជរដ្ឋាភិបាលនីតិកាលទី៧ នៃរដ្ឋសភា</span>
								<span class="tb_n1 fs-90 w-full flex flex-wrap gap-x-3 gap-y-0 items-baseline"><span>លិខិតលេខ: នស/រកម / ០០៣៤</span><span class="pri-color">ឯកសារដល់: <b>ខុទ្ទកាល័យ</b></span></span>
								</span>
							</span>
							<span class="jl_tbl_w cursor-pointer" @click="goToDetail">
								<span class="ocm_docfw">
									<span class="ocm_docf d-flex flex-column align-items-center">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
									PDF
									</span>
									2 MB
								</span>
								<span class="jl_tbl_c gap-1"><span class="tb_n1 ellip-2 bold">ច្បាប់ស្តីពីការអនុម័តយល់ព្រមលើកិច្ចព្រមព្រៀងស្តីពីការអភិរក្ស និងការប្រើប្រាស់ជីវៈចម្រុះសមុទ្រប្រកបដោយចីរភាព នៅក្រៅដែនយុត្តាធិការជាតិក្រោមអនុសញ្ញា សហប្រជាជាតិស្តីពីច្បាប់សមុទ្រ</span>
								<span class="tb_n1 fs-90 w-full flex flex-wrap gap-x-3 gap-y-0 items-baseline"><span>លិខិតលេខ: នស/រកម / ០០៣៤</span><span class="pri-color">ឯកសារដល់: <b>ខុទ្ទកាល័យ</b></span></span>
								</span>
							</span>

							<span class="jl_tbl_w cursor-pointer" @click="goToDetail">
								<span class="ocm_docfw">
									<span class="ocm_docf d-flex flex-column align-items-center">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
									PDF
									</span>
									3 MB
								</span>
								<span class="jl_tbl_c gap-1"><span class="tb_n1 ellip-2 bold">សេចក្តីសម្រេចស្ដីពីការផ្ទេរនិងសមាហរណកម្មក្រុមការងារកម្ពុជាប្រឆាំងអំពើជួញដូរមនុស្ស នៅមហាអនុតំបន់មេគង្គ ទៅក្នុងក្រុមការងារសហប្រតិបត្តិការអន្តរជាតិ នៃគណៈកម្មាធិការជាតិប្រយុទ្ធប្រឆាំងអំពើជួញដូរមនុស្ស</span>
								<span class="tb_n1 fs-90 w-full flex flex-wrap gap-x-3 gap-y-0 items-baseline"><span>លិខិតលេខ: នស/រកម / ០០៣៤</span><span class="pri-color">ឯកសារដល់: <b>ខុទ្ទកាល័យ</b></span></span>
								</span>
							</span>
							
								</div>
							</div>
							

							<div class="ocm_card ocm_doc_fr ocm_dcwait">
								<div class="ocm_card_body">
									<h2 class="h card_tt t-lspace w-full flex justify-between items-center"><span>លំហូរឯកសារមិនទាន់អនុម័ត ({{ pendingCountFormatted }})</span> <router-link
  :to="{ path: '/pdf/flow', query: { status: 'pending' } }"
  class="ocm_lbl"
>
  បង្ហាញទាំងអស់
</router-link>
</h2>
									<span
										v-for="doc in pendingDisplayList"
										:key="doc.id"
										class="jl_tbl_w cursor-pointer"
										@click="goToDetail(doc)"
									>
								<span class="ocm_docfw">
									<span class="ocm_docf d-flex flex-column align-items-center">
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
									PDF
									</span>
									{{ doc.size }}
								</span>
								<span class="jl_tbl_c gap-1"><span class="tb_n1 ellip-2 bold">{{ doc.title }}</span>
								<span class="tb_n1 fs-90 w-full flex flex-wrap gap-x-3 gap-y-0 items-baseline"><span>លិខិតលេខៈ {{ doc.code || 'នស/រកម/ ០០៣៤' }}</span><span class="pri-color">ឯកសារដល់: <b>{{ doc.sentTo }}</b></span></span>
								</span>
							</span>
							
							
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