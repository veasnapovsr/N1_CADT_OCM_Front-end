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
      <div class="input-wrapper mb-15">
        <input
          id="user_login"
          class="input form-control"
          v-model="email"
          type="text"
          autocomplete="off"
          placeholder="ឈ្មោះអ្នកប្រើប្រាស់"
          @keyup.enter="login"
        />
        <div class="prefix">
          <!-- mail icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor" aria-hidden="true" data-slot="icon" class="size-5 transition-colors duration-200"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"></path></svg>
        </div>
      </div>

      <!-- Password -->
      <div class="input-wrapper mb-15">
        <input
          id="user_pass"
          class="input password-input form-control"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="លេខសំងាត់"
          @keyup.enter="login"
        />

        <!-- Show / Hide Password -->
        <div class="prefix pre_end showpass" @click="togglePassword">
          <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 0 1 1.563-3.029m5.858.908a3 3 0 1 1 4.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0A9.97 9.97 0 0 1 12 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 0 1-4.132 5.411m0 0L21 21"></path></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="1 4 22 16"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"></circle><path d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7"></path></g></svg>
        </div>


        <div class="prefix">
          <!-- lock icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor" aria-hidden="true" data-slot="icon" class="size-5 transition-colors duration-200"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"></path></svg>
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
      <span class="form_i"><svg version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" enable-background="new 0 0 512 512" xml:space="preserve" viewBox="48 48 416 416"><g><g><g><path d="M192,277.4h189.7l-43.6,44.7L368,352l96-96l-96-96l-31,29.9l44.7,44.7H192V277.4z"></path></g></g><g><path d="M255.7,421.3c-44.1,0-85.5-17.2-116.7-48.4c-31.2-31.2-48.3-72.7-48.3-116.9c0-44.1,17.2-85.7,48.3-116.9 			c31.2-31.2,72.6-48.4,116.7-48.4c44,0,85.3,17.1,116.5,48.2l30.3-30.3c-8.5-8.4-17.8-16.2-27.7-23.2C339.7,61,298.6,48,255.7,48 			C141.2,48,48,141.3,48,256s93.2,208,207.7,208c42.9,0,84-13,119-37.5c10-7,19.2-14.7,27.7-23.2l-30.2-30.2 			C341.1,404.2,299.7,421.3,255.7,421.3z"></path><rect x="447.4" y="255.4" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 583.767 753.7971)" width="1.2" height="1.2"></rect></g></g></svg></span>
        ចូលប្រព័ន្ធ
      </button>
        <div class="mt-4 text-right hover:underline">
          <router-link to="/forgot-password" class="text-blue-500 hover:underline ">ភ្លេចពាក្យសម្ងាត់ ?</router-link>
        </div>
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
import auth from './../api/auth'
import Crud from './../classes/Crud'
import { authLogout, setToken, setUser, getAccessToken, getUser } from './../plugins/authentication'

export default {
  setup() {
    const authCenterApiServer = import.meta.env.VITE_API_SERVER.replace(/\/$/, "")
    const clientApiServer = (
      import.meta.env.VITE_CLIENT_API_SERVER || authCenterApiServer.replace(/\/authcenter$/, "/client")
    ).replace(/\/$/, "")
    const insufficientPermissionMessage = "គណនីនេះមិនមានសិទ្ធិគ្រប់គ្រាន់។"


    // // បង្កើតឧបករណ៍ CRUD
    // const productCrud = new Crud(
    //     import.meta.env.VITE_API_LOCAL ,
    //     { name: 'មន្ត្រី', module: 'regulators', title: 'ព័ត៌មានមន្ត្រី' , uri: 'search' },
    //     ['id', 'code', 'date', 'user_id'],
    //     '',
    //     1,
    //     15
    // );

    // // ទាញយកកំណត់ត្រា
    // productCrud.list({ page: 1, perPage: 15 }, (res) => {
    //     console.log('មន្ត្រីទាំងអស់:', productCrud.getRecords());
    // }, (error) => {
    //     console.error('កំហុស:', error);
    // });

    // បិទ/បើកស្ថានភាពសកម្ម
    // productCrud.toggleActive(123, {}, (res) => {
    //     console.log('បានប្តូរស្ថានភាពផលិតផល:', productCrud.getRecord());
    // });

    const email = ref("")
    const password = ref("")
    const showPassword = ref(false)
    const router = useRouter()

    const redirectAfterLogin = (record) => {
      const userId = record?.id ? String(record.id) : ""

      if (userId === "2901") {
        router.push("/pdf/flow-dash2")
      } else {
        router.push("/dashboard")
      }
    }

    const persistLoginState = (response) => {
      const { token, record, upload_max_filesize } = response.data || {}

      if (!token?.access_token) {
        throw new Error("ម៉ាស៊ីនមេមិនបានផ្ដល់ access token ទេ។")
      }

      setToken(token)
      setUser(record || null)
      localStorage.setItem("upload_max_filesize", upload_max_filesize)

      return record
    }

    const extractApiErrorMessage = (error) => {
      const responseData = error?.response?.data
      const validationErrors = responseData?.errors

      if (validationErrors && typeof validationErrors === "object") {
        const firstValidationMessage = Object.values(validationErrors)
          .flat()
          .find(Boolean)

        if (firstValidationMessage) {
          return firstValidationMessage
        }
      }

      return responseData?.message || responseData?.error || null
    }

    const requestLogin = async (baseUrl) => {
      const identifier = email.value.trim()

      return await auth.login(`${baseUrl}/authentication/login`, {
        username: identifier,
        email: identifier,
        password: password.value
      })
    }

    const shouldRetryWithClientLogin = (error) => {
      return (
        error?.response?.status === 403 &&
        clientApiServer !== authCenterApiServer
      )
    }

    // Redirect if already logged in
    onMounted(() => {
      const token = getAccessToken()
      if (token) {
        try {
          const user = getUser()
          const userId = user?.id ? String(user.id) : ""

          if (userId === "2901") {
            router.push("/pdf/flow-dash2")
          } else {
            router.push("/dashboard")
          }
        } catch {
          router.push("/dashboard")
        }
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
        authLogout()
        const res = await requestLogin(authCenterApiServer)
        const record = persistLoginState(res)
        toast.success("ចូលប្រព័ន្ធបានជោគជ័យ")
        redirectAfterLogin(record)
      } catch (err) {
        const apiMessage = extractApiErrorMessage(err)

        if (shouldRetryWithClientLogin(err)) {
          try {
            authLogout()
            const clientResponse = await requestLogin(clientApiServer)
            const record = persistLoginState(clientResponse)
            toast.success("ចូលប្រព័ន្ធបានជោគជ័យ")
            redirectAfterLogin(record)
            return
          } catch (clientError) {
            const clientApiMessage = extractApiErrorMessage(clientError)

            authLogout()
            toast.error("មិនអាចចូលប្រព័ន្ធបាន", {
              description: clientApiMessage || apiMessage || insufficientPermissionMessage
            })
            return
          }
        }

        if (err.response?.status === 401) {
          authLogout()
          toast.error("ចូលប្រព័ន្ធបរាជ័យ", {
            description: apiMessage || "Unauthorized"
          })
        } else if (err.response?.status === 403) {
          authLogout()
          toast.error("មិនអាចចូលប្រព័ន្ធបាន", {
            description: apiMessage || insufficientPermissionMessage
          })
        } else if (err.response?.status === 422) {
          authLogout()
          toast.error("ព័ត៌មានចូលប្រព័ន្ធមិនត្រឹមត្រូវ", {
            description: apiMessage || "សូមពិនិត្យឈ្មោះអ្នកប្រើ និងពាក្យសម្ងាត់ម្ដងទៀត"
          })
        } else if (apiMessage) {
          authLogout()
          toast.error("បញ្ហាប្រព័ន្ធ", {
            description: apiMessage
          })
        } else {
          authLogout()
          toast.error("បញ្ហាប្រព័ន្ធ", {
            description: err.message || "សូមព្យាយាមម្ដងទៀតនៅពេលក្រោយ"
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
