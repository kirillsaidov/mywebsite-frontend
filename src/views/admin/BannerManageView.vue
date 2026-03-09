<template>
  <div>
    <div class="flex justify-between items-center mb-3">
      <h2>Banners</h2>
      <button @click="showForm = true; resetForm()" class="btn btn-primary">New Banner</button>
    </div>

    <div v-if="message" :class="['alert', msgSuccess ? 'alert-success' : 'alert-error']">{{ message }}</div>

    <!-- Form -->
    <div v-if="showForm" class="card mb-3">
      <h3 style="margin-bottom: 1rem; font-size: 1rem;">{{ editId ? 'Edit Banner' : 'New Banner' }}</h3>
      <form @submit.prevent="handleSave">
        <div class="form-group">
          <label>Message</label>
          <input v-model="form.message" type="text" class="form-control" required />
        </div>
        <div class="form-group">
          <label>Type</label>
          <select v-model="form.type" class="form-control">
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="danger">Danger</option>
          </select>
        </div>
        <div class="flex gap-2">
          <div class="form-group" style="flex: 1;">
            <label>Start Date</label>
            <div class="datetime-row">
              <input ref="startDateInput" v-model="form.startDate" type="datetime-local" class="form-control" required />
              <button type="button" @click="setNow('startDate')" class="btn btn-outline btn-sm datetime-now-btn">Now</button>
            </div>
          </div>
          <div class="form-group" style="flex: 1;">
            <label>End Date</label>
            <div class="datetime-row">
              <input ref="endDateInput" v-model="form.endDate" type="datetime-local" class="form-control" required />
              <button type="button" @click="setNow('endDate')" class="btn btn-outline btn-sm datetime-now-btn">Now</button>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" v-model="form.active" /> Active
          </label>
        </div>
        <div class="flex gap-1">
          <button type="submit" class="btn btn-primary btn-sm">Save</button>
          <button type="button" @click="showForm = false" class="btn btn-outline btn-sm">Cancel</button>
        </div>
      </form>
    </div>

    <!-- Table -->
    <div v-if="loading" class="text-center"><div class="spinner" style="margin: 0 auto;"></div></div>
    <div v-else-if="banners.length === 0" class="text-muted">No banners.</div>
    <table v-else class="admin-table">
      <thead>
        <tr>
          <th>Message</th>
          <th>Type</th>
          <th>Active</th>
          <th>Dates</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in banners" :key="b.id">
          <td>{{ b.message }}</td>
          <td><span :class="['tag', `tag-${b.type}`]">{{ b.type }}</span></td>
          <td>{{ b.active ? 'Yes' : 'No' }}</td>
          <td class="text-muted" style="font-size: 0.8rem;">{{ formatLocal(b.startDate) }} &mdash; {{ formatLocal(b.endDate) }}</td>
          <td>
            <div class="flex gap-1">
              <button @click="startEdit(b)" class="btn btn-sm btn-outline">Edit</button>
              <button @click="deleteBanner(b.id)" class="btn btn-sm btn-danger">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { adminApi } from '@/api/client'

const banners = ref<any[]>([])
const loading = ref(true)
const showForm = ref(false)
const editId = ref('')
const message = ref('')
const msgSuccess = ref(false)

const form = ref({
  message: '',
  type: 'info',
  startDate: '',
  endDate: '',
  active: true,
})

const startDateInput = ref<HTMLInputElement | null>(null)
const endDateInput = ref<HTMLInputElement | null>(null)

function utcToLocal(isoStr: string): string {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  if (isNaN(d.getTime())) return ''
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

function formatLocal(isoStr: string): string {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleString()
}

function nowLocalInput(): string {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

function setNow(field: 'startDate' | 'endDate') {
  form.value[field] = ''
  nextTick(() => {
    form.value[field] = nowLocalInput()
  })
}

function resetForm() {
  editId.value = ''
  form.value = { message: '', type: 'info', startDate: '', endDate: '', active: true }
}

function startEdit(b: any) {
  editId.value = b.id
  form.value = {
    message: b.message,
    type: b.type,
    startDate: utcToLocal(b.startDate),
    endDate: utcToLocal(b.endDate),
    active: b.active,
  }
  showForm.value = true
}

onMounted(loadBanners)

async function loadBanners() {
  loading.value = true
  try {
    const { data } = await adminApi.getBanners()
    banners.value = Array.isArray(data) ? data : []
  } catch {
    banners.value = []
  } finally {
    loading.value = false
  }
}

async function handleSave() {
  message.value = ''
  const payload = {
    ...form.value,
    startDate: new Date(form.value.startDate).toISOString(),
    endDate: new Date(form.value.endDate).toISOString(),
  }
  try {
    if (editId.value) {
      const { data } = await adminApi.updateBanner(editId.value, payload)
      message.value = data.message
      msgSuccess.value = data.success
    } else {
      const { data } = await adminApi.createBanner(payload)
      message.value = data.message
      msgSuccess.value = data.success
    }
    showForm.value = false
    await loadBanners()
  } catch (e: any) {
    message.value = e.response?.data?.message || 'Failed.'
    msgSuccess.value = false
  }
}

async function deleteBanner(id: string) {
  if (!confirm('Delete this banner?')) return
  try {
    await adminApi.deleteBanner(id)
    await loadBanners()
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
.tag-info { background: #1565c0; }
.tag-warning { background: #e65100; }
.tag-danger { background: #c62828; }
.datetime-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.datetime-row .form-control {
  flex: 1;
  min-width: 0;
}
.datetime-now-btn {
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
