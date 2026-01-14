<template>
  <tr>
    <td>{{ index }}</td>

    <td>
      <span class="jl_tbl_w">
        <span class="ocm_docfw">
          <span class="ocm_docf d-flex flex-column align-items-center">
            PDF
          </span>
          {{ doc.size }}
        </span>

        <span class="jl_tbl_c">
          <span class="tb_n1 bold ellip-2">{{ doc.title }}</span>
          <span class="tb_n1 fs-95">លិខិតលេខ: {{ doc.code }}</span>
        </span>
      </span>
    </td>

    <td>
      <span class="jl_tbl_w jl_mins">
        <span class="jl_tbl_img">
          <img :src="doc.creatorAvatar" />
        </span>
        <span class="jl_tbl_c bold">{{ doc.creator }}</span>
      </span>
    </td>

    <td>{{ doc.date }}</td>

    <td>
      ឯកសារដល់:<br />
      <span class="bold">{{ doc.target }}</span>
    </td>

    <td>
      <span class="ocm_status" :class="statusClass">
        {{ statusText }}
      </span>
    </td>

    <td class="tbl_action">
      <!-- your action icons stay exactly the same -->
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  doc: Object,
  index: Number
})

const statusMap = {
  pending: { text: 'មិនទាន់អនុម័ត', class: '' },
  approved: { text: 'អនុម័តរួច', class: 'acapr' },
  declined: { text: 'មិនយល់ព្រម', class: 'acdecl' }
}

const statusText = statusMap[props.doc.status].text
const statusClass = statusMap[props.doc.status].class
</script>
