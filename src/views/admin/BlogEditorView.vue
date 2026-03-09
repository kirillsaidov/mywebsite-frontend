<template>
  <div>
    <h2 class="mb-3">{{ isEdit ? 'Edit Post' : 'New Post' }}</h2>

    <div v-if="message" :class="['alert', success ? 'alert-success' : 'alert-error']">{{ message }}</div>

    <form @submit.prevent="handleSave">
      <div class="form-group">
        <label>Title</label>
        <input v-model="form.title" type="text" class="form-control" required />
      </div>

      <div class="form-group">
        <label>Description</label>
        <input v-model="form.description" type="text" class="form-control" required />
      </div>

      <div class="form-group">
        <label>Tags (comma-separated)</label>
        <input v-model="tagsStr" type="text" class="form-control" placeholder="tag1, tag2, tag3" />
      </div>

      <div class="form-group">
        <label>Content (Markdown)</label>
        <MdEditor v-model="form.content" language="en-US" :theme="editorTheme" style="height: 500px;" />
      </div>

      <div class="flex gap-1 mt-2">
        <button type="submit" class="btn btn-primary" :disabled="submitting">
          {{ submitting ? 'Saving...' : 'Save' }}
        </button>
        <router-link to="/admin/blog" class="btn btn-outline">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { blogApi } from '@/api/client'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.title)
const editTitle = computed(() => route.params.title as string)

const form = ref({
  title: '',
  description: '',
  content: '',
})
const tagsStr = ref('')
const message = ref('')
const success = ref(false)
const submitting = ref(false)

const editorTheme = computed(() => {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
})

onMounted(async () => {
  if (isEdit.value) {
    try {
      const { data } = await blogApi.getPost(editTitle.value)
      form.value.title = data.metadata.title
      form.value.description = data.metadata.description
      form.value.content = data.content
      tagsStr.value = (data.metadata.tags || []).join(', ')
    } catch {
      message.value = 'Failed to load post.'
      success.value = false
    }
  }
})

async function handleSave() {
  message.value = ''
  submitting.value = true

  const tags = tagsStr.value.split(',').map((t: string) => t.trim()).filter(Boolean)
  const payload = { ...form.value, tags }

  try {
    if (isEdit.value) {
      const { data } = await blogApi.updatePost(editTitle.value, payload)
      message.value = data.message || 'Post updated.'
      success.value = data.success
    } else {
      const { data } = await blogApi.createPost(payload)
      message.value = data.message || 'Post created.'
      success.value = data.success
      if (data.success) {
        setTimeout(() => router.push('/admin/blog'), 1000)
      }
    }
  } catch (e: any) {
    message.value = e.response?.data?.message || e.response?.data?.error || 'Failed to save.'
    success.value = false
  } finally {
    submitting.value = false
  }
}
</script>
