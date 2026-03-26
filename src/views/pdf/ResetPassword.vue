<template>
  <div class="login login-action-login">
    <div id="login">
      <h1 role="presentation" class="wp-login-logo">
        <img src="../../assets/logo_main.svg" />
      </h1>

      <h2 class="t-lspace bold">
        កម្មវិធីបរិវត្តកម្មឌីជីថលទីស្តីការគណៈរដ្ឋមន្ត្រី
      </h2>

      <!-- New Password Form -->
      <form @submit.prevent="handleResetPassword">
        <div class="input-wrapper mb-15">
          <input
            id="new_password"
            class="input form-control"
            v-model="newPassword"
            type="password"
            placeholder="ពាក្យសម្ងាត់ថ្មី"
            required
          />
        </div>
        <div class="input-wrapper mb-15">
          <input
            id="confirm_password"
            class="input form-control"
            v-model="confirmPassword"
            type="password"
            placeholder="បញ្ជាក់ពាក្យសម្ងាត់ថ្មី"
            required
          />
        </div>
        <button type="submit" class="button button-primary button-large w-full mt-2">
          ប្តូរពាក្យសម្ងាត់
        </button>
      </form>
      <div v-if="message" class="mt-4 text-green-600 text-center">{{ message }}</div>
       <div class="mt-4 text-right hover:underline">
        <router-link to="/login" class="text-blue-500 hover:underline">ត្រឡប់ទៅទំព័រចូល</router-link>
      </div>
    </div>
  </div>

  <footer class="ocm_footer login_ac">
    រក្សាសិទ្ធិគ្រប់យ៉ាងដោយទីស្តីការគណៈរដ្ឋមន្ត្រី
  </footer>
</template>

<script>
import { ref } from "vue"

export default {
  name: "ResetPassword",
  setup() {
    const newPassword = ref("")
    const confirmPassword = ref("")
    const message = ref("")

    const handleResetPassword = () => {
      if (newPassword.value !== confirmPassword.value) {
        message.value = "ពាក្យសម្ងាត់មិនត្រូវគ្នា"
        return
      }
      // TODO: Replace with real API call
      message.value = "ប្តូរពាក្យសម្ងាត់បានជោគជ័យ។"
    }

    return {
      newPassword,
      confirmPassword,
      message,
      handleResetPassword
    }
  }
}
</script>

<style scoped>
</style>
