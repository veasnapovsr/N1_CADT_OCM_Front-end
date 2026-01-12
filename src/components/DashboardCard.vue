<template>
  <section class="py-16">
    <!-- Title -->
    <h2
      class="mb-14 text-center
             font-khmer font-bold
             text-3xl md:text-4xl
             tracking-wide
             text-black"
    >
      ប្រព័ន្ធគ្រប់គ្រងព័ត៌មានរដ្ឋបាល
    </h2>

    <!-- Grid -->
    <div
      class="mx-auto max-w-6xl px-6
             grid gap-6
             grid-cols-2
             md:grid-cols-3
             lg:grid-cols-5"
    >
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

      <DashboardCard
        icon="users"
        title="ការគ្រប់គ្រងអ្នកប្រើប្រាស់"
        description="គ្រប់គ្រងគណនី និងសិទ្ធិ"
        @click="notImplemented('users')"
      />

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
  </section>
</template>

<script setup>
import { useRouter } from "vue-router"
import DashboardCard from "@/components/DashboardCard.vue"

const router = useRouter()

/* ✅ ROUTING UNCHANGED */
const goToAttendance = () => {
  router.push({ name: "attendance" })
}

const goToPdf = () => {
  router.push("/pdf")
}

const notImplemented = (name) => {
  console.warn("Route not implemented yet:", name)
}
</script>
