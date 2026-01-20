<template>
  <Header title="លំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
  <section class="appppw">
  <Aside />
  <div class="sw">
    <div class="flex flex-col gap-3">

      <h1 class="text-2xl ">បណ្ណសារឯកសារ</h1>
      <h3 class=" bold">folder</h3>
      <FolderCompo/>
      <DocumentTable/>

    </div>
  <Footer />
</div>
</section>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
import FolderCompo from '@/components/History/FolderCompo.vue';
import DocumentTable from '@/components/History/DocumentTable.vue';
</script>