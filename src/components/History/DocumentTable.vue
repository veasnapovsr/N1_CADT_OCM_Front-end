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
          v-for="(doc, index) in paginatedDocuments"
          :key="doc.id"
          :doc="doc"
          :index="index"
          :display-index="(currentPage - 1) * itemsPerPage + index + 1"
        />
      </tbody>
    </table>
  </div>

  <!-- Pagination Section (sticky like SystemLogs) -->
  <div class="pagination_w logs_pagination_bar">
    <div class="pagination">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="['nav_i', 'page', { current: currentPage === page }]"
      >
        {{ formatKhmerNumber(page) }}
      </button>
      <button
        class="next nav_i"
        :disabled="currentPage === totalPages"
        @click="currentPage < totalPages && goToPage(currentPage + 1)"
      >
        បន្ទាប់
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 37.65 448.05 436.7"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" fill="currentColor"></path></svg>
      </button>
    </div>
    <span class="ocm_count t-lspace">
      ចំនួន ឯកសារ៖ {{ formatKhmerNumber(documents.length) }}
    </span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DocumentRow from '@/components/DocumentRowTable.vue'

// Sample data for documents
const documents = [
  { id: 1, folderId: 1, title: 'សេចក្ដីជូនដំណឹងអំពីការប្រជុំគណៈកម្មការ', size: '3.5MB', owner: 'អគ្គនាយក', department: 'នាយកដ្ឋានផែនការ', date: '១៩-០១-២០២៦', status: 'Progressing' },
  { id: 2, folderId: 2, title: 'សេចក្ដីរាយការណ៍សង្ខេបលទ្ធផលការងារ', size: '3.5MB', owner: 'អគ្គនាយករង', department: 'នាយកដ្ឋានហិរញ្ញវត្ថុ', date: '១៨-០១-២០២៦', status: 'Rejected' },
  { id: 3, folderId: 1, title: 'ផែនការអភិវឌ្ឍធនធានមនុស្ស', size: '3.5MB', owner: 'អគ្គនាយក', department: 'នាយកដ្ឋានរដ្ឋបាល', date: '១៧-០១-២០២៦', status: 'Approved' },
  { id: 4, folderId: 3, title: 'សេចក្ដីរាយការណ៍សង្ខេបលទ្ធផលការងារ ២', size: '4MB', owner: 'មន្ត្រីរាជការ', department: 'នាយកដ្ឋានបច្ចេកវិទ្យា', date: '១៦-០១-២០២៦', status: 'Pending' },
  { id: 5, folderId: 2, title: 'អនុសាសន៍សំខាន់', size: '2.8MB', owner: 'អគ្គនាយក', department: 'នាយកដ្ឋានរដ្ឋបាល', date: '១៥-០១-២០២៦', status: 'Rejected' },
  { id: 6, folderId: 1, title: 'ផែនការអភិវឌ្ឍខ្លាំង', size: '5MB', owner: 'សេចក្ដីរាយការណ៍', department: 'នាយកដ្ឋានផែនការ', date: '១៤-០១-២០២៦', status: 'Approved' },
  { id: 7, folderId: 4, title: 'ផែនការអភិវឌ្ឍសុខភាព', size: '3MB', owner: 'អគ្គនាយក', department: 'នាយកដ្ឋានសុខភាព', date: '១៣-០១-២០២៦', status: 'Progressing' },
  { id: 8, folderId: 3, title: 'ការប្រជុំស្តីអំពីវិស័យសង្គម', size: '3.2MB', owner: 'មន្ត្រីរាជការ', department: 'នាយកដ្ឋានសង្គម', date: '១២-០១-២០២៦', status: 'Pending' },
  { id: 9, folderId: 2, title: 'របាយការណ៍ប្រចាំខែ', size: '2.6MB', owner: 'ជាអ្នកគ្រប់គ្រង', department: 'នាយកដ្ឋានគ្រប់គ្រង', date: '១១-០១-២០២៦', status: 'Rejected' },
  { id: 10, folderId: 4, title: 'ផែនការអភិវឌ្ឍការងារ', size: '6MB', owner: 'ឯកសារផ្នែកបច្ចេកវិទ្យា', department: 'នាយកដ្ឋានបច្ចេកវិទ្យា', date: '១០-០១-២០២៦', status: 'Approved' },
  { id: 11, folderId: 1, title: 'របាយការណ៍អត្រាប្រមូលពន្ធ', size: '4.2MB', owner: 'មន្ត្រីអាករ', department: 'នាយកដ្ឋានអាករ', date: '០៩-០១-២០២៦', status: 'Pending' },
  { id: 12, folderId: 3, title: 'សេចក្ដីជូនដំណឹង', size: '3MB', owner: 'បុគ្គលិកគ្រប់គ្រង', department: 'នាយកដ្ឋានប្រតិបត្តិការ', date: '០៨-០១-២០២៦', status: 'Approved' },
  { id: 13, folderId: 4, title: 'ការផ្តល់ការសិក្សាផ្ទាល់', size: '5.5MB', owner: 'ជាអ្នកបណ្ដុះបណ្ដាល', department: 'នាយកដ្ឋានសិក្សា', date: '០៧-០១-២០២៦', status: 'Rejected' },
  { id: 14, folderId: 5, title: 'ការប្រជុំស្តីពីការអភិវឌ្ឍទីក្រុង', size: '2.5MB', owner: 'អគ្គនាយក', department: 'នាយកដ្ឋានទីក្រុង', date: '០៦-០១-២០២៦', status: 'Progressing' },
  { id: 15, folderId: 2, title: 'ការសន្និដ្ឋានទីតាំងបច្ចេកវិទ្យា', size: '4.3MB', owner: 'អគ្គនាយក', department: 'នាយកដ្ឋានបច្ចេកវិទ្យា', date: '០៥-០១-២០២៦', status: 'Approved' },
  { id: 16, folderId: 3, title: 'សេចក្ដីជូនដំណឹងការប្រជុំលម្អិត', size: '3.8MB', owner: 'មន្ត្រីរាជការ', department: 'នាយកដ្ឋានសង្គម', date: '០៤-០១-២០២៦', status: 'Pending' },
  { id: 17, folderId: 1, title: 'ការផ្តល់ជូននូវការសិក្សា', size: '5.2MB', owner: 'អគ្គនាយក', department: 'នាយកដ្ឋានសិក្សា', date: '០៣-០១-២០២៦', status: 'Rejected' },
  { id: 18, folderId: 5, title: 'ការចាប់ផ្តើមគម្រោងអភិវឌ្ឍទីក្រុង', size: '7.5MB', owner: 'អគ្គនាយក', department: 'នាយកដ្ឋានទីក្រុង', date: '០២-០១-២០២៦', status: 'Approved' },
  { id: 19, folderId: 4, title: 'ការសិក្សាអភិវឌ្ឍសុខភាព', size: '3.7MB', owner: 'ជាអ្នកគ្រប់គ្រង', department: 'នាយកដ្ឋានសុខភាព', date: '០១-០១-២០២៦', status: 'Pending' },
  { id: 20, folderId: 3, title: 'ការសន្និដ្ឋានករណីគ្រប់គ្រង', size: '5MB', owner: 'អគ្គនាយក', department: 'នាយកដ្ឋានគ្រប់គ្រង', date: '៣០-១២-២០២៥', status: 'Progressing' }
];


// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(20) // Display 20 rows per page

const totalPages = computed(() => {
  return Math.ceil(documents.length / itemsPerPage.value)
})

const paginatedDocuments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return documents.slice(start, end)
})

// Methods for page navigation
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Method to format Khmer numbers
const formatKhmerNumber = (number) => {
  const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩']
  return number.toString().split('').map(digit => khmerDigits[parseInt(digit)] || digit).join('')
}
</script>

<style scoped>
/* Pagination Styling */
.pagination_w {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 1rem;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav_i svg {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.logs_pagination_bar {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 5px;
  padding-bottom: 20px;
  background-color: #f7f8f9;
  z-index: 5;
}
</style>
