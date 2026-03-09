import axios from 'axios'

const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests, reject if expired
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token')
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwt_token')
        if (!isRedirecting) {
          isRedirecting = true
          window.location.href = '/admin/login'
        }
        return Promise.reject(new Error('Token expired'))
      }
    } catch {
      localStorage.removeItem('jwt_token')
    }
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 responses
let isRedirecting = false
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isRedirecting) {
      isRedirecting = true
      localStorage.removeItem('jwt_token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export default api

// Public API
export const publicApi = {
  getAbout: () => api.get('/public_api/about'),
  getBanners: () => api.get('/public_api/banners'),
  getColorScheme: () => api.get('/public_api/color-scheme'),
  getProjects: () => api.get('/public_api/projects'),
}

// Blog API
export const blogApi = {
  getMetadata: () => api.get('/blog_api/posts'),
  getPost: (title: string) => api.get(`/blog_api/posts/${encodeURIComponent(title)}`),
  createPost: (data: any) => api.post('/blog_api/posts', { blogPost: data }),
  updatePost: (title: string, data: any) => api.put(`/blog_api/posts/${encodeURIComponent(title)}`, { blogPost: data }),
  deletePost: (title: string) => api.delete(`/blog_api/posts/${encodeURIComponent(title)}`),
}

// Auth API
export const authApi = {
  login: (username: string, password: string) =>
    api.post('/auth_api/login', { loginRequest: { username, password } }),
}

// Admin API
export const adminApi = {
  changePassword: (currentPassword: string, newPassword: string) =>
    api.post('/admin_api/password', { passwordChangeRequest: { currentPassword, newPassword } }),
  getAbout: () => api.get('/public_api/about'),
  updateAbout: (data: any) => api.put('/admin_api/about', { aboutRequest: data }),
  getBanners: () => api.get('/admin_api/banners'),
  createBanner: (data: any) => api.post('/admin_api/banners', { bannerRequest: data }),
  updateBanner: (id: string, data: any) => api.put(`/admin_api/banners/${id}`, { bannerRequest: data }),
  deleteBanner: (id: string) => api.delete(`/admin_api/banners/${id}`),
  updateColorScheme: (data: any) => api.put('/admin_api/color-scheme', { colorSchemeRequest: data }),
  getProjects: () => api.get('/admin_api/projects'),
  createProject: (data: any) => api.post('/admin_api/projects', { projectRequest: data }),
  updateProject: (id: string, data: any) => api.put(`/admin_api/projects/${id}`, { projectRequest: data }),
  deleteProject: (id: string) => api.delete(`/admin_api/projects/${id}`),
}

// Internal API (file uploads)
export const internalApi = {
  uploadCv: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/internal_api/cv', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  uploadAvatar: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/internal_api/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  uploadFavicon: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/internal_api/favicon', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
