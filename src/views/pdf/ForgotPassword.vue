<template>
  <div class="login login-action-login">
    <div id="login">
      <h1 role="presentation" class="wp-login-logo">
        <img src="../../assets/logo_main.svg" alt="OCM Logo" />
      </h1>

      <h2 class="t-lspace bold">
        កម្មវិធីបរិវត្តកម្មឌីជីថលទីស្តីការគណៈរដ្ឋមន្ត្រី
      </h2>

      <form v-if="step === 1" class="step1" @submit.prevent="requestReset">
        <div class="input-wrapper mb-15">
          <input
            id="email"
            v-model.trim="email"
            class="input form-control"
            type="email"
            autocomplete="email"
            placeholder="អ៊ីមែល"
            required
            :disabled="loading"
          />
          <div class="prefix">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 6H20C21.1046 6 22 6.89543 22 8V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V8C2 6.89543 2.89543 6 4 6Z"
                stroke="currentColor"
                stroke-width="1.7"
              />
              <path
                d="M22 8L13.03 13.7C12.3928 14.1048 11.6072 14.1048 10.97 13.7L2 8"
                stroke="currentColor"
                stroke-width="1.7"
              />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          class="button button-primary button-large w-full mt-2"
          :disabled="loading"
        >
          {{ loading ? "កំពុងផ្ញើ..." : "ស្នើសុំលេខកូដ" }}
        </button>
      </form>

      <div
        v-if="step === 2"
        class="step2 fixed inset-0 z-50 flex items-center justify-center otp-overlay"
      >
        <div class="otp-card">
          <button
            type="button"
            class="otp-close"
            @click="resetFlow"
            :disabled="loading"
            aria-label="Close"
          >
            ×
          </button>

          <div class="otp-title">បញ្ចូលលេខកូដ ៦ ខ្ទង់</div>
          <div class="otp-subtitle">
            សូមពិនិត្យអ៊ីមែលរបស់អ្នក ហើយបញ្ចូលលេខកូដដែលបានផ្ញើ។
          </div>

          <input
            id="otp"
            v-model.trim="otp"
            class="input form-control text-lg mb-4 otp-input"
            type="text"
            maxlength="6"
            inputmode="text"
            autocomplete="one-time-code"
            placeholder="XXXXXX"
            :disabled="loading"
            @input="normalizeOtp"
          />

          <button
            type="button"
            class="button button-primary w-full"
            @click="verifyOtp"
            :disabled="loading"
          >
            {{ loading ? "កំពុងផ្ទៀងផ្ទាត់..." : "ផ្ទៀងផ្ទាត់លេខកូដ" }}
          </button>

          <button
            type="button"
            class="button button-secondary w-full mt-2"
            @click="requestReset"
            :disabled="loading"
          >
            ផ្ញើលេខកូដម្តងទៀត
          </button>

          <div v-if="otpMessage" class="mt-3 text-center text-red-600">
            {{ otpMessage }}
          </div>
        </div>
      </div>

      <form v-if="step === 3" @submit.prevent="resetPassword">
        <div class="input-wrapper mb-15">
          <input
            id="new_password"
            v-model="newPassword"
            class="input form-control"
            type="password"
            autocomplete="new-password"
            placeholder="ពាក្យសម្ងាត់ថ្មី"
            required
            :disabled="loading"
          />
        </div>

        <div class="input-wrapper mb-15">
          <input
            id="confirm_password"
            v-model="confirmPassword"
            class="input form-control"
            type="password"
            autocomplete="new-password"
            placeholder="បញ្ជាក់ពាក្យសម្ងាត់ថ្មី"
            required
            :disabled="loading"
          />
        </div>

        <button
          type="submit"
          class="button button-primary button-large w-full mt-2"
          :disabled="loading"
        >
          {{ loading ? "កំពុងផ្លាស់ប្ដូរ..." : "ផ្លាស់ប្ដូរពាក្យសម្ងាត់" }}
        </button>
      </form>

      <div v-if="errorMessage" class="mt-4 text-center text-red-600">
        {{ errorMessage }}
      </div>

      <div v-if="successMessage" class="mt-4 text-center text-green-600">
        {{ successMessage }}
      </div>

      <div class="mt-4 text-right hover:underline">
        <router-link to="/login" class="text-blue-500 hover:underline">
          ត្រឡប់ទៅទំព័រចូល
        </router-link>
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
  name: "ForgotPassword",
  setup() {
    const apiServer = import.meta.env.VITE_API_SERVER.replace(/\/$/, "")
    const passwordBaseUrl = `${apiServer}/password`

    const step = ref(1)
    const loading = ref(false)

    const email = ref("")
    const otp = ref("")
    const newPassword = ref("")
    const confirmPassword = ref("")

    const successMessage = ref("")
    const errorMessage = ref("")
    const otpMessage = ref("")

    const isValidEmail = (value) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }

    const clearMessages = () => {
      successMessage.value = ""
      errorMessage.value = ""
      otpMessage.value = ""
    }

    const sensitiveServerErrorPattern =
      /(fopen\(|failed to open stream|no such file or directory|stack trace|exception|sqlstate|syntax error|undefined property|call to undefined|c:\\|\/var\/|\/home\/)/i

    const getSafeErrorMessage = (data, response, fallback) => {
      const message = typeof data?.message === "string" ? data.message.trim() : ""

      if (!message || response.status >= 500 || sensitiveServerErrorPattern.test(message)) {
        return fallback
      }

      return message
    }

    const withHandledPromise = (action, setMessage) => {
      return () => {
        void action().catch(() => {
          loading.value = false
          clearMessages()
          setMessage("ប្រព័ន្ធមានបញ្ហាបណ្តោះអាសន្ន សូមព្យាយាមម្តងទៀត។")
        })
      }
    }

    const normalizeOtp = () => {
      otp.value = otp.value.toUpperCase().replace(/[^0-9A-Z]/g, "").slice(0, 6)
    }

    const parseResponse = async (response) => {
      try {
        return await response.json()
      } catch {
        return {}
      }
    }

    const isSuccessfulResponse = (response, data) => {
      return response.ok && (typeof data?.ok === "undefined" || data.ok)
    }

    const handleRequestReset = async () => {
      clearMessages()

      if (!email.value) {
        errorMessage.value = "សូមបញ្ចូលអ៊ីមែលរបស់អ្នក។"
        return
      }

      if (!isValidEmail(email.value)) {
        errorMessage.value = "សូមបញ្ចូលអ៊ីមែលឱ្យត្រឹមត្រូវ។"
        return
      }

      loading.value = true

      try {
        const response = await fetch(`${passwordBaseUrl}/forgot`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            email: email.value.trim()
          })
        })

        const data = await parseResponse(response)

        if (isSuccessfulResponse(response, data)) {
          step.value = 2
          successMessage.value =
            data.message || "សូមបញ្ចូលលេខកូដដែលបានផ្ញើទៅអ៊ីមែលរបស់អ្នក។"
          return
        }

        errorMessage.value = getSafeErrorMessage(
          data,
          response,
          "មិនអាចស្នើសុំលេខកូដបានទេ។"
        )
      } catch {
        errorMessage.value = "បញ្ហាការភ្ជាប់បណ្តាញ។"
      } finally {
        loading.value = false
      }
    }

    const handleVerifyOtp = async () => {
      clearMessages()
      normalizeOtp()

      if (!email.value || !isValidEmail(email.value)) {
        otpMessage.value = "សូមបញ្ចូលអ៊ីមែលឱ្យត្រឹមត្រូវជាមុនសិន។"
        return
      }

      if (!/^[0-9A-Z]{6}$/.test(otp.value)) {
        otpMessage.value = "លេខកូដត្រូវតែមាន ៦ ខ្ទង់។"
        return
      }

      loading.value = true

      try {
        const response = await fetch(`${passwordBaseUrl}/forgot/confirm`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            email: email.value.trim(),
            code: otp.value
          })
        })

        const data = await parseResponse(response)

        if (isSuccessfulResponse(response, data)) {
          step.value = 3
          successMessage.value = data.message || "កូដត្រឹមត្រូវ សូមបញ្ចូលពាក្យសម្ងាត់ថ្មី។"
          return
        }

        otpMessage.value = getSafeErrorMessage(data, response, "កូដមិនត្រឹមត្រូវ។")
      } catch {
        otpMessage.value = "បញ្ហាការភ្ជាប់បណ្តាញ។"
      } finally {
        loading.value = false
      }
    }

    const handleResetPassword = async () => {
      clearMessages()

      if (!newPassword.value || !confirmPassword.value) {
        errorMessage.value = "សូមបញ្ចូលពាក្យសម្ងាត់ថ្មីទាំងពីរប្រអប់។"
        return
      }

      if (newPassword.value !== confirmPassword.value) {
        errorMessage.value = "ពាក្យសម្ងាត់មិនត្រូវគ្នា។"
        return
      }

      loading.value = true

      try {
        const response = await fetch(`${passwordBaseUrl}/reset`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            email: email.value.trim(),
            password: newPassword.value,
            code: otp.value
          })
        })

        const data = await parseResponse(response)

        if (isSuccessfulResponse(response, data)) {
          successMessage.value = data.message || "ផ្លាស់ប្ដូរពាក្យសម្ងាត់ថ្មីបានជោគជ័យ!"
          step.value = 1
          otp.value = ""
          newPassword.value = ""
          confirmPassword.value = ""
          email.value = ""
          return
        }

        errorMessage.value = getSafeErrorMessage(
          data,
          response,
          "បរាជ័យក្នុងការផ្លាស់ប្ដូរពាក្យសម្ងាត់។"
        )
      } catch {
        errorMessage.value = "បញ្ហាការភ្ជាប់បណ្តាញ។"
      } finally {
        loading.value = false
      }
    }

    const resetFlow = () => {
      step.value = 1
      email.value = ""
      otp.value = ""
      newPassword.value = ""
      confirmPassword.value = ""
      clearMessages()
    }

    const requestReset = withHandledPromise(handleRequestReset, (message) => {
      errorMessage.value = message
    })

    const verifyOtp = withHandledPromise(handleVerifyOtp, (message) => {
      otpMessage.value = message
    })

    const resetPassword = withHandledPromise(handleResetPassword, (message) => {
      errorMessage.value = message
    })

    return {
      step,
      loading,
      email,
      otp,
      newPassword,
      confirmPassword,
      successMessage,
      errorMessage,
      otpMessage,
      normalizeOtp,
      requestReset,
      verifyOtp,
      resetPassword,
      resetFlow
    }
  }
}
</script>

<style scoped>
#otp::placeholder {
  padding-right: 0;
  letter-spacing: 0.3em;
}

.otp-overlay {
  background: rgba(0, 0, 0, 0.2);
}

.otp-card {
  position: relative;
  width: 100%;
  max-width: 22rem;
  padding: 2rem;
  border-radius: 0.75rem;
  background: #ffffff;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.otp-close {
  position: absolute;
  top: 0.4rem;
  right: 0.7rem;
  border: 0;
  background: transparent;
  font-size: 1.5rem;
  line-height: 1;
  color: #9ca3af;
  cursor: pointer;
}

.otp-close:hover {
  color: #dc2626;
}

.otp-title {
  margin-bottom: 0.4rem;
  font-weight: 700;
  text-align: center;
}

.otp-subtitle {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.95rem;
  color: #4b5563;
}

.otp-input {
  text-align: center;
  letter-spacing: 0.35em;
}

.button-secondary {
  background: #f3f4f6;
  color: #111827;
}

.button-secondary:hover {
  background: #e5e7eb;
}
</style>