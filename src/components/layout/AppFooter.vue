<template>
  <footer class="app-footer">
    <div class="footer-border"></div>
    <div class="container text-center text-muted">
      &copy; {{ year }} Kirill Saidov
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  padding: 2rem 0;
  margin-top: auto;
  font-size: 0.85rem;
}

.footer-border {
  height: 2px;
  background: var(--gradient-primary);
  opacity: 0.3;
  margin-bottom: 2rem;
}
</style>
