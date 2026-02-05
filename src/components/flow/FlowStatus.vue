<template>
  <div class="ocm_bfw ocm_stat">
    <div
      v-for="(item, i) in stats"
      :key="i"
      class="ocm_caw noneh"
      :class="item.class"
    >
      <div class="ocm_card_body">
        <div class="ocm_icardw">
          <h5 class="ocm_card_value">{{ item.value }}</h5>
          <div class="ocm_icard">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
          </div>
        </div>
        <p class="ocm_card_title">{{ item.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    required: true
  }
})
</script>
