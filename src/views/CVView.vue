<template>
  <div class="cv-page section">
    <div class="container">
      <div class="cv-header">
        <h1 class="page-title">Curriculum Vitae</h1>
        <a href="/cv.pdf" download class="btn btn-gradient">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dl-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download PDF
        </a>
      </div>
      <div class="cv-embed card cv-card">
        <embed src="/cv.pdf" type="application/pdf" class="pdf-viewer" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cv-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dl-icon {
  width: 18px;
  height: 18px;
}

.cv-card {
  padding: 0;
  overflow: hidden;
  border-left: none;
  box-shadow: var(--shadow-md);
}

.pdf-viewer {
  width: 100%;
  height: 80vh;
  border: none;
}
</style>
