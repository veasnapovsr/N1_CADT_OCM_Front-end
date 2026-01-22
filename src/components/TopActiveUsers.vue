<template>
  <div>

    <div class="ocm_tb_wrap shadow-right mb-30" style="width: 100%;">
      <table class="wp-list-table widefat striped" style="width: 100%;">
        <thead>
          <tr>
            <th class="t-lspace" style="width: 40px;">#</th>
            <th class="t-lspace" style="width: 60px;">រូបភាព</th>
            <th class="t-lspace">ឈ្មោះ</th>
            <th class="t-lspace" style="width: 80px;">ចំនួន</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(user, idx) in users" :key="user.name">
            <td>{{ idx + 1 }}</td>

            <td>
              <span class="jl_tbl_img">
                <img
                  :src="user.img || 'https://ui-avatars.com/api/?name=' + user.name"
                  :alt="user.name"
                  style="width:32px;height:32px;border-radius:50%;"
                />
              </span>
            </td>

            <td>
              <span class="jl_tbl_c">
                <span class="tb_n1 bold fs-95">{{ user.name }}</span>
                <span class="tb_n1 fs-90">អនុរដ្ឋលេខាធិការ</span>
              </span>
            </td>

            <td>
              <span class="fw-bold">{{ user.count }}</span>
            </td>
          </tr>

          <tr v-if="!users.length">
            <td colspan="4" class="text-center py-4">
              មិនមានទិន្នន័យ
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    required: true
  }
})
</script>
