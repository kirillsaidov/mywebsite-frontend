import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

function getTokenExp(jwt: string): number | null {
  try {
    const payload = JSON.parse(atob(jwt.split('.')[1]))
    return payload.exp ? payload.exp * 1000 : null
  } catch {
    return null
  }
}

function isTokenExpired(jwt: string): boolean {
  const exp = getTokenExp(jwt)
  return exp !== null ? exp < Date.now() : true
}

export const useAuthStore = defineStore('auth', () => {
  const stored = localStorage.getItem('jwt_token')
  const token = ref<string | null>(stored && !isTokenExpired(stored) ? stored : null)
  let expiryTimer: ReturnType<typeof setTimeout> | null = null

  if (stored && isTokenExpired(stored)) {
    localStorage.removeItem('jwt_token')
  }

  const isAuthenticated = computed(() => !!token.value && !isTokenExpired(token.value))

  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('jwt_token', newToken)
    scheduleAutoLogout(newToken)
  }

  function clearToken() {
    token.value = null
    localStorage.removeItem('jwt_token')
    if (expiryTimer) {
      clearTimeout(expiryTimer)
      expiryTimer = null
    }
  }

  function checkExpiry() {
    if (token.value && isTokenExpired(token.value)) {
      clearToken()
      return true
    }
    return false
  }

  function handleExpired() {
    clearToken()
    if (window.location.pathname !== '/admin/login') {
      window.location.href = '/admin/login'
    }
  }

  function scheduleAutoLogout(jwt: string) {
    if (expiryTimer) {
      clearTimeout(expiryTimer)
      expiryTimer = null
    }
    const exp = getTokenExp(jwt)
    if (!exp) return
    const ms = exp - Date.now()
    if (ms <= 0) {
      handleExpired()
    } else {
      expiryTimer = setTimeout(handleExpired, ms)
    }
  }

  // Schedule on init if we have a valid token
  if (token.value) {
    scheduleAutoLogout(token.value)
  }

  return { token, isAuthenticated, setToken, clearToken, checkExpiry }
})
