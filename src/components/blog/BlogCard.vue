<template>
  <router-link :to="`/blog/${encodeURIComponent(post.title)}`" class="blog-card card">
    <h3 class="blog-card-title">{{ post.title }}</h3>
    <p class="blog-card-desc text-muted">{{ post.description }}</p>
    <div class="blog-card-meta">
      <span class="blog-card-date text-muted">{{ formatDate(post.createdAt) }}</span>
      <div class="blog-card-tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  post: {
    title: string
    description: string
    tags: string[]
    createdAt: string
  }
}>()

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return dateStr
  }
}
</script>

<style scoped>
.blog-card {
  display: block;
  text-decoration: none;
  color: inherit;
  border-left: 3px solid transparent;
}

.blog-card:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: var(--shadow-hover);
  border-left-color: var(--color-primary);
}

.blog-card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.blog-card-desc {
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.blog-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.blog-card-date {
  font-size: 0.8rem;
}

.blog-card-tags {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
}
</style>
