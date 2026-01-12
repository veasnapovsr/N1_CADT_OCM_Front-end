<template>
  <section class="app_list">
    <div class="app_inner">
      <div class="app_sect">
        <h1 class="h wttt frt t-lspace">
          សូមស្វាគមន៍មកកាន់ប្រព័ន្ធកម្មវិធី
          <span>ទីស្តីការគណៈរដ្ឋមន្ត្រី</span>
        </h1>

        <div class="app_card_w">
          <div class="app_card app_01" @click="goToAttendance">
            <span class="apico app1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm1.5 13h-7a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zm0-3h-7a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zm-3-3h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1zm1-2.5V8h5.5L13.5 3.5z"/>
              </svg>
            </span>
            <h3 class="t-lspace">លំហូរឯកសារ</h3>
          </div>

          <div class="app_card app_02" @click="notImplemented('profile')">
            <span class="apico app2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </span>
            <h3 class="t-lspace">ព័ត៌មានផ្ទាល់ខ្លួន</h3>
          </div>

         <div class="app_card app_03" @click="notImplemented('meeting')">
  <span class="app_lbl">មាន២ប្រជុំថ្ងៃនេះ</span>
  <span class="apico app3">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  </span>
  <h3 class="t-lspace">កិច្ចប្រជុំគណៈរដ្ឋមន្ត្រី</h3>
</div>

         <div class="app_card app_04" @click="goToPdf">
  <span class="app_lbl">មាន៩០០០០ឯកសារ</span>
  <span class="apico app4">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/>
    </svg>
  </span>
  <h3 class="t-lspace">លិខិតបទដ្ឋានគតិយុត្ត</h3>
</div>

          <div class="app_card app_04" @click="notImplemented('news')">
            <span class="apico app4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 12H5V7h14v10zm-8-6h6v2h-6v-2zm0 3h6v2h-6v-2zm-4-3h3v5H7v-5z"/>
              </svg>
            </span>
            <h3 class="t-lspace">ព័ត៌មានថ្មីៗ</h3>
          </div>

          <div class="app_card app_05" @click="notImplemented('webmail')">
            <span class="apico app5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z"/>
              </svg>
            </span>
            <h3 class="t-lspace">សារ​អេឡិច​ត្រូនិច</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

/* ✅ EXISTING ROUTING — UNCHANGED */
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
