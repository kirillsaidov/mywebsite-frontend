<template>
  <div class="blog-post-page section">
    <div class="container">
      <div v-if="loading" class="text-center mt-4">
        <div class="spinner" style="margin: 0 auto;"></div>
      </div>

      <div v-else-if="error" class="text-center mt-4">
        <p class="text-muted">{{ error }}</p>
        <router-link to="/blog" class="btn btn-outline mt-2">Back to Blog</router-link>
      </div>

      <div v-else class="post-content">
        <router-link to="/blog" class="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="back-arrow"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Blog
        </router-link>

        <h1 class="post-title">{{ post.metadata.title }}</h1>

        <div class="post-meta text-muted">
          <span>Published {{ formatDate(post.metadata.createdAt) }}</span>
          <span v-if="post.metadata.modifiedAt !== post.metadata.createdAt">
            &middot; Updated {{ formatDate(post.metadata.modifiedAt) }}
          </span>
        </div>

        <div class="post-tags mb-3">
          <span v-for="tag in post.metadata.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <div class="card post-card">
          <MarkdownRenderer :content="post.content" />
        </div>

        <router-link to="/blog" class="btn btn-outline mt-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="back-arrow"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Blog
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { blogApi } from '@/api/client'
import MarkdownRenderer from '@/components/blog/MarkdownRenderer.vue'

const route = useRoute()
const post = ref<any>({ metadata: {}, content: '' })
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const title = route.params.title as string
    const { data } = await blogApi.getPost(title)
    post.value = data
  } catch (e: any) {
    error.value = e.response?.data?.error || 'Post not found.'
  } finally {
    loading.value = false
  }
})

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return dateStr
  }
}
</script>

<style scoped>
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.back-link:hover {
  color: var(--color-primary);
}

.back-arrow {
  width: 16px;
  height: 16px;
}

.post-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.post-meta {
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
}

.post-tags {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.post-card {
  border-left: none;
  box-shadow: var(--shadow-md);
}
</style>
