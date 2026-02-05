<template>
  <button 
    v-show="showButton" 
    class="scroll-top-btn flex items-center justify-center" 
    @click="scrollToTop"
  >
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="3.75 3.75 16.5 16.5"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 5v14m7-7l-7-7l-7 7"></path></svg>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showButton = ref(false);

const handleScroll = () => {
  showButton.value = window.scrollY > window.innerHeight * 0.7;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
.scroll-top-btn {
  position: fixed;
  width: 30px;
  height: 30px;
  bottom: 10px;
  right: 10px;
  background: var(--ocm-sec-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;  
  z-index: 9;
}
.scroll-top-btn svg{
  width: .65em;
  height: 100%;
}
</style>