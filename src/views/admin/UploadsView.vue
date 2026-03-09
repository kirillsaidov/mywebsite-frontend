<template>
  <div>
    <h2 class="mb-3">File Uploads</h2>

    <div v-if="message" :class="['alert', msgSuccess ? 'alert-success' : 'alert-error']">{{ message }}</div>

    <!-- Avatar -->
    <div class="card mb-3">
      <h3 style="font-size: 1rem; margin-bottom: 0.75rem;">Avatar Image</h3>
      <p class="text-muted mb-2" style="font-size: 0.85rem;">PNG or JPEG, max 5MB. Auto-resized to 512px width.</p>
      <div class="flex gap-1 items-center">
        <input type="file" accept=".png,.jpg,.jpeg" @change="(e) => avatarFile = (e.target as HTMLInputElement).files?.[0] || null" />
        <button @click="uploadAvatar" class="btn btn-sm btn-primary" :disabled="!avatarFile || !!uploading">
          {{ uploading === 'avatar' ? 'Uploading...' : 'Upload' }}
        </button>
      </div>
    </div>

    <!-- CV -->
    <div class="card mb-3">
      <h3 style="font-size: 1rem; margin-bottom: 0.75rem;">CV (PDF)</h3>
      <p class="text-muted mb-2" style="font-size: 0.85rem;">PDF only, max 5MB.</p>
      <div class="flex gap-1 items-center">
        <input type="file" accept=".pdf" @change="(e) => cvFile = (e.target as HTMLInputElement).files?.[0] || null" />
        <button @click="uploadCv" class="btn btn-sm btn-primary" :disabled="!cvFile || !!uploading">
          {{ uploading === 'cv' ? 'Uploading...' : 'Upload' }}
        </button>
      </div>
    </div>

    <!-- Favicon -->
    <div class="card mb-3">
      <h3 style="font-size: 1rem; margin-bottom: 0.75rem;">Favicon</h3>
      <p class="text-muted mb-2" style="font-size: 0.85rem;">ICO only, max 1MB.</p>
      <div class="flex gap-1 items-center">
        <input type="file" accept=".ico" @change="(e) => faviconFile = (e.target as HTMLInputElement).files?.[0] || null" />
        <button @click="uploadFavicon" class="btn btn-sm btn-primary" :disabled="!faviconFile || !!uploading">
          {{ uploading === 'favicon' ? 'Uploading...' : 'Upload' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { internalApi } from '@/api/client'

const avatarFile = ref<File | null>(null)
const cvFile = ref<File | null>(null)
const faviconFile = ref<File | null>(null)
const message = ref('')
const msgSuccess = ref(false)
const uploading = ref<string | false>(false)

async function uploadAvatar() {
  if (!avatarFile.value) return
  await doUpload('avatar', () => internalApi.uploadAvatar(avatarFile.value!))
}

async function uploadCv() {
  if (!cvFile.value) return
  await doUpload('cv', () => internalApi.uploadCv(cvFile.value!))
}

async function uploadFavicon() {
  if (!faviconFile.value) return
  await doUpload('favicon', () => internalApi.uploadFavicon(faviconFile.value!))
}

async function doUpload(type: string, fn: () => Promise<any>) {
  message.value = ''
  uploading.value = type
  try {
    const { data } = await fn()
    message.value = data.message || 'Uploaded.'
    msgSuccess.value = data.success
  } catch (e: any) {
    message.value = e.response?.data?.message || e.response?.data?.error || 'Upload failed.'
    msgSuccess.value = false
  } finally {
    uploading.value = false
  }
}
</script>
