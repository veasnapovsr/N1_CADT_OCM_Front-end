<template>
  <tr>
    <!-- INDEX -->
    <td>{{ displayNumber }}</td>

    <!-- DOCUMENT INFO -->
    <td>
      <span class="jl_tbl_w cursor-pointer">
        <span class="ocm_docfw">
          <span class="ocm_docf d-flex flex-column align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="4 2 16 20">
              <g fill="none">
                <path d="M12 8V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2zm-5 4.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0zm0 3a.75.75 0 0 1 1.5 0a.75.75 0 0 1-1.5 0zm3-6a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM13.5 8V2.5l6 6H14a.5.5 0 0 1-.5-.5z" fill="currentColor"></path>
              </g>
            </svg>
            PDF
          </span>
          {{ doc.size }}
        </span>
        <span class="jl_tbl_c gap-0.5">
          <span class="tb_n1 link bold ellip-2" :title="doc.title">
            {{ doc.title }}
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
          <span class="tb_n1 bold fs-95">{{ doc.owner }}</span> <!-- Using 'owner' as the creator -->
        </span>
      </span>
    </td>

    <!-- DATE -->
    <td>
      {{ doc.date }}
    </td>

    <!-- SENT TO -->
    <td>
      <span class="bold">{{ doc.department }}</span> <!-- Using 'department' as sentTo -->
    </td>

    <!-- STATUS -->
    <td>
      <span :class="['status-pill', statusClass]">{{ statusText }}</span>
    </td>
  </tr>
</template>

<script setup>
// Import computed from Vue
import { computed } from 'vue'

const props = defineProps({
  doc: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  displayIndex: {
    type: Number,
    default: null
  }
})

const displayNumber = computed(() => {
  // Prefer the provided displayIndex (already page-aware) otherwise fallback to local index
  return props.displayIndex ?? props.index + 1
})

// Status class based on the status
const statusClass = computed(() => {
  const status = (props.doc.status || '').toString().toLowerCase()

  if (status === 'approved') {
    return 'status-approved' // Green for approved
  } else if (status === 'progressing') {
    return 'status-progressing' // Yellow for processing
  } else if (status === 'rejected') {
    return 'status-rejected' // Red for rejected
  } else if (status === 'pending') {
    return 'status-pending' // Grey for pending/unknown
  }
  return ''
})

const statusText = computed(() => {
  const status = (props.doc.status || '').toString().toLowerCase()

  if (status === 'approved') {
    return 'អនុម័តរួច'
  } else if (status === 'progressing') {
    return 'ដំណើរការ'
  } else if (status === 'rejected') {
    return 'មិនយល់ព្រម'
  } else if (status === 'pending') {
    return 'កំពុងរង់ចាំ'
  }
  return ''
})
</script>

<style scoped>
.status-pill {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  text-align: center;
}

.status-approved {
  background-color: green; /* Green for approved */
}

.status-progressing {
  background-color: yellow; /* Yellow for Progressing */
  color: black; /* Black text for yellow background */
}

.status-rejected {
  background-color: red; /* Red for rejected */
}

.status-pending {
  background-color: #6b7280; /* Neutral gray for pending/unknown */
}
</style>
