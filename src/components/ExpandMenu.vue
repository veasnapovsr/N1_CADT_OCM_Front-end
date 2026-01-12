<template>
  <div class="app_card app_toggle" @click="toggleSnav" :class="{ 'is-active': isSnavOpen }">
    <span class="apico">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12">
        <g fill="none">
          <path d="M6 1a5 5 0 1 1 0 10A5 5 0 0 1 6 1zm.098 2.646a.5.5 0 0 0 0 .708L7.244 5.5H3.5a.5.5 0 0 0 0 1h3.744L6.098 7.646a.5.5 0 1 0 .707.708l2-2a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.707 0z" fill="currentColor"></path>
        </g>
      </svg>
      <span class="app_txt">បិទបើកម៉ឺនុយ</span>
    </span>
  </div> 
</template>

<script setup>
import { ref, onMounted } from 'vue';
const storedState = localStorage.getItem('app_snav_open');
const isSnavOpen = ref(storedState === null ? true : storedState === 'true');

const toggleSnav = () => {
  isSnavOpen.value = !isSnavOpen.value;
  updateBodyClass();
  localStorage.setItem('app_snav_open', isSnavOpen.value);
};

const updateBodyClass = () => {
  if (isSnavOpen.value) {
    document.body.classList.add('app_snav_open');
  } else {
    document.body.classList.remove('app_snav_open');
  }
};

onMounted(() => {
  updateBodyClass();
});
</script>