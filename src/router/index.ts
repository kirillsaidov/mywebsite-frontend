import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/views/BlogView.vue'),
    },
    {
      path: '/blog/:title',
      name: 'blog-post',
      component: () => import('@/views/BlogPostView.vue'),
    },
    {
      path: '/cv',
      name: 'cv',
      component: () => import('@/views/CVView.vue'),
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('@/views/admin/LoginView.vue'),
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/DashboardView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: '/admin/blog',
        },
        {
          path: 'blog',
          name: 'admin-blog',
          component: () => import('@/views/admin/BlogManageView.vue'),
        },
        {
          path: 'blog/new',
          name: 'admin-blog-new',
          component: () => import('@/views/admin/BlogEditorView.vue'),
        },
        {
          path: 'blog/edit/:title',
          name: 'admin-blog-edit',
          component: () => import('@/views/admin/BlogEditorView.vue'),
        },
        {
          path: 'projects',
          name: 'admin-projects',
          component: () => import('@/views/admin/ProjectManageView.vue'),
        },
        {
          path: 'about',
          name: 'admin-about',
          component: () => import('@/views/admin/AboutEditView.vue'),
        },
        {
          path: 'banners',
          name: 'admin-banners',
          component: () => import('@/views/admin/BannerManageView.vue'),
        },
        {
          path: 'appearance',
          name: 'admin-appearance',
          component: () => import('@/views/admin/AppearanceView.vue'),
        },
        {
          path: 'uploads',
          name: 'admin-uploads',
          component: () => import('@/views/admin/UploadsView.vue'),
        },
        {
          path: 'password',
          name: 'admin-password',
          component: () => import('@/views/admin/PasswordView.vue'),
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const auth = useAuthStore()
    auth.checkExpiry()
    if (!auth.isAuthenticated) {
      return { name: 'admin-login' }
    }
  }
})

export default router
