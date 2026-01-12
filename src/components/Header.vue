<template>
	<header class="ocm_head ocmapp_hd">
	  <HeaderLogo />
	  <HeaderAppTitle :title="title" />
    <HeaderMenu />
	</header>
  </template>
  
  <script setup>
  import HeaderLogo from '@/components/HeaderLogo.vue'
  import HeaderAppTitle from '@/components/HeaderAppTitle.vue'
  import HeaderMenu from '@/components/HeaderMenu.vue'
  
  defineProps({
	title: String
  })
  </script>