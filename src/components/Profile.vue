<template>
	<div class="ocm_pover_wr">
	  <div class="ocm_profile ocm_pover" @click="togglePopover">
		<span class="avtar"><img :src="user.avatar_url" /></span>
		<span>{{ user.countesy.name }}<br><b class="moul fs-90">{{ user.lastname }} {{ user.firstname }}</b></span>
	  </div>
	  <div class="pop_content">
		<ul class="pinfo_list">
		  <li><router-link class="pinfo_pro" to="/pdf/profile">
			<span class="pinfo_i"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 496 512"><path d="M248 104c-53 0-96 43-96 96s43 96 96 96s96-43 96-96s-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248s248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4c14.9-23 40.4-38.6 69.6-39.5c20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5c-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9c-10.2 0-26 9.6-57.6 9.6c-31.5 0-47.4-9.6-57.6-9.6c-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z" fill="currentColor"></path></svg></span>
			ព័ត៌មានផ្ទាល់ខ្លួន</router-link>
		</li>
		  <li><router-link class="pinfo_noti" to="/pdf/notification">
			<span class="pinfo_i"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" class="icon "> <path d="M14.9997 19C14.9997 20.6569 13.6566 22 11.9997 22C10.3429 22 8.99972 20.6569 8.99972 19M13.7962 6.23856C14.2317 5.78864 14.4997 5.17562 14.4997 4.5C14.4997 3.11929 13.3804 2 11.9997 2C10.619 2 9.49972 3.11929 9.49972 4.5C9.49972 5.17562 9.76772 5.78864 10.2032 6.23856M17.9997 11.2C17.9997 9.82087 17.3676 8.49823 16.2424 7.52304C15.1171 6.54786 13.591 6 11.9997 6C10.4084 6 8.8823 6.54786 7.75708 7.52304C6.63186 8.49823 5.99972 9.82087 5.99972 11.2C5.99972 13.4818 5.43385 15.1506 4.72778 16.3447C3.92306 17.7056 3.5207 18.3861 3.53659 18.5486C3.55476 18.7346 3.58824 18.7933 3.73906 18.9036C3.87089 19 4.53323 19 5.85791 19H18.1415C19.4662 19 20.1286 19 20.2604 18.9036C20.4112 18.7933 20.4447 18.7346 20.4629 18.5486C20.4787 18.3861 20.0764 17.7056 19.2717 16.3447C18.5656 15.1506 17.9997 13.4818 17.9997 11.2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg></span>
			ការជូនដំណឹង</router-link></li>
		  <li><router-link class="pinfo_fedb" to="/pdf/feedback">
			<span class="pinfo_i"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="2 2 16 16"><g fill="none"><path d="M2 10a8 8 0 1 1 4.262 7.075l-3.64.91a.5.5 0 0 1-.607-.606l.91-3.641A7.968 7.968 0 0 1 2 10zm7.25-2.693C9.403 7.134 9.64 7 10 7s.597.134.75.307c.161.184.25.438.25.693c0 .317-.071.523-.166.685c-.101.174-.236.314-.423.51l-.022.024c-.189.197-.421.444-.598.781c-.18.346-.291.761-.291 1.293a.5.5 0 1 0 1 0c0-.384.077-.638.177-.829c.105-.2.248-.359.434-.554l.042-.043c.17-.177.382-.398.545-.678c.186-.32.302-.7.302-1.189c0-.473-.161-.97-.5-1.354C11.153 6.252 10.64 6 10 6s-1.153.252-1.5.646C8.16 7.031 8 7.526 8 8a.5.5 0 0 0 1 0c0-.255.089-.51.25-.693zm1.45 6.206a.7.7 0 1 0-1.4 0a.7.7 0 0 0 1.4 0z" fill="currentColor"></path></g></svg></span>
			ផ្តល់មតិកែលម្អ</router-link></li>
		  <li><router-link class="pinfo_ask" to="/pdf/help">
			<span class="pinfo_i"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="32 32 448 448"><path d="M256 32C132.29 32 32 132.29 32 256s100.29 224 224 224s224-100.29 224-224S379.71 32 256 32zm-64 224a64 64 0 1 1 64 64a64 64 0 0 1-64-64zm237.24-62.29L342.91 199a104.86 104.86 0 0 0-29.86-29.86l5.24-86.33a185 185 0 0 1 111 111zm-303.35-67.82a183.44 183.44 0 0 1 67.82-43.13l5.29 86.33A104.86 104.86 0 0 0 169.09 199l-86.33-5.24a183.44 183.44 0 0 1 43.13-67.87zm-43.13 192.4l86.33-5.24A104.86 104.86 0 0 0 199 342.91l-5.24 86.33a185 185 0 0 1-111-110.95zm303.35 67.82a183.44 183.44 0 0 1-67.82 43.13l-5.24-86.33a104.86 104.86 0 0 0 29.86-29.86l86.33 5.24a183.44 183.44 0 0 1-43.13 67.82z" fill="currentColor"></path></svg></span>
			សុំជំនួយ</router-link></li>
		  <li><router-link class="pinfo_about" to="/pdf/about">
			<span class="pinfo_i"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="1 1 10 10"><g fill="none"><path d="M11 6A5 5 0 1 1 1 6a5 5 0 0 1 10 0zm-5.5.5V8a.5.5 0 0 0 1 0V6.5a.5.5 0 0 0-1 0zM6 3.75a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5z" fill="currentColor"></path></g></svg></span>
			អំពីប្រព័ន្ធកម្មវិធី</router-link></li>
		  <li><span class="pinfo_out" href="#" @click="logout">
			<span class="pinfo_i"><svg version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" enable-background="new 0 0 512 512" xml:space="preserve" viewBox="48 48 416 416"><g><g><g><path d="M192,277.4h189.7l-43.6,44.7L368,352l96-96l-96-96l-31,29.9l44.7,44.7H192V277.4z"></path></g></g><g><path d="M255.7,421.3c-44.1,0-85.5-17.2-116.7-48.4c-31.2-31.2-48.3-72.7-48.3-116.9c0-44.1,17.2-85.7,48.3-116.9 			c31.2-31.2,72.6-48.4,116.7-48.4c44,0,85.3,17.1,116.5,48.2l30.3-30.3c-8.5-8.4-17.8-16.2-27.7-23.2C339.7,61,298.6,48,255.7,48 			C141.2,48,48,141.3,48,256s93.2,208,207.7,208c42.9,0,84-13,119-37.5c10-7,19.2-14.7,27.7-23.2l-30.2-30.2 			C341.1,404.2,299.7,421.3,255.7,421.3z"></path><rect x="447.4" y="255.4" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 583.767 753.7971)" width="1.2" height="1.2"></rect></g></g></svg></span>
			ចាកចេញ</span></li>
		</ul>
	  </div>
	</div>
  </template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const user = ref({
  avatar_url: '',
  firstname: '',
  lastname: '',
  countesy: { name: '' }
});

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

// Listen for clicks outside
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const logout = () => {
      localStorage.removeItem('upload_max_filesize'); // Remove token from localStorage
      localStorage.removeItem('token'); // Remove token from localStorage
      localStorage.removeItem('user'); // Remove token from localStorage
      window.location.href = '/'; // Redirect to login page
};
</script>
