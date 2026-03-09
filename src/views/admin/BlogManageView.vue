<template>
  <div>
    <div class="flex justify-between items-center mb-3">
      <h2>Blog Posts</h2>
      <router-link to="/admin/blog/new" class="btn btn-primary">New Post</router-link>
    </div>

    <div v-if="loading" class="text-center mt-4">
      <div class="spinner" style="margin: 0 auto;"></div>
    </div>

    <div v-else-if="posts.length === 0" class="text-muted">No posts yet.</div>

    <table v-else class="admin-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Tags</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.title">
          <td>{{ post.title }}</td>
          <td class="text-muted">{{ formatDate(post.createdAt) }}</td>
          <td>
            <span v-for="tag in post.tags" :key="tag" class="tag" style="margin-right: 4px;">{{ tag }}</span>
          </td>
          <td>
            <div class="flex gap-1">
              <router-link :to="`/admin/blog/edit/${encodeURIComponent(post.title)}`" class="btn btn-sm btn-outline">Edit</router-link>
              <button @click="deletePost(post.title)" class="btn btn-sm btn-danger">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { blogApi } from '@/api/client'

const posts = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  await loadPosts()
})

async function loadPosts() {
  loading.value = true
  try {
    const { data } = await blogApi.getMetadata()
    posts.value = (Array.isArray(data) ? data : []).sort(
      (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } catch {
    posts.value = []
  } finally {
    loading.value = false
  }
}

async function deletePost(title: string) {
  if (!confirm(`Delete "${title}"?`)) return
  try {
    await blogApi.deletePost(title)
    await loadPosts()
  } catch (e: any) {
    alert(e.response?.data?.message || 'Failed to delete post.')
  }
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return dateStr
  }
}
</script>

<style scoped>
.admin-table {
  width: 100%;
  border-collapse: collapse;
}
.admin-table th,
.admin-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}
.admin-table th {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}
</style>
