<template>
  <div>
    <h2 class="mb-3">Edit About Info</h2>

    <div v-if="message" :class="['alert', success ? 'alert-success' : 'alert-error']">{{ message }}</div>

    <form @submit.prevent="handleSave">
      <div class="form-group">
        <label>Name</label>
        <input v-model="form.name" type="text" class="form-control" />
      </div>

      <div class="form-group">
        <label>Bio Paragraphs</label>
        <div v-for="(_, i) in form.bio" :key="i" class="bio-row mb-1">
          <div class="flex gap-1 items-center">
            <textarea v-model="form.bio[i]" class="form-control" rows="2"></textarea>
            <button type="button" @click="removeBio(i)" class="btn btn-sm btn-danger">X</button>
          </div>
        </div>
        <button type="button" @click="addBio" class="btn btn-sm btn-outline mt-1">+ Add paragraph</button>
      </div>

      <h3 class="mt-3 mb-2" style="font-size: 1.1rem;">Social Links</h3>

      <div class="form-group">
        <label>Email User</label>
        <input v-model="form.social['email-user']" type="text" class="form-control" placeholder="user" />
      </div>
      <div class="form-group">
        <label>Email Domain</label>
        <input v-model="form.social['email-domain']" type="text" class="form-control" placeholder="gmail.com" />
      </div>
      <div class="form-group">
        <label>LinkedIn URL</label>
        <input v-model="form.social.linkedin" type="url" class="form-control" />
      </div>
      <div class="form-group">
        <label>GitHub URL (primary)</label>
        <input v-model="form.social.github_ks" type="url" class="form-control" />
      </div>
      <div class="form-group">
        <label>GitHub URL (secondary)</label>
        <input v-model="form.social.github_rk" type="url" class="form-control" />
      </div>
      <div class="form-group">
        <label>YouTube URL</label>
        <input v-model="form.social.youtube" type="url" class="form-control" />
      </div>

      <button type="submit" class="btn btn-primary mt-2" :disabled="submitting">
        {{ submitting ? 'Saving...' : 'Save' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { adminApi } from '@/api/client'

const form = ref({
  name: '',
  bio: [''] as string[],
  social: {
    'email-user': '',
    'email-domain': '',
    linkedin: '',
    github_ks: '',
    github_rk: '',
    youtube: '',
  } as Record<string, string>,
})

const message = ref('')
const success = ref(false)
const submitting = ref(false)

onMounted(async () => {
  try {
    const { data } = await adminApi.getAbout()
    if (data.name) form.value.name = data.name
    if (data.bio) form.value.bio = data.bio.length ? data.bio : ['']
    if (data.social) {
      Object.assign(form.value.social, data.social)
    }
  } catch {
    // use defaults
  }
})

function addBio() {
  form.value.bio.push('')
}

function removeBio(i: number) {
  form.value.bio.splice(i, 1)
  if (form.value.bio.length === 0) form.value.bio.push('')
}

async function handleSave() {
  message.value = ''
  submitting.value = true
  try {
    const { data } = await adminApi.updateAbout({
      name: form.value.name,
      bio: form.value.bio.filter((b) => b.trim()),
      social: form.value.social,
    })
    message.value = data.message || 'About info updated.'
    success.value = data.success
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (e: any) {
    message.value = e.response?.data?.message || e.response?.data?.error || 'Failed to save.'
    success.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } finally {
    submitting.value = false
  }
}
</script>
