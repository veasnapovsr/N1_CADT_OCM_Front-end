<template>
  <section class="py-12">
    <!-- Title -->
    <h2
      class="mb-12 text-center font-muol text-3xl tracking-wide
             leading-snug text-blue-800 md:text-4xl"
    >
      ប្រព័ន្ធគ្រប់គ្រងព័ត៌មានរដ្ឋបាល
    </h2>

    <!-- Grid -->
    <div class="mx-auto max-w-8xl px-6 grid gap-3">
      <!-- Row 1 -->
      <div class="grid gap-3 md:grid-cols-2">
        <DashboardCard
          icon="calendar"
          title="កាលវិភាគ"
          description="គ្រប់គ្រង និងតាមដានកាលវិភាគ"
          @click="goToAttendance"
        />

        <DashboardCard
          icon="share"
          title="ប្រព័ន្ធតភ្ជាប់ទិន្នន័យ"
          description="ភ្ជាប់ និងចែករំលែកព័ត៌មាន"
          @click="notImplemented('integration')"
        />
      </div>

      <!-- Row 2 -->
      <div class="grid gap-3 md:grid-cols-3">
        <DashboardCard
          icon="users"
          title="ការគ្រប់គ្រងអ្នកប្រើប្រាស់"
          description="គ្រប់គ្រងគណនី និងសិទ្ធិ"
          @click="notImplemented('users')"
        />

        <!-- ✅ PDF DOCUMENT CARD -->
        <DashboardCard
          icon="file"
          title="ឯកសារ PDF និងរបាយការណ៍"
          description="មើល និងទាញយកឯកសារ"
          @click="goToPdf"
        />

        <DashboardCard
          icon="monitor"
          title="ប្រព័ន្ធត្រួតពិនិត្យ"
          description="តាមដានស្ថានភាពប្រព័ន្ធ"
          @click="notImplemented('monitor')"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router"
import DashboardCard from "@/components/DashboardCard.vue"

const router = useRouter()

/**
 * OLD APP SIDEBAR → Attendance
 */
const goToAttendance = () => {
  router.push({ name: "attendance" })
}

/**
 * PDF DOCUMENT SYSTEM → NEW SIDEBAR
 */
const goToPdf = () => {
  router.push("/pdf")
}

/**
 * Temporary placeholder for future modules
 */
const notImplemented = (name) => {
  console.warn("Route not implemented yet:", name)
}
</script>
