<template>
  <div class="login-page section">
    <div class="container">
      <div class="login-card card">
        <h2 class="login-title">Admin Login</h2>

        <div v-if="error" class="alert alert-error">{{ error }}</div>

        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label>Username</label>
            <input v-model="username" type="text" class="form-control" required autocomplete="username" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" required autocomplete="current-password" />
          </div>
          <button type="submit" class="btn btn-gradient login-btn" :disabled="submitting">
            {{ submitting ? 'Logging in...' : 'Login' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '@/api/client'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')
const submitting = ref(false)

async function handleLogin() {
  error.value = ''
  submitting.value = true
  try {
    const { data } = await authApi.login(username.value, password.value)
    if (data.success && data.data?.token) {
      auth.setToken(data.data.token)
      router.push('/admin')
    } else {
      error.value = data.message || 'Login failed.'
    }
  } catch (e: any) {
    error.value = e.response?.data?.message || e.response?.data?.error || 'Login failed.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.login-card {
  max-width: 400px;
  margin: 2rem auto;
  border-left: none;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
}

.login-title {
  margin-bottom: 1.5rem;
  text-align: center;
}

.login-btn {
  width: 100%;
}
</style>
