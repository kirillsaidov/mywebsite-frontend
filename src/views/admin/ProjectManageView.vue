<template>
  <div>
    <div class="flex justify-between items-center mb-3">
      <h2>Projects</h2>
      <button @click="showForm = true; resetForm()" class="btn btn-primary">New Project</button>
    </div>

    <div v-if="message" :class="['alert', msgSuccess ? 'alert-success' : 'alert-error']">{{ message }}</div>

    <!-- Form -->
    <div v-if="showForm" class="card mb-3">
      <h3 style="margin-bottom: 1rem; font-size: 1rem;">{{ editId ? 'Edit Project' : 'New Project' }}</h3>
      <form @submit.prevent="handleSave">
        <div class="form-group">
          <label>Title</label>
          <input v-model="form.title" type="text" class="form-control" required />
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="form.description" class="form-control" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>Link</label>
          <input v-model="form.link" type="url" class="form-control" placeholder="https://..." />
        </div>
        <div class="form-group">
          <label>Icon URL</label>
          <input v-model="form.icon" type="url" class="form-control" placeholder="https://..." />
        </div>
        <div class="form-group">
          <label>Order</label>
          <input v-model.number="form.order" type="number" class="form-control" />
        </div>
        <div class="flex gap-1">
          <button type="submit" class="btn btn-primary btn-sm">Save</button>
          <button type="button" @click="showForm = false" class="btn btn-outline btn-sm">Cancel</button>
        </div>
      </form>
    </div>

    <!-- Table -->
    <div v-if="loading" class="text-center"><div class="spinner" style="margin: 0 auto;"></div></div>
    <div v-else-if="projects.length === 0" class="text-muted">No projects.</div>
    <table v-else class="admin-table">
      <thead>
        <tr>
          <th>Icon</th>
          <th>Title</th>
          <th>Link</th>
          <th>Order</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in projects" :key="p.id">
          <td><img v-if="p.icon" :src="p.icon" alt="" style="width: 32px; height: 32px; border-radius: 4px; object-fit: cover;" /></td>
          <td>{{ p.title }}</td>
          <td><a v-if="p.link" :href="p.link" target="_blank" class="text-muted" style="font-size: 0.8rem;">{{ p.link }}</a></td>
          <td>{{ p.order }}</td>
          <td>
            <div class="flex gap-1">
              <button @click="startEdit(p)" class="btn btn-sm btn-outline">Edit</button>
              <button @click="deleteProject(p.id)" class="btn btn-sm btn-danger">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { adminApi } from '@/api/client'

const projects = ref<any[]>([])
const loading = ref(true)
const showForm = ref(false)
const editId = ref('')
const message = ref('')
const msgSuccess = ref(false)

const form = ref({
  title: '',
  description: '',
  link: '',
  icon: '',
  order: 0,
})

function resetForm() {
  editId.value = ''
  form.value = { title: '', description: '', link: '', icon: '', order: 0 }
}

function startEdit(p: any) {
  editId.value = p.id
  form.value = {
    title: p.title,
    description: p.description,
    link: p.link,
    icon: p.icon,
    order: p.order,
  }
  showForm.value = true
}

onMounted(loadProjects)

async function loadProjects() {
  loading.value = true
  try {
    const { data } = await adminApi.getProjects()
    projects.value = Array.isArray(data) ? data : []
  } catch {
    projects.value = []
  } finally {
    loading.value = false
  }
}

async function handleSave() {
  message.value = ''
  try {
    if (editId.value) {
      const { data } = await adminApi.updateProject(editId.value, form.value)
      message.value = data.message
      msgSuccess.value = data.success
    } else {
      const { data } = await adminApi.createProject(form.value)
      message.value = data.message
      msgSuccess.value = data.success
    }
    showForm.value = false
    await loadProjects()
  } catch (e: any) {
    message.value = e.response?.data?.message || 'Failed.'
    msgSuccess.value = false
  }
}

async function deleteProject(id: string) {
  if (!confirm('Delete this project?')) return
  try {
    await adminApi.deleteProject(id)
    await loadProjects()
  } catch (e: any) {
    alert(e.response?.data?.message || 'Failed.')
  }
}
</script>

<style scoped>
.admin-table {
  width: 100%;
  border-collapse: collapse;
}
.admin-table th, .admin-table td {
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
