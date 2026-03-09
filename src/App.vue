<template>
  <BannerBar />
  <AppHeader />
  <main class="main-content">
    <RouterView />
  </main>
  <AppFooter />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import BannerBar from '@/components/layout/BannerBar.vue'
</script>

<style scoped>
.main-content {
  min-height: calc(100vh - 120px);
}
</style>
