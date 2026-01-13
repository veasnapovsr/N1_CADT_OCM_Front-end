<template>
  <div class="login login-action-login">
    <div id="login">
      <h1 role="presentation" class="wp-login-logo">
        <img src="../assets/logo_main.svg" />
      </h1>

      <h2 class="t-lspace bold">
        កម្មវិធីបរិវត្តកម្មឌីជីថលទីស្តីការគណៈរដ្ឋមន្ត្រី
      </h2>

      <!-- Email -->
      <div class="input-wrapper">
        <input
          id="user_login"
          class="input"
          v-model="email"
          type="text"
          autocomplete="off"
          placeholder="ឈ្មោះអ្នកប្រើប្រាស់"
          @keyup.enter="login"
        />
        <div class="prefix">
          <!-- mail icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.6" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15
                 a2.25 2.25 0 0 1-2.25-2.25V6.75
                 A2.25 2.25 0 0 1 4.5 4.5h15
                 A2.25 2.25 0 0 1 21.75 6.75Z" />
          </svg>
        </div>
      </div>

      <!-- Password -->
      <div class="input-wrapper">
        <input
          id="user_pass"
          class="input password-input"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="លេខសំងាត់"
          @keyup.enter="login"
        />

        <div class="prefix">
          <!-- lock icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.6" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75" />
          </svg>
        </div>

        <!-- Show / Hide Password -->
        <div
          class="prefix pre_end showpass"
          @click="togglePassword"
          style="cursor: pointer"
        >
          <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 24 24" stroke-width="2"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3 3l18 18M10.5 10.5a3 3 0 0 0 4.24 4.24" />
          </svg>

          <svg v-else xmlns="http://www.w3.org/2000/svg"
               viewBox="1 4 22 16" fill="none"
               stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="2" />
            <path d="M22 12c-2.667 4.667-6 7-10 7
                     s-7.333-2.333-10-7
                     c2.667-4.667 6-7 10-7
                     s7.333 2.333 10 7" />
          </svg>
        </div>
      </div>

      <p class="forgetmenot">
        <input type="checkbox" id="rememberme" />
        <label for="rememberme">ចងចាំគណនីខ្ញុំ</label>
      </p>

      <!-- Login Button -->
      <button
        id="wp-submit"
        class="button button-primary button-large"
        @click="login"
      >
        ចូលប្រព័ន្ធ
      </button>
    </div>
  </div>

  <footer class="ocm_footer login_ac">
    រក្សាសិទ្ធិគ្រប់យ៉ាងដោយទីស្តីការគណៈរដ្ឋមន្ត្រី
  </footer>
</template>

<script>
import { ref, onMounted } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
import { toast } from "vue-sonner"

export default {
  setup() {
    const email = ref("")
    const password = ref("")
    const showPassword = ref(false)
    const router = useRouter()

    // Redirect if already logged in
    onMounted(() => {
      const token = localStorage.getItem("token")
      if (token) {
        router.push("/dashboard")
      }
    })

    const login = async () => {
      if (!email.value || !password.value) {
        toast.error("ព័ត៌មានមិនគ្រប់គ្រាន់", {
          description: "សូមបញ្ចូលឈ្មោះអ្នកប្រើ និងពាក្យសម្ងាត់"
        })
        return
      }

      try {
        const response = await axios.post(
          "http://10.11.11.68:8001/api/authcenter/authentication/login",
          {
            email: email.value,
            password: password.value
          }
        )

        const { token, record, upload_max_filesize } = response.data

        localStorage.setItem("token", JSON.stringify(token))
        localStorage.setItem("user", JSON.stringify(record))
        localStorage.setItem("upload_max_filesize", upload_max_filesize)

        toast.success("ចូលប្រព័ន្ធបានជោគជ័យ")

        router.push("/dashboard")
      } catch (err) {
        const apiMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          null

        if (err.response?.status === 401) {
          toast.error("ចូលប្រព័ន្ធបរាជ័យ", {
            description: apiMessage || "Unauthorized"
          })
        } else if (apiMessage) {
          toast.error("បញ្ហាប្រព័ន្ធ", {
            description: apiMessage
          })
        } else {
          toast.error("បញ្ហាប្រព័ន្ធ", {
            description: "សូមព្យាយាមម្ដងទៀតនៅពេលក្រោយ"
          })
        }
      }
    }

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    return {
      email,
      password,
      login,
      showPassword,
      togglePassword
    }
  }
}
</script>
