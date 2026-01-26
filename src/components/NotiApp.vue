<template>
<div class="ocm_pover_wr ocm_noti_w">
			<div class="ocm_noti ocm_pover ocm_notil ocm-tooltip tip-b" @click="togglePopover"><span class="pulse"></span>
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="3 2 18 20"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6"></path><path d="M9 17v1a3 3 0 0 0 6 0v-1"></path></g></svg>
				<span class="tip_txt">ការជូនដំណឹង</span>
			</div>
			<div class="pop_content">
				<div class="noti_head">
					<span class="noti_title t-lspace">ការជូនដំណឹងថ្មីៗ</span><span class="noti_clear t-lspace" @click="markAllAsRead">សម្អាតចេញ</span>
				</div>

				<ul class="noti_list" v-if="notifications.length">
					<li v-for="noti in notifications" :key="noti.noti_id" @click="markAsRead(noti.noti_id)">
						<strong>{{ noti.create_date }}</strong>: {{ noti.message }}
					</li>
				</ul>
				<div class="ocm_dt_empt" v-else>
					<span class="ocm_dti"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="3 1 23 25"><path d="M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z" fill="currentColor"></path><path d="M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z" fill="currentColor"></path></svg></span>
					<span class="ocm_dtdes">គ្មានទិន្នន័យ</span>
				</div>

				
				<div class="noti_foot t-lspace">
					<router-link class="noti_all ocm_base_btn" to="/pdf/notification"><span class="pinfo_i"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" class="icon "> <path d="M14.9997 19C14.9997 20.6569 13.6566 22 11.9997 22C10.3429 22 8.99972 20.6569 8.99972 19M13.7962 6.23856C14.2317 5.78864 14.4997 5.17562 14.4997 4.5C14.4997 3.11929 13.3804 2 11.9997 2C10.619 2 9.49972 3.11929 9.49972 4.5C9.49972 5.17562 9.76772 5.78864 10.2032 6.23856M17.9997 11.2C17.9997 9.82087 17.3676 8.49823 16.2424 7.52304C15.1171 6.54786 13.591 6 11.9997 6C10.4084 6 8.8823 6.54786 7.75708 7.52304C6.63186 8.49823 5.99972 9.82087 5.99972 11.2C5.99972 13.4818 5.43385 15.1506 4.72778 16.3447C3.92306 17.7056 3.5207 18.3861 3.53659 18.5486C3.55476 18.7346 3.58824 18.7933 3.73906 18.9036C3.87089 19 4.53323 19 5.85791 19H18.1415C19.4662 19 20.1286 19 20.2604 18.9036C20.4112 18.7933 20.4447 18.7346 20.4629 18.5486C20.4787 18.3861 20.0764 17.7056 19.2717 16.3447C18.5656 15.1506 17.9997 13.4818 17.9997 11.2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg></span>មើលទាំងអស់</router-link>
				</div>
			</div>
			</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
// import axios from "axios"; // API disabled - not in use yet
import { useRouter } from "vue-router";

const router = useRouter();
const user = JSON.parse(localStorage.getItem("user"));
const userId = user ? user.id : 0;
const notifications = ref([]);

const isPopoverActive = ref(false);

// Function to toggle only the clicked popover
const togglePopover = (event) => {
  event.stopPropagation(); // Prevent bubbling

  // Get the clicked element
  const target = event.currentTarget;
  const popContent = target.nextElementSibling; // Get the sibling `.pop_content`

  // Toggle its classes
  popContent.classList.toggle('pshow');
  target.classList.toggle('pover_ac');

  // Close all other popovers
  document.querySelectorAll('.pop_content').forEach((el) => {
    if (el !== popContent) {
      el.classList.remove('pshow');
      el.previousElementSibling.classList.remove('pover_ac');
    }
  });
};

// Close popovers when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.ocm_pover_wr')) {
    document.querySelectorAll('.pop_content').forEach((el) => {
      el.classList.remove('pshow');
      el.previousElementSibling.classList.remove('pover_ac');
    });
  }
};

// Fetch notifications
const fetchNotifications = async () => {
  // API disabled - not in use yet
  // try {
  //   const response = await axios.get(`http://localhost/content_egg/wp-json/api/user-notifications/${userId}`);
  //   notifications.value = response.data;
  // } catch (error) {
  //   console.error("Error fetching notifications:", error);
  // }
  notifications.value = []; // Return empty array
};

// Mark all as read
const markAllAsRead = async () => {
  // API disabled - not in use yet
  // try {
  //   await axios.post(`http://localhost/content_egg/wp-json/api/mark-all-read/${userId}`);
  //   fetchNotifications(); // Refresh notifications after marking as read
  // } catch (error) {
  //   console.error("Error marking all notifications as read:", error);
  // }
  fetchNotifications(); // Refresh notifications after marking as read
};

// Mark notification as read & navigate
const markAsRead = async (noti_id) => {
  // API disabled - not in use yet
  // try {
  //   await axios.post(`http://localhost/content_egg/wp-json/api/update-notification/${noti_id}`);
  //   router.push("/allnotification"); // Navigate to AllNotification page
  // } catch (error) {
  //   console.error("Error updating notification:", error);
  // }
  router.push("/allnotification"); // Navigate to AllNotification page
};

// Listen for clicks outside
onMounted(() => {
  fetchNotifications();
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
