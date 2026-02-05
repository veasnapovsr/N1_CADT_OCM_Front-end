<template>
  <tr>
    <!-- INDEX -->
    <td>{{ formatKhmerNumber(index) }}</td>

    <!-- DOCUMENT INFO -->
    <td>
      <span class="jl_tbl_w cursor-pointer" @click="goToDetail">
        <span class="ocm_docfw">
          <span class="ocm_docf d-flex flex-column align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20"><g fill="none"><path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path></g></svg>
            PDF
          </span>
          {{ doc.size }}
        </span>

        <span class="jl_tbl_c gap-0.5">
          <span class="tb_n1 link bold ellip-2"
              :title="doc.title">
            {{ doc.title }}
          </span>
          <span class="tb_n1 fs-90">
            <span>លិខិតលេខ: {{ doc.code }}</span>            
          </span>
        </span>
      </span>
    </td>

    <!-- CREATOR -->
    <td>
      <span class="jl_tbl_w jl_mins">
        <span class="jl_tbl_img">
          <img :src="doc.creatorAvatar" alt="creator" />
        </span>
        <span class="jl_tbl_c">
          <span class="tb_n1 bold fs-95">{{ doc.creator }}</span>
          <span class="tb_n1 fs-90">{{ doc.position }}</span>
        </span>
      </span>
    </td>

    <!-- DATE -->
    <td>
      {{ formatDateKhmer(doc.date) }}
    </td>

    <!-- SENT TO + TIME AGO -->
    <td>
      {{ sentAgo }}ឯកសារដល់<br />
      <span class="bold">{{ doc.sentTo }}</span><br />
      <small class="fs-95 text-muted">        
      </small>
    </td>

    <!-- STATUS -->
    <td>
      <span class="ocm_status" :class="statusClass">
        {{ statusText }}
      </span>
    </td>

<td class="tbl_action">
  <span class="row_ac_w">
    <span
      class="row_ac_in ocm-tooltip ocm-viac view"
      title="មើលឯកសារ"
      @click="goToDetail"
    >
    <span class="tip_txt">បង្ហាញឯកសារ</span>
    <span class="d-flex"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="76.03 186 871.95 652"><path d="M396 512a112 112 0 1 0 224 0a112 112 0 1 0-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3c7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176s176 78.8 176 176s-78.8 176-176 176z" fill="currentColor"></path></svg></span>
    </span>

    <span
      class="row_ac_in ocm-tooltip ocm-edac edit"
      title="កែប្រែ"
      @click="goToEdit"
      :disabled="doc.status === 'approved'"
    >
    <span class="tip_txt">កែឯកសារ</span>
    <span class="d-flex"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="3 1.88 19.12 19.12"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3"></path><path d="M9 15h3l8.5-8.5a1.5 1.5 0 0 0-3-3L9 12v3"></path><path d="M16 5l3 3"></path></g></svg></span>
    </span>

    <span
      class="row_ac_in ocm-tooltip ocm-rmac delete"
      title="លុប"
      @click="deleteRow"
      :disabled="doc.status === 'approved' || deleting"
    >
    <span class="tip_txt">លុបឯកសារ</span>
    <span class="d-flex"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512"><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" fill="currentColor"></path></svg></span>
    </span>
  </span>
</td>

  </tr>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { formatKhmerNumber, formatDateKhmer } from '@/lib/utils.js'

/* ===================== PROPS ===================== */
const props = defineProps({
  doc: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  deleting: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['delete'])

/* ===================== ROUTER ===================== */
const router = useRouter()

// console.log( props )
/* ===================== ACTIONS ===================== */
const goToDetail = () => {
  router.push( '/pdf/documents-detail/' + parseInt( props.doc.id ) )
  // router.push({
  //   name: 'pdf-documents-detail',
  //   params: { id: props.doc.id } ,
  //   path: '/documents-detail/' + props.doc.id
  // })
}

const goToEdit = () => {
  router.push({
    name: 'pdf-documents-edit',
    params: { id: props.doc.id }
  })
}

const deleteRow = () => {
  if (props.doc?.status === 'approved') return
  emit('delete', props.doc)
}

/* ===================== STATUS MAP ===================== */
const statusMap = {
  pending: {
    text: 'មិនទាន់អនុម័ត',
    class: 'acpending'
  },
  approved: {
    text: 'អនុម័តរួច',
    class: 'acapr'
  },
  rejected: {
    text: 'មិនយល់ព្រម',
    class: 'acdecl'
  },
  draft: {
    text: 'ឯកសារព្រាង',
    class: 'acdraft'
  }
}

/* ===================== STATUS COMPUTED ===================== */
const statusText = computed(() => {
  return statusMap[props.doc.status]?.text || ''
})

const statusClass = computed(() => {
  return statusMap[props.doc.status]?.class || ''
})

/* ===================== SENT AGO ===================== */
const sentAgo = computed(() => {
  if (!props.doc.sentAt) return ''

  const now = new Date()
  const past = new Date(props.doc.sentAt)
  const diffSeconds = Math.floor((now - past) / 1000)

  if (diffSeconds < 60) return `${formatKhmerNumber(diffSeconds)} វិនាទីមុន`

  const minutes = Math.floor(diffSeconds / 60)
  if (minutes < 60) return `${formatKhmerNumber(minutes)} នាទីមុន`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${formatKhmerNumber(hours)} ម៉ោងមុន`

  const days = Math.floor(hours / 24)
  return `${formatKhmerNumber(days)} ថ្ងៃមុន`
})
</script>
