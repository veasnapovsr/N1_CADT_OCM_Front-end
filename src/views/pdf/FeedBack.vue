<template>
  <Header title="លំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
  <section class="appppw">
  <Aside />
  <div class="sw">
				<div class="app_content">
				<div class="ocm_cwr">
					<h2 class="h wttt t-lspace"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="2 2 16 16"><g fill="none"><path d="M2 10a8 8 0 1 1 4.262 7.075l-3.64.91a.5.5 0 0 1-.607-.606l.91-3.641A7.968 7.968 0 0 1 2 10zm7.25-2.693C9.403 7.134 9.64 7 10 7s.597.134.75.307c.161.184.25.438.25.693c0 .317-.071.523-.166.685c-.101.174-.236.314-.423.51l-.022.024c-.189.197-.421.444-.598.781c-.18.346-.291.761-.291 1.293a.5.5 0 1 0 1 0c0-.384.077-.638.177-.829c.105-.2.248-.359.434-.554l.042-.043c.17-.177.382-.398.545-.678c.186-.32.302-.7.302-1.189c0-.473-.161-.97-.5-1.354C11.153 6.252 10.64 6 10 6s-1.153.252-1.5.646C8.16 7.031 8 7.526 8 8a.5.5 0 0 0 1 0c0-.255.089-.51.25-.693zm1.45 6.206a.7.7 0 1 0-1.4 0a.7.7 0 0 0 1.4 0z" fill="currentColor"></path></g></svg>
            ផ្តល់មតិកែលម្អ</h2>
				</div>
    <div class="ocm_card_wr">
    <div class="ocm_card_content">            
    <div v-if="!submitted">
    <p class="mb-20">ក្រុមការងាររបស់យើងខ្ញុំសូមអរគុណចំពោះគំនិត និងការយល់ដឹងរបស់អ្នក! មតិកែលម្អរបស់អ្នកមានតម្លៃក្នុងការជួយក្រុមការងាររបស់យើងក្នុងការកែលម្អកម្មវិធី និងបំពេញតម្រូវការរបស់អ្នកកាន់តែប្រសើរឡើង។ សូមចែករំលែកបទពិសោធន៍ ការផ្តល់យោបល់ ឬកង្វល់ណាមួយដែលអ្នកមាន។ ក្រុមការងាររបស់យើងខ្ញុំ និងពិនិត្យមើលមតិកែលម្អទាំងអស់ដោយប្រុងប្រយ័ត្ន ហើយប្រើវាដើម្បីអភិវឌ្ឍកម្មវិធីអោយប្រសើរឡើងជាងមុន។</p>
    <form @submit.prevent="submitForm">
      <div class="ocmopt-col cols1 mb-15">
        <div class="ocmopt-meta">
          <div class="ocmopt-meta-title"><label class="ocmopt-meta-label" for="title">ចំណងជើង</label></div>
          <div class="ocmopt-meta-content ocm_meta_check">
            <input id="title" class="form-control" v-model="form.title" type="text" autocomplete="off" required />
          </div>
        </div>
      </div>

      <div class="ocmopt-col cols1 mb-15">
        <div class="ocmopt-meta">
          <div class="ocmopt-meta-title"><label class="ocmopt-meta-label" for="description">ខ្លឹមសារ</label></div>
          <div class="ocmopt-meta-content ocm_meta_check">
            <textarea id="description" class="form-control" v-model="form.description" cols="60" rows="5" required></textarea>
          </div>
        </div>
      </div>
      
      <div 
        class="drop-zone mb-20"
        @dragover.prevent
        @drop="handleDrop"
        @click="selectFiles"
      >
      <svg stroke="currentColor" fill="none" viewBox="0 0 48 48" class="w-12 h-12 mx-auto text-gray-400"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0
            01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4
            4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        <p>អូសនិងទម្លាក់រូបភាពនៅទីនេះ ឬចុចទីនេះ</p>
        <input type="file" multiple ref="fileInput" @change="handleFileUpload" hidden />
      </div>

      <div class="img_preview mb-20">
        <div v-for="(image, index) in previewImages" :key="index">
          <img :src="image" />
        </div>
      </div>

      <button class="button ocm_btn_ac button-primary" type="submit" :disabled="isSubmitting"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 32 448 448"><path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88s88-39.477 88-88s-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40s40 17.944 40 40s-17.944 40-40 40z" fill="currentColor"></path></svg>ផ្តល់មតិ</button>
    </form>
  </div>

  <div v-if="submitted" class="ocm_sucs_w ocm_fit_h">
    <div class="ico_w"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 154 154" fill="none" class="stroke-current"> <path d="M77 141C112.346 141 141 112.346 141 77C141 41.6538 112.346 13 77 13C41.6538 13 13 41.6538 13 77C13 112.346 41.6538 141 77 141Z" stroke-width="15" class="checkmark-circle"></path> <path d="M46 80.2444L63.9556 98.1111L107.067 55" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" class="checkmark-tick"></path> </svg></div>
			<h2>បានដាក់ស្នើមតិកែលម្អដោយជោគជ័យ!</h2>
			<p>សូមអរគុណចំពោះមតិកែលម្អរបស់អ្នក</p>
			<router-link class="button ocm_back_btn button-primary ocm_base_btn" to="/dashboard"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 32 512 448"><path d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm-6 400H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v340a6 6 0 0 1-6 6zm-42-92v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12zm0-96v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12zm0-96v24c0 6.627-5.373 12-12 12H204c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h200c6.627 0 12 5.373 12 12zm-252 12c0 19.882-16.118 36-36 36s-36-16.118-36-36s16.118-36 36-36s36 16.118 36 36zm0 96c0 19.882-16.118 36-36 36s-36-16.118-36-36s16.118-36 36-36s36 16.118 36 36zm0 96c0 19.882-16.118 36-36 36s-36-16.118-36-36s16.118-36 36-36s36 16.118 36 36z" fill="currentColor"></path></svg>ត្រឡប់ទៅផ្ទាំងគ្រប់គ្រងវិញ</router-link>
  </div>


    </div>
    </div>
  </div>
  <Footer />
</div>
</section>
</template>
<script setup>
import { API_BASE_URL, formatKhmerNumber, formatDateKhmer  } from '@/lib/utils.js'
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
</script>
<script>
export default {
  data() {
    return {
      form: {
        title: "",
        uid: null,
        description: "",
        gallery: [],
      },
      previewImages: [],
      selectedFiles: [],
      isSubmitting: false,
      submitted: false,
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      this.form.uid = user.id;
    } else {
      console.error("User not found in localStorage");
    }
  },
  methods: {
    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      this.processFiles(files);
    },
    handleFileUpload(event) {
      const files = event.target.files;
      this.processFiles(files);
    },
    selectFiles() {
      this.$refs.fileInput.click();
    },
    processFiles(files) {
      for (const file of files) {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.previewImages.push(e.target.result);
          };
          reader.readAsDataURL(file);
          this.selectedFiles.push(file);
        }
      }
    },
    async submitForm() {
      this.isSubmitting = true; // Disable the button

      // API disabled - not in use yet
      // const formData = new FormData();
      // for (const file of this.selectedFiles) {
      //   formData.append("files[]", file);
      // }

      // // Upload images via API
      // const uploadResponse = await fetch(`${API_BASE_URL}/upload-gallery`, {
      //   method: "POST",
      //   body: formData,
      // });

      // const uploadResult = await uploadResponse.json();
      // this.form.gallery = uploadResult.urls; // Store returned URLs

      // // Submit feedback
      // const feedbackResponse = await fetch(`${API_BASE_URL}/feedback`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(this.form),
      // });

      // if (feedbackResponse.ok) {
      //   this.submitted = true; // Hide form and show success message
      // }

      // Simulate success for UI
      this.submitted = true;
      this.isSubmitting = false; // Re-enable button (if needed)
    },
  },
};
</script>

<style>
.drop-zone {
  width: 100%;
  padding: 20px;
  background: #c7ddec2b;
  border: 2px dashed var(--ocm-input-border);
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
  font-size: 15px;
}
.drop-zone:hover{
  background: #88c6f02b;
}
.drop-zone svg{
  width: 50px;
}
.img_preview{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.img_preview img {
  width: 150px;
  border-radius: 5px;
}
</style>