<template>
  <section class="py-12">
    <!-- Title -->
    <h2
      class="text-center
             font-muol
             text-3xl md:text-4xl
             tracking-wide
             leading-snug
             text-blue-800
             mb-12"
    >
      ប្រព័ន្ធគ្រប់គ្រងព័ត៌មានរដ្ឋបាល
    </h2>

    <!-- Grid -->
    <div class="max-w-8xl mx-auto px-6 grid gap-3">
      <!-- Row 1 -->
      <div class="grid md:grid-cols-2 gap-3">
        <DashboardCard
          icon="calendar"
          title="កាលវិភាគ"
          description="គ្រប់គ្រង និងតាមដានកាលវិភាគ"
          @click="go('schedule')"
        />

        <DashboardCard
          icon="share"
          title="ប្រព័ន្ធតភ្ជាប់ទិន្នន័យ"
          description="ភ្ជាប់ និងចែករំលែកព័ត៌មាន"
          @click="go('integration')"
        />
      </div>

      <!-- Row 2 -->
      <div class="grid md:grid-cols-3 gap-3">
        <DashboardCard
          icon="users"
          title="ការគ្រប់គ្រងអ្នកប្រើប្រាស់"
          description="គ្រប់គ្រងគណនី និងសិទ្ធិ"
          @click="go('users')"
        />

        <DashboardCard
          icon="file"
          title="ឯកសារ PDF និងរបាយការណ៍"
          description="មើល និងទាញយកឯកសារ"
          @click="go('documents')"
        />

        <DashboardCard
          icon="monitor"
          title="ប្រព័ន្ធត្រួតពិនិត្យ"
          description="តាមដានស្ថានភាពប្រព័ន្ធ"
          @click="go('monitor')"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import DashboardCard from "./DashboardCard.vue"

const go = (route) => {
  console.log("Navigate to:", route)
}
</script>
