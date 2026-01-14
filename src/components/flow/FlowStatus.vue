<template>
  <div class="ocm_bfw ocm_stat">
    <div
      v-for="(item, i) in stats"
      :key="i"
      class="ocm_caw"
      :class="item.class"
    >
      <div class="ocm_card_body">
        <div class="ocm_icardw">
          <h5 class="ocm_card_value">{{ item.value }}</h5>
          <div class="ocm_icard">
            📄
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
