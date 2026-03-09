<template>
  <div v-if="banners.length" class="banner-bar">
    <div v-for="banner in banners" :key="banner.id" :class="['banner', `banner-${banner.type}`]">
      {{ banner.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { publicApi } from '@/api/client'

const banners = ref<any[]>([])

onMounted(async () => {
  try {
    const { data } = await publicApi.getBanners()
    banners.value = Array.isArray(data) ? data : []
  } catch {
    // silently fail
  }
})
</script>

<style scoped>
.banner-bar {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.banner {
  padding: 0.5rem 1rem;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
  border-left: 4px solid transparent;
  border-radius: 0 4px 4px 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.banner-info {
  background: var(--color-banner-info);
  color: #1565c0;
  border-left-color: #1565c0;
}

.banner-warning {
  background: var(--color-banner-warning);
  color: #e65100;
  border-left-color: #e65100;
}

.banner-danger {
  background: var(--color-banner-danger);
  color: #dc2626;
  border-left-color: #dc2626;
}
</style>
