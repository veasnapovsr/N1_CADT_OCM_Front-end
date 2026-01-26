<template>
  <Header title="ការជូនដំណឹង" />
  <section class="appppw">
  <Aside />
  <div class="sw">
				<div class="app_content">
				<div class="ocm_cwr">
					<h2 class="h wttt t-lspace">ការជូនដំណឹងទាំងអស់</h2>
				</div>
        <div class="ocm_dtwr"><div class="ocm_tb_wrap mb-10 shadow-right">
					<table class="ocm-table wp-list-table widefat striped">
					<thead>
						<tr>
							<th style="width: 50px; ">#</th>
							<th>ខ្លឹមសារ</th>							
							<th class="tbl_action" style="width: 170px; ">កាលបរិច្ឆេទ</th>
						</tr>
					</thead>
					<tbody>						
						<tr v-for="(row, index) in data" :key="row.lr_id">
							<td>{{ formatKhmerNumber((currentPage - 1) * perPage + index + 1) }}</td>
							<td class="pright0"><span v-if="row.message">{{ row.message }}</span></td>
							<td class="tbl_action pright0"><span v-if="row.create_date">{{ formatDateKhmer(row.create_date) }}</span></td>							
						</tr>
                        <tr v-if="data.length === 0">
							<td colspan="3" class="p0">
								<div class="ocm_dt_empt">
									<span class="ocm_dti"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="3 1 23 25"><path d="M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z" fill="currentColor"></path><path d="M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z" fill="currentColor"></path></svg></span>
									<span class="ocm_dtdes">គ្មានទិន្នន័យ</span>
								</div>
							</td>
						</tr>
					</tbody>

				</table></div>
				<div v-if="totalPages > 1" class="pagination">
					<button class="prev nav_i" @click="prevPage" :disabled="currentPage === 1"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-0.05 37.65 448.05 436.7"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" fill="currentColor"></path></svg>ពីមុន</button>
					<button class="page nav_i" v-for="page in visiblePages" :key="page" @click="currentPage = page; fetchData()" :class="{ current: currentPage === page }">{{ formatKhmerNumber(page) }}</button>			
					<button class="next nav_i" @click="nextPage" :disabled="currentPage >= totalPages">បន្ទាប់<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 37.65 448.05 436.7"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" fill="currentColor"></path></svg></button>			
				</div>

        </div>
  </div>
  <Footer />
</div>
</section>
</template>

<script setup>
import { API_BASE_URL, formatKhmerNumber, formatDateKhmer  } from '@/lib/utils.js'
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'

import { ref, computed, watch, onMounted } from "vue";

// Get logged-in user's ID from localStorage
const user = JSON.parse(localStorage.getItem("user"));
const userId = user ? user.id : 0;

const selectedStatus = ref("all");
const data = ref([]);
const statusCounts = ref({ waiting: 0, accept: 0, decline: 0, all: 0 });
const currentPage = ref(1);
const perPage = 20;
const totalRecords = ref(0);

// Fetch mission leave data based on user and pagination
const fetchData = async () => {
    // API disabled - not in use yet
    // try {
    //     const url = `${API_BASE_URL}/all-notifications?page=${currentPage.value}&per_page=${perPage}&user_id=${userId}`;
    //     const response = await fetch(url);
    //     const result = await response.json();
    //     // console.log("Data:", result);

    //     if (!result.data || !Array.isArray(result.data)) {
    //         console.error("Error: Expected an array, but got:", result.data);
    //         return;
    //     }

    //     const formattedData = result.data.map(row => ({
    //         ...row,
    //         receivers: row.receivers 
    //             ? row.receivers.split("||").map(receiver => {
    //                 const [name, img, task] = receiver.split("|");
    //                 return { name: name?.trim() || '', img: img?.trim() || '', task: task?.trim() || '' };
    //             }) 
    //             : []
    //     }));

    //     data.value = formattedData ?? [];
    //     totalRecords.value = result.total_records;
    // } catch (error) {
    //     console.error("Error fetching data:", error);
    // }
    
    // Return empty data
    data.value = [];
    totalRecords.value = 0;
};


// Pagination logic: Only show pagination if needed
const totalPages = computed(() => Math.ceil(totalRecords.value / perPage));

const nextPage = () => { 
    if (currentPage.value < totalPages.value) { 
        currentPage.value++; 
        fetchData(); 
    } 
};

const prevPage = () => { 
    if (currentPage.value > 1) { 
        currentPage.value--; 
        fetchData(); 
    } 
};

const visiblePages = computed(() => {
    if (totalPages.value <= 1) return [];
    const maxVisible = 10;
    const startPage = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages.value, startPage + maxVisible - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});
// Fetch data when tab changes
watch(selectedStatus, () => { currentPage.value = 1; fetchData(); }, { immediate: true });
</script>