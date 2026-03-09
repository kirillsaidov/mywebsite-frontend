<template>
  <div class="home section">
    <div class="container">
      <div class="hero">
        <div class="hero-card card">
          <div class="avatar-wrapper" v-if="!avatarError">
            <img :src="avatarUrl" alt="Avatar" class="avatar" @error="avatarError = true" />
          </div>
          <div v-else class="avatar-placeholder">KS</div>
          <h1 class="hero-name">{{ about.name || 'Kirill Saidov' }}</h1>
          <div class="hero-bio">
            <p v-for="(line, i) in (about.bio || [])" :key="i" class="text-muted">{{ line }}</p>
          </div>
          <div class="hero-actions">
            <router-link to="/cv" class="btn btn-gradient">View CV</router-link>
            <router-link to="/blog" class="btn btn-outline">Read Blog</router-link>
          </div>
          <div class="social-links" v-if="about.social">
            <a v-if="about.social.linkedin" :href="about.social.linkedin" target="_blank" title="LinkedIn" class="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a v-if="about.social.github_ks" :href="about.social.github_ks" target="_blank" title="GitHub" class="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <a v-if="about.social.github_rk" :href="about.social.github_rk" target="_blank" title="GitHub (rillki)" class="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <a v-if="about.social.youtube" :href="about.social.youtube" target="_blank" title="YouTube" class="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a v-if="about.social['email-user']" :href="`mailto:${about.social['email-user']}@${about.social['email-domain']}`" title="Email" class="social-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Projects Section -->
      <div v-if="projects.length" class="projects-section">
        <h2 class="projects-title">Projects</h2>
        <div class="projects-grid">
          <a
            v-for="p in projects"
            :key="p.id"
            :href="p.link"
            target="_blank"
            rel="noopener noreferrer"
            class="project-card card"
          >
            <div class="project-header">
              <img v-if="p.icon" :src="p.icon" alt="" class="project-icon" />
              <h3 class="project-title">{{ p.title }}</h3>
              <svg class="project-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </div>
            <p class="project-desc text-muted">{{ p.description }}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { publicApi } from '@/api/client'

const about = ref<any>({})
const avatarError = ref(false)
const avatarUrl = '/avatar.png'
const projects = ref<any[]>([])

onMounted(async () => {
  try {
    const { data } = await publicApi.getAbout()
    about.value = data
  } catch {
    // use defaults
  }
  try {
    const { data } = await publicApi.getProjects()
    projects.value = Array.isArray(data) ? data : []
  } catch {
    // ignore
  }
})
</script>

<style scoped>
.hero {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.hero-card {
  text-align: center;
  max-width: 480px;
  width: 100%;
  padding: 2.5rem;
  border-left: none;
  position: relative;
  overflow: hidden;
}

.hero-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
}

.avatar-wrapper {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  padding: 3px;
  background: var(--gradient-primary);
  margin: 0 auto 1.25rem;
  animation: avatar-glow 4s ease-in-out infinite;
}

@keyframes avatar-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(46, 125, 50, 0.3); }
  50% { box-shadow: 0 0 30px rgba(21, 101, 192, 0.4); }
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  border: 3px solid var(--color-bg-card);
}

.avatar-placeholder {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: var(--gradient-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 auto 1.25rem;
}

.hero-name {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-bio p {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.hero-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin: 1.5rem 0;
}

.social-links {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: var(--color-text-muted);
  transition: all var(--transition);
}

.social-icon svg {
  width: 20px;
  height: 20px;
}

.social-icon:hover {
  color: var(--color-primary);
  background: rgba(46, 125, 50, 0.1);
  transform: translateY(-2px);
}

.projects-section {
  margin-top: 2.5rem;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}

.projects-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

.project-card {
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
  border-left: 3px solid transparent;
  transition: all var(--transition);
  display: block;
}

.project-card:hover {
  border-image: var(--gradient-primary) 1;
  box-shadow: 0 4px 16px var(--color-shadow);
  transform: translateY(-2px);
}

.project-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 0.5rem;
}

.project-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.project-title {
  font-size: 1rem;
  font-weight: 600;
  flex: 1;
}

.project-arrow {
  width: 16px;
  height: 16px;
  color: var(--color-text-muted);
  flex-shrink: 0;
  opacity: 0;
  transition: opacity var(--transition);
}

.project-card:hover .project-arrow {
  opacity: 1;
}

.project-desc {
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.4;
}
</style>
