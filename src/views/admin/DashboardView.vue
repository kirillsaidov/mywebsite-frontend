<template>
  <div class="dashboard">
    <div class="dashboard-layout">
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <router-link to="/admin/blog" class="sidebar-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            Blog
          </router-link>
          <router-link to="/admin/about" class="sidebar-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            About
          </router-link>
          <router-link to="/admin/projects" class="sidebar-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            Projects
          </router-link>
          <router-link to="/admin/banners" class="sidebar-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
            Banners
          </router-link>
          <router-link to="/admin/appearance" class="sidebar-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
            Appearance
          </router-link>
          <router-link to="/admin/uploads" class="sidebar-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Uploads
          </router-link>
          <router-link to="/admin/password" class="sidebar-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Password
          </router-link>
        </nav>
      </aside>
      <main class="dashboard-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: calc(100vh - 120px);
}

.sidebar {
  width: 200px;
  background: var(--color-bg-card);
  box-shadow: 2px 0 8px var(--color-shadow);
  padding: 1.5rem 0;
  flex-shrink: 0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 1.25rem;
  color: var(--color-text-muted);
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all var(--transition);
  border: none;
  border-left: 3px solid transparent;
  background: none;
  text-align: left;
  cursor: pointer;
  font-family: var(--font-sans);
}

.sidebar-link:hover {
  color: var(--color-primary);
  background: var(--color-bg);
}

.sidebar-link.router-link-active {
  color: var(--color-primary);
  background: var(--color-bg);
  border-image: var(--gradient-primary) 1;
}

.sidebar-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.dashboard-content {
  flex: 1;
  padding: 1.5rem 2rem;
}

@media (max-width: 768px) {
  .dashboard-layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    box-shadow: 0 2px 8px var(--color-shadow);
    padding: 0.5rem 0;
  }
  .sidebar-nav {
    flex-direction: row;
    overflow-x: auto;
    gap: 0;
  }
  .sidebar-link {
    white-space: nowrap;
    border-left: none;
    border-bottom: 3px solid transparent;
  }
  .sidebar-link.router-link-active {
    border-left: none;
    border-bottom: 3px solid transparent;
    border-image: var(--gradient-primary) 1;
  }
}
</style>
