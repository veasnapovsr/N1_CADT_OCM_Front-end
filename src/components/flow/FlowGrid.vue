<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  documents: {
    type: Array,
    required: true
  },
  deletingId: {
    type: [Number, String],
    default: null
  }
})

const emit = defineEmits(['delete'])
const router = useRouter()

/* ================= ACTIONS ================= */
const goToDetail = (doc) => {
  router.push({
    name: 'pdf-documents-detail',
    params: { id: doc.id }
  })
}

const goToEdit = (doc) => {
  router.push({
    name: 'pdf-documents-edit',
    params: { id: doc.id }
  })
}

const deleteDoc = (doc) => {
  if (doc?.status === 'approved') return
  emit('delete', doc)
}

/* ================= STATUS ================= */
const statusText = (s) => ({
  pending: 'មិនទាន់អនុម័ត',
  approved: 'អនុម័តរួច',
  rejected: 'មិនយល់ព្រម',
  draft: 'ឯកសារព្រាង'
}[s])

const statusClass = (s) => ({
  pending: 'acpending',
  approved: 'acapr',
  rejected: 'acdecl',
  draft: 'acdraft'
}[s])
</script>

<template>
  <div class="mt-20 mb-20">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">

      <!-- IMPORTANT: use props.documents -->
      <div
        v-for="doc in documents"
        :key="doc.id"
        class="bg-(--ocm-app-bg) border border-(--ocm-app-border)
               rounded-md overflow-hidden hover:shadow-md transition
               cursor-pointer relative"
        @click="goToDetail(doc)"
      >

        <!-- PREVIEW -->
        <div class="relative bg-white-100 h-56 flex items-center justify-center">

          <!-- STATUS -->
          <span
            class="ocm_status ocm_statusgd"
            :class="statusClass(doc.status)"
          >
            {{ statusText(doc.status) }}
          </span>

          <!-- MENU -->
          <div class="absolute top-3 right-3 z-10" @click.stop>
            <div class="relative group overflow-hidden"></div>
            <div class="relative group">

              <!-- BIG HITBOX -->
              <button
                class="w-10 h-10 flex items-center justify-center
                       rounded-md hover:bg-gray-200 transition"
              >
                ⋮
              </button>

              <!-- DROPDOWN -->
              <div
                class="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg
                       opacity-0 pointer-events-none
                       group-hover:opacity-100 group-hover:pointer-events-auto"
                style="top: 2.5rem;"
              >
               <button
  class="row_ac_in ocm-tooltip ocm-edac d-flex w-full px-3 py-2 gap-2 items-center hover:bg-gray-100"
  @click.stop="goToDetail(doc)"
>

                  <!-- EYE ICON -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="76.03 186 871.95 652"
                    width="14"
                    height="14"
                    fill="currentColor"
                  >
                    <path d="M396 512a112 112 0 1 0 224 0a112 112 0 1 0-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3c7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176s176 78.8 176 176s-78.8 176-176 176z"/>
                  </svg>

                  <span>បង្ហាញឯកសារ</span>
                </button>


<button
  class="row_ac_in ocm-tooltip ocm-edac d-flex w-full px-3 py-2 gap-2 items-center hover:bg-gray-100"
  :class="{ 'opacity-50 pointer-events-none': doc.status === 'approved' }"
  @click.stop="goToEdit(doc)"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="3 1.88 19.12 19.12"
    width="14"
    height="14"
  >
    <g
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M9 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3"/>
      <path d="M9 15h3l8.5-8.5a1.5 1.5 0 0 0-3-3L9 12v3"/>
      <path d="M16 5l3 3"/>
    </g>
  </svg>

  <span>កែឯកសារ</span>
</button>


<button
  class="row_ac_in ocm-tooltip ocm-rmac d-flex w-full px-3 py-2 gap-2 items-center hover:bg-red-50 text-red-600"
  :class="{ 'opacity-50 pointer-events-none': doc.status === 'approved' || deletingId === doc.id }"
  :disabled="deletingId === doc.id"
  @click.stop="deleteDoc(doc)"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    width="14"
    height="14"
    fill="currentColor"
  >
    <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/>
  </svg>

  <span>លុបឯកសារ</span>
</button>

              </div>
            </div>
          </div>

          <!-- PDF PREVIEW -->
          <img
            src="/src/assets/pdf-preview3.png"
            alt="preview"
            class="h-full object-contain p-4"
          />
        </div>

        <!-- CONTENT -->
        <div class="p-4 space-y-3 border-t border-t-(--ocm-app-border)">
          <div class="flex gap-2 mb-10">
            <p class="text-sm font-semibold line-clamp-2">
              {{ doc.title }}
            </p>
          </div>

          <div class="flex items-center gap-2 text-sm">
            <img
              :src="doc.creatorAvatar"
              class="w-7 h-7 rounded-full object-cover"
            />
            <span class="text-blue-600 truncate">
              {{ doc.creator }}
            </span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
