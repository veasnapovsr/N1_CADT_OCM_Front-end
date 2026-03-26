<template>
  <div class="login login-action-login">
    <div id="login">
      <h1 role="presentation" class="wp-login-logo">
        <img src="../../assets/logo_main.svg" />
      </h1>

      <h2 class="t-lspace bold">
        កម្មវិធីបរិវត្តកម្មឌីជីថលទីស្តីការគណៈរដ្ឋមន្ត្រី
      </h2>

      <!-- 6 Digit Code Verification Form -->
      <form @submit.prevent="handleVerifyCode">
        <div class="input-wrapper mb-15">
          <input
            id="verification_code"
            class="input form-control text-center tracking-widest text-lg"
            v-model="code"
            type="text"
            maxlength="6"
            pattern="[0-9]{6}"
            autocomplete="one-time-code"
            placeholder="បញ្ចូលលេខកូដ ៦ ខ្ទង់"
            required
          />
        </div>
        <button type="submit" class="button button-primary button-large w-full mt-2">
          ផ្ញើលេខកូដ
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
import { useRouter } from "vue-router"

export default {
  name: "VerifyCode",
  setup() {
    const code = ref("")
    const message = ref("")
    const router = useRouter()

    const handleVerifyCode = () => {
      if (!/^[0-9]{6}$/.test(code.value)) {
        message.value = "សូមបញ្ចូលលេខកូដ ៦ ខ្ទង់ត្រឹមត្រូវ"
        return
      }
      // TODO: Replace with real API call
      // On success, redirect to new password page
      router.push("/reset-password")
    }

    return {
      code,
      message,
      handleVerifyCode
    }
  }
}
</script>

<style scoped>
</style>
