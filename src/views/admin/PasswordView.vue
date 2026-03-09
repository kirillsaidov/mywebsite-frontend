<template>
  <div>
    <h2 class="mb-3">Change Password</h2>

    <div v-if="message" :class="['alert', success ? 'alert-success' : 'alert-error']">{{ message }}</div>

    <form @submit.prevent="handleSubmit" style="max-width: 400px;">
      <div class="form-group">
        <label>Current Password</label>
        <input v-model="form.currentPassword" type="password" class="form-control" required autocomplete="current-password" />
      </div>
      <div class="form-group">
        <label>New Password</label>
        <input v-model="form.newPassword" type="password" class="form-control" required minlength="6" autocomplete="new-password" />
      </div>
      <div class="form-group">
        <label>Confirm New Password</label>
        <input v-model="confirmPassword" type="password" class="form-control" required minlength="6" autocomplete="new-password" />
      </div>
      <button type="submit" class="btn btn-primary" :disabled="submitting">
        {{ submitting ? 'Changing...' : 'Change Password' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { adminApi } from '@/api/client'

const form = ref({ currentPassword: '', newPassword: '' })
const confirmPassword = ref('')
const message = ref('')
const success = ref(false)
const submitting = ref(false)

async function handleSubmit() {
  message.value = ''

  if (form.value.newPassword !== confirmPassword.value) {
    message.value = 'Passwords do not match.'
    success.value = false
    return
  }

  submitting.value = true
  try {
    const { data } = await adminApi.changePassword(form.value.currentPassword, form.value.newPassword)
    message.value = data.message || 'Password changed.'
    success.value = data.success
    if (data.success) {
      form.value = { currentPassword: '', newPassword: '' }
      confirmPassword.value = ''
    }
  } catch (e: any) {
    message.value = e.response?.data?.message || e.response?.data?.error || 'Failed.'
    success.value = false
  } finally {
    submitting.value = false
  }
}
</script>
