<template>
  <header
    class="sticky top-0 z-50
           h-16 w-full
           backdrop-blur-md
           border-b border-white/10"
    :style="{ backgroundColor: '#032EA1' }"
  >
    <div class="h-full px-6 flex items-center justify-between">
      <!-- Left: Logo -->
      <div class="flex items-center gap-3">
        <img
          src="@/assets/logo-top-bar.png"
          alt="System Logo"
          class="h-10 w-auto"
        />
      </div>

      <!-- Right -->
      <div class="flex items-center gap-4 text-white">
        <!-- Notification -->
        <button
          class="relative p-2 rounded-full hover:bg-white/10 transition"
        >
          <Bell class="w-5 h-5" />
        </button>

        <!-- Profile -->
        <div class="flex items-center gap-3 cursor-pointer">
          <div
            class="h-9 w-9 rounded-full
                   bg-white/20
                   flex items-center justify-center"
          >
            <User class="h-5 w-5 text-white" />
          </div>

          <span class="hidden md:inline text-sm font-medium">
            Admin
          </span>
        </div>

        <!-- Logout -->
        <button
          class="p-2 rounded-full hover:bg-white/10 transition"
          @click="logout"
        >
          <LogOut class="w-5 h-5" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router"
import { Bell, User, LogOut } from "lucide-vue-next"

const router = useRouter() // ✅ THIS WAS MISSING

const logout = () => {
  // 1️⃣ Clear auth data
  localStorage.removeItem("token")
  sessionStorage.clear()

  // 2️⃣ Redirect to login
  router.replace({ name: "login" })
}
</script>
