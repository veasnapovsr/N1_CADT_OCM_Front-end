<template>
  <div class="ocm_tb_wrap mb-10 shadow-right">
    <table class="wp-list-table widefat striped">
      <thead>
        <tr>
          <th class="t-lspace" style="width: 40px;">#</th>
          <th class="t-lspace">ចំណងជើងឯកសារ</th>
          <th class="t-lspace" style="width: 230px;">អ្នកបង្កើតឯកសារ</th>
          <th class="t-lspace" style="width: 130px;">កាលបរិច្ឆេទ</th>
          <th class="t-lspace" style="width: 110px;">ស្ថានភាព</th>
          <th class="t-lspace" style="width: 120px;">សកម្មភាព</th>
        </tr>
      </thead>

      <tbody>
        <!-- Loop through the documents array and render rows -->
        <DocumentRow
          v-for="(doc, index) in documents"
          :key="doc.id"
          :doc="doc"
          :index="index"
        />
      </tbody>
    </table>

    <!-- Pagination Section -->
    <div class="pagination_w">
      <div class="pagination">
        <span class="current nav_i">១</span>
        <button class="page nav_i" data-page="2">២</button>
        <button class="next nav_i" data-page="2">
          បន្ទាប់
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 37.65 448.05 436.7">
            <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" fill="currentColor"></path>
          </svg>
        </button>
      </div>
      <span class="ocm_count t-lspace">ចំនួនឯកសារ៖ {{ documents.length }}</span>
    </div>
  </div>
</template>

<script setup>
import DocumentRow from '@/components/DocumentRowTable.vue';

// Sample data for documents
const documents = [
  {
    id: 1,
    folderId: 1,
    title: 'សេចក្ដីជូនដំណឹងអំពីការប្រជុំគណៈកម្មការ',
    size: '3.5MB',
    owner: 'អគ្គនាយក',
    department: 'នាយកដ្ឋានផែនការ',
    date: '១៩-០១-២០២៦',
    status: 'Progressing'
  },
  {
    id: 2,
    folderId: 2,
    title: 'សេចក្ដីរាយការណ៍សង្ខេបលទ្ធផលការងារ',
    size: '3.5MB',
    owner: 'អគ្គនាយករង',
    department: 'នាយកដ្ឋានហិរញ្ញវត្ថុ',
    date: '១៨-០១-២០២៦',
    status: 'rejected'
  },
  {
    id: 3,
    folderId: 1,
    title: 'ផែនការអភិវឌ្ឍធនធានមនុស្ស',
    size: '3.5MB',
    owner: 'អគ្គនាយក',
    department: 'នាយកដ្ឋានរដ្ឋបាល',
    date: '១៧-០១-២០២៦',
    status: 'approved'
  }
];
</script>
