<template>
  <table class="wp-list-table widefat striped">
    <thead>
      <tr>
        <th>#</th>
        <th>ឯកសារ</th>
        <th>អ្នកបង្កើត</th>
        <th>កាលបរិច្ឆេទ</th>
        <th>បញ្ជូនដល់</th>
        <th>ស្ថានភាព</th>
        <th>សកម្មភាព</th>
      </tr>
    </thead>

    <tbody>
      <DocumentRow
        v-for="(doc, index) in documents"
        :key="doc.id"
        :doc="doc"
        :index="index"
      />
    </tbody>
  </table>
</template>

<script setup>
import DocumentRow from '@/components/DocumentRow.vue'

defineProps({
  documents: {
    type: Array,
    required: true
  }
})
</script>
