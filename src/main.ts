import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { publicApi } from './api/client'
import { applyColorScheme } from './config/colorSchemes'

const app = createApp(App)

app.use(createPinia())
app.use(router)

publicApi
  .getColorScheme()
  .then((res) => {
    const data = res.data
    if (data && data.primary && data.secondary) {
      applyColorScheme(data.primary, data.secondary)
    }
  })
  .catch(() => {})
  .finally(() => {
    app.mount('#app')
  })
