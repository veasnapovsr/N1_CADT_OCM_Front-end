<template>
  <Header title="លំហូរឯកសារទីស្តីការគណៈរដ្ឋមន្ត្រី" />
  <section class="appppw">
  <Aside />
  <div class="sw">
				<div class="app_content">
				<div class="ocm_cwr">
					<h2 class="h wttt t-lspace">ព័ត៌មានផ្ទាល់ខ្លួន</h2>
				</div>
    <div class="ocm_card_wr">
      <div v-if="user">
          <div class="ocm_card_content flex items-center gap-6 w-full">
  <!-- Avatar -->
  <div class="relative shrink-0 w-20 h-20">
    <img
      :src="profileImageSrc"
      class="w-20 h-20 object-cover rounded-full border-4 border-white shadow"
      alt="Profile"
    />

    <input
      ref="photoInputRef"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleProfilePhotoSelected"
    />

    <!-- Edit Photo Icon -->
    <button
      type="button"
      class="absolute -bottom-1 -right-1
            w-7 h-7 rounded-full
            bg-blue-600 text-white
            flex items-center justify-center
            shadow hover:bg-blue-700 transition"
      :disabled="isUploadingPhoto"
      @click="triggerPhotoPicker"
    >
      <!-- Camera icon -->
      <svg xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 7h4l2-3h6l2 3h4v12H3z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    </button>
  </div>

    <!-- Info -->
    <div class="space-y-3 flex-1">
      <span class="text-sm text-blue-600 font-khmer">
        {{ user.countesy.name }}
      </span>
      <br>

      <span class="text-lg font-khmer font-bold">
        {{ user.lastname }} {{ user.firstname }}
      </span>
      <br>


      <span class="text-lg font-khmer font-bold">
        {{ user.people.enlastname }} {{ user.people.enfirstname }}
      </span>
      <br>
      <span div class="text-sm 0">
        {{ user.position.name }} • {{ user.organization.name }}
      </span>
      <br>
      
    </div>
    <button
  type="button"
  class="button ocm_btn_ac button-primary t-lspace ml-auto"
  :disabled="isSaving"
  @click="handleProfileAction"
>
  {{ isSaving ? 'កំពុងរក្សាទុក...' : isEditing ? 'រក្សាទុក' : 'កែប្រែព័ត៌មាន' }}
</button>

  </div>


  <div class="ocm_card_content">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-base h t-lspace h-10 text-blue-600">
        ប្រវត្តិរូប
      </h3>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-10 text-sm">
      <!-- Row 1 -->
      <div>
        <p class="font-khmer font-bold">ត្រកូល</p>
        <p v-if="!isEditing" class="font-khmer">{{ user.lastname }}</p>
        <input v-else v-model="user.lastname" 
          type="text"
        class="border border-gray-300 rounded px-4 py-3 w-full text-lg
         focus:outline-none focus:ring-2 focus:ring-blue-500
         focus:border-blue-500 transition"
        />
      </div>
      
      <div>
        <p class="font-khmer font-bold">ឈ្មោះ</p>
       <p v-if="!isEditing" 
       class="font-khmer">{{ user.firstname }}</p>
<input
  v-else
  v-model="user.firstname"
       type="text"
   class="border border-gray-300 rounded px-4 py-3 w-full text-lg
         focus:outline-none focus:ring-2 focus:ring-blue-500
         focus:border-blue-500 transition"
/>

      </div>

      <div>
        <p class="font-khmer font-bold">តួនាទី</p>
        <p v-if="!isEditing" 
        class="font-khmer">{{ user.people.position }}</p>
<input
  v-else
  v-model="user.people.position"
  type="text"
  class="border border-gray-300 rounded px-4 py-3 w-full text-lg
         focus:outline-none focus:ring-2 focus:ring-blue-500
         focus:border-blue-500 transition"
/>
      </div>
      <div>
        <p class="font-khmer font-bold">ត្រកូល (អង់គ្លេស)</p>
        <p v-if="!isEditing" class="font-khmer">{{ user.people.enlastname }}</p>
        <input
          v-else
          v-model="user.people.enlastname"
          type="text"
           class="border border-gray-300 rounded px-4 py-3 w-full text-lg
         focus:outline-none focus:ring-2 focus:ring-blue-500
         focus:border-blue-500 transition"
          />
        </div>

      <div>
        <p class="font-khmer font-bold">ឈ្មោះ (អង់គ្លេស)</p>
        <p v-if="!isEditing" class="font-khmer">{{ user.people.enfirstname }}</p>
        <input
          v-else
          v-model="user.people.enfirstname"
          type="text"
          class="border border-gray-300 rounded px-4 py-3 w-full text-lg
         focus:outline-none focus:ring-2 focus:ring-blue-500
         focus:border-blue-500 transition"
        />
      </div>


      <!-- Row 2 -->
      <div>
        <p class="font-khmer font-bold">អ៊ីមែល</p>
        <p v-if="!isEditing" 
        class="font-khmer">{{ user.people.email }}</p>
<input
  v-else
  v-model="user.people.email"
  type="email"
  class="border border-gray-300 rounded px-4 py-3 w-full text-lg
         focus:outline-none focus:ring-2 focus:ring-blue-500
         focus:border-blue-500 transition"
/>
      </div>
      <div>
        <p class="font-khmer font-bold">ទូរស័ព្ទដៃ</p>
        <p v-if="!isEditing" class="font-khmer">{{ user.people.office_phone }}</p>
        <input
          v-else
          v-model="user.people.office_phone"
          type="tel"
          class="border border-gray-300 rounded px-4 py-3 w-full text-lg
         focus:outline-none focus:ring-2 focus:ring-blue-500
         focus:border-blue-500 transition"
        />
      </div>

    </div>
  </div>

</div>
<p v-else>កំពុងផ្ទុកព័ត៌មាន...</p>
    </div>
  </div>
    <div class="ocm_card_wr relative -top-5">
      <div class="ocm_card_content">
         <div class="flex items-center justify-between mb-6">
    <h3 class="text-base h t-lspace h-10 text-blue-600">
      ប្រវត្តិរូបផ្ទាល់ខ្លួន
    </h3>
  </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-10 text-sm">
        <div>
          <p class="font-khmer font-bold">អាសយដ្ឋាន</p>
         <p v-if="!isEditing" class="font-khmer">
  {{ user.people.address || 'មិនមានទិន្នន័យ' }}
</p>
<input
  v-else
  v-model="user.people.address"
  type="text"
  class="border border-gray-300 rounded px-4 py-3 w-full text-lg
         focus:outline-none focus:ring-2 focus:ring-blue-500
         focus:border-blue-500 transition"
/>

        </div>
        <div>
          <p class="font-khmer font-bold">ទូរស័ព្ទនៅផ្ទះ</p>
          <p v-if="!isEditing" class="font-khmer">
  {{ user.people.mobile_phone || 'មិនមានទិន្នន័យ' }}
</p>
<input
  v-else
  v-model="user.people.mobile_phone"
  type="tel"
  class="border border-gray-300 rounded px-4 py-3 w-full text-lg
         focus:outline-none focus:ring-2 focus:ring-blue-500
         focus:border-blue-500 transition"
/>

        </div>

           <div>
      <p class="font-khmer font-bold">ថ្ងៃ ខែ ឆ្នាំ កំណើត</p>
     <p v-if="!isEditing" class="font-khmer">{{ user.people.dob }}</p>
<input
  v-else
  v-model="user.people.dob"
  type="date"
  class="border border-gray-300 rounded px-4 py-3 w-full text-lg
         focus:outline-none focus:ring-2 focus:ring-blue-500
         focus:border-blue-500 transition"
/>

      </div>
      <!-- Row 2 -->
        <div>
  <p class="font-khmer font-bold mb-2">ស្ថានភាពគ្រួសារ</p>

  <div v-if="isEditing" class="flex flex-wrap items-center gap-6 text-sm font-khmer">
    <label class="flex items-center gap-2 cursor-pointer">
      <input v-model="user.people.marry_status" type="radio" value="single" />
      <span>នៅលីវ</span>
    </label>
    <label class="flex items-center gap-2 cursor-pointer">
      <input v-model="user.people.marry_status" type="radio" value="married" />
      <span>រៀបការរួច</span>
    </label>
    <label class="flex items-center gap-2 cursor-pointer">
      <input v-model="user.people.marry_status" type="radio" value="other" />
      <span>ផ្សេងៗ</span>
    </label>
  </div>

 <div v-else class="flex items-center gap-8 text-sm font-khmer">

  <!-- Single -->
  <label class="flex items-center gap-2">
    <div
      class="w-4 h-4 rounded-full border flex items-center justify-center"
      :class="user.people.marry_status === 'single'
        ? 'border-blue-600'
        : 'border-gray-400'"
    >
      <div
        v-if="user.people.marry_status === 'single'"
        class="w-2.5 h-2.5 rounded-full bg-blue-600"
      ></div>
    </div>
    <span
      :class="user.people.marry_status === 'single'
        ? 'text-blue-600 font-bold'
        : ''"
    >
      នៅលីវ
    </span>
  </label>

  <!-- Married -->
  <label class="flex items-center gap-2">
    <div
      class="w-4 h-4 rounded-full border flex items-center justify-center"
      :class="user.people.marry_status === 'married'
        ? 'border-blue-600'
        : 'border-gray-400'"
    >
      <div
        v-if="user.people.marry_status === 'married'"
        class="w-2.5 h-2.5 rounded-full bg-blue-600"
      ></div>
    </div>
    <span
      :class="user.people.marry_status === 'married'
        ? 'text-blue-600 font-bold'
        : ''"
    >
      រៀបការរួច
    </span>
  </label>

  <!-- Other -->
  <label class="flex items-center gap-2">
    <div
      class="w-4 h-4 rounded-full border flex items-center justify-center"
      :class="user.people.marry_status === 'other'
        ? 'border-blue-600'
        : 'border-gray-400'"
    >
      <div
        v-if="user.people.marry_status === 'other'"
        class="w-2.5 h-2.5 rounded-full bg-blue-600"
      ></div>
    </div>
    <span
      :class="user.people.marry_status === 'other'
        ? 'text-blue-600 font-bold'
        : ''"
    >
      ផ្សេងៗ
    </span>
  </label>

</div>
</div>

      
      </div>
      </div>
    </div>
  <Footer />
</div>
</section>
</template>

<script setup>

import axios from 'axios'
import { computed, ref, onMounted } from 'vue'
import { toast } from 'vue-sonner'
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
import { authLogout, getAuthorization, getUser, setUser } from '@/plugins/authentication'


function createEmptyUser() {
  return {
    id: '',
    avatar_url: '',
    firstname: '',
    lastname: '',
    countesy: { name: '' },
    people: {
      id: '',
      enfirstname: '',
      enlastname: '',
      gender: '',
      dob: '',
      email: '',
      office_phone: '',
      mobile_phone: '',
      address: '',
      marry_status: 'single'
    },
    position: { name: '' },
    organization: { name: '' }
  }
}

function cloneDeep(value) {
  return JSON.parse(JSON.stringify(value))
}

function normalizeUser(storedUser = {}) {
  const emptyUser = createEmptyUser()

  return {
    ...emptyUser,
    ...storedUser,
    countesy: {
      ...emptyUser.countesy,
      ...(storedUser.countesy || {})
    },
    people: {
      ...emptyUser.people,
      ...(storedUser.people || {})
    },
    position: {
      ...emptyUser.position,
      ...(storedUser.position || {})
    },
    organization: {
      ...emptyUser.organization,
      ...(storedUser.organization || {})
    }
  }
}

const API_SERVER = (import.meta.env.VITE_API_SERVER || '').replace(/\/$/, '')
const API_BASE_URL = API_SERVER.replace(/\/api\/authcenter$/i, '')
const user = ref(createEmptyUser())
const originalUser = ref(createEmptyUser())
const isEditing = ref(false)
const isSaving = ref(false)
const isUploadingPhoto = ref(false)
const photoInputRef = ref(null)

const resolveAvatarUrl = (value) => {
  const source = typeof value === 'string' ? value.trim() : ''

  if (!source) {
    return ''
  }

  if (
    source.startsWith('http://') ||
    source.startsWith('https://') ||
    source.startsWith('data:') ||
    source.startsWith('blob:')
  ) {
    return source
  }

  if (source.startsWith('/storage/')) {
    return `${API_BASE_URL}${source}`
  }

  if (source.startsWith('storage/')) {
    return `${API_BASE_URL}/${source}`
  }

  if (source.startsWith('/')) {
    return `${API_BASE_URL}${source}`
  }

  return `${API_BASE_URL}/storage/${source.replace(/^storage\//, '')}`
}

const profileImageSrc = computed(() => {
  return (
    resolveAvatarUrl(user.value.avatar_url) ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(`${user.value.firstname || ''} ${user.value.lastname || ''}`.trim())}`
  )
})

const getRequestHeaders = () => ({
  Authorization: getAuthorization(),
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
})

const syncStoredUser = (nextUser) => {
  const normalized = normalizeUser(nextUser)
  user.value = normalized
  originalUser.value = cloneDeep(normalized)
  setUser(normalized)
}

const buildUserPayload = () => ({
  id: user.value.id || undefined,
  firstname: user.value.firstname || '',
  lastname: user.value.lastname || ''
})

const toInteger = (value, fallback = 0) => {
  const parsed = Number.parseInt(value, 10)
  return Number.isInteger(parsed) ? parsed : fallback
}

const buildPeoplePayload = () => {
  const currentPeople = user.value.people || {}
  const originalPeople = originalUser.value.people || {}

  return {
    ...originalPeople,
    ...currentPeople,
    id: currentPeople.id || originalPeople.id || undefined,
    user_id: user.value.id || originalUser.value.id || undefined,
    firstname: user.value.firstname || originalPeople.firstname || '',
    lastname: user.value.lastname || originalPeople.lastname || '',
    enfirstname: currentPeople.enfirstname || '',
    enlastname: currentPeople.enlastname || '',
    gender: currentPeople.gender || originalPeople.gender || 1,
    dob: currentPeople.dob || '',
    email: currentPeople.email || '',
    office_phone: currentPeople.office_phone || '',
    mobile_phone: currentPeople.mobile_phone || '',
    address: currentPeople.address || '',
    marry_status: currentPeople.marry_status || 'single',
    nid: currentPeople.nid || originalPeople.nid || '',
    pob: currentPeople.pob || originalPeople.pob || '',
    current_address: currentPeople.current_address || originalPeople.current_address || '',
    address_province_id: toInteger(currentPeople.address_province_id ?? originalPeople.address_province_id),
    address_district_id: toInteger(currentPeople.address_district_id ?? originalPeople.address_district_id),
    address_commune_id: toInteger(currentPeople.address_commune_id ?? originalPeople.address_commune_id),
    address_village_id: toInteger(currentPeople.address_village_id ?? originalPeople.address_village_id),
    current_address_province_id: toInteger(currentPeople.current_address_province_id ?? originalPeople.current_address_province_id),
    current_address_district_id: toInteger(currentPeople.current_address_district_id ?? originalPeople.current_address_district_id),
    current_address_commune_id: toInteger(currentPeople.current_address_commune_id ?? originalPeople.current_address_commune_id),
    current_address_village_id: toInteger(currentPeople.current_address_village_id ?? originalPeople.current_address_village_id),
    pob_province_id: toInteger(currentPeople.pob_province_id ?? originalPeople.pob_province_id),
    pob_district_id: toInteger(currentPeople.pob_district_id ?? originalPeople.pob_district_id),
    pob_commune_id: toInteger(currentPeople.pob_commune_id ?? originalPeople.pob_commune_id),
    pob_village_id: toInteger(currentPeople.pob_village_id ?? originalPeople.pob_village_id)
  }
}

const validateProfile = () => {
  if (!user.value.lastname?.trim() || !user.value.firstname?.trim()) {
    return 'សូមបំពេញគោត្តនាម និងឈ្មោះ។'
  }

  if (user.value.people.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.value.people.email)) {
    return 'អ៊ីមែលមិនត្រឹមត្រូវទេ។'
  }

  return ''
}

const extractResponseRecord = (response) => {
  return response?.data?.record || response?.data?.data || {}
}

const extractUploadedAvatarUrl = (response) => {
  const data = response?.data || {}
  const record = data?.record || data?.data || {}

  return resolveAvatarUrl(
    record?.avatar_url ||
    record?.image_url ||
    record?.photo_url ||
    record?.url ||
    data?.avatar_url ||
    data?.image_url ||
    data?.photo_url ||
    data?.url ||
    record?.avatar ||
    record?.image ||
    record?.photo ||
    data?.avatar ||
    data?.image ||
    data?.photo ||
    ''
  )
}

const updateWithFallback = async (endpoints, payload, retryStatuses = [404]) => {
  let lastError = null

  for (const endpoint of endpoints) {
    try {
      return await axios.put(endpoint, payload, {
        headers: getRequestHeaders()
      })
    } catch (error) {
      lastError = error

      if (!retryStatuses.includes(error?.response?.status)) {
        throw error
      }
    }
  }

  throw lastError || new Error('Unable to update profile')
}

const uploadWithFallback = async (endpoints, formData, retryStatuses = [404]) => {
  let lastError = null

  for (const endpoint of endpoints) {
    try {
      return await axios.post(endpoint, formData, {
        headers: {
          Authorization: getAuthorization(),
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    } catch (error) {
      lastError = error

      if (!retryStatuses.includes(error?.response?.status)) {
        throw error
      }
    }
  }

  throw lastError || new Error('Unable to upload profile photo')
}

const createProfilePhotoFormData = (file, fieldName) => {
  const formData = new FormData()
  formData.append(fieldName, file, file.name || 'profile-photo')

  if (user.value.id) {
    formData.append('id', String(user.value.id))
    formData.append('user_id', String(user.value.id))
  }

  return formData
}

const uploadProfilePhoto = async (file) => {
  const endpoint = `${API_SERVER}/users/profile/photo/change`
  const fieldNames = ['image', 'photo', 'avatar']
  let lastError = null

  for (const fieldName of fieldNames) {
    try {
      return await uploadWithFallback([
        endpoint
      ], createProfilePhotoFormData(file, fieldName), [400, 404, 415, 422, 500])
    } catch (error) {
      lastError = error

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        throw error
      }
    }
  }

  throw lastError || new Error('Unable to upload profile photo')
}

const triggerPhotoPicker = () => {
  photoInputRef.value?.click()
}

const handleProfilePhotoSelected = async (event) => {
  const [file] = Array.from(event?.target?.files || [])

  if (!file) {
    return
  }

  if (!file.type.startsWith('image/')) {
    toast.error('សូមជ្រើសរើសតែឯកសាររូបភាពប៉ុណ្ណោះ។')
    event.target.value = ''
    return
  }

  if (!getAuthorization()) {
    authLogout()
    toast.error('សម័យចូលប្រព័ន្ធផុតកំណត់', {
      description: 'សូមចូលប្រព័ន្ធម្ដងទៀត។'
    })
    event.target.value = ''
    return
  }

  isUploadingPhoto.value = true

  try {
    const response = await uploadProfilePhoto(file)

    const latestStoredUser = getUser() || {}
    const responseRecord = extractResponseRecord(response)
    const uploadedAvatarUrl = extractUploadedAvatarUrl(response)
    const nextUser = normalizeUser({
      ...latestStoredUser,
      ...user.value,
      ...responseRecord,
      avatar_url: uploadedAvatarUrl || responseRecord.avatar_url || user.value.avatar_url
    })

    syncStoredUser(nextUser)
    toast.success('ប្ដូររូបភាពបានជោគជ័យ')
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      'មានបញ្ហាក្នុងការបង្ហោះរូបភាព។'

    toast.error('បង្ហោះរូបភាពមិនបាន', {
      description: message
    })
  } finally {
    isUploadingPhoto.value = false
    event.target.value = ''
  }
}

const saveProfile = async () => {
  const validationMessage = validateProfile()

  if (validationMessage) {
    toast.error('មិនអាចរក្សាទុកបាន', {
      description: validationMessage
    })
    return
  }

  if (!getAuthorization()) {
    authLogout()
    toast.error('សម័យចូលប្រព័ន្ធផុតកំណត់', {
      description: 'សូមចូលប្រព័ន្ធម្ដងទៀត។'
    })
    return
  }

  isSaving.value = true

  try {
    const requests = [
      updateWithFallback([
        `${API_SERVER}/users/authenticated`,
        `${API_SERVER}/users/update`
      ], buildUserPayload()),
      updateWithFallback([
        `${API_SERVER}/people/update`,
        `${API_SERVER}/users/people/update`,
        `${API_SERVER}/people/authenticated`
      ], buildPeoplePayload(), [403, 404, 500])
    ]

    const [userResponse, peopleResponse] = await Promise.all(requests)
    const latestStoredUser = getUser() || {}
    const nextUser = normalizeUser({
      ...latestStoredUser,
      ...user.value,
      ...extractResponseRecord(userResponse),
      people: {
        ...(latestStoredUser.people || {}),
        ...user.value.people,
        ...extractResponseRecord(peopleResponse)
      }
    })

    syncStoredUser(nextUser)
    isEditing.value = false

    toast.success('រក្សាទុកបានជោគជ័យ')
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      'មានបញ្ហាក្នុងការរក្សាទុកព័ត៌មានផ្ទាល់ខ្លួន។'

    toast.error('រក្សាទុកមិនបាន', {
      description: message
    })
  } finally {
    isSaving.value = false
  }
}

const handleProfileAction = async () => {
  if (!isEditing.value) {
    originalUser.value = cloneDeep(user.value)
    isEditing.value = true
    return
  }

  await saveProfile()
}

onMounted(() => {
  syncStoredUser(getUser() || createEmptyUser())
})

</script>
