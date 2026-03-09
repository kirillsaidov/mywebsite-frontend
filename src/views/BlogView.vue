<template>
  <div class="blog-page section">
    <div class="container">
      <h1 class="page-title">Blog</h1>

      <div class="search-box mb-3">
        <div class="search-input-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            v-model="search"
            type="text"
            class="form-control search-input"
            placeholder="Search posts..."
          />
        </div>
      </div>

      <div v-if="loading" class="text-center mt-4">
        <div class="spinner" style="margin: 0 auto;"></div>
      </div>

      <div v-else-if="filteredGroups.length === 0" class="text-center text-muted mt-4">
        <p>No posts found.</p>
      </div>

      <div v-else>
        <div v-for="group in filteredGroups" :key="group.year" class="year-group">
          <h2 class="year-heading">{{ group.year }}</h2>
          <div class="posts-grid">
            <BlogCard v-for="post in group.posts" :key="post.title" :post="post" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { blogApi } from '@/api/client'
import BlogCard from '@/components/blog/BlogCard.vue'

interface PostMeta {
  title: string
  description: string
  tags: string[]
  createdAt: string
  modifiedAt: string
}

const posts = ref<PostMeta[]>([])
const search = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await blogApi.getMetadata()
    posts.value = Array.isArray(data) ? data : []
  } catch {
    posts.value = []
  } finally {
    loading.value = false
  }
})

const filteredGroups = computed(() => {
  const q = search.value.toLowerCase()
  const filtered = posts.value.filter((p) => {
    if (!q) return true
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    )
  })

  // Group by year, sorted descending
  const grouped: Record<string, PostMeta[]> = {}
  for (const post of filtered) {
    const year = new Date(post.createdAt).getFullYear().toString()
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(post)
  }

  return Object.entries(grouped)
    .sort(([a], [b]) => parseInt(b) - parseInt(a))
    .map(([year, posts]) => ({
      year,
      posts: posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    }))
})
</script>

<style scoped>
.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.search-box {
  max-width: 400px;
}

.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-input {
  padding-left: 2.25rem;
}

.year-group {
  margin-bottom: 2rem;
}

.year-heading {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
  padding-bottom: 0.375rem;
  padding-left: 0.75rem;
  border-left: 3px solid transparent;
  border-image: var(--gradient-primary) 1;
}

.posts-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
