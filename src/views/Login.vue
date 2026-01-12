<template>
  <div
    class="relative min-h-screen flex items-center justify-center
           overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700"
  >
    <!-- Background image -->
    <div
      class="absolute inset-0 bg-cover bg-center scale-105"
      :style="{ backgroundImage: `url(${background})` }"
    ></div>

    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-black/45"></div>

    <!-- Content -->
    <div class="relative z-10 w-full max-w-md px-6 text-center text-white">
      <!-- Logo -->
      <div
        class="flex justify-center mb-6
               transition-all duration-[2000ms]
               ease-[cubic-bezier(.16,1,.3,1)]"
        :class="logoClass"
      >
        <img src="../assets/logo.png" alt="Logo" class="h-52" />
      </div>

      <!-- Login Form -->
      <transition
        enter-active-class="transition-all duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)]"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="showForm">
          <h1 class="text-xl font-semibold mb-8">
            ប្រព័ន្ធគ្រប់គ្រងព័ត៌មានសាលា
          </h1>

          <form class="space-y-5" @submit.prevent="login">
            <!-- Email -->
            <input
              v-model.trim="email"
              type="email"
              placeholder="អ៊ីមែល"
              class="w-full px-4 py-2 rounded
                     bg-white/20 border border-white/30
                     placeholder-white/70 text-white
                     focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />

            <!-- Password -->
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="ពាក្យសម្ងាត់"
                class="w-full px-4 py-2 pr-12 rounded
                       bg-white/20 border border-white/30
                       placeholder-white/70 text-white
                       focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />

              <!-- Show / Hide password -->
              <button
                type="button"
                class="absolute inset-y-0 right-3 flex items-center
                       text-white/60 hover:text-white transition"
                @click="showPassword = !showPassword"
              >
                <!-- Eye -->
                <svg
                  v-if="!showPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 12c1.636-4.5 6.273-7.5 9.75-7.5s8.114 3 9.75 7.5
                       c-1.636 4.5-6.273 7.5-9.75 7.5S3.886 16.5 2.25 12z" />
                  <circle cx="12" cy="12" r="3.25" />
                </svg>

                <!-- Eye off -->
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 3l18 18M10.73 5.073A9.72 9.72 0 0112 4.5
                       c3.477 0 8.114 3 9.75 7.5
                       a9.743 9.743 0 01-4.232 5.002
                       M6.61 6.61A9.744 9.744 0 002.25 12
                       c1.636 4.5 6.273 7.5 9.75 7.5
                       a9.74 9.74 0 005.389-1.64" />
                </svg>
              </button>
            </div>

            <!-- Error -->
            <p v-if="error" class="text-red-300 text-sm">
              {{ error }}
            </p>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="loading"
              class="w-40 py-2 mx-auto block rounded font-semibold
                     bg-white/30 hover:bg-white/40
                     transition disabled:opacity-50"
            >
              {{ loading ? "កំពុងចូល..." : "ចូលប្រព័ន្ធ" }}
            </button>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

import background from "../assets/background.png";

const router = useRouter();

/* -------------------- State -------------------- */
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const error = ref("");
const loading = ref(false);

/* Animation */
const logoVisible = ref(false);
const logoCompact = ref(false);
const showForm = ref(false);

/* -------------------- Lifecycle -------------------- */
onMounted(() => {
  logoVisible.value = true;

  setTimeout(() => {
    logoCompact.value = true;
    showForm.value = true;
  }, 900);
});

/* -------------------- Computed -------------------- */
const logoClass = computed(() => {
  if (!logoVisible.value) return "opacity-0 scale-150";
  if (!logoCompact.value) return "opacity-100 scale-150";
  return "opacity-100 scale-95";
});

/* -------------------- Login -------------------- */
const login = async () => {
  error.value = "";

  if (!email.value || !password.value) {
    error.value = "សូមបញ្ចូលអ៊ីមែល និងពាក្យសម្ងាត់";
    return;
  }

  // ✅ Allow ALL valid emails (gmail, gov.kh, edu.kh, etc.)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    error.value = "សូមបញ្ចូលអ៊ីមែលត្រឹមត្រូវ";
    return;
  }

  loading.value = true;

  try {
    const res = await axios.post(
      "http://10.11.11.68:8001/api/authcenter/authentication/login",
      {
        email: email.value,
        password: password.value,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const { accessToken, user } = res.data;

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    router.push("/dashboard");

  } catch (err) {
    if (err.response) {
      error.value =
        err.response.data?.message ||
        "អ៊ីមែល ឬ ពាក្យសម្ងាត់ មិនត្រឹមត្រូវ";
    } else {
      error.value = "មិនអាចភ្ជាប់ទៅម៉ាស៊ីនមេបាន";
    }
  } finally {
    loading.value = false;
  }
};
</script>
