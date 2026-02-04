<template>
  <div class="app_card_w">
					<div class="app_card app_00"
					:class="{ app_active: ['/pdf/flow-dash', '/pdf/flow-dash2'].includes(route.path) }">
						<router-link :to="dashboardRoute"></router-link>
						<span class="apico app0">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="64 112 896 800"><path d="M924.8 385.6a446.7 446.7 0 0 0-96-142.4a446.7 446.7 0 0 0-142.4-96C631.1 123.8 572.5 112 512 112s-119.1 11.8-174.4 35.2a446.7 446.7 0 0 0-142.4 96a446.7 446.7 0 0 0-96 142.4C75.8 440.9 64 499.5 64 560c0 132.7 58.3 257.7 159.9 343.1l1.7 1.4c5.8 4.8 13.1 7.5 20.6 7.5h531.7c7.5 0 14.8-2.7 20.6-7.5l1.7-1.4C901.7 817.7 960 692.7 960 560c0-60.5-11.9-119.1-35.2-174.4zM761.4 836H262.6A371.12 371.12 0 0 1 140 560c0-99.4 38.7-192.8 109-263c70.3-70.3 163.7-109 263-109c99.4 0 192.8 38.7 263 109c70.3 70.3 109 163.7 109 263c0 105.6-44.5 205.5-122.6 276zM623.5 421.5a8.03 8.03 0 0 0-11.3 0L527.7 506c-18.7-5-39.4-.2-54.1 14.5a55.95 55.95 0 0 0 0 79.2a55.95 55.95 0 0 0 79.2 0a55.87 55.87 0 0 0 14.5-54.1l84.5-84.5c3.1-3.1 3.1-8.2 0-11.3l-28.3-28.3zM490 320h44c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8h-44c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8zm260 218v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8zm12.7-197.2l-31.1-31.1a8.03 8.03 0 0 0-11.3 0l-56.6 56.6a8.03 8.03 0 0 0 0 11.3l31.1 31.1c3.1 3.1 8.2 3.1 11.3 0l56.6-56.6c3.1-3.1 3.1-8.2 0-11.3zm-458.6-31.1a8.03 8.03 0 0 0-11.3 0l-31.1 31.1a8.03 8.03 0 0 0 0 11.3l56.6 56.6c3.1 3.1 8.2 3.1 11.3 0l31.1-31.1c3.1-3.1 3.1-8.2 0-11.3l-56.6-56.6zM262 530h-80c-4.4 0-8 3.6-8 8v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8z" fill="currentColor"></path></svg>
							<span class="app_txt t-lspace">ផ្ទាំងគ្រប់គ្រង</span>
						</span>
					</div>
					<div class="app_card app_01"
					:class="{ app_active: ['/pdf/flow', '/pdf/documents-detail', '/pdf/documents-add' , '/pdf/documents-add2', '/pdf/documents-edit', '/pdf/documents-detial'].includes(route.path) }">
						<router-link to="/pdf/flow"></router-link>
						<span class="apico app1">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
							<span class="app_txt t-lspace">លំហូរឯកសារ<span class="d-flex align-items-center">២០ថ្មី</span></span>
						</span>
					</div>
					<div class="app_card app_02 hide"
					:class="{ app_active: route.path === '/pdf/my-documents' }">
            <router-link to="/pdf/my-documents"></router-link>
						<span class="apico app2">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
							<span class="app_txt t-lspace">ឯកសាររបស់ខ្ញុំ<span class="d-flex align-items-center">១២</span></span>
						</span>
					</div>
					<div class="app_card app_03"
					:class="{ app_active: route.path === '/pdf/history' }">
            <router-link to="/pdf/history"></router-link>
						<span class="apico app3">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="2.05 1.91 19.95 20"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l2 2"></path><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"></path></g></svg>
							<span class="app_txt t-lspace">ប្រវត្តិឯកសារ<span class="d-flex align-items-center">៥​០</span></span>
						</span>
					</div>
					<div class="app_card app_04"
					:class="{ app_active: route.path === '/pdf/logs' }">
            <router-link to="/pdf/logs"></router-link>
						<span class="apico app4">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="3 3 20 20"><g fill="none"><path d="M3 5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25v6.772a6.471 6.471 0 0 0-1.5-.709V5.25a.75.75 0 0 0-.75-.75H5.25a.75.75 0 0 0-.75.75v13.5c0 .414.336.75.75.75h6.063c.173.534.412 1.037.709 1.5H5.25A2.25 2.25 0 0 1 3 18.75V5.25zm7.78 2.47a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 0 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0zm0 5.5a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0zM17.5 12a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11zm.501 8.503V18h2.502a.5.5 0 1 0 0-1H18v-2.5a.5.5 0 1 0-1 0V17h-2.504a.5.5 0 0 0 0 1h2.505v2.503a.5.5 0 1 0 1 0zM13.25 8.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5z" fill="currentColor"></path></g></svg>
							<span class="app_txt t-lspace">Logs ប្រព័ន្ធគ្រប់គ្រង</span>
						</span>
					</div>
					<div class="app_card app_04 appnews"
					:class="{ app_active: route.path === '/pdf/profile' }">
            <router-link to="/pdf/profile"></router-link>
						<span class="apico app4">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 8 496 496"><path d="M248 104c-53 0-96 43-96 96s43 96 96 96s96-43 96-96s-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248s248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4c14.9-23 40.4-38.6 69.6-39.5c20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5c-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9c-10.2 0-26 9.6-57.6 9.6c-31.5 0-47.4-9.6-57.6-9.6c-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z" fill="currentColor"></path></svg>
							<span class="app_txt t-lspace">ព័ត៌មានផ្ទាល់ខ្លួន</span>
						</span>
					</div>
          <ExpandMenu />
				</div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import ExpandMenu from './ExpandMenu.vue'  

const route = useRoute();
const getUserData = () => {
  try {
    const userRaw = localStorage.getItem('user');
    return userRaw ? JSON.parse(userRaw) : null;
  } catch {
    return null;
  }
};

const dashboardRoute = computed(() => {
  const user = getUserData();
  if (!user || !user.roles) return '/pdf/flow-dash';

  const leaders = [ 
    'prime_minister', 
    'deputy_minister', 
    'senior_minister', 
    'minister', 
    'secretary_of_state', 
    'deputy_secretary_of_state', 
    'general_department', 
    'deputy_general_department' 
  ];

  const isLeader = user.roles.some(role => leaders.includes(role.sub_role));
  return isLeader ? '/dashboard' : '/pdf/flow-dash2';
});
</script>