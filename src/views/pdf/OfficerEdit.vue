<template>
  <Header :title="pageTitle" />
  <section class="appppw">
    <Aside />
    <div class="sw">
      <div class="app_content officer-edit-page">
        <div class="officer-edit-shell">
          <div class="officer-edit-header">
            <div>
              <p class="officer-edit-label">គ្រប់គ្រងទិន្នន័យមន្ត្រី</p>
              <h2 class="officer-edit-title t-lspace">{{ pageTitle }}</h2>
            </div>

            <router-link class="officer-back-link" to="/pdf/official-management">
              ត្រឡប់ទៅបញ្ជីមន្ត្រី
            </router-link>
          </div>

          <form class="officer-edit-form" @submit.prevent="saveOfficer">
            <div v-if="errorMessage" class="officer-edit-alert error">{{ errorMessage }}</div>
            <div v-else-if="successMessage" class="officer-edit-alert success">{{ successMessage }}</div>

            <div v-if="loading" class="officer-edit-loading">កំពុងទាញយកព័ត៌មានមន្ត្រី...</div>

            <div v-else class="officer-edit-grid">
              <label class="officer-field">
                <span class="officer-field-label">ឈ្មោះខ្មែរ</span>
                <input v-model="form.full_name" type="text" class="form-control" required />
              </label>

              <label class="officer-field">
                <span class="officer-field-label">ឈ្មោះឡាតាំង</span>
                <input v-model="form.full_name_en" type="text" class="form-control" />
              </label>

              <label class="officer-field">
                <span class="officer-field-label">កូដមន្ត្រី</span>
                <input v-model="form.code" type="text" class="form-control" required />
              </label>

              <label class="officer-field">
                <span class="officer-field-label">ថ្ងៃតាំងជាផ្លូវការ</span>
                <input v-model="form.official_date" type="date" class="form-control" />
              </label>

              <label class="officer-field">
                <span class="officer-field-label">អ៊ីមែល</span>
                <input v-model="form.email" type="email" class="form-control" />
              </label>

              <label class="officer-field">
                <span class="officer-field-label">លេខទូរស័ព្ទ</span>
                <input v-model="form.phone" type="text" class="form-control" />
              </label>

              <label class="officer-field">
                <span class="officer-field-label">ភេទ</span>
                <select v-model="form.gender" class="form-control">
                  <option value="">ជ្រើសរើសភេទ</option>
                  <option value="male">ប្រុស</option>
                  <option value="female">ស្រី</option>
                </select>
              </label>

              <label class="officer-field officer-field--wide">
                <span class="officer-field-label">តួនាទី និងអង្គភាពបច្ចុប្បន្ន</span>
                <select
                  v-if="organizationStructurePositionDisplayOptions.length"
                  v-model="form.organization_structure_position_id"
                  class="form-control"
                  @change="syncOrganizationStructureSelection"
                >
                  <option value="">ជ្រើសរើសតួនាទី និងអង្គភាព</option>
                  <option
                    v-for="option in organizationStructurePositionDisplayOptions"
                    :key="option.id"
                    :value="String(option.id)"
                  >
                    {{ option.label }}
                  </option>
                </select>
                <div v-else class="officer-field-stack">
                  <select v-model="form.current_position" class="form-control" @change="syncOrganizationStructureIdFromNames">
                    <option value="">ជ្រើសរើសតួនាទី</option>
                    <option v-for="position in availableOfficerPositions" :key="position" :value="position">{{ position }}</option>
                  </select>
                  <select v-model="form.current_organization" class="form-control" @change="syncOrganizationStructureIdFromNames">
                    <option value="">ជ្រើសរើសអង្គភាព</option>
                    <option v-for="organization in availableOfficerOrganizations" :key="organization" :value="organization">{{ organization }}</option>
                  </select>
                </div>
                <p v-if="form.current_position || form.current_organization" class="officer-field-help">
                  {{ form.current_position || 'មិនទាន់ជ្រើសរើសតួនាទី' }}
                  <span v-if="form.current_position && form.current_organization"> / </span>
                  {{ form.current_organization || 'មិនទាន់ជ្រើសរើសអង្គភាព' }}
                </p>
              </label>

              <label class="officer-field">
                <span class="officer-field-label">ថ្នាក់</span>
                <select v-if="rankOptions.length" v-model="form.rank_id" class="form-control" @change="syncRankSelection">
                  <option value="">ជ្រើសរើសថ្នាក់</option>
                  <option v-for="rankOption in rankOptions" :key="rankOption.id" :value="String(rankOption.id)">{{ rankOption.name }}</option>
                </select>
                <select v-else v-model="form.rank" class="form-control">
                  <option value="">ជ្រើសរើសថ្នាក់</option>
                  <option v-for="rank in officerRanks" :key="rank" :value="rank">{{ rank }}</option>
                </select>
              </label>

              <label class="officer-field">
                <span class="officer-field-label">ប្រភេទមន្ត្រី</span>
                <input v-model="form.officer_type" type="text" class="form-control" />
              </label>

              <label class="officer-field">
                <span class="officer-field-label">ថ្នាក់ប្រាក់ខែ</span>
                <input v-model="form.salary_rank" type="text" class="form-control" />
              </label>

              <label class="officer-field">
                <span class="officer-field-label">ខេត្តកំណើត</span>
                <select v-model="form.province" class="form-control">
                  <option value="">ជ្រើសរើសខេត្ត</option>
                  <option v-for="province in officerProvinces" :key="province" :value="province">{{ province }}</option>
                </select>
              </label>

              <label class="officer-field officer-field--wide">
                <span class="officer-field-label">រូបភាព</span>
                <div class="officer-image-upload">
                  <div v-if="imagePreviewSrc" class="officer-image-preview-wrap">
                    <img :src="imagePreviewSrc" alt="Officer preview" class="officer-image-preview" />
                  </div>

                  <div class="officer-image-upload-actions">
                    <input
                      ref="imageInputRef"
                      type="file"
                      class="officer-image-input"
                      accept="image/*"
                      @change="handleImageSelected"
                    />
                    <button
                      type="button"
                      class="officer-action-btn upload"
                      :disabled="uploadingImage"
                      @click="triggerImagePicker"
                    >
                      {{ uploadingImage ? 'កំពុងបញ្ចូល...' : hasImage ? 'ប្ដូររូបភាព' : 'បញ្ចូលរូបភាព' }}
                    </button>
                    <button
                      v-if="hasImage"
                      type="button"
                      class="officer-action-btn remove-image"
                      :disabled="uploadingImage"
                      @click="clearImage"
                    >
                      លុបរូបភាព
                    </button>
                  </div>

                  <p class="officer-image-help">ជ្រើសរើសរូបភាព 4X6 សង់ទីម៉ែត្រ</p>
                </div>
              </label>

            </div>

            <div class="officer-edit-actions">
              <router-link class="officer-action-btn cancel" to="/pdf/official-management">បោះបង់</router-link>
              <button class="officer-action-btn save" type="submit" :disabled="saving || loading || uploadingImage">
                {{ saving ? 'កំពុងរក្សាទុក...' : 'រក្សាទុក' }}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  </section>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { officerPositions } from '@/data/positions.js'
import { officerOrganizations } from '@/data/organizations.js'
import { officerRanks } from '@/data/ranks.js'
import { officerProvinces } from '@/data/provinces.js'
import { authLogout, getAccessToken as readAccessToken, getToken } from '@/plugins/authentication'

const API_SERVER = (import.meta.env.VITE_API_SERVER || '/api/authcenter').replace(/\/$/, '')
const AUTH_API_BASE_URL = /^https?:\/\//i.test(API_SERVER)
  ? API_SERVER
  : new URL(API_SERVER, window.location.origin).toString().replace(/\/$/, '')
const DIRECT_AUTH_API_BASE_URL = /^https?:\/\//i.test(API_SERVER)
  ? API_SERVER
  : new URL(API_SERVER, import.meta.env.VITE_API_PROXY_TARGET || window.location.origin).toString().replace(/\/$/, '')
const API_BASE_URL = AUTH_API_BASE_URL.replace(/\/api\/authcenter$/i, '')
const ASSET_BASE_URL = API_BASE_URL

const route = useRoute()
const router = useRouter()

function createEmptyForm() {
  return {
    id: '',
    public_key: '',
    full_name: '',
    full_name_en: '',
    code: '',
    official_date: '',
    email: '',
    phone: '',
    gender: '',
    organization_structure_position_id: '',
    current_position: '',
    current_organization: '',
    rank_id: '',
    rank: '',
    officer_type: '',
    salary_rank: '',
    province: '',
    image: '',
    image_path: '',
    raw: null,
  }
}

const form = reactive(createEmptyForm())
const loading = ref(false)
const saving = ref(false)
const uploadingImage = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const organizationStructurePositionOptions = ref([])
const rankOptions = ref([])
const imageInputRef = ref(null)

const isEditMode = computed(() => Boolean(route.query.id))
const pageTitle = computed(() => (isEditMode.value ? 'កែប្រែព័ត៌មានមន្ត្រី' : 'បន្ថែមព័ត៌មានមន្ត្រី'))
const hasImage = computed(() => Boolean(form.image || form.image_path))
const imagePreviewSrc = computed(() => resolveImageUrl(form.image || form.image_path))
const availableOfficerPositions = computed(() => {
  if (!organizationStructurePositionOptions.value.length) {
    return officerPositions
  }

  return Array.from(new Set(organizationStructurePositionOptions.value.map((option) => option.positionName).filter(Boolean)))
})
const availableOfficerOrganizations = computed(() => {
  if (!organizationStructurePositionOptions.value.length) {
    return officerOrganizations
  }

  return Array.from(new Set(organizationStructurePositionOptions.value.map((option) => option.organizationName).filter(Boolean)))
})
const organizationStructurePositionDisplayOptions = computed(() => {
  return organizationStructurePositionOptions.value.map((option) => ({
    ...option,
    label: option.label || [option.organizationName, option.positionName].filter(Boolean).join(' / '),
  }))
})

function assignForm(values) {
  Object.assign(form, createEmptyForm(), values)
}

function getOfficerEditCacheKey(id) {
  const normalizedId = String(id || '').trim()
  return normalizedId ? `officer-edit:${normalizedId}` : ''
}

function readCachedOfficer(id) {
  const cacheKey = getOfficerEditCacheKey(id)
  if (!cacheKey) {
    return null
  }

  try {
    const cachedValue = window.sessionStorage.getItem(cacheKey)
    return cachedValue ? JSON.parse(cachedValue) : null
  } catch (error) {
    console.warn('Unable to read cached officer record', {
      id,
      error,
    })
    return null
  }
}

function writeCachedOfficer(officer) {
  const cacheKey = getOfficerEditCacheKey(officer?.id)
  if (!cacheKey) {
    return
  }

  try {
    window.sessionStorage.setItem(cacheKey, JSON.stringify(officer))
  } catch (error) {
    console.warn('Unable to cache officer record', {
      id: officer?.id,
      error,
    })
  }
}

function getAccessToken() {
  const token = getToken()
  if (token?.access_token) {
    return token.access_token
  }

  return readAccessToken()
}

function ensureAuthenticated() {
  if (getAccessToken()) {
    return true
  }

  errorMessage.value = 'សូមចូលប្រព័ន្ធជាមុនសិន។'
  authLogout()
  router.push('/login')
  return false
}

function getHeaders() {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }

  const token = getAccessToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

function getUploadHeaders() {
  const headers = {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }

  const token = getAccessToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

function buildApiUrl(path, query = {}) {
  const baseUrl = path.startsWith('/api/authcenter') ? API_BASE_URL : AUTH_API_BASE_URL
  const url = new URL(`${baseUrl}${path}`)
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })
  return url.toString()
}

function buildDirectAuthApiUrl(path, query = {}) {
  const url = new URL(`${DIRECT_AUTH_API_BASE_URL}${path}`)
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })
  return url.toString()
}

function resolveImageUrl(value) {
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

function normalizeImagePath(value) {
  const source = typeof value === 'string' ? value.trim() : ''

  if (!source || source.startsWith('data:') || source.startsWith('blob:')) {
    return ''
  }

  if (source.startsWith('http://') || source.startsWith('https://')) {
    try {
      const url = new URL(source)
      const path = url.pathname || ''
      if (path.startsWith('/storage/')) {
        return path.replace(/^\/storage\//, '')
      }
      return path.replace(/^\//, '')
    } catch {
      return ''
    }
  }

  if (source.startsWith('/storage/')) {
    return source.replace(/^\/storage\//, '')
  }

  if (source.startsWith('storage/')) {
    return source.replace(/^storage\//, '')
  }

  return source.replace(/^\//, '')
}

function getOfficerImagePath(officer, people) {
  return normalizeImagePath(
    people?.image ||
    people?.image_url ||
    people?.photo ||
    people?.photo_url ||
    officer?.image ||
    officer?.image_url ||
    officer?.photo ||
    officer?.photo_url ||
    officer?.avatar_url ||
    officer?.user?.avatar_url ||
    officer?.user?.image ||
    '',
  )
}

function getOfficerImage(officer, people) {
  return resolveImageUrl(
    officer?.image ||
    officer?.image_url ||
    officer?.photo ||
    officer?.photo_url ||
    officer?.avatar_url ||
    officer?.user?.avatar_url ||
    officer?.user?.image ||
    people?.image ||
    people?.image_url ||
    people?.photo ||
    people?.photo_url ||
    '',
  )
}

function formatGender(gender) {
  if (gender === 1 || gender === '1' || gender === 'male' || gender === 'ប្រុស') return 'male'
  if (gender === 2 || gender === '2' || gender === 'female' || gender === 'ស្រី') return 'female'
  return ''
}

function toApiGender(gender) {
  if (gender === 'male') return 1
  if (gender === 'female') return 2
  return gender || null
}

function parseNullableInt(value) {
  const parsed = Number.parseInt(value, 10)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null
}

function normalizeLookupValue(value) {
  return String(value || '')
    .normalize('NFC')
    .replace(/\s+/gu, ' ')
    .trim()
}

function getCurrentPosition(officer) {
  return (
    officer?.current_job?.organization_structure_position?.position?.name ||
    officer?.current_job?.organizationStructurePosition?.position?.name ||
    officer?.jobs?.[0]?.organization_structure_position?.position?.name ||
    officer?.jobs?.[0]?.organizationStructurePosition?.position?.name ||
    ''
  )
}

function getCurrentOrganization(officer) {
  return (
    officer?.current_job?.organization_structure_position?.organization_structure?.organization?.name ||
    officer?.current_job?.organizationStructurePosition?.organizationStructure?.organization?.name ||
    officer?.jobs?.[0]?.organization_structure_position?.organization_structure?.organization?.name ||
    officer?.jobs?.[0]?.organizationStructurePosition?.organizationStructure?.organization?.name ||
    ''
  )
}

function getBirthProvince(people) {
  return people?.pobProvince?.name_kh || people?.pobProvince?.name_en || people?.pobDistrict?.name_kh || people?.pob || ''
}

function splitName(fullName) {
  const tokens = String(fullName || '').trim().split(/\s+/).filter(Boolean)
  if (!tokens.length) {
    return { lastname: '', firstname: '' }
  }
  if (tokens.length === 1) {
    return { lastname: tokens[0], firstname: tokens[0] }
  }
  return {
    lastname: tokens[0],
    firstname: tokens.slice(1).join(' '),
  }
}

function normalizeOfficer(officer) {
  const people = officer?.people || {}
  const khName = [people.lastname, people.firstname].filter(Boolean).join(' ')
  const fullNameEn = [people.enlastname, people.enfirstname].filter(Boolean).join(' ')
  const fallbackName = [officer?.user?.lastname, officer?.user?.firstname].filter(Boolean).join(' ')
  const fullName = khName || fullNameEn || fallbackName
  const currentJob = officer?.current_job || officer?.currentJob || {}
  const organizationStructurePosition = currentJob?.organization_structure_position || currentJob?.organizationStructurePosition || officer?.jobs?.[0]?.organization_structure_position || officer?.jobs?.[0]?.organizationStructurePosition || {}
  const rank = officer?.rank || {}

  return {
    id: officer?.id || '',
    public_key: officer?.public_key || '',
    full_name: fullName || '',
    full_name_en: fullNameEn || '',
    code: officer?.code || '',
    official_date: officer?.official_date && officer.official_date !== '-' ? officer.official_date : '',
    email: officer?.email || people?.email || officer?.user?.email || '',
    phone: officer?.phone || people?.mobile_phone || officer?.user?.phone || '',
    gender: formatGender(people?.gender),
    organization_structure_position_id: organizationStructurePosition?.id ? String(organizationStructurePosition.id) : '',
    current_position: getCurrentPosition(officer),
    current_organization: getCurrentOrganization(officer),
    rank_id: rank?.id ? String(rank.id) : '',
    rank: officer?.rank?.name || officer?.rank?.rank || '',
    officer_type: officer?.officer_type && officer.officer_type !== '-' ? officer.officer_type : '',
    salary_rank: officer?.salary_rank && officer.salary_rank !== '-' ? officer.salary_rank : '',
    province: getBirthProvince(people),
    image: getOfficerImage(officer, people),
    image_path: getOfficerImagePath(officer, people),
    raw: officer || null,
  }
}

function extractRecords(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.records)) return data.records
  if (Array.isArray(data?.data?.records)) return data.data.records
  if (Array.isArray(data?.data)) return data.data
  return []
}

function normalizeOrganizationStructurePositionOption(record) {
  const organizationStructure = record?.organization_structure || record?.organizationStructure || {}
  const organization = organizationStructure?.organization || {}
  const position = record?.position || {}
  const id = parseNullableInt(record?.id)

  if (!id) {
    return null
  }

  return {
    id,
    organizationId: parseNullableInt(organization?.id),
    positionId: parseNullableInt(position?.id),
    positionName: position?.name || '',
    organizationName: organization?.name || '',
    label: [organization?.name, position?.name].filter(Boolean).join(' / '),
  }
}

function normalizeRankOption(record) {
  const id = parseNullableInt(record?.id)
  const name = record?.name || record?.rank || ''

  if (!id || !name) {
    return null
  }

  return { id, name }
}

async function tryLoadRecords(urls) {
  for (const url of urls) {
    const { response, data } = await requestJson(url, {
      method: 'GET',
      headers: getHeaders(),
    })

    if (!response.ok || data?.ok === false) {
      continue
    }

    const records = extractRecords(data)
    if (records.length) {
      return records
    }
  }

  return []
}

async function loadOrganizationStructurePositionOptions() {
  const records = await tryLoadRecords([
    buildApiUrl('/organization_structures_position', { perPage: 1000 }),
    buildApiUrl('/organization_structures_position'),
    buildApiUrl('/api/authcenter/organization_structures_position', { perPage: 1000 }),
  ])

  organizationStructurePositionOptions.value = records
    .map(normalizeOrganizationStructurePositionOption)
    .filter(Boolean)
    .sort((left, right) => left.label.localeCompare(right.label))
}

async function loadRankOptions() {
  const records = await tryLoadRecords([
    buildApiUrl('/ranks', { perPage: 1000 }),
    buildApiUrl('/ranks'),
    buildApiUrl('/api/authcenter/ranks', { perPage: 1000 }),
  ])

  rankOptions.value = records
    .map(normalizeRankOption)
    .filter(Boolean)
    .sort((left, right) => left.name.localeCompare(right.name))
}

function syncOrganizationStructureSelection() {
  const selectedId = parseNullableInt(form.organization_structure_position_id)
  const selectedOption = organizationStructurePositionOptions.value.find((option) => option.id === selectedId)

  if (!selectedOption) {
    return
  }

  form.organization_structure_position_id = String(selectedOption.id)
  form.current_position = selectedOption.positionName
  form.current_organization = selectedOption.organizationName
}

function syncOrganizationStructureIdFromNames() {
  if (!organizationStructurePositionOptions.value.length) {
    return
  }

  const normalizedPosition = normalizeLookupValue(form.current_position)
  const normalizedOrganization = normalizeLookupValue(form.current_organization)

  const matches = organizationStructurePositionOptions.value.filter((option) => {
    return normalizeLookupValue(option.positionName) === normalizedPosition
      && normalizeLookupValue(option.organizationName) === normalizedOrganization
  })

  form.organization_structure_position_id = matches.length ? String(matches[0].id) : ''
}

function syncRankSelection() {
  const selectedId = parseNullableInt(form.rank_id)
  const selectedOption = rankOptions.value.find((option) => option.id === selectedId)

  if (!selectedOption) {
    return
  }

  form.rank_id = String(selectedOption.id)
  form.rank = selectedOption.name
}

function hydrateFormRelations() {
  if (form.organization_structure_position_id) {
    syncOrganizationStructureSelection()
  } else {
    syncOrganizationStructureIdFromNames()
  }

  if (form.rank_id) {
    syncRankSelection()
  }
}

function flattenErrorMessages(errors) {
  if (!errors) {
    return []
  }

  if (Array.isArray(errors)) {
    return errors.flatMap((entry) => flattenErrorMessages(entry))
  }

  if (typeof errors === 'object') {
    return Object.values(errors).flatMap((entry) => flattenErrorMessages(entry))
  }

  if (typeof errors === 'string' && errors.trim()) {
    return [errors.trim()]
  }

  return []
}

function getApiErrorMessage(data, fallbackMessage) {
  const validationMessages = flattenErrorMessages(data?.errors || data?.data?.errors)
  if (validationMessages.length) {
    return validationMessages.join('\n')
  }

  const details = [
    data?.message,
    data?.error,
    data?.rawText,
  ].filter((value) => typeof value === 'string' && value.trim())

  if (details.length) {
    return details.join('\n')
  }

  if (data?.status) {
    return `${fallbackMessage} (HTTP ${data.status})`
  }

  return fallbackMessage
}

function extractUploadedImagePath(data) {
  return normalizeImagePath(
    data?.record?.image ||
    data?.record?.image_url ||
    data?.record?.image_path ||
    data?.record?.photo ||
    data?.record?.photo_url ||
    data?.record?.url ||
    data?.record?.path ||
    data?.data?.image ||
    data?.data?.image_url ||
    data?.data?.image_path ||
    data?.data?.photo ||
    data?.data?.photo_url ||
    data?.data?.url ||
    data?.data?.path ||
    data?.image ||
    data?.image_url ||
    data?.image_path ||
    data?.photo ||
    data?.photo_url ||
    data?.url ||
    data?.path ||
    ''
  )
}

function extractUploadedImageUrl(data) {
  return resolveImageUrl(
    data?.record?.url ||
    data?.record?.image_url ||
    data?.record?.photo_url ||
    data?.data?.url ||
    data?.data?.image_url ||
    data?.data?.photo_url ||
    data?.url ||
    data?.image_url ||
    data?.photo_url ||
    extractUploadedImagePath(data) ||
    ''
  )
}

function triggerImagePicker() {
  imageInputRef.value?.click()
}

function clearImage() {
  form.image = ''
  form.image_path = ''
  if (imageInputRef.value) {
    imageInputRef.value.value = ''
  }
}

function createOfficerImageFormData(file) {
  const formData = new FormData()
  formData.append('image', file, file.name || 'officer-image')
  return formData
}

async function uploadOfficerImage(file) {
  if (!(file instanceof File) || file.size <= 0) {
    throw new Error('សូមជ្រើសរើសឯកសាររូបភាពដែលត្រឹមត្រូវ។')
  }

  const formData = createOfficerImageFormData(file)

  const { response, data } = await requestJson(buildDirectAuthApiUrl('/officers/upload'), {
    method: 'POST',
    headers: getUploadHeaders(),
    body: formData,
  })

  if (!response.ok || data?.ok === false) {
    throw new Error(getApiErrorMessage(data, 'បង្ហោះរូបភាពមិនបានទេ។'))
  }

  const imagePath = extractUploadedImagePath(data)
  const imageUrl = extractUploadedImageUrl(data)
  if (!imagePath && !imageUrl) {
    throw new Error('ម៉ាស៊ីនមេមិនបានផ្ដល់ទីតាំងរូបភាពត្រឡប់មកវិញទេ។')
  }

  form.image_path = imagePath
  form.image = imageUrl || resolveImageUrl(imagePath)
}

async function handleImageSelected(event) {
  const [file] = Array.from(event.target?.files || [])
  if (!file) {
    return
  }

  if (!file.type.startsWith('image/')) {
    errorMessage.value = 'សូមជ្រើសរើសតែឯកសាររូបភាពប៉ុណ្ណោះ។'
    event.target.value = ''
    return
  }

  if (file.size <= 0) {
    errorMessage.value = 'ឯកសាររូបភាពមិនត្រឹមត្រូវទេ។'
    event.target.value = ''
    return
  }

  uploadingImage.value = true
  errorMessage.value = ''

  try {
    await uploadOfficerImage(file)
  } catch (error) {
    errorMessage.value = error.message || 'មានបញ្ហាក្នុងការបង្ហោះរូបភាព។'
  } finally {
    uploadingImage.value = false
    event.target.value = ''
  }
}

function validateForm() {
  if (!form.full_name.trim()) {
    return 'សូមបញ្ចូលឈ្មោះខ្មែរ។'
  }

  if (!form.code.trim()) {
    return 'សូមបញ្ចូលកូដមន្ត្រី។'
  }

  if (organizationStructurePositionOptions.value.length) {
    if (!form.organization_structure_position_id) {
      return 'សូមជ្រើសរើសតួនាទី និងអង្គភាពបច្ចុប្បន្ន។'
    }

    syncOrganizationStructureSelection()
  } else {
    const hasSelectedPosition = Boolean(String(form.current_position || '').trim())
    const hasSelectedOrganization = Boolean(String(form.current_organization || '').trim())

    if (!hasSelectedPosition || !hasSelectedOrganization) {
      return 'សូមជ្រើសរើសតួនាទី និងអង្គភាពបច្ចុប្បន្ន។'
    }

    return 'មិនអាចទាញយកបញ្ជីតួនាទី និងអង្គភាពពីម៉ាស៊ីនមេបានទេ។ សូមផ្ទុកទំព័រឡើងវិញ ហើយជ្រើសរើសម្តងទៀត។'
  }

  if (!form.organization_structure_position_id) {
    return 'តួនាទី និងអង្គភាពដែលបានជ្រើសមិនត្រូវគ្នានៅក្នុងបញ្ជីម៉ាស៊ីនមេទេ។ សូមជ្រើសរើសម្តងទៀត។'
  }

  return ''
}

async function loadReferenceOptions() {
  if (!ensureAuthenticated()) {
    return
  }

  try {
    await Promise.allSettled([
      loadOrganizationStructurePositionOptions(),
      loadRankOptions(),
    ])
    hydrateFormRelations()
  } catch {
    hydrateFormRelations()
  }
}

function buildPayload() {
  const rawOfficer = form.raw || {}
  const rawPeople = rawOfficer?.people || {}
  const rawCurrentJob = rawOfficer?.current_job || rawOfficer?.currentJob || rawOfficer?.jobs?.[0] || {}
  const rawOrganizationStructurePosition = rawCurrentJob?.organization_structure_position || rawCurrentJob?.organizationStructurePosition || {}
  const khName = splitName(form.full_name)
  const enName = splitName(form.full_name_en)
  const organizationStructurePositionId = parseNullableInt(form.organization_structure_position_id)
  const rankId = parseNullableInt(form.rank_id)
  const selectedRankOption = rankOptions.value.find((option) => option.id === rankId)
  const selectedOrganizationStructurePosition = organizationStructurePositionOptions.value.find(
    (option) => option.id === organizationStructurePositionId,
  )
  const rankName = form.rank || selectedRankOption?.name || null
  const fallbackDob = rawPeople?.dob || rawOfficer?.dob || null

  const peoplePayload = {
    firstname: khName.firstname || rawPeople?.firstname || rawOfficer?.firstname || '',
    lastname: khName.lastname || rawPeople?.lastname || rawOfficer?.lastname || '',
    enfirstname: enName.firstname || rawPeople?.enfirstname || '',
    enlastname: enName.lastname || rawPeople?.enlastname || '',
    gender: toApiGender(form.gender) || rawPeople?.gender || 1,
    email: form.email || rawPeople?.email || rawOfficer?.email || '',
    dob: fallbackDob || '',
    nid: rawPeople?.nid || '',
    mobile_phone: form.phone || rawPeople?.mobile_phone || rawOfficer?.phone || '',
    office_phone: rawPeople?.office_phone || '',
    marry_status: rawPeople?.marry_status || 'single',
    address: rawPeople?.address || '',
    address_province_id: parseNullableInt(rawPeople?.address_province_id) || 0,
    address_district_id: parseNullableInt(rawPeople?.address_district_id) || 0,
    address_commune_id: parseNullableInt(rawPeople?.address_commune_id) || 0,
    address_village_id: parseNullableInt(rawPeople?.address_village_id) || 0,
    current_address: rawPeople?.current_address || '',
    current_address_province_id: parseNullableInt(rawPeople?.current_address_province_id) || 0,
    current_address_district_id: parseNullableInt(rawPeople?.current_address_district_id) || 0,
    current_address_commune_id: parseNullableInt(rawPeople?.current_address_commune_id) || 0,
    current_address_village_id: parseNullableInt(rawPeople?.current_address_village_id) || 0,
    pob: form.province || rawPeople?.pob || '',
    pob_province_id: parseNullableInt(rawPeople?.pob_province_id) || 0,
    pob_district_id: parseNullableInt(rawPeople?.pob_district_id) || 0,
    pob_commune_id: parseNullableInt(rawPeople?.pob_commune_id) || 0,
    pob_village_id: parseNullableInt(rawPeople?.pob_village_id) || 0,
    body_condition: Number.parseInt(rawPeople?.body_condition, 10) || 0,
    body_condition_desp: rawPeople?.body_condition_desp || '',
    nationality: rawPeople?.nationality || '',
    national: rawPeople?.national || '',
    father_firstname: rawPeople?.father_firstname || '',
    father_lastname: rawPeople?.father_lastname || '',
    father_enfirstname: rawPeople?.father_enfirstname || '',
    father_enlastname: rawPeople?.father_enlastname || '',
    father_dob: rawPeople?.father_dob || '',
    father_nationality: rawPeople?.father_nationality || '',
    father_national: rawPeople?.father_national || '',
    father_nid: rawPeople?.father_nid || '',
    father_pob: rawPeople?.father_pob || '',
    father_address: rawPeople?.father_address || '',
    father_address_province_id: parseNullableInt(rawPeople?.father_address_province_id) || 0,
    father_address_district_id: parseNullableInt(rawPeople?.father_address_district_id) || 0,
    father_address_commune_id: parseNullableInt(rawPeople?.father_address_commune_id) || 0,
    father_address_village_id: parseNullableInt(rawPeople?.father_address_village_id) || 0,
    father_death: Number.parseInt(rawPeople?.father_death, 10) || 0,
    father_profession: rawPeople?.father_profession || '',
    mother_firstname: rawPeople?.mother_firstname || '',
    mother_lastname: rawPeople?.mother_lastname || '',
    mother_enfirstname: rawPeople?.mother_enfirstname || '',
    mother_enlastname: rawPeople?.mother_enlastname || '',
    mother_dob: rawPeople?.mother_dob || '',
    mother_nationality: rawPeople?.mother_nationality || '',
    mother_national: rawPeople?.mother_national || '',
    mother_nid: rawPeople?.mother_nid || '',
    mother_pob: rawPeople?.mother_pob || '',
    mother_address: rawPeople?.mother_address || '',
    mother_address_province_id: parseNullableInt(rawPeople?.mother_address_province_id) || 0,
    mother_address_district_id: parseNullableInt(rawPeople?.mother_address_district_id) || 0,
    mother_address_commune_id: parseNullableInt(rawPeople?.mother_address_commune_id) || 0,
    mother_address_village_id: parseNullableInt(rawPeople?.mother_address_village_id) || 0,
    mother_death: Number.parseInt(rawPeople?.mother_death, 10) || 0,
    mother_profession: rawPeople?.mother_profession || '',
    emergency_lastname: rawPeople?.emergency_lastname || '',
    emergency_firstname: rawPeople?.emergency_firstname || '',
    emergency_gender: Number.parseInt(rawPeople?.emergency_gender, 10) || 0,
    emergency_relationship: rawPeople?.emergency_relationship || '',
    emergency_profession: rawPeople?.emergency_profession || '',
    emergency_phone: rawPeople?.emergency_phone || '',
    emergency_email: rawPeople?.emergency_email || '',
    emergency_address: rawPeople?.emergency_address || '',
    emergency_address_province_id: parseNullableInt(rawPeople?.emergency_address_province_id) || 0,
    emergency_address_district_id: parseNullableInt(rawPeople?.emergency_address_district_id) || 0,
    emergency_address_commune_id: parseNullableInt(rawPeople?.emergency_address_commune_id) || 0,
    emergency_address_village_id: parseNullableInt(rawPeople?.emergency_address_village_id) || 0,
    image: form.image_path || normalizeImagePath(form.image) || normalizeImagePath(rawPeople?.image) || '',
  }

  return {
    id: form.id || undefined,
    public_key: form.public_key || undefined,
    code: form.code,
    official_date: form.official_date || null,
    unofficial_date: rawOfficer?.unofficial_date || '',
    email: form.email || null,
    phone: form.phone || null,
    passport: rawOfficer?.passport || '',
    countesy_id: parseNullableInt(rawCurrentJob?.countesy_id || rawOfficer?.countesy_id || rawOfficer?.countesy?.id) || 0,
    officer_type: form.officer_type || null,
    additional_officer_type: rawOfficer?.additional_officer_type || '',
    salary_rank: form.salary_rank || null,
    image: form.image_path || normalizeImagePath(form.image) || null,
    full_name: form.full_name,
    full_name_en: form.full_name_en || null,
    lastname: khName.lastname || null,
    firstname: khName.firstname || null,
    enlastname: enName.lastname || null,
    enfirstname: enName.firstname || null,
    mobile_phone: form.phone || null,
    gender: toApiGender(form.gender),
    pob: form.province || null,
    people: peoplePayload,
    organization_structure_position_id: organizationStructurePositionId,
    organization_id:
      selectedOrganizationStructurePosition?.organizationId ||
      parseNullableInt(
        rawOrganizationStructurePosition?.organization_structure?.organization?.id
        || rawOrganizationStructurePosition?.organizationStructure?.organization?.id,
      ) ||
      0,
    unofficial_position_id: parseNullableInt(rawCurrentJob?.unofficial_position_id) || 0,
    current_position: form.current_position || null,
    current_organization: form.current_organization || null,
    rank_id: rankId,
    province: form.province || null,
    rank_name: rankName,
  }
}

async function requestJson(url, options) {
  let response

  try {
    response = await fetch(url, options)
  } catch (error) {
    console.error('Request failed before receiving a response', {
      url,
      method: options?.method || 'GET',
      error,
    })
    throw error
  }

  const rawText = await response.text()
  let data = {}

  if (rawText) {
    try {
      data = JSON.parse(rawText)
    } catch {
      data = { rawText }
    }
  }

  data.status = response.status
  data.requestUrl = url
  data.responseUrl = response.url || url

  if (!response.ok) {
    console.error('Request returned a non-success status', {
      url,
      method: options?.method || 'GET',
      status: response.status,
      response: data,
    })
  }

  if (response.status === 401) {
    authLogout()
    router.push('/login')
  }

  return { response, data }
}

function extractOfficerRecord(data) {
  if (Array.isArray(data?.records)) return data.records[0] || null
  if (Array.isArray(data?.data?.records)) return data.data.records[0] || null
  return data?.record || data?.data || data || null
}

async function fetchOfficerByList(id) {
  const listUrl = buildApiUrl('/api/authcenter/officers', {
    ids: id,
    page: 1,
    perPage: 1,
  })

  const { response, data } = await requestJson(listUrl, {
    method: 'GET',
    headers: getHeaders(),
  })

  if (!response.ok || data.ok === false) {
    throw new Error(getApiErrorMessage(data, 'មិនអាចទាញយកព័ត៌មានមន្ត្រីបានទេ។'))
  }

  const record = extractOfficerRecord(data)
  if (!record) {
    throw new Error('មិនមានព័ត៌មានមន្ត្រីសម្រាប់កែប្រែទេ។')
  }

  writeCachedOfficer(record)
  return record
}

async function fetchOfficerByRead(id) {
  const readUrl = buildApiUrl(`/api/authcenter/officers/${id}/read`)
  const { response, data } = await requestJson(readUrl, {
    method: 'GET',
    headers: getHeaders(),
  })

  if (!response.ok || data.ok === false) {
    throw new Error(getApiErrorMessage(data, 'មិនអាចទាញយកព័ត៌មានមន្ត្រីបានទេ។'))
  }

  const record = extractOfficerRecord(data)
  if (!record) {
    throw new Error('មិនមានព័ត៌មានមន្ត្រីសម្រាប់កែប្រែទេ។')
  }

  writeCachedOfficer(record)
  return record
}

async function loadOfficer() {
  if (!ensureAuthenticated()) {
    return
  }

  if (!isEditMode.value) {
    assignForm(createEmptyForm())
    hydrateFormRelations()
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const id = route.query.id
    const cachedOfficer = readCachedOfficer(id)
    if (cachedOfficer) {
      assignForm(normalizeOfficer(cachedOfficer))
      hydrateFormRelations()
      return
    }

    let record = null

    try {
      record = await fetchOfficerByList(id)
    } catch (listError) {
      console.warn('Officer list lookup failed, trying read endpoint', {
        id,
        error: listError,
      })
      record = await fetchOfficerByRead(id)
    }

    assignForm(normalizeOfficer(record))
    hydrateFormRelations()
  } catch (error) {
    errorMessage.value = error.message || 'មានបញ្ហាក្នុងការទាញយកព័ត៌មានមន្ត្រី។'
  } finally {
    loading.value = false
  }
}

async function saveOfficer() {
  if (!ensureAuthenticated()) {
    return
  }

  saving.value = true
  errorMessage.value = ''
  successMessage.value = ''

  const validationMessage = validateForm()
  if (validationMessage) {
    errorMessage.value = validationMessage
    saving.value = false
    return
  }

  const payload = buildPayload()
  const requestConfig = isEditMode.value
    ? { method: 'PUT', url: buildApiUrl('/api/authcenter/officers/update') }
    : { method: 'POST', url: buildApiUrl('/api/authcenter/officers/create') }

  try {
    const { response, data } = await requestJson(requestConfig.url, {
      method: requestConfig.method,
      headers: getHeaders(),
      body: JSON.stringify(payload),
    })

    if (!response.ok || data.ok === false) {
      throw new Error(getApiErrorMessage(data, 'រក្សាទុកព័ត៌មានមន្ត្រីមិនបានទេ។'))
    }

    successMessage.value = isEditMode.value ? 'កែប្រែព័ត៌មានមន្ត្រីបានជោគជ័យ។' : 'បន្ថែមព័ត៌មានមន្ត្រីបានជោគជ័យ។'
    router.push('/pdf/official-management')
  } catch (error) {
    errorMessage.value = error.message || 'មានបញ្ហាក្នុងការរក្សាទុកព័ត៌មានមន្ត្រី។'
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await Promise.all([loadReferenceOptions(), loadOfficer()])
  hydrateFormRelations()
})

watch(
  [() => form.current_position, () => form.current_organization],
  () => {
    syncOrganizationStructureIdFromNames()
  },
)
</script>

<style scoped>
.officer-edit-page {
  padding: 10px 14px 28px;
}

.officer-edit-shell {
  border: 1px solid var(--ocm-app-border);
  border-radius: 10px;
  background: var(--ocm-app-bg);
  padding: 14px;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.05);
}

.officer-edit-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.officer-edit-label {
  margin-bottom: 4px;
  font-size: 12px;
  color: #6b7280;
}

.officer-edit-title {
  font-size: 24px;
  line-height: 1.2;
  color: #111827;
}

.officer-back-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid #d6deeb;
  border-radius: 8px;
  background: #fff;
  color: #334155;
  text-decoration: none;
}

.officer-edit-form {
  border: 1px solid #d9e4f5;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
}

.officer-edit-alert,
.officer-edit-loading {
  padding: 12px 14px;
  font-size: 14px;
}

.officer-edit-alert.error {
  background: #fef2f2;
  color: #b91c1c;
  white-space: pre-line;
}

.officer-edit-alert.success {
  background: #ecfdf5;
  color: #166534;
}

.officer-edit-loading {
  background: #f8fafc;
  color: #475569;
}

.officer-edit-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  padding: 18px;
}

.officer-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.officer-field-stack {
  display: grid;
  gap: 8px;
}

.officer-field-help {
  margin: 0;
  font-size: 12px;
  color: #64748b;
}

.officer-field--wide {
  grid-column: span 2;
}

.officer-image-upload {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.officer-image-preview-wrap {
  display: flex;
  align-items: center;
}

.officer-image-preview {
  width: 112px;
  height: 112px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #dbe4f0;
  background: #f8fafc;
}

.officer-image-upload-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.officer-image-input {
  display: none;
}

.officer-image-help {
  margin: 0;
  font-size: 12px;
  color: #64748b;
}

.officer-field-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.officer-edit-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 18px 18px;
  border-top: 1px solid #e6edf8;
  background: #fbfdff;
}

.officer-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 118px;
  min-height: 40px;
  padding: 0 18px;
  border: 0;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
}

.officer-action-btn.cancel {
  background: #e5e7eb;
  color: #374151;
}

.officer-action-btn.save {
  background: var(--ocm-sec-color);
  color: #fff;
}

.officer-action-btn.upload {
  min-width: 140px;
  background: #2066d7;
  color: #fff;
}

.officer-action-btn.remove-image {
  min-width: 120px;
  background: #fef2f2;
  color: #b91c1c;
}

.officer-action-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

@media (max-width: 1080px) {
  .officer-edit-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .officer-edit-page {
    padding: 8px;
  }

  .officer-edit-header {
    flex-direction: column;
    align-items: stretch;
  }

  .officer-edit-grid {
    grid-template-columns: 1fr;
  }

  .officer-field--wide {
    grid-column: auto;
  }

  .officer-edit-actions {
    flex-direction: column-reverse;
  }

  .officer-action-btn {
    width: 100%;
  }
}
</style>
