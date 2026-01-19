<template>
  <Header title="លំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
  <section class="appppw">
  <Aside />
  <div class="sw">
				<div class="app_content">
				<div class="ocm_cwr">
					<h2 class="h wttt ocm_ptitle t-lspace">រដ្ឋបាល បង្កើតឯកសារ</h2>
				</div>
    <div class="ocm_card_wr">    
    <div v-if="!submitted">
    <form @submit.prevent="submitForm">
      <div class="ocm_card_content">
      <div class="ocmopt-col cols1 mb-15">
        <div class="ocmopt-meta">
          <div class="ocmopt-meta-title"><label class="ocmopt-meta-label t-lspace">កម្មវត្ថុ</label></div>
          <div class="ocmopt-meta-content ocm_meta_check">
            <textarea name="ocm_name" id="ocm_name" class="form-control" cols="60" rows="5"></textarea>
          </div>
        </div>
      </div>
      <div class="ocmopt-col cols2 mb-20" style="display: flex; gap: 20px;">
        <div class="ocmopt-meta" style="flex: 1;">
          <div class="ocmopt-meta-title"><label class="ocmopt-meta-label t-lspace">លិខិតលេខ</label></div>
          <div class="ocmopt-meta-content">
            <input id="dob" type="text" name="dob" autocomplete="off" class="form-control">
          </div>
        </div>
        <div class="ocmopt-meta" style="flex: 1;">
          <div class="ocmopt-meta-title"><label class="ocmopt-meta-label t-lspace">កាលបរិច្ឆេទ</label></div>
          <div class="ocmopt-meta-content input-wrapper inpdate">
            <FlatPickr
              v-model="startDate"
              placeholder="កាលបរិច្ឆេទ"
              @input="handleInput"
              :value="modelValue"
              :config="{
                dateFormat: 'd-m-Y',
                altInput: true,
                altFormat: 'd-m-Y',
                allowInput: true,
                minDate: new Date()
              }"
            />
            <div class="prefix pre_end"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="3 2 18 20"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" fill="currentColor"></path></svg></div>
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
        <p>អូសនិងទម្លាក់ឯកសារនៅទីនេះ ឬចុចទីនេះ</p>
        <input type="file" multiple ref="fileInput" @change="handleFileUpload" hidden />
      </div>

      <div class="img_preview mb-20">
        <div v-for="(image, index) in previewImages" :key="index">
          <img :src="image" />
        </div>
      </div>
    </div>
      
      <div class="ocm_card_foot foot_stick">
					<div class="ocm_btn_wr">
						<router-link class="button ocm_btn_ac btn_cancel button-primary" to="/pdf/flow"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="2 2 20 20"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z" fill="currentColor"></path></svg>បោះបង់</router-link>
            <!-- <button class="button ocm_btn_ac button-primary" type="submit" :disabled="isSubmitting"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 32 448 448"><path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88s88-39.477 88-88s-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40s40 17.944 40 40s-17.944 40-40 40z" fill="currentColor"></path></svg>រក្សារទុក</button> -->
            <router-link to="/pdf/documents-success" class="button ocm_btn_ac button-primary" type="submit" :disabled="isSubmitting"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 32 448 448"><path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88s88-39.477 88-88s-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40s40 17.944 40 40s-17.944 40-40 40z" fill="currentColor"></path></svg>រក្សារទុក</router-link>
						</div>
				</div>
      
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
  <Footer />
</div>
</section>
</template>
<script setup>
// import { API_BASE_URL, formatKhmerNumber, formatDateKhmer  } from '@/utils.js'
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
import { InputSelect } from '@/components/ui/inputselect'
import { leaders } from '@/data/leader.js'
import { FlatPickr } from '@/components/ui/flat-pickr'
</script>
<script>
export default {
  components: {
    InputSelect
  },
  data() {
    return {
      form: {
        title: "",
        uid: null,
        description: "",
        gallery: [],
        documentType: "",
      },
      documentTypes: [
        { value: "2", label: "ព្រះរាជក្រម" },
        { value: "3", label: "ព្រះរាជក្រឹត្យ.បក" },
        { value: "4", label: "អនុក្រឹត្យ.បក" },
        { value: "5", label: "ស.ជ.ណ" },
        { value: "6", label: "សេចក្ដីសម្រេច" },
        { value: "7", label: "សារាចរ និង សារាចរណែនាំ" },
        { value: "8", label: "ប្រកាស" },
        { value: "9", label: "គោលនយោបាយជាតិ" },
        { value: "10", label: "ផែនការយុទ្ធសាស្ត្រ" },
        { value: "11", label: "បទបញ្ជារាជរដ្ឋាភិបាល" },
        { value: "12", label: "ផែនការសកម្មភាពក្រសួងនានា" },
        { value: "13", label: "អនុក្រឹត្យ.តត" },
        { value: "14", label: "ព្រះរាជក្រឹត្យ.តត" },
      ],
      // ministries removed
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

      const formData = new FormData();
      for (const file of this.selectedFiles) {
        formData.append("files[]", file);
      }

      // Upload images via API
      const uploadResponse = await fetch(`${API_BASE_URL}/upload-gallery`, {
        method: "POST",
        body: formData,
      });

      const uploadResult = await uploadResponse.json();
      this.form.gallery = uploadResult.urls; // Store returned URLs

      // Submit feedback
      const feedbackResponse = await fetch(`${API_BASE_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.form),
      });

      if (feedbackResponse.ok) {
        this.submitted = true; // Hide form and show success message
      }

      this.isSubmitting = false; // Re-enable button (if needed)
    },
  },
};
</script>

<style>
.drop-zone {
  width: 100%;
  padding: 20px;
  background: #e5e5e566;
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
  background: #e5e5e566;
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